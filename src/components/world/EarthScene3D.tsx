import { useEffect, useRef } from "react";
import * as THREE from "three";

interface EarthScene3DProps {
  onMarkerClick?: (marker: { id: string; label: string; description: string }) => void;
}

const MARKERS = [
  {
    id: "ideas",
    label: "Ideas",
    sublabel: "Start here",
    description: "Every data product begins with a clear problem statement.",
    phi: Math.PI * 0.28,
    theta: Math.PI * 0.15,
    color: 0xfbbf24,
  },
  {
    id: "data",
    label: "Data",
    sublabel: "Raw to structured",
    description: "DigiPath ingests raw admission cutoff PDFs and normalizes them into structured records.",
    phi: Math.PI * 0.45,
    theta: Math.PI * 0.55,
    color: 0x6366f1,
  },
  {
    id: "aiml",
    label: "AI/ML",
    sublabel: "Models & insights",
    description: "Machine learning and NLP pipelines power DigiPath predictions and Kosh's Marathi text transformation.",
    phi: Math.PI * 0.65,
    theta: Math.PI * 1.2,
    color: 0xa78bfa,
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "Build & deploy",
    description: "From ForensiQ forensic pipelines to Python API layers — building reliable systems that work under pressure.",
    phi: Math.PI * 0.35,
    theta: Math.PI * 0.9,
    color: 0x34d399,
  },
  {
    id: "impact",
    label: "Impact",
    sublabel: "Real world value",
    description: "Turning unstandardized data into dependable decisions. DATA → TRANSFORMATION → INTELLIGENCE.",
    phi: Math.PI * 0.72,
    theta: Math.PI * 0.4,
    color: 0xf97316,
  },
];

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function EarthScene3D({ onMarkerClick }: EarthScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    earth: THREE.Mesh;
    moon: THREE.Mesh;
    moonPivot: THREE.Object3D;
    markerMeshes: THREE.Mesh[];
    markerLabels: HTMLDivElement[];
    animId: number;
    isDragging: boolean;
    prevMouse: { x: number; y: number };
    rotationVelocity: { x: number; y: number };
    targetZoom: number;
    earthGroup: THREE.Group;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (!isWebGLAvailable()) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 3.2);
    let targetZoom = 3.2;

    // ── Lighting ──────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x112244, 0.6);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xfff8e0, 1.6);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);
    const rimLight = new THREE.DirectionalLight(0x4488cc, 0.25);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // ── Starfield ─────────────────────────────────────────────────────────────
    const starsCount = 2000;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 160;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Earth Group (for rotation) ─────────────────────────────────────────────
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Earth sphere — procedural landmass shading via canvas texture
    const texSize = 512;
    const earthCanvas = document.createElement("canvas");
    earthCanvas.width = texSize;
    earthCanvas.height = texSize / 2;
    const ctx2d = earthCanvas.getContext("2d")!;

    // Deep ocean base
    const oceanGrad = ctx2d.createLinearGradient(0, 0, 0, texSize / 2);
    oceanGrad.addColorStop(0, "#0a1628");
    oceanGrad.addColorStop(0.5, "#0d2040");
    oceanGrad.addColorStop(1, "#091525");
    ctx2d.fillStyle = oceanGrad;
    ctx2d.fillRect(0, 0, texSize, texSize / 2);

    // Procedural continent blobs
    const continentSeeds = [
      { x: 0.18, y: 0.35, rx: 0.12, ry: 0.18, rotation: -0.3 },
      { x: 0.38, y: 0.3, rx: 0.08, ry: 0.14, rotation: 0.2 },
      { x: 0.55, y: 0.4, rx: 0.18, ry: 0.22, rotation: 0.1 },
      { x: 0.73, y: 0.35, rx: 0.07, ry: 0.12, rotation: -0.1 },
      { x: 0.85, y: 0.45, rx: 0.06, ry: 0.08, rotation: 0.4 },
      { x: 0.62, y: 0.62, rx: 0.07, ry: 0.12, rotation: -0.2 },
      { x: 0.45, y: 0.65, rx: 0.09, ry: 0.06, rotation: 0.3 },
      { x: 0.25, y: 0.55, rx: 0.06, ry: 0.09, rotation: -0.4 },
    ];
    for (const s of continentSeeds) {
      ctx2d.save();
      ctx2d.translate(s.x * texSize, s.y * (texSize / 2));
      ctx2d.rotate(s.rotation);
      const g = ctx2d.createRadialGradient(0, 0, 0, 0, 0, s.rx * texSize);
      g.addColorStop(0, "rgba(34, 85, 40, 0.95)");
      g.addColorStop(0.5, "rgba(28, 68, 34, 0.85)");
      g.addColorStop(1, "rgba(18, 50, 24, 0)");
      ctx2d.fillStyle = g;
      ctx2d.beginPath();
      ctx2d.ellipse(0, 0, s.rx * texSize, s.ry * (texSize / 2), 0, 0, Math.PI * 2);
      ctx2d.fill();
      ctx2d.restore();
    }
    // Polar ice caps
    ctx2d.fillStyle = "rgba(200, 225, 255, 0.5)";
    ctx2d.beginPath();
    ctx2d.ellipse(texSize / 2, 5, texSize * 0.4, 12, 0, 0, Math.PI * 2);
    ctx2d.fill();
    ctx2d.beginPath();
    ctx2d.ellipse(texSize / 2, texSize / 2 - 5, texSize * 0.35, 10, 0, 0, Math.PI * 2);
    ctx2d.fill();

    const earthTex = new THREE.CanvasTexture(earthCanvas);
    const earthGeo = new THREE.SphereGeometry(1, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTex,
      specular: new THREE.Color(0x112244),
      shininess: 12,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earth);

    // Atmosphere halo
    const atmoGeo = new THREE.SphereGeometry(1.06, 64, 64);
    const atmoMat = new THREE.MeshPhongMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
    });
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Outer glow ring
    const glowGeo = new THREE.SphereGeometry(1.12, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x223366,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    });
    earthGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // ── Moon ──────────────────────────────────────────────────────────────────
    const moonPivot = new THREE.Object3D();
    scene.add(moonPivot);
    moonPivot.rotation.x = 0.15;

    // Moon orbit ring (dashed-look via torus)
    const orbitGeo = new THREE.TorusGeometry(2.1, 0.004, 6, 120);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x334466,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 2;
    moonPivot.add(orbitRing);

    // Moon sphere (grey, cratered via bump-like texture)
    const moonCanv = document.createElement("canvas");
    moonCanv.width = 256;
    moonCanv.height = 256;
    const mc = moonCanv.getContext("2d")!;
    const moonGrad = mc.createRadialGradient(128, 128, 0, 128, 128, 128);
    moonGrad.addColorStop(0, "#c8c8d4");
    moonGrad.addColorStop(0.6, "#a8a8b8");
    moonGrad.addColorStop(1, "#606070");
    mc.fillStyle = moonGrad;
    mc.fillRect(0, 0, 256, 256);
    // Craters
    for (let i = 0; i < 18; i++) {
      const cx = Math.random() * 256;
      const cy = Math.random() * 256;
      const cr = 2 + Math.random() * 10;
      mc.beginPath();
      mc.arc(cx, cy, cr, 0, Math.PI * 2);
      mc.fillStyle = `rgba(80,80,90,${0.2 + Math.random() * 0.3})`;
      mc.fill();
    }
    const moonTex = new THREE.CanvasTexture(moonCanv);
    const moonGeo = new THREE.SphereGeometry(0.22, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({
      map: moonTex,
      shininess: 5,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(2.1, 0, 0);
    moonPivot.add(moon);

    // ── Orbit path dots (data connections) ───────────────────────────────────
    const dotCount = 60;
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const angle = (i / dotCount) * Math.PI * 2;
      dotPositions[i * 3] = Math.cos(angle) * 2.1;
      dotPositions[i * 3 + 1] = 0;
      dotPositions[i * 3 + 2] = Math.sin(angle) * 2.1;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x334488,
      size: 0.03,
      sizeAttenuation: true,
    });
    moonPivot.add(new THREE.Points(dotGeo, dotMat));

    // ── 3D Markers on Earth surface ──────────────────────────────────────────
    const markerMeshes: THREE.Mesh[] = [];
    const markerLabelEls: HTMLDivElement[] = [];

    for (const m of MARKERS) {
      const sph = new THREE.SphereGeometry(0.035, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: m.color });
      const mesh = new THREE.Mesh(sph, mat);

      // Convert spherical to cartesian on unit sphere
      const x = Math.sin(m.phi) * Math.cos(m.theta);
      const y = Math.cos(m.phi);
      const z = Math.sin(m.phi) * Math.sin(m.theta);
      mesh.position.set(x, y, z);
      mesh.userData = m;
      earthGroup.add(mesh);
      markerMeshes.push(mesh);

      // Pulsing ring around marker
      const ringGeo = new THREE.TorusGeometry(0.06, 0.008, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.color,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(mesh.position);
      ring.lookAt(0, 0, 0);
      ring.rotateX(Math.PI / 2);
      ring.userData = { ...m, isRing: true, baseOpacity: 0.5 };
      earthGroup.add(ring);

      // HTML label overlay
      const label = document.createElement("div");
      label.className = "marker-label";
      label.innerHTML = `<span class="marker-label-text">${m.label}</span><span class="marker-label-sub">${m.sublabel}</span>`;
      label.style.cssText = `
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
        background: rgba(10,12,25,0.82);
        border: 1px solid ${`#${m.color.toString(16).padStart(6, "0")}`};
        border-radius: 8px;
        padding: 4px 9px;
        font-size: 11px;
        font-family: 'JetBrains Mono', monospace;
        color: #e8e8f0;
        display: flex;
        flex-direction: column;
        gap: 1px;
        white-space: nowrap;
        transform: translate(-50%, -120%);
        transition: opacity 0.2s ease, transform 0.2s ease;
        z-index: 20;
        backdrop-filter: blur(6px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      `;
      (label.querySelector(".marker-label-text") as HTMLElement).style.cssText =
        `font-weight: 600; color: #${m.color.toString(16).padStart(6, "0")}; font-size: 11px;`;
      (label.querySelector(".marker-label-sub") as HTMLElement).style.cssText =
        `color: #a1a1aa; font-size: 9px;`;
      label.addEventListener("click", () => {
        onMarkerClick?.({
          id: m.id,
          label: m.label,
          description: m.description,
        });
      });
      mount.appendChild(label);
      markerLabelEls.push(label);
    }

    // ── Interaction State ─────────────────────────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVel = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
      rotVel = { x: 0, y: 0 };
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        rotVel = { x: 0, y: 0 };
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rotVel.y = dx * 0.008;
        rotVel.x = dy * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        rotVel.y = dx * 0.008;
        rotVel.x = dy * 0.008;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onMouseUp = () => { isDragging = false; };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom = Math.max(2.2, Math.min(4.5, targetZoom + e.deltaY * 0.004));
    };

    const onClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markerMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        onMarkerClick?.({
          id: hit.userData.id,
          label: hit.userData.label,
          description: hit.userData.description,
        });
      }
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mouseleave", onMouseUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    renderer.domElement.addEventListener("touchmove", onTouchMove, { passive: true });
    renderer.domElement.addEventListener("touchend", onMouseUp);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── IntersectionObserver — pause when not visible ─────────────────────────
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let t = 0;
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!visible) return;

      t += 0.005;

      if (!prefersReduced) {
        // Auto-rotate earth slowly when not dragging
        if (!isDragging) {
          earthGroup.rotation.y += 0.0015;
          rotVel.x *= 0.92;
          rotVel.y *= 0.92;
        } else {
          earthGroup.rotation.x += rotVel.x;
          earthGroup.rotation.y += rotVel.y;
        }

        // Moon orbit
        moonPivot.rotation.y += 0.003;

        // Stars slow drift
        stars.rotation.y -= 0.0001;

        // Smooth zoom
        camera.position.z += (targetZoom - camera.position.z) * 0.06;
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, 2.2, 4.5);
      }

      // Project marker positions to screen for HTML labels
      const w2 = mount.clientWidth / 2;
      const h2 = mount.clientHeight / 2;
      markerMeshes.forEach((mesh, i) => {
        const worldPos = mesh.getWorldPosition(new THREE.Vector3());
        const projected = worldPos.clone().project(camera);
        const screenX = (projected.x + 1) * w2;
        const screenY = (-projected.y + 1) * h2;

        // Check if marker is on the visible side (positive z after projection)
        const isFront = projected.z < 1 && worldPos.dot(camera.position.clone().normalize()) > 0;

        const label = markerLabelEls[i];
        label.style.left = `${screenX}px`;
        label.style.top = `${screenY}px`;
        label.style.opacity = isFront ? "1" : "0";
        label.style.pointerEvents = isFront ? "auto" : "none";
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Store refs for cleanup ─────────────────────────────────────────────────
    sceneRef.current = {
      renderer,
      scene,
      camera,
      earth,
      moon,
      moonPivot,
      markerMeshes,
      markerLabels: markerLabelEls,
      animId,
      isDragging: false,
      prevMouse,
      rotationVelocity: rotVel,
      targetZoom,
      earthGroup,
    };

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("mouseleave", onMouseUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("resize", onResize);

      // Remove HTML labels
      markerLabelEls.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });

      // Dispose Three.js resources
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      earthTex.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      moonTex.dispose();
      starGeo.dispose();
      starMat.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const webglAvailable = isWebGLAvailable();

  return (
    <div ref={mountRef} className="relative w-full h-full" style={{ minHeight: 400 }}>
      {!webglAvailable && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-950 rounded-2xl border border-zinc-800">
          <div className="text-4xl">🌍</div>
          <p className="text-sm text-zinc-400 font-mono-code text-center px-4">
            WebGL is not available in this environment.
            <br />
            Enable hardware acceleration to see the 3D Earth.
          </p>
        </div>
      )}
      {/* Interaction hint overlay */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full text-[10px] font-mono-code text-zinc-400 select-none pointer-events-none"
        style={{ background: "rgba(9,10,15,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        Drag to rotate · Scroll to zoom · Click markers
      </div>
    </div>
  );
}
