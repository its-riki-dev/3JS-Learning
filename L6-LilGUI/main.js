// Learning Topics --> LilGui

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const boxGeo = new THREE.BoxGeometry(1, 2, 3);
const boxMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const box = new THREE.Mesh(boxGeo, boxMaterial);

scene.add(box);

camera.position.z = 6;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const gui = new GUI();
const boxParams = {
    width: 1,
    height: 2,
    depth: 3,
    color: "#008000",
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
};

gui.add(boxParams, 'width', 0.1, 10).onChange((value) => {
    box.scale.x = value / box.geometry.parameters.width;
});
gui.add(boxParams, 'height', 0.1, 10).onChange((value) => {
    box.scale.y = value / box.geometry.parameters.height;
});
gui.add(boxParams, 'depth', 0.1, 10).onChange((value) => {
    box.scale.z = value / box.geometry.parameters.depth;
});

gui.addColor(boxParams, 'color').onChange((value) => {
    box.material.color.set(value);
});

gui.add(boxParams, 'rotationX', 0, Math.PI * 2).onChange((value) => {
    box.rotation.x = value;
});
gui.add(boxParams, 'rotationY', 0, Math.PI * 2).onChange((value) => {
    box.rotation.y = value;
});
gui.add(boxParams, 'rotationZ', 0, Math.PI * 2).onChange((value) => {
    box.rotation.z = value;
});


window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
})

let clock = new THREE.Clock();

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();