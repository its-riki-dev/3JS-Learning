// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Material
const material = new THREE.MeshBasicMaterial({ color: "green", wireframe: true });
// Mesh
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// Position
camera.position.z = 5;

// Renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Animation
function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();
