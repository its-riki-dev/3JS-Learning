// Learning Topics --> Animations, Grometry, BufferGeometry, Grouping, OrbitControls

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: "green", /* wireframe: true */ });
// const cube = new THREE.Mesh(cubeGeo, cubeMaterial);

// const circleGeo = new THREE.SphereGeometry(1, 250, 250);
// const circleMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
// const circle = new THREE.Mesh(circleGeo, circleMaterial);

// scene.add(cube);
// scene.add(circle);

// const group = new THREE.Group();
// group.add(cube);
// group.add(circle);

// scene.add(group);

// group.position.y = 2;
// cube.position.x = -2;
// circle.position.x = 2;


const geometry = new THREE.BufferGeometry();

let vertices = new Float32Array(3000);

for (let i = 0; i <= 1000 * 3; i++) {
    vertices[i] = (Math.random() - 0.5) * 7;

}

geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
const mesh = new THREE.Mesh( geometry, material );

scene.add(mesh);

camera.position.z = 2;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);

let clock = new THREE.Clock();

function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

    // mesh.rotation.y = clock.getElapsedTime() * 1;
    // circle.rotation.y = clock.getElapsedTime() * 0.02;

    camera.position.z -= 0.001;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // circle.rotation.x += 0.01;
    // circle.rotation.y += 0.01;
}
animate();