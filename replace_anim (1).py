import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_anim = """<!-- STITCH_THREEJS_START:ANIMATION_2 class="fixed inset-0 w-full h-full bg-transparent" -->
<div class="fixed inset-0 w-full h-full bg-transparent" style="display:block;">
<script src="https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js"></script>
<div id="threejs-container-ANIMATION_2" style="width:100%;height:100%"></div>
<script>
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_2');
  const devicePixelRatio = window.devicePixelRatio || 1;
  // Interactive Three.js 3D Cookie & Brookie Showcase
const width = container.clientWidth || window.innerWidth;
const height = container.clientHeight || window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 0, 11);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Lighting setup for warm, decadent chocolate bakery illumination
const ambientLight = new THREE.AmbientLight(0xfff3e6, 1.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffecd6, 2.5);
keyLight.position.set(6, 8, 8);
keyLight.castShadow = true;
scene.add(keyLight);

const rimLight = new THREE.PointLight(0xff9d42, 2.0, 30);
rimLight.position.set(-8, -4, 4);
scene.add(rimLight);

const softFill = new THREE.DirectionalLight(0xecd8c6, 1.0);
softFill.position.set(-6, 3, 2);
scene.add(softFill);

// Main Master Group
const mainGroup = new THREE.Group();
scene.add(mainGroup);

// Materials
// 1. Brownie fudge chocolate base (dark rich cocoa)
const brownieMat = new THREE.MeshStandardMaterial({
  color: 0x2A150B,
  roughness: 0.85,
  metalness: 0.05,
  bumpScale: 0.1
});

// 2. Cookie dough base (golden toasted amber-tan)
const cookieDoughMat = new THREE.MeshStandardMaterial({
  color: 0xD89648,
  roughness: 0.75,
  metalness: 0.05
});

// 3. Melted/glossy chocolate chips
const chocChipMat = new THREE.MeshStandardMaterial({
  color: 0x160B06,
  roughness: 0.25,
  metalness: 0.15
});

// 4. White chocolate chip chunks
const whiteChocMat = new THREE.MeshStandardMaterial({
  color: 0xFDF4E3,
  roughness: 0.35,
  metalness: 0.1
});

// 5. Flaky sea salt particles
const saltMat = new THREE.MeshStandardMaterial({
  color: 0xFFFFFF,
  roughness: 0.1,
  metalness: 0.4
});

// Helper: Create an authentic Brookie (Half Brownie, Half Cookie layered hybrid)
function createBrookieMesh() {
  const brookieGroup = new THREE.Group();

  // Bottom Layer: Rich fudgy square brownie
  const brownieBaseGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.65, 36);
  // Add organic dough deform to the geometry
  const pos = brownieBaseGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);
    const noise = (Math.sin(vx * 3.5) + Math.cos(vz * 3.5)) * 0.08;
    pos.setXYZ(i, vx + noise * 0.5, vy, vz + noise * 0.5);
  }
  brownieBaseGeo.computeVertexNormals();

  const brownieBase = new THREE.Mesh(brownieBaseGeo, brownieMat);
  brownieBase.position.y = -0.32;
  brownieBase.castShadow = true;
  brownieBase.receiveShadow = true;
  brookieGroup.add(brownieBase);

  // Top Layer: Golden chewy chocolate chip cookie layer crowned with dome
  const cookieTopGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.7, 36);
  const posTop = cookieTopGeo.attributes.position;
  for (let i = 0; i < posTop.count; i++) {
    const vx = posTop.getX(i);
    const vy = posTop.getY(i);
    const vz = posTop.getZ(i);
    const noise = (Math.sin(vx * 4.0) * Math.cos(vz * 4.0)) * 0.12;
    posTop.setXYZ(i, vx * (1.0 + (vy > 0 ? -0.05 : 0)), vy + noise, vz * (1.0 + (vy > 0 ? -0.05 : 0)));
  }
  cookieTopGeo.computeVertexNormals();

  const cookieTop = new THREE.Mesh(cookieTopGeo, cookieDoughMat);
  cookieTop.position.y = 0.32;
  cookieTop.castShadow = true;
  cookieTop.receiveShadow = true;
  brookieGroup.add(cookieTop);

  // Add decadent chocolate chips & chunks embedded on top & side
  const chipGeo = new THREE.DodecahedronGeometry(0.28, 1);
  const chipPositions = [
    { x: 0.8, y: 0.65, z: 0.6, s: 1.1, rot: [0.4, 0.8, 0] },
    { x: -0.9, y: 0.68, z: 0.5, s: 1.3, rot: [1.2, 0.1, 0.4] },
    { x: -0.2, y: 0.72, z: -0.9, s: 1.4, rot: [0.2, 0.5, 0.9] },
    { x: 1.1, y: 0.62, z: -0.7, s: 1.0, rot: [0.7, 1.1, 0.3] },
    { x: 0.1, y: 0.75, z: 0.2, s: 1.5, rot: [0.1, 0.9, 0.6] },
    { x: -1.3, y: 0.58, z: -0.4, s: 1.2, rot: [0.5, 0.2, 0.8] },
    { x: 1.4, y: 0.55, z: 0.1, s: 1.1, rot: [0.9, 0.3, 0.2] },
    // Melted droop chips on seam
    { x: 2.1, y: 0.05, z: 0.8, s: 0.9, rot: [0.2, 0.4, 0.1] },
    { x: -2.0, y: -0.1, z: -0.6, s: 1.0, rot: [0.8, 0.2, 0.5] }
  ];

  chipPositions.forEach(cp => {
    const chip = new THREE.Mesh(chipGeo, chocChipMat);
    chip.position.set(cp.x, cp.y, cp.z);
    chip.scale.set(cp.s, cp.s * 0.7, cp.s);
    chip.rotation.set(cp.rot[0], cp.rot[1], cp.rot[2]);
    chip.castShadow = true;
    brookieGroup.add(chip);
  });

  // White chocolate chunks & flaky salt flakes
  const saltGeo = new THREE.BoxGeometry(0.08, 0.03, 0.08);
  for (let s = 0; s < 18; s++) {
    const salt = new THREE.Mesh(saltGeo, saltMat);
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 1.8;
    salt.position.set(Math.cos(angle) * r, 0.72 + Math.random() * 0.05, Math.sin(angle) * r);
    salt.rotation.set(Math.random(), Math.random(), Math.random());
    brookieGroup.add(salt);
  }

  return brookieGroup;
}

// Helper: Classic Golden Chocolate Chip Cookie
function createCookieMesh(size = 1.0) {
  const cGroup = new THREE.Group();
  const cGeo = new THREE.CylinderGeometry(1.6 * size, 1.7 * size, 0.45 * size, 28);
  const pos = cGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);
    const n = Math.sin(vx * 5.0) * Math.sin(vz * 5.0) * 0.08 * size;
    pos.setXYZ(i, vx, vy + n, vz);
  }
  cGeo.computeVertexNormals();

  const cookieMesh = new THREE.Mesh(cGeo, cookieDoughMat);
  cookieMesh.castShadow = true;
  cGroup.add(cookieMesh);

  // Chips
  const chipGeo = new THREE.DodecahedronGeometry(0.22 * size, 1);
  for (let i = 0; i < 7; i++) {
    const chip = new THREE.Mesh(chipGeo, chocChipMat);
    const angle = (i / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = (0.3 + Math.random() * 0.9) * size;
    chip.position.set(Math.cos(angle) * dist, 0.22 * size, Math.sin(angle) * dist);
    chip.scale.set(1.1, 0.7, 1.1);
    chip.rotation.set(Math.random(), Math.random(), Math.random());
    cGroup.add(chip);
  }
  return cGroup;
}

// Helper: Dark Double Chocolate Fudge Brownie Stack
function createBrownieCube(size = 1.0) {
  const bGroup = new THREE.Group();
  const bGeo = new THREE.BoxGeometry(2.0 * size, 1.2 * size, 2.0 * size, 12, 8, 12);
  const pos = bGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);
    const n = (Math.sin(vx * 4.0) + Math.cos(vy * 4.0) + Math.sin(vz * 4.0)) * 0.04 * size;
    pos.setXYZ(i, vx + n, vy + n, vz + n);
  }
  bGeo.computeVertexNormals();
  const bMesh = new THREE.Mesh(bGeo, brownieMat);
  bMesh.castShadow = true;
  bGroup.add(bMesh);

  // White choc & dark melted chunks
  const chunkGeo = new THREE.DodecahedronGeometry(0.25 * size, 0);
  for (let i = 0; i < 5; i++) {
    const chunk = new THREE.Mesh(chunkGeo, i % 2 === 0 ? chocChipMat : whiteChocMat);
    chunk.position.set(
      (Math.random() - 0.5) * 1.5 * size,
      0.6 * size + 0.05,
      (Math.random() - 0.5) * 1.5 * size
    );
    chunk.scale.set(1.2, 0.6, 1.2);
    chunk.rotation.set(Math.random(), Math.random(), Math.random());
    bGroup.add(chunk);
  }
  return bGroup;
}

// 1. Centerpiece: The Signature Giant Brookie
const heroBrookie = createBrookieMesh();
heroBrookie.position.set(0.6, 0.0, 0);
heroBrookie.rotation.set(0.45, -0.4, 0.2);
mainGroup.add(heroBrookie);

// 2. Floating Orbiting Items:
// Top left floating chewy cookie
const orbCookie1 = createCookieMesh(0.85);
orbCookie1.position.set(-4.2, 2.6, -1.8);
orbCookie1.rotation.set(0.6, 0.3, -0.4);
mainGroup.add(orbCookie1);

// Bottom right floating decadent brownie cube
const orbBrownie1 = createBrownieCube(0.9);
orbBrownie1.position.set(4.3, -2.5, -1.0);
orbBrownie1.rotation.set(-0.35, 0.8, 0.5);
mainGroup.add(orbBrownie1);

// Bottom left mini brookie
const miniBrookie = createBrookieMesh();
miniBrookie.scale.set(0.55, 0.55, 0.55);
miniBrookie.position.set(-3.8, -2.4, -2.0);
miniBrookie.rotation.set(-0.5, 0.6, 0.2);
mainGroup.add(miniBrookie);

// Top right floating golden cookie
const orbCookie2 = createCookieMesh(0.65);
orbCookie2.position.set(3.8, 2.9, -2.5);
orbCookie2.rotation.set(0.8, -0.5, 0.3);
mainGroup.add(orbCookie2);

// Decadent Floating Chocolate Crumb & Sea Salt Particles
const crumbCount = 45;
const crumbGeo = new THREE.DodecahedronGeometry(0.08, 0);
const crumbs = [];

for (let i = 0; i < crumbCount; i++) {
  const isSalt = Math.random() > 0.75;
  const mat = isSalt ? saltMat : (Math.random() > 0.5 ? chocChipMat : cookieDoughMat);
  const crumb = new THREE.Mesh(crumbGeo, mat);
  
  const theta = Math.random() * Math.PI * 2;
  const radius = 2.2 + Math.random() * 5.0;
  crumb.position.set(
    Math.cos(theta) * radius + (Math.random() - 0.5),
    (Math.random() - 0.5) * 6.5,
    (Math.random() - 0.5) * 5.0
  );
  const s = 0.4 + Math.random() * 0.9;
  crumb.scale.set(s, s, s);
  
  crumb.userData = {
    origY: crumb.position.y,
    speed: 0.4 + Math.random() * 0.8,
    rotSpeedX: (Math.random() - 0.5) * 0.03,
    rotSpeedY: (Math.random() - 0.5) * 0.03,
    offset: Math.random() * Math.PI * 2
  };
  
  mainGroup.add(crumb);
  crumbs.push(crumb);
}

// Mouse Interactive Parallax Tracking
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, { passive: true });

// Window Resize Handling
function onWindowResize() {
  const w = container.clientWidth || window.innerWidth;
  const h = container.clientHeight || window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', onWindowResize);

// Render Animation Loop
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  // Smooth mouse lerping
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  // Gentle float & continuous rotation of the Hero Brookie
  heroBrookie.rotation.y = -0.4 + Math.sin(time * 0.6) * 0.45 + targetX * 0.6;
  heroBrookie.rotation.x = 0.45 + Math.cos(time * 0.5) * 0.15 - targetY * 0.4;
  heroBrookie.rotation.z = 0.2 + Math.sin(time * 0.4) * 0.1;
  heroBrookie.position.y = Math.sin(time * 1.1) * 0.25;

  // Orbiting satellite pastries animation
  orbCookie1.rotation.y += 0.008;
  orbCookie1.rotation.x += 0.005;
  orbCookie1.position.y = 2.6 + Math.cos(time * 1.3) * 0.35;

  orbBrownie1.rotation.y -= 0.007;
  orbBrownie1.rotation.z += 0.006;
  orbBrownie1.position.y = -2.5 + Math.sin(time * 1.2) * 0.3;

  miniBrookie.rotation.y += 0.009;
  miniBrookie.position.y = -2.4 + Math.sin(time * 0.95 + 1.0) * 0.25;

  orbCookie2.rotation.y -= 0.01;
  orbCookie2.position.y = 2.9 + Math.cos(time * 1.0 + 0.5) * 0.28;

  // Floating crumbs gentle drift
  for (let i = 0; i < crumbs.length; i++) {
    const c = crumbs[i];
    c.position.y = c.userData.origY + Math.sin(time * c.userData.speed + c.userData.offset) * 0.35;
    c.rotation.x += c.userData.rotSpeedX;
    c.rotation.y += c.userData.rotSpeedY;
  }

  // Camera subtle parallax
  camera.position.x = targetX * 1.2;
  camera.position.y = targetY * 0.8;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

animate();

})();
</script>
</div>
<!-- STITCH_THREEJS_END:ANIMATION_2 -->"""

pattern = re.compile(r'<!-- STITCH_THREEJS_START:ANIMATION_17.*?<!-- STITCH_THREEJS_END:ANIMATION_17 -->', re.DOTALL)
new_content = pattern.sub(new_anim, content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Replaced animation block successfully.")
