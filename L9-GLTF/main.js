// Learning Topics --> GLTF Loader, HDRI

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 2);

// Renderer
const canvas = document.querySelector('canvas') || document.createElement('canvas');
if (!canvas.parentElement) document.body.appendChild(canvas);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// HDRI Environment
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/qwantani_noon_1k.hdr',
    (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        // scene.background = texture;
    }
);

// Basic light for fallback
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

// Load a GLTF model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    './gun.glb',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(15, 15, 15);           
        model.position.set(0, -0.6, 0);        
        scene.add(model);
    }
);

// Responsive resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
