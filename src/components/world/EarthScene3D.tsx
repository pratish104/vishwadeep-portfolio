import { useEffect, useRef } from "react";
import * as THREE from "three";

interface EarthScene3DProps {
  onMarkerClick?: (marker: { id: string; label: string; description: string }) => void;
}

export const DATA_MARKERS = [
  {
    id: "ideas",
    label: "Ideas",
    sublabel: "Start here",
    description: "Every data product begins with identifying high-value problems and unstandardized domain records.",
    color: "#f59e0b", // amber
    icon: "💡",
    pos: [0.95, 0.72, 0.45],
  },
  {
    id: "data",
    label: "Data",
    sublabel: "Raw to structured",
    description: "Ingesting, normalizing, and cleaning complex tabular data and multi-year cutoff PDFs.",
    color: "#6366f1", // indigo
    icon: "📊",
    pos: [-0.95, 0.48, 0.65],
  },
  {
    id: "aiml",
    label: "AI/ML",
    sublabel: "Models & insights",
    description: "Machine learning prediction algorithms, Marathi NLP transformation, and statistical modeling.",
    color: "#a855f7", // purple
    icon: "🧠",
    pos: [0.75, 0.05, 0.85],
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "Build & deploy",
    description: "Full-stack APIs, forensic pipeline tooling, and robust production-ready systems.",
    color: "#3b82f6", // blue
    icon: "⚙️",
    pos: [-0.35, -0.65, 0.85],
  },
  {
    id: "impact",
    label: "Impact",
    sublabel: "Real world value",
    description: "Empowering students with admission intelligence and businesses with profitability insights.",
    color: "#10b981", // emerald
    icon: "🌱",
    pos: [0.65, -0.55, 0.6],
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

/** Generates a high-resolution 2048x1024 realistic Earth texture */
function generateEarthTexture(): THREE.CanvasTexture {
  const W = 2048;
  const H = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // 1. Deep Ocean Gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0, "#061022");
  oceanGrad.addColorStop(0.2, "#0b2044");
  oceanGrad.addColorStop(0.5, "#0e2954");
  oceanGrad.addColorStop(0.8, "#0b2044");
  oceanGrad.addColorStop(1, "#050e1f");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Continental Landmasses (Detailed Geographic Approximations)
  ctx.save();

  const drawLand = (
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rot: number,
    color1 = "#1e4e2a",
    color2 = "#14361c"
  ) => {
    ctx.save();
    ctx.translate(cx * W, cy * H);
    ctx.rotate(rot);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * W);
    grad.addColorStop(0, color1);
    grad.addColorStop(0.7, color2);
    grad.addColorStop(1, "rgba(8, 25, 45, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * W, ry * H, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // North America
  drawLand(0.22, 0.32, 0.14, 0.16, -0.2, "#2b5e36", "#1c4024");
  drawLand(0.18, 0.22, 0.1, 0.08, 0.1, "#386b44", "#204629"); // Canada/Alaska
  drawLand(0.26, 0.42, 0.06, 0.09, 0.3, "#426e38", "#244220"); // Mexico/Central

  // South America
  drawLand(0.32, 0.65, 0.09, 0.18, 0.15, "#1f562b", "#143b1c");
  drawLand(0.35, 0.58, 0.08, 0.1, -0.2, "#286b36", "#164421"); // Amazon basin

  // Eurasia (Europe & Asia)
  drawLand(0.52, 0.28, 0.12, 0.11, 0, "#32623a", "#1d3d23"); // Europe
  drawLand(0.68, 0.3, 0.22, 0.16, 0.1, "#36683e", "#204526"); // Russia/Siberia
  drawLand(0.72, 0.42, 0.14, 0.12, -0.1, "#3d7345", "#244d2b"); // East Asia/China
  drawLand(0.64, 0.48, 0.08, 0.1, 0.15, "#487a42", "#284d26"); // India / South Asia
  drawLand(0.56, 0.42, 0.09, 0.08, -0.1, "#665836", "#44381e"); // Middle East (Desert)

  // Africa
  drawLand(0.52, 0.48, 0.09, 0.07, 0, "#6e603c", "#473c22"); // Sahara Desert
  drawLand(0.54, 0.62, 0.1, 0.15, 0.05, "#275c32", "#183e20"); // Central & South Africa

  // Australia
  drawLand(0.84, 0.7, 0.09, 0.09, -0.1, "#5e5238", "#38301c");

  // Polar Ice Caps
  const iceGradNorth = ctx.createLinearGradient(0, 0, 0, H * 0.12);
  iceGradNorth.addColorStop(0, "rgba(220, 240, 255, 0.95)");
  iceGradNorth.addColorStop(1, "rgba(220, 240, 255, 0)");
  ctx.fillStyle = iceGradNorth;
  ctx.fillRect(0, 0, W, H * 0.12);

  const iceGradSouth = ctx.createLinearGradient(0, H * 0.88, 0, H);
  iceGradSouth.addColorStop(0, "rgba(220, 240, 255, 0)");
  iceGradSouth.addColorStop(1, "rgba(220, 240, 255, 0.95)");
  ctx.fillStyle = iceGradSouth;
  ctx.fillRect(0, H * 0.88, W, H * 0.12);

  // 3. City Lights Shimmer on Land
  ctx.fillStyle = "rgba(255, 235, 170, 0.85)";
  const cityDots = [
    [0.2, 0.32], [0.24, 0.3], [0.26, 0.34], [0.5, 0.26], [0.53, 0.29],
    [0.72, 0.4], [0.75, 0.45], [0.64, 0.46], [0.63, 0.5], [0.83, 0.68],
  ];
  for (const [cx, cy] of cityDots) {
    for (let i = 0; i < 15; i++) {
      const rx = (cx + (Math.random() - 0.5) * 0.06) * W;
      const ry = (cy + (Math.random() - 0.5) * 0.06) * H;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/** Generates realistic procedural cloud texture */
function generateCloudTexture(): THREE.CanvasTexture {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  // Swirling cloud bands
  for (let i = 0; i < 80; i++) {
    const cx = Math.random() * W;
    const cy = Math.random() * H;
    const rw = 40 + Math.random() * 120;
    const rh = 15 + Math.random() * 40;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rw);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.6)");
    grad.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rw, rh, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

export function EarthScene3D({ onMarkerClick }: EarthScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeMarkerRef = useRef<string | null>(null);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mount = mountRef.current;
    let W = mount.clientWidth;
    let H = mount.clientHeight;

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000);
    camera.position.set(0, 0.1, 3.4);
    let targetZoom = 3.4;

    // ── Starfield & Cosmic Dust ───────────────────────────────────────────────
    const starsCount = 1800;
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 140;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 140;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 140;
      const isCyan = Math.random() > 0.7;
      const isWarm = Math.random() > 0.85;
      starColors[i * 3] = isWarm ? 1.0 : isCyan ? 0.7 : 0.9;
      starColors[i * 3 + 1] = isWarm ? 0.85 : isCyan ? 0.9 : 0.95;
      starColors[i * 3 + 2] = isWarm ? 0.7 : isCyan ? 1.0 : 1.0;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.14,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // ── Lighting ─────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0c152a, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ea, 2.0);
    sunLight.position.set(6, 3, 5);
    scene.add(sunLight);

    const blueBackLight = new THREE.DirectionalLight(0x3877ff, 0.6);
    blueBackLight.position.set(-5, -2, -4);
    scene.add(blueBackLight);

    // ── Earth System ──────────────────────────────────────────────────────────
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // 1. Solid Earth Sphere
    const earthTexture = generateEarthTexture();
    const earthGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 18,
      specular: new THREE.Color(0x193b70),
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // 2. Cloud Layer
    const cloudTexture = generateCloudTexture();
    const cloudGeo = new THREE.SphereGeometry(1.018, 48, 48);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    // 3. Atmosphere Halo
    const atmoGeo = new THREE.SphereGeometry(1.07, 48, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x4da3ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat));

    // 4. Outer Soft Glow
    const glowGeo = new THREE.SphereGeometry(1.16, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    earthGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // ── Moon & Orbital Path ───────────────────────────────────────────────────
    const moonOrbitGroup = new THREE.Group();
    scene.add(moonOrbitGroup);
    moonOrbitGroup.rotation.x = 0.28;
    moonOrbitGroup.rotation.z = -0.15;

    // Elliptical Orbit Ring
    const orbitRadius = 2.2;
    const orbitPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const theta = (i / 100) * Math.PI * 2;
      orbitPoints.push(
        new THREE.Vector3(Math.cos(theta) * orbitRadius, 0, Math.sin(theta) * (orbitRadius * 0.95))
      );
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.25,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    moonOrbitGroup.add(orbitLine);

    // Moon Mesh
    const moonGeo = new THREE.SphereGeometry(0.22, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({
      color: 0xd4d4dc,
      shininess: 4,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(orbitRadius, 0, 0);
    moonOrbitGroup.add(moonMesh);

    // ── Interactive 3D HUD Markers ───────────────────────────────────────────
    const markerMeshes: THREE.Mesh[] = [];
    const markerDomLabels: HTMLDivElement[] = [];

    DATA_MARKERS.forEach((m) => {
      // Pin Sphere
      const pinGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: m.color });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(m.pos[0], m.pos[1], m.pos[2]);
      pinMesh.userData = m;
      earthGroup.add(pinMesh);
      markerMeshes.push(pinMesh);

      // Glowing Aura Ring
      const ringGeo = new THREE.RingGeometry(0.06, 0.08, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pinMesh.position);
      ringMesh.lookAt(0, 0, 0);
      earthGroup.add(ringMesh);

      // Interactive HTML Glass HUD Card Overlay
      const hudEl = document.createElement("div");
      hudEl.className = "marker-hud-card";
      hudEl.innerHTML = `
        <div class="hud-inner">
          <div class="hud-header">
            <span class="hud-dot" style="background:${m.color}"></span>
            <span class="hud-label" style="color:${m.color}">${m.label}</span>
          </div>
          <span class="hud-sub">${m.sublabel}</span>
        </div>
      `;
      hudEl.style.cssText = `
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
        background: rgba(13, 17, 30, 0.85);
        border: 1px solid ${m.color}66;
        border-radius: 12px;
        padding: 6px 12px;
        font-family: 'JetBrains Mono', monospace;
        color: #f1f5f9;
        display: flex;
        flex-direction: column;
        gap: 2px;
        white-space: nowrap;
        transform: translate(-50%, -130%);
        backdrop-filter: blur(12px);
        box-shadow: 0 8px 24px -4px rgba(0,0,0,0.6), 0 0 16px -2px ${m.color}44;
        transition: transform 0.15s ease, opacity 0.2s ease, border-color 0.2s ease;
        z-index: 25;
        user-select: none;
      `;

      const hudHeader = hudEl.querySelector(".hud-header") as HTMLElement;
      hudHeader.style.cssText = `display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: 11px;`;

      const hudDot = hudEl.querySelector(".hud-dot") as HTMLElement;
      hudDot.style.cssText = `width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 8px ${m.color};`;

      const hudSub = hudEl.querySelector(".hud-sub") as HTMLElement;
      hudSub.style.cssText = `font-size: 9px; color: #94a3b8;`;

      hudEl.addEventListener("mouseenter", () => {
        hudEl.style.transform = "translate(-50%, -135%) scale(1.05)";
        hudEl.style.borderColor = m.color;
      });
      hudEl.addEventListener("mouseleave", () => {
        hudEl.style.transform = "translate(-50%, -130%) scale(1)";
        hudEl.style.borderColor = `${m.color}66`;
      });
      hudEl.addEventListener("click", () => {
        activeMarkerRef.current = m.id;
        onMarkerClick?.({
          id: m.id,
          label: m.label,
          description: m.description,
        });
      });

      mount.appendChild(hudEl);
      markerDomLabels.push(hudEl);
    });

    // ── Mouse Drag & Momentum Interaction ─────────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotVel = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2();

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
        rotVel.y = dx * 0.006;
        rotVel.x = dy * 0.006;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        rotVel.y = dx * 0.006;
        rotVel.x = dy * 0.006;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom = Math.max(2.4, Math.min(4.8, targetZoom + e.deltaY * 0.003));
    };

    const onClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseNorm, camera);
      const hits = raycaster.intersectObjects(markerMeshes, false);
      if (hits.length > 0) {
        const data = hits[0].object.userData;
        onMarkerClick?.({
          id: data.id,
          label: data.label,
          description: data.description,
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

    // ── Window Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ── Visibility Auto-Pause ─────────────────────────────────────────────────
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let animId = 0;
    let moonAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!prefersReduced) {
        // Earth Rotation
        if (!isDragging) {
          earthGroup.rotation.y += 0.0018;
          rotVel.x *= 0.93;
          rotVel.y *= 0.93;
        } else {
          earthGroup.rotation.x += rotVel.x;
          earthGroup.rotation.y += rotVel.y;
        }

        // Differential Cloud Drift
        cloudMesh.rotation.y += 0.0006;

        // Moon Orbiting
        moonAngle += 0.0035;
        moonMesh.position.x = Math.cos(moonAngle) * orbitRadius;
        moonMesh.position.z = Math.sin(moonAngle) * (orbitRadius * 0.95);

        // Smooth Zooming
        camera.position.z += (targetZoom - camera.position.z) * 0.08;
      }

      // Sync 3D Marker coordinates with DOM Labels
      const halfW = mount.clientWidth / 2;
      const halfH = mount.clientHeight / 2;

      markerMeshes.forEach((mesh, idx) => {
        const worldPos = mesh.getWorldPosition(new THREE.Vector3());
        const projected = worldPos.clone().project(camera);
        const screenX = (projected.x + 1) * halfW;
        const screenY = (-projected.y + 1) * halfH;

        // Only show label when facing camera
        const isFacing = worldPos.dot(camera.position.clone().normalize()) > -0.1 && projected.z < 1;
        const domLabel = markerDomLabels[idx];

        domLabel.style.left = `${screenX}px`;
        domLabel.style.top = `${screenY}px`;
        domLabel.style.opacity = isFacing ? "1" : "0";
        domLabel.style.pointerEvents = isFacing ? "auto" : "none";
      });

      renderer.render(scene, camera);
    };
    animate();

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

      markerDomLabels.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });

      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      cloudTexture.dispose();
      starGeo.dispose();
      starMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [onMarkerClick]);

  return (
    <div ref={mountRef} className="relative w-full h-full" style={{ minHeight: 480 }}>
      {/* Interaction Help Badge matching reference */}
      <div
        className="absolute bottom-4 right-4 z-20 hidden sm:flex flex-col gap-1 p-3 rounded-2xl border text-xs font-mono-code text-zinc-300 max-w-xs backdrop-blur-xl pointer-events-none"
        style={{
          background: "rgba(13, 17, 30, 0.8)",
          borderColor: "rgba(59, 130, 246, 0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center gap-2 text-indigo-300 font-bold">
          <span>🎮</span>
          <span>Interactive Celestial World</span>
        </div>
        <ul className="text-[10px] text-zinc-400 space-y-0.5 mt-0.5 list-disc list-inside">
          <li>Drag Earth to rotate freely</li>
          <li>Scroll to zoom in / out</li>
          <li>Click glowing markers to inspect pipelines</li>
        </ul>
      </div>
    </div>
  );
}
