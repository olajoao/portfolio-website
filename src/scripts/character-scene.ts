import * as THREE from 'three';

// ====== SCENE SETUP ======
const canvas = document.getElementById('character-canvas') as HTMLCanvasElement;
const container = canvas.parentElement as HTMLElement;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 3.5, 20);
camera.lookAt(0, 2.5, 0);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener('resize', resize);

// ====== LIGHTING ======
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
mainLight.position.set(5, 10, 7);
mainLight.castShadow = true;
mainLight.shadow.mapSize.set(1024, 1024);
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0x7b40c9, 0.2);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0x00fff7, 0.2);
rimLight.position.set(0, 5, -8);
scene.add(rimLight);

const underGlow = new THREE.PointLight(0x7b40c9, 0.35, 15);
underGlow.position.set(0, -3, 2);
scene.add(underGlow);

const specLight = new THREE.PointLight(0xffffff, 0.4, 20);
specLight.position.set(3, 8, 6);
scene.add(specLight);

// ====== MATERIALS ======
interface MatOpts {
  roughness?: number;
  metalness?: number;
  emissive?: number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}

function mat(color: number, opts: MatOpts = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.7,
    metalness: opts.metalness ?? 0.05,
    emissive: opts.emissive !== undefined ? new THREE.Color(opts.emissive) : undefined,
    emissiveIntensity: opts.emissiveIntensity,
    transparent: opts.transparent,
    opacity: opts.opacity,
  });
}

// Dark Magician color palette
const deepPurple = 0x3a1f6e;
const midPurple = 0x6b35a8;
const lavender = 0xb88ade;
const lightLavender = 0xd4aaff;
const robeBlue = 0x2a1b6e;
const robeDarkBlue = 0x1a1155;
const armorPurple = 0x6a3ca0;
const armorDark = 0x2e1a55;
const armorShiny = 0x8855cc;
const skinTone = 0xa0724e;
const staffTeal = 0x40c9a2;
const staffDarkTeal = 0x2a9e7e;
const staffGem = 0x50e8b8;
const eyeBlack = 0x0a0a0a;

const deepPurpleMat = mat(deepPurple);
const midPurpleMat = mat(midPurple, { roughness: 0.45, metalness: 0.15 });
const lavenderMat = mat(lavender, { roughness: 0.35, metalness: 0.2 });
const lightLavMat = mat(lightLavender, { roughness: 0.3, metalness: 0.2 });
const robeMat = mat(robeBlue, { roughness: 0.75 });
const robeDarkMat = mat(robeDarkBlue, { roughness: 0.8 });
const armorMat = mat(armorPurple, { roughness: 0.3, metalness: 0.45 });
const armorDarkMat = mat(armorDark, { roughness: 0.35, metalness: 0.4 });
const armorShinyMat = mat(armorShiny, { roughness: 0.2, metalness: 0.55 });
const skinMat = mat(skinTone, { roughness: 0.6 });
const staffMat = mat(staffTeal, { roughness: 0.35, metalness: 0.2 });
const staffDarkMat = mat(staffDarkTeal, { roughness: 0.4 });
const gemMat = mat(staffGem, { roughness: 0.15, metalness: 0.15, emissive: staffGem, emissiveIntensity: 0.6 });
const eyeMat = mat(eyeBlack, { roughness: 0.15, metalness: 0.1 });

// ====== HELPER ======
function box(
  w: number,
  h: number,
  d: number,
  material: THREE.MeshStandardMaterial,
  x: number,
  y: number,
  z: number,
): THREE.Mesh {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geo, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

// ====== CHARACTER GROUP ======
const character = new THREE.Group();

// ================================
//  HAT — Iconic pointed hat with HORN PROTRUSIONS
// ================================
const hatGroup = new THREE.Group();

hatGroup.add(box(2.9, 0.18, 2.9, deepPurpleMat, 0, 9.55, -0.15));

hatGroup.add(box(2.55, 0.55, 2.55, deepPurpleMat, 0, 9.95, -0.15));
hatGroup.add(box(2.6, 0.16, 2.6, lavenderMat, 0, 10.28, -0.15));

hatGroup.add(box(2.2, 0.55, 2.2, midPurpleMat, 0, 10.58, -0.1));
hatGroup.add(box(2.25, 0.16, 2.25, lavenderMat, 0, 10.9, -0.1));

hatGroup.add(box(1.8, 0.55, 1.8, deepPurpleMat, 0, 11.2, -0.05));
hatGroup.add(box(1.85, 0.16, 1.85, lavenderMat, 0, 11.52, -0.05));

hatGroup.add(box(1.35, 0.55, 1.35, midPurpleMat, 0, 11.82, 0));
hatGroup.add(box(1.4, 0.14, 1.4, lightLavMat, 0, 12.12, 0));

hatGroup.add(box(0.95, 0.5, 0.95, deepPurpleMat, 0, 12.4, 0.05));
hatGroup.add(box(0.65, 0.45, 0.65, midPurpleMat, 0, 12.85, 0.1));

const tip1 = box(0.42, 0.5, 0.42, armorShinyMat, 0, 13.3, 0.18);
tip1.rotation.x = 0.15;
hatGroup.add(tip1);

const tip2 = box(0.28, 0.5, 0.28, midPurpleMat, 0, 13.75, 0.35);
tip2.rotation.x = 0.28;
hatGroup.add(tip2);

const tip3 = box(0.18, 0.45, 0.18, armorShinyMat, 0, 14.15, 0.55);
tip3.rotation.x = 0.38;
hatGroup.add(tip3);

const tipTop = box(0.12, 0.35, 0.12, lavenderMat, 0, 14.5, 0.75);
tipTop.rotation.x = 0.45;
hatGroup.add(tipTop);

// Hat side drapes
hatGroup.add(box(0.22, 1.3, 1.7, deepPurpleMat, -1.38, 9.0, -0.15));
hatGroup.add(box(0.18, 0.9, 1.4, midPurpleMat, -1.38, 8.05, -0.15));
hatGroup.add(box(0.25, 0.12, 1.75, lavenderMat, -1.38, 9.65, -0.15));

hatGroup.add(box(0.22, 1.3, 1.7, deepPurpleMat, 1.38, 9.0, -0.15));
hatGroup.add(box(0.18, 0.9, 1.4, midPurpleMat, 1.38, 8.05, -0.15));
hatGroup.add(box(0.25, 0.12, 1.75, lavenderMat, 1.38, 9.65, -0.15));

// Back drape
hatGroup.add(box(2.3, 1.5, 0.22, deepPurpleMat, 0, 8.8, -1.15));
hatGroup.add(box(1.8, 0.8, 0.18, midPurpleMat, 0, 7.85, -1.1));
hatGroup.add(box(2.35, 0.12, 0.25, lavenderMat, 0, 9.55, -1.15));

// Front visor
hatGroup.add(box(2.6, 0.32, 0.22, armorShinyMat, 0, 9.5, 1.05));
hatGroup.add(box(2.65, 0.12, 0.24, lavenderMat, 0, 9.32, 1.07));
hatGroup.add(box(0.22, 0.22, 0.12, gemMat, 0, 9.5, 1.14));

character.add(hatGroup);

// ================================
//  HEAD — Funko Pop oversized
// ================================
const headGroup = new THREE.Group();
headGroup.add(box(2.55, 2.2, 2.3, skinMat, 0, 8.25, 0.1));
headGroup.add(box(2.35, 0.3, 2.1, skinMat, 0, 9.4, 0.05));
headGroup.add(box(2.1, 0.2, 1.8, skinMat, 0, 7.1, 0.1));
character.add(headGroup);

// ================================
//  FACE — Funko Pop big round eyes
// ================================
function funkoEye(cx: number, cy: number, cz: number): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.75, 0.75, 0.12, eyeMat, cx, cy, cz));
  g.add(box(0.65, 0.85, 0.11, eyeMat, cx, cy, cz));
  g.add(box(0.85, 0.65, 0.11, eyeMat, cx, cy, cz));
  const whiteMat = mat(0xffffff, { roughness: 0.1 });
  g.add(box(0.18, 0.18, 0.06, whiteMat, cx + 0.18, cy + 0.18, cz + 0.07));
  g.add(box(0.1, 0.1, 0.05, whiteMat, cx - 0.12, cy + 0.08, cz + 0.07));
  return g;
}

character.add(funkoEye(-0.58, 8.3, 1.22));
character.add(funkoEye(0.58, 8.3, 1.22));

// Tiny nose
character.add(box(0.14, 0.1, 0.1, mat(0x8f6443), 0, 7.9, 1.24));

// ================================
//  BODY — Small Funko proportions
// ================================
character.add(box(0.55, 0.3, 0.5, skinMat, 0, 6.95, 0.05));

// Shoulder armor
const lShoulder = new THREE.Group();
lShoulder.add(box(0.9, 0.35, 0.9, armorShinyMat, 0, 0, 0));
lShoulder.add(box(0.7, 0.2, 0.7, armorDarkMat, 0, 0.24, 0));
lShoulder.add(box(0.5, 0.15, 0.5, armorShinyMat, 0, 0.38, 0));
lShoulder.add(box(0.95, 0.1, 0.95, lavenderMat, 0, -0.14, 0));
const lSpike = box(0.15, 0.35, 0.15, lavenderMat, -0.25, 0.45, 0);
lSpike.rotation.z = 0.3;
lShoulder.add(lSpike);
lShoulder.position.set(-1.2, 6.55, 0);
character.add(lShoulder);

const rShoulder = new THREE.Group();
rShoulder.add(box(0.9, 0.35, 0.9, armorShinyMat, 0, 0, 0));
rShoulder.add(box(0.7, 0.2, 0.7, armorDarkMat, 0, 0.24, 0));
rShoulder.add(box(0.5, 0.15, 0.5, armorShinyMat, 0, 0.38, 0));
rShoulder.add(box(0.95, 0.1, 0.95, lavenderMat, 0, -0.14, 0));
const rSpike = box(0.15, 0.35, 0.15, lavenderMat, 0.25, 0.45, 0);
rSpike.rotation.z = -0.3;
rShoulder.add(rSpike);
rShoulder.position.set(1.2, 6.55, 0);
character.add(rShoulder);

// Chest armor
character.add(box(2.0, 0.55, 1.1, armorDarkMat, 0, 6.45, 0));
character.add(box(1.6, 0.22, 1.0, armorShinyMat, 0, 6.8, 0));
character.add(box(0.18, 0.55, 0.15, lavenderMat, 0, 6.45, 0.56));
character.add(box(0.12, 0.35, 0.12, armorShinyMat, -0.5, 6.5, 0.54));
character.add(box(0.12, 0.35, 0.12, armorShinyMat, 0.5, 6.5, 0.54));

// Main robe body
character.add(box(1.8, 1.4, 1.1, robeMat, 0, 5.45, 0));
character.add(box(1.85, 0.18, 1.15, armorMat, 0, 6.05, 0));
character.add(box(0.25, 0.2, 0.16, gemMat, 0, 6.05, 0.6));

// Spiral emblem on chest/robe
character.add(box(0.7, 0.7, 0.1, armorDarkMat, 0, 5.3, 0.58));
character.add(box(0.6, 0.8, 0.1, armorDarkMat, 0, 5.3, 0.58));
character.add(box(0.5, 0.5, 0.1, armorShinyMat, 0, 5.3, 0.62));
character.add(box(0.4, 0.6, 0.1, armorShinyMat, 0, 5.3, 0.62));
character.add(box(0.25, 0.25, 0.1, lavenderMat, 0, 5.3, 0.66));
character.add(box(0.3, 0.1, 0.08, lavenderMat, 0.15, 5.5, 0.68));
character.add(box(0.1, 0.25, 0.08, lavenderMat, 0.28, 5.35, 0.68));
character.add(box(0.25, 0.1, 0.08, lavenderMat, 0.1, 5.12, 0.68));
character.add(box(0.1, 0.2, 0.08, lavenderMat, -0.12, 5.25, 0.68));

// Robe skirt
character.add(box(2.0, 0.55, 1.3, robeDarkMat, 0, 4.45, 0));
character.add(box(2.2, 0.55, 1.4, robeMat, 0, 3.85, 0));
character.add(box(2.4, 0.45, 1.5, robeDarkMat, 0, 3.3, 0));
character.add(box(2.6, 0.38, 1.6, robeMat, 0, 2.85, 0));
character.add(box(2.65, 0.1, 1.65, lavenderMat, 0, 2.68, 0));
character.add(box(2.55, 0.06, 1.55, lightLavMat, 0, 2.58, 0));

// Robe center line & fold highlights
character.add(box(0.14, 1.9, 0.08, lavenderMat, 0, 4.15, 0.72));
character.add(box(0.1, 1.35, 0.55, midPurpleMat, -0.85, 4.15, 0));
character.add(box(0.1, 1.35, 0.55, midPurpleMat, 0.85, 4.15, 0));
character.add(box(0.15, 0.5, 0.12, armorShinyMat, -0.95, 3.5, 0.55));
character.add(box(0.15, 0.5, 0.12, armorShinyMat, 0.95, 3.5, 0.55));

// Arms
const leftArm = new THREE.Group();
leftArm.add(box(0.55, 0.75, 0.55, armorShinyMat, -1.3, 5.95, 0));
leftArm.add(box(0.58, 0.1, 0.58, lavenderMat, -1.3, 5.55, 0));
leftArm.add(box(0.5, 0.75, 0.5, midPurpleMat, -1.3, 5.1, 0));
leftArm.add(box(0.54, 0.12, 0.54, lavenderMat, -1.3, 4.68, 0));
leftArm.add(box(0.34, 0.34, 0.3, skinMat, -1.3, 4.38, 0));
character.add(leftArm);

const rightArm = new THREE.Group();
rightArm.add(box(0.55, 0.75, 0.55, armorShinyMat, 1.3, 5.95, 0));
rightArm.add(box(0.58, 0.1, 0.58, lavenderMat, 1.3, 5.55, 0));
rightArm.add(box(0.5, 0.75, 0.5, midPurpleMat, 1.3, 5.1, 0));
rightArm.add(box(0.54, 0.12, 0.54, lavenderMat, 1.3, 4.68, 0));
rightArm.add(box(0.34, 0.34, 0.3, skinMat, 1.3, 4.38, 0));
character.add(rightArm);

// Feet
character.add(box(0.48, 0.28, 0.65, armorDarkMat, -0.4, 2.5, 0.1));
character.add(box(0.48, 0.28, 0.65, armorDarkMat, 0.4, 2.5, 0.1));

// ================================
//  STAFF — Green staff with ORB top
// ================================
const staffGroup = new THREE.Group();

staffGroup.add(box(0.14, 5.2, 0.14, staffDarkMat, 0, 4.5, 0));
for (let i = 0; i < 7; i++) {
  staffGroup.add(box(0.2, 0.08, 0.2, staffMat, 0, 2.3 + i * 0.5, 0));
}

staffGroup.add(box(0.4, 0.3, 0.4, staffDarkMat, 0, 7.15, 0));
staffGroup.add(box(1.0, 0.14, 0.14, staffMat, 0, 7.35, 0));
staffGroup.add(box(0.8, 0.1, 0.12, staffDarkMat, 0, 7.48, 0));

const lProng = box(0.12, 0.4, 0.12, staffMat, -0.38, 7.55, 0);
lProng.rotation.z = 0.2;
staffGroup.add(lProng);
const rProng = box(0.12, 0.4, 0.12, staffMat, 0.38, 7.55, 0);
rProng.rotation.z = -0.2;
staffGroup.add(rProng);

staffGroup.add(box(0.12, 0.35, 0.12, staffMat, 0, 8.0, 0));

// Green orb
staffGroup.add(box(0.45, 0.45, 0.45, gemMat, 0, 7.55, 0));
staffGroup.add(box(0.38, 0.52, 0.38, gemMat, 0, 7.55, 0));
staffGroup.add(box(0.52, 0.38, 0.38, gemMat, 0, 7.55, 0));
staffGroup.add(box(0.38, 0.38, 0.52, gemMat, 0, 7.55, 0));

const orbCoreMat = mat(0x80ffd0, {
  roughness: 0.1,
  metalness: 0.1,
  emissive: 0x80ffd0,
  emissiveIntensity: 0.8,
});
staffGroup.add(box(0.2, 0.2, 0.2, orbCoreMat, 0, 7.55, 0));

staffGroup.position.set(1.6, -1.5, 0.2);
staffGroup.rotation.z = -0.08;
character.add(staffGroup);

// ================================
//  PLATFORM — Purple magical glow
// ================================
const platformGeo = new THREE.CylinderGeometry(2.4, 2.4, 0.08, 32);
const platformMat = new THREE.MeshStandardMaterial({
  color: 0x7b40c9,
  roughness: 0.5,
  metalness: 0.3,
  emissive: new THREE.Color(0x7b40c9),
  emissiveIntensity: 0.2,
  transparent: true,
  opacity: 0.3,
});
const platform = new THREE.Mesh(platformGeo, platformMat);
platform.position.set(0, 2.3, 0);
platform.receiveShadow = true;
character.add(platform);

// Magical particles
const particleGroup = new THREE.Group();
for (let i = 0; i < 10; i++) {
  const angle = (i / 10) * Math.PI * 2;
  const pr = 1.8 + Math.random() * 0.6;
  const px = Math.cos(angle) * pr;
  const pz = Math.sin(angle) * pr;
  const particle = box(0.09, 0.09, 0.09, gemMat, px, 2.5 + Math.random() * 0.6, pz);
  particleGroup.add(particle);
}
character.add(particleGroup);

// Center the character
character.position.set(0, -5.5, 0);
scene.add(character);

// ====== INTERACTION (Drag to rotate) ======
let isDragging = false;
let previousMouseX = 0;
let targetRotationY = 0;
let currentRotationY = 0;
const autoRotateSpeed = 0.004;
let autoRotate = true;

container.addEventListener('pointerdown', (e: PointerEvent) => {
  isDragging = true;
  autoRotate = false;
  previousMouseX = e.clientX;
  container.style.cursor = 'grabbing';
});

window.addEventListener('pointermove', (e: PointerEvent) => {
  if (!isDragging) return;
  const deltaX = e.clientX - previousMouseX;
  targetRotationY += deltaX * 0.008;
  previousMouseX = e.clientX;
});

window.addEventListener('pointerup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
  setTimeout(() => {
    if (!isDragging) autoRotate = true;
  }, 3000);
});

container.addEventListener(
  'touchstart',
  (e: TouchEvent) => {
    isDragging = true;
    autoRotate = false;
    previousMouseX = e.touches[0].clientX;
  },
  { passive: true },
);

container.addEventListener(
  'touchmove',
  (e: TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - previousMouseX;
    targetRotationY += deltaX * 0.008;
    previousMouseX = e.touches[0].clientX;
  },
  { passive: true },
);

container.addEventListener('touchend', () => {
  isDragging = false;
  setTimeout(() => {
    if (!isDragging) autoRotate = true;
  }, 3000);
});

// ====== ANIMATION LOOP ======
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  if (autoRotate) {
    targetRotationY += autoRotateSpeed;
  }

  currentRotationY += (targetRotationY - currentRotationY) * 0.08;
  character.rotation.y = currentRotationY;

  character.position.y = -5.5 + Math.sin(t * 1.2) * 0.12;

  leftArm.rotation.z = Math.sin(t * 0.9) * 0.025;
  rightArm.rotation.z = -Math.sin(t * 0.9) * 0.025;

  gemMat.emissiveIntensity = 0.4 + Math.sin(t * 2.5) * 0.3;
  orbCoreMat.emissiveIntensity = 0.6 + Math.sin(t * 3.0) * 0.4;

  platform.material.emissiveIntensity = 0.15 + Math.sin(t * 1.8) * 0.1;

  particleGroup.children.forEach((p, i) => {
    p.position.y = 2.5 + Math.sin(t * 1.5 + i * 0.7) * 0.4;
    (p as THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>).material.emissiveIntensity =
      0.3 + Math.sin(t * 2 + i) * 0.3;
  });

  renderer.render(scene, camera);
}
animate();
