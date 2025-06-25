// Learning Topics --> Raycaster, Pointer Events, Hover Effects

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(3, 3, 7);

// Renderer
const canvas = document.querySelector('canvas') || undefined;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Box Geometry
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x4a90e2,
    metalness: 0.4,
    roughness: 0.2,
    clearcoat: 0.7,
    clearcoatRoughness: 0.1
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.x = -1.5;
scene.add(box);

// Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const sphereMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf5a623,
    metalness: 0.2,
    roughness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 1.5;
scene.add(sphere);

// Studio Lighting
// Key Light
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 8, 7);
keyLight.castShadow = true;
scene.add(keyLight);

// Fill Light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-6, 4, 2);
scene.add(fillLight);

// Back Light
const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
backLight.position.set(0, 5, -8);
scene.add(backLight);

// Soft Ambient
const ambient = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambient);

// Responsive resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Raycaster for hover effect
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Store original colors
const originalColors = {
    box: box.material.color.clone(),
    sphere: sphere.material.color.clone()
};

let lastIntersected = null;

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    let intersects = raycaster.intersectObjects([box, sphere]);

    if (intersects.length > 0) {
        const intersected = intersects[0].object;
        // If hovering over a new object, reset the previous one
        if (lastIntersected && lastIntersected !== intersected) {
            if (lastIntersected === box) {
                lastIntersected.material.color.copy(originalColors.box);
            } else if (lastIntersected === sphere) {
                lastIntersected.material.color.copy(originalColors.sphere);
            }
        }
        // Set highlight color
        intersected.material.color.set(0xff0000);
        lastIntersected = intersected;
    } else {
        // If not hovering over anything, reset the last intersected object's color
        if (lastIntersected) {
            if (lastIntersected === box) {
                lastIntersected.material.color.copy(originalColors.box);
            } else if (lastIntersected === sphere) {
                lastIntersected.material.color.copy(originalColors.sphere);
            }
            lastIntersected = null;
        }
    }
}

window.addEventListener( 'pointermove', onPointerMove );

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();