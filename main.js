import * as THREE from 'three';

const lightbox = document.getElementById('realm-lightbox');
if (lightbox) {
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('#realm-lightbox-caption');

  document.querySelectorAll('[data-lightbox-src]').forEach(button => {
    button.addEventListener('click', () => {
      image.src = button.dataset.lightboxSrc;
      image.alt = button.dataset.lightboxAlt;
      caption.textContent = button.dataset.lightboxLabel;
      lightbox.showModal();
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach(button =>
    button.addEventListener('click', () => lightbox.close()));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
}

const canvas = document.getElementById('scene');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
} catch {
  canvas.remove();
  throw new Error('WebGL unavailable — static page still readable');
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(0, 2.2, 17);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const TAU = Math.PI * 2;
const DIMS = innerWidth > 880 ? [16, 13, 12] : [11, 10, 9]; // lattice grid; COUNT derives from it so the lattice always fills exactly
const COUNT = DIMS[0] * DIMS[1] * DIMS[2];

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5);

function scatter() {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    a[i * 3] = gauss() * 4.8;
    a[i * 3 + 1] = gauss() * 3.4;
    a[i * 3 + 2] = gauss() * 3.8;
  }
  return a;
}

function ring() {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = Math.random() * TAU;
    const r = 5.2 + gauss() * 0.6;
    a[i * 3] = Math.cos(t) * r;
    a[i * 3 + 1] = Math.sin(t) * r * 0.92;
    a[i * 3 + 2] = gauss() * 0.8;
  }
  return a;
}

function lattice() {
  const a = new Float32Array(COUNT * 3);
  const [nx, ny, nz] = DIMS, s = 0.55;
  let i = 0;
  for (let x = 0; x < nx; x++)
    for (let y = 0; y < ny; y++)
      for (let z = 0; z < nz; z++) {
        a[i * 3] = (x - (nx - 1) / 2) * s + (Math.random() - 0.5) * 0.06;
        a[i * 3 + 1] = (y - (ny - 1) / 2) * s + (Math.random() - 0.5) * 0.06;
        a[i * 3 + 2] = (z - (nz - 1) / 2) * s + (Math.random() - 0.5) * 0.06;
        i++;
      }
  return a;
}

function icosa() {
  const a = new Float32Array(COUNT * 3);
  const edges = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(5.5, 1));
  const p = edges.getAttribute('position');
  const segs = p.count / 2;
  for (let i = 0; i < COUNT; i++) {
    const s = (i % segs) * 2;
    const t = Math.random();
    a[i * 3] = p.getX(s) + (p.getX(s + 1) - p.getX(s)) * t + (Math.random() - 0.5) * 0.1;
    a[i * 3 + 1] = p.getY(s) + (p.getY(s + 1) - p.getY(s)) * t + (Math.random() - 0.5) * 0.1;
    a[i * 3 + 2] = p.getZ(s) + (p.getZ(s + 1) - p.getZ(s)) * t + (Math.random() - 0.5) * 0.1;
  }
  return a;
}

const formations = [scatter(), ring(), lattice(), icosa()];

const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(formations[0].slice(), 3));
geo.setAttribute('aTo', new THREE.BufferAttribute(formations[0].slice(), 3));
geo.setAttribute('aPreview', new THREE.BufferAttribute(formations[0].slice(), 3));
const rand = new Float32Array(COUNT);
const size = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  rand[i] = Math.random();
  size[i] = 0.9 + Math.random() * 1.5;
}
geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));

const material = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uT: { value: 0 },
    uPreviewT: { value: 0 },
    uTime: { value: 0 },
    uPx: { value: renderer.getPixelRatio() },
    uColor: { value: new THREE.Color('#93a8e8') },
  },
  vertexShader: /* glsl */ `
    attribute vec3 aTo, aPreview;
    attribute float aRand, aSize;
    uniform float uT, uPreviewT, uTime, uPx;
    varying float vA;
    void main() {
      float t = clamp((uT - aRand * 0.35) / 0.65, 0.0, 1.0);
      t = t * t * (3.0 - 2.0 * t);
      vec3 p = mix(position, aTo, t);
      p = mix(p, aPreview, smoothstep(0.0, 1.0, uPreviewT));
      p += 0.07 * vec3(sin(uTime * 0.6 + aRand * 31.0),
                       sin(uTime * 0.5 + aRand * 57.0),
                       sin(uTime * 0.7 + aRand * 73.0));
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = aSize * uPx * (58.0 / -mv.z);
      vA = 0.45 + 0.4 * fract(aRand * 13.7);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    varying float vA;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      gl_FragColor = vec4(uColor, smoothstep(0.5, 0.12, d) * vA);
    }`,
});

const group = new THREE.Group();
group.add(new THREE.Points(geo, material));

// constellation lines for the scatter formation, faded out elsewhere
const linePos = [];
const sc = formations[0];
for (let tries = 0; tries < 30000 && linePos.length < 280 * 6; tries++) {
  const i = (Math.random() * COUNT) | 0, j = (Math.random() * COUNT) | 0;
  const dx = sc[i * 3] - sc[j * 3], dy = sc[i * 3 + 1] - sc[j * 3 + 1], dz = sc[i * 3 + 2] - sc[j * 3 + 2];
  if (i !== j && dx * dx + dy * dy + dz * dz < 1.4)
    linePos.push(sc[i * 3], sc[i * 3 + 1], sc[i * 3 + 2], sc[j * 3], sc[j * 3 + 1], sc[j * 3 + 2]);
}
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePos), 3));
const lineMat = new THREE.LineBasicMaterial({
  color: '#93a8e8', transparent: true, opacity: 0.22,
  blending: THREE.AdditiveBlending, depthWrite: false,
});
const lines = new THREE.LineSegments(lineGeo, lineMat);
group.add(lines);
scene.add(group);

// scroll → formation keyframes
const sections = [...document.querySelectorAll('[data-formation]')];
const previewRows = [...document.querySelectorAll('[data-preview-formation]')];
let keys = [];
function measure() {
  keys = sections.map(el => {
    const r = el.getBoundingClientRect();
    return {
      center: r.top + scrollY + r.height / 2,
      formation: +el.dataset.formation,
      color: new THREE.Color(el.dataset.accent),
    };
  });
}

let segFrom = 0, segTo = 0;
function rebuffer(fi, ti) {
  geo.getAttribute('position').copyArray(formations[fi]);
  geo.getAttribute('aTo').copyArray(formations[ti]);
  geo.getAttribute('position').needsUpdate = true;
  geo.getAttribute('aTo').needsUpdate = true;
}

const colA = new THREE.Color();
const previewColor = new THREE.Color('#93a8e8');
let previewFormation = 0;
let previewTarget = 0;
let previewValue = 0;
function updateScroll() {
  const p = scrollY + innerHeight / 2;
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].center < p) i++;
  const next = keys[Math.min(i + 1, keys.length - 1)];
  const span = next.center - keys[i].center;
  let t = span > 0 ? (p - keys[i].center) / span : 0;
  t = Math.min(Math.max((t - 0.25) / 0.5, 0), 1); // plateau: hold shape while section is centered

  if (keys[i].formation !== segFrom || next.formation !== segTo) {
    segFrom = keys[i].formation;
    segTo = next.formation;
    rebuffer(segFrom, segTo);
  }
  material.uniforms.uT.value = t;
  material.uniforms.uColor.value
    .copy(colA.copy(keys[i].color).lerp(next.color, t))
    .lerp(previewColor, previewValue);

  const scrollW0 = (segFrom === 0 ? 1 - t : 0) + (segTo === 0 ? t : 0);
  const w0 = scrollW0 * (1 - previewValue) + (previewFormation === 0 ? previewValue : 0);
  lineMat.opacity = 0.22 * w0;
  lines.visible = w0 > 0.02;

  return p / Math.max(document.body.scrollHeight, 1);
}

function resize() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  group.position.x = innerWidth > 880 ? 2.8 : 0;
  measure();
}
addEventListener('resize', resize);
document.fonts?.ready.then(measure);
document.querySelectorAll('details').forEach(d => d.addEventListener('toggle', measure));
resize();

if (!reduced) {
  const activatePreview = (row) => {
    previewFormation = Number(row.dataset.previewFormation);
    previewColor.set(row.dataset.previewAccent);
    geo.getAttribute('aPreview').copyArray(formations[previewFormation]);
    geo.getAttribute('aPreview').needsUpdate = true;
    previewTarget = 1;
    canvas.dataset.previewFormation = String(previewFormation);
  };
  const clearPreview = (row) => {
    if (document.activeElement === row || row.matches(':hover')) return;
    previewTarget = 0;
    delete canvas.dataset.previewFormation;
  };

  previewRows.forEach((row) => {
    row.addEventListener('focus', () => activatePreview(row));
    row.addEventListener('blur', () => clearPreview(row));
    if (matchMedia('(hover: hover)').matches) {
      row.addEventListener('pointerenter', () => activatePreview(row));
      row.addEventListener('pointerleave', () => clearPreview(row));
    }
  });
}

const mouse = { x: 0, y: 0 };
if (!reduced) addEventListener('pointermove', e => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = (e.clientY / innerHeight) * 2 - 1;
});

const clock = new THREE.Clock();
function frame() {
  const el = clock.getElapsedTime();
  previewValue += (previewTarget - previewValue) * 0.08;
  if (Math.abs(previewTarget - previewValue) < 0.001) previewValue = previewTarget;
  material.uniforms.uPreviewT.value = previewValue;
  const globalT = updateScroll();
  if (!reduced) material.uniforms.uTime.value = el;
  group.rotation.y = globalT * 1.4 + (reduced ? 0.3 : el * 0.03);
  camera.position.x += (mouse.x * 1.1 - camera.position.x) * 0.04;
  camera.position.y += (2.2 - mouse.y * 1.1 - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

if (reduced) {
  // no continuous loop: single frames on scroll/resize keep formations scroll-driven
  let queued = false;
  const renderOnce = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; frame(); });
  };
  addEventListener('scroll', renderOnce, { passive: true });
  addEventListener('resize', renderOnce);
  document.fonts?.ready.then(renderOnce);
  frame();
} else {
  renderer.setAnimationLoop(frame);
  document.addEventListener('visibilitychange', () => {
    renderer.setAnimationLoop(document.hidden ? null : frame);
  });
}
