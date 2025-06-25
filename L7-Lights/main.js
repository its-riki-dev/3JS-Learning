// Learning Topics --> Ambient Light, Directional Light, Point Light, Spot Light, Light Helpers

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const AmbientLight = new THREE.AmbientLight("white", 0.1);
// scene.add( AmbientLight );

// const DirectionalLight = new THREE.DirectionalLight("white", 3);
// DirectionalLight.position.set(4, 5, 0);
// scene.add(DirectionalLight);

// const helper = new THREE.DirectionalLightHelper(DirectionalLight, 0.8);
// scene.add(helper);

// const PointLight = new THREE.PointLight( 0xffffff, 30, 100 );
// PointLight.position.set( 1, 1, 1 );
// scene.add( PointLight );

// const pointLightHelper = new THREE.PointLightHelper( PointLight, 0.4 );
// scene.add( pointLightHelper );

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 1, 3, 1 );
scene.add( spotLight );

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );


const boxGeo = new THREE.BoxGeometry(1, 2, 3);
const boxMaterial = new THREE.MeshPhysicalMaterial({
    color: "red"
});
const box = new THREE.Mesh(boxGeo, boxMaterial);

scene.add(box);

camera.position.z = 6;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// const gui = new GUI();
// const lightFolder = gui.addFolder('Directional Light');
// lightFolder.add(DirectionalLight.position, 'x', -10, 10).name('Light X');
// lightFolder.add(DirectionalLight.position, 'y', -10, 10).name('Light Y');
// lightFolder.open();

// const boxFolder = gui.addFolder('Box');
// boxFolder.add(box.position, 'x', -10, 10).name('Position X');
// boxFolder.add(box.position, 'y', -10, 10).name('Position Y');
// boxFolder.add(box.position, 'z', -10, 10).name('Position Z');
// boxFolder.add(box.rotation, 'x', 0, Math.PI * 2).name('Rotation X');
// boxFolder.add(box.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
// boxFolder.add(box.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
// boxFolder.open();

// const gui = new GUI();
// const pointLightFolder = gui.addFolder('Point Light');
// pointLightFolder.add(PointLight.position, 'x', -10, 10).name('Position X');
// pointLightFolder.add(PointLight.position, 'y', -10, 10).name('Position Y');
// pointLightFolder.add(PointLight.position, 'z', -10, 10).name('Position Z');
// pointLightFolder.add(PointLight, 'intensity', 0, 10).name('Intensity');
// pointLightFolder.open();

const gui = new GUI();
const spotLightFolder = gui.addFolder('Spot Light');
spotLightFolder.add(spotLight.position, 'x', -10, 10).name('Position X');
spotLightFolder.add(spotLight.position, 'y', -10, 10).name('Position Y');
spotLightFolder.add(spotLight.position, 'z', -10, 10).name('Position Z');
spotLightFolder.add(spotLight, 'intensity', 0, 10).name('Intensity');
spotLightFolder.add(spotLight, 'angle', 0, Math.PI / 2).name('Angle');
spotLightFolder.add(spotLight, 'penumbra', 0, 1).name('Penumbra');
spotLightFolder.add(spotLight, 'decay', 1, 2).name('Decay');
spotLightFolder.open();

function updateSpotLightHelper() {
    spotLightHelper.update();
}
spotLightFolder.children.forEach(controller => {
    if (typeof controller.onChange === 'function') {
        controller.onChange(updateSpotLightHelper);
    }
});




window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
})

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();