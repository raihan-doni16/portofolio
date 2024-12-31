const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".hero-section").appendChild(renderer.domElement);

// Function to create a cube
function createCube(color, x, y, z) {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z); // Set position of the cube
  return cube;
}

// Create three cubes
const cube1 = createCube(0x0077ff, -4, 2, -1); // Blue cube
const cube2 = createCube(0xff7700, 4, 2, -1); // Orange cube
const cube3 = createCube(0x00ff77, 0, 2.5, 0); // Green cube

// Add cubes to the scene
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);

camera.position.z = 5;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let intersectedObject = null;

function animate() {
  requestAnimationFrame(animate);

  if (intersectedObject) {
    intersectedObject.scale.set(1.2, 1.2, 1.2);
  }

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.02;

  cube3.rotation.x += 0.02;
  cube3.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([cube1, cube2, cube3]);

  cube1.scale.set(1, 1, 1);
  cube2.scale.set(1, 1, 1);
  cube3.scale.set(1, 1, 1);

  if (intersects.length > 0) {
    intersectedObject = intersects[0].object;
    intersectedObject.scale.set(1.2, 1.2, 1.2);
  } else {
    intersectedObject = null;
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const { motion } = window["framer-motion"];

motion("#hero-heading", {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2 },
});

motion("#hero-description", {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.5, duration: 1 },
});

