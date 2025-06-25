// Learning Topics --> Materials, MeshPhysicalMaterial, Textures, HDRI, Responsiveness

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {RGBELoader} from "three/addons/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let textureLoader = new THREE.TextureLoader();

let tex = textureLoader.load("./earth.jpg");
tex.colorSpace = THREE.SRGBColorSpace;

let texLoad = textureLoader.load("./clouds.jpg");
texLoad.colorSpace = THREE.SRGBColorSpace;


const circleGeo = new THREE.SphereGeometry(1, 250, 250);
const circleMaterial = new THREE.MeshPhysicalMaterial({ map: tex });
const circle = new THREE.Mesh(circleGeo, circleMaterial);

const sphereGeo = new THREE.SphereGeometry(1.03, 250, 250);
const sphereMaterial = new THREE.MeshPhysicalMaterial({ alphaMap: texLoad });
sphereMaterial.transparent = true;
const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);

scene.add(circle);
scene.add(sphere);


let hdri = new RGBELoader();
hdri.load("https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/buikslotermeerplein_2k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    scene.environment = texture;
});

camera.position.z = 2;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

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

    sphere.rotation.y = clock.getElapsedTime() * 0.04;
    circle.rotation.y = clock.getElapsedTime() * 0.02;
}
animate();