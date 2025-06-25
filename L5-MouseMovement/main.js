// Learning Topics --> Using LookAt understanding the X & Y-axis in Three.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) - 0.5;
    mouse.y = -(e.clientY / window.innerHeight) + 0.5;
})

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

    box.lookAt(new THREE.Vector3(mouse.x, mouse.y, 1));
}
animate();