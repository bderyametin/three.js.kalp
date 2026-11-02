import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * ===================================================================
 * 3D DÖNEN PEMBE KALP (OThreeJS Serisi Standart Yapısı)
 * ===================================================================
 * Bu proje, OThreeJS-main reposundaki mimariye birebir uygun olarak;
 * - Sahne ve Kamera Kurulumu
 * - WebGLRenderer ve OrbitControls
 * - 3 Noktalı Stüdyo Aydınlatması (Ambient, Directional, Spot Rim)
 * - 3D PBR Pembe Kalp Geometrisi ve Materyali
 * - Pürüzsüz Dönüş Animasyonu (animate döngüsü)
 * - Ekran Boyutu Değişimi (Resize)
 * adımlarından oluşur.
 * ===================================================================
 */

// ==========================================
// 1. SAHNE VE ARKA PLAN
// ==========================================
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0b0f19');

// Ekran Boyutları
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// ==========================================
// 2. KAMERA
// ==========================================
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 6.8);
scene.add(camera);

// ==========================================
// 3. İŞLEYİCİ (RENDERER)
// ==========================================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

// ==========================================
// 4. KONTROLLER (OrbitControls)
// ==========================================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3.0;
controls.maxDistance = 16.0;
controls.target.set(0, 0, 0);

// ==========================================
// 5. AYDINLATMA (LIGHTING)
// ==========================================
// A) Ortam Işığı (Ambient Light)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// B) Ana Işık (Directional Key Light)
const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
keyLight.position.set(3, 4, 3);
scene.add(keyLight);

// C) Dolgu Işığı (Hemisphere Light)
const fillLight = new THREE.HemisphereLight(0xffb6c1, 0x111122, 0.85);
scene.add(fillLight);

// D) Arka / Kenar Işığı (Spot Rim Light)
const rimLight = new THREE.SpotLight(0xff3388, 3.5, 12, Math.PI * 0.2, 0.3, 1);
rimLight.position.set(-3, 3, -3);
scene.add(rimLight);

// ==========================================
// 6. 3D PEMBE KALP GEOMETRİSİ VE MATERYALİ
// ==========================================
function createHeartGeometry() {
  const heartShape = new THREE.Shape();
  const x = 0;
  const y = 0;

  // Kalp çentik noktası
  heartShape.moveTo(x, y + 0.35);
  // Sol üst lob
  heartShape.bezierCurveTo(x - 0.1, y + 0.85, x - 0.65, y + 1.35, x - 1.25, y + 1.35);
  heartShape.bezierCurveTo(x - 2.15, y + 1.35, x - 2.15, y + 0.35, x - 2.15, y + 0.35);
  // Sol kenardan alt uca
  heartShape.bezierCurveTo(x - 2.15, y - 0.55, x - 1.25, y - 1.45, x, y - 2.3);
  // Alt uçtan sağ kenara
  heartShape.bezierCurveTo(x + 1.25, y - 1.45, x + 2.15, y - 0.55, x + 2.15, y + 0.35);
  // Sağ üst lob
  heartShape.bezierCurveTo(x + 2.15, y + 0.35, x + 2.15, y + 1.35, x + 1.25, y + 1.35);
  heartShape.bezierCurveTo(x + 0.65, y + 1.35, x + 0.1, y + 0.85, x, y + 0.35);

  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 36,
    steps: 3,
    bevelSize: 0.4,
    bevelThickness: 0.4,
    curveSegments: 96
  };

  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  geometry.center(); // Kalbin tam ağırlık merkezine hizala
  geometry.computeVertexNormals();

  // Boyut ölçekleme (Ekrana tam oturan ideal boyut)
  geometry.scale(0.95, 0.95, 0.95);

  return geometry;
}

// Parlak Pembe PBR Materyal (MeshPhysicalMaterial)
const heartMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff3b82,
  roughness: 0.18,
  metalness: 0.1,
  clearcoat: 0.9,
  clearcoatRoughness: 0.1,
  sheen: 0.8,
  sheenColor: new THREE.Color(0xffb3d1)
});

// Kalp Mesh Nesnesi
const heartMesh = new THREE.Mesh(createHeartGeometry(), heartMaterial);
heartMesh.position.set(0, 0, 0);
scene.add(heartMesh);

// Rim ışığını kalbe yönlendir
rimLight.target = heartMesh;

// ==========================================
// 7. ANİMASYON DÖNGÜSÜ (ANIMATION LOOP)
// ==========================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Kalbin kendi ekseni etrafında pürüzsüz dönüşü
  heartMesh.rotation.y = elapsedTime * 0.5;
  heartMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08;

  // Kamera kontrollerini güncelle
  controls.update();

  // Sahneyi çizdir
  renderer.render(scene, camera);
}

animate();

// ==========================================
// 8. EKRAN BOYUTU DEĞİŞİMİNE UYUM (RESIZE)
// ==========================================
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
