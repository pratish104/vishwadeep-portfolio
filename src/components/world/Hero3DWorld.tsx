import { useEffect, useRef } from "react";
import * as THREE from "three";

export const DATA_MARKERS = [
  {
    id: "ideas",
    label: "Ideas",
    sublabel: "Start here",
    description: "Every data product begins with identifying high-value problems and unstandardized domain records.",
    color: "#f59e0b", // amber
    icon: "💡",
  },
  {
    id: "data",
    label: "Data",
    sublabel: "Raw to structured",
    description: "Ingesting, normalizing, and cleaning complex tabular data and multi-year cutoff records.",
    color: "#2563eb", // blue
    icon: "📊",
  },
  {
    id: "aiml",
    label: "AI/ML",
    sublabel: "Models & insights",
    description: "Machine learning prediction algorithms, Marathi NLP transformation, and statistical modeling.",
    color: "#7c3aed", // violet
    icon: "❄️",
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "Build & deploy",
    description: "Full-stack APIs, forensic pipeline tooling, and robust production-ready systems.",
    color: "#3b82f6", // blue
    icon: "⚙️",
  },
  {
    id: "impact",
    label: "Impact",
    sublabel: "Real world value",
    description: "Empowering students with admission intelligence and businesses with profitability insights.",
    color: "#16a34a", // green
    icon: "🌱",
  },
];

interface Hero3DWorldProps {
  onMarkerClick?: (marker: { id: string; label: string; description: string }) => void;
}

export function Hero3DWorld({ onMarkerClick }: Hero3DWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.clientWidth || 640;
    let H = mount.clientHeight || 560;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Scene, Camera, Renderer ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 1000);
    camera.position.set(0, 0.15, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    mount.appendChild(renderer.domElement);

    // ── 2. Lighting — editorial warm daylight ────────────────────────────
    const ambLight = new THREE.AmbientLight(0xe8f4fd, 2.4);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfff8e7, 4.0);
    sunLight.position.set(6, 8, 6);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 2.5);
    rimLight.position.set(-5, 2, -3);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0xd1fae5, 1.2);
    bottomFill.position.set(0, -6, 3);
    scene.add(bottomFill);

    // ── 3. Central Data Intelligence Sphere ─────────────────────────────
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Outer glass shell — large, translucent, premium
    const shellGeo = new THREE.SphereGeometry(1.72, 64, 48);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f8ff,
      transmission: 0.82,
      opacity: 0.88,
      transparent: true,
      roughness: 0.02,
      metalness: 0.05,
      ior: 1.45,
      thickness: 0.6,
      specularIntensity: 1.2,
      specularColor: 0xffffff,
      envMapIntensity: 1.0,
      side: THREE.FrontSide,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    worldGroup.add(shellMesh);

    // Inner core sphere — glowing data core
    const coreGeo = new THREE.SphereGeometry(1.06, 40, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      emissive: 0x2563eb,
      emissiveIntensity: 0.22,
      roughness: 0.6,
      metalness: 0.12,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    worldGroup.add(coreMesh);

    // ── 4. Neural Network Mesh inside sphere ─────────────────────────────
    const nodeCount = 28;
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 1.12;
      nodePositions.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }

    nodePositions.forEach((pos) => {
      const dotGeo = new THREE.SphereGeometry(0.036, 10, 10);
      const dotMat = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x60a5fa,
        emissiveIntensity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      worldGroup.add(dot);
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
    });
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 0.82) {
          const edgeGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          worldGroup.add(new THREE.Line(edgeGeo, edgeMat));
        }
      }
    }

    // ── 5. Three Orbiting Satellite Nodes (on 3 tilted rings) ──────────
    const makeRing = (radius: number, color: number, tiltX: number, tiltY: number) => {
      const rGeo = new THREE.TorusGeometry(radius, 0.012, 10, 72);
      const rMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.28,
      });
      const r = new THREE.Mesh(rGeo, rMat);
      r.rotation.x = tiltX;
      r.rotation.y = tiltY;
      scene.add(r);
      return r;
    };

    makeRing(2.25, 0x3b82f6, Math.PI * 0.38, Math.PI * 0.08);
    makeRing(2.65, 0x10b981, Math.PI * 0.55, -Math.PI * 0.2);
    makeRing(2.95, 0x8b5cf6, Math.PI * 0.22, Math.PI * 0.35);

    const makeSat = (color: number, emissive: number, size: number) => {
      const sGeo = new THREE.SphereGeometry(size, 18, 18);
      const sMat = new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: 1.8,
        roughness: 0.2,
        metalness: 0.4,
      });
      const s = new THREE.Mesh(sGeo, sMat);
      scene.add(s);
      return s;
    };

    const sat1 = makeSat(0x2563eb, 0x3b82f6, 0.085);
    const sat2 = makeSat(0x059669, 0x10b981, 0.072);
    const sat3 = makeSat(0x7c3aed, 0x8b5cf6, 0.065);

    const makeTrail = (color: number) => {
      const geo = new THREE.TorusGeometry(0.05, 0.008, 6, 12);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5,
      });
      const m = new THREE.Mesh(geo, mat);
      scene.add(m);
      return m;
    };
    const trail1 = makeTrail(0x60a5fa);
    const trail2 = makeTrail(0x34d399);
    const trail3 = makeTrail(0xa78bfa);

    // ── 6. Ambient Hex Data Particles ──────────────────────────────────
    const hexParticles: { mesh: THREE.Mesh; speed: number; offset: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const hGeo = new THREE.OctahedronGeometry(0.045 + Math.random() * 0.04, 0);
      const hMat = new THREE.MeshStandardMaterial({
        color: [0x60a5fa, 0x34d399, 0xa78bfa, 0xfbbf24][i % 4],
        emissive: [0x3b82f6, 0x10b981, 0x8b5cf6, 0xf59e0b][i % 4],
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.7,
      });
      const hMesh = new THREE.Mesh(hGeo, hMat);
      const theta = (i / 12) * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.0 + Math.random() * 1.4;
      hMesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      scene.add(hMesh);
      hexParticles.push({ mesh: hMesh, speed: 0.3 + Math.random() * 0.5, offset: i * 0.52 });
    }

    // ── 7. Interaction: Drag + Parallax ──────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const targetRot = { x: 0.06, y: 0.18 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        worldGroup.rotation.y += dx * 0.006;
        worldGroup.rotation.x += dy * 0.006;
        prevMouse = { x: e.clientX, y: e.clientY };
      } else if (!prefersReduced) {
        targetRot.y = normX * 0.26;
        targetRot.x = -normY * 0.18 + 0.06;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // ── 8. Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ── 9. Animation Loop ─────────────────────────────────────────────────
    let animId = 0;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReduced) {
        t += 0.014;

        if (!isDragging) {
          worldGroup.rotation.y += 0.0022;
          worldGroup.rotation.x += (targetRot.x - worldGroup.rotation.x) * 0.04;
        }

        worldGroup.position.y = Math.sin(t * 0.7) * 0.09;

        const a1 = t * 0.55;
        const r1 = 2.25;
        sat1.position.set(
          r1 * Math.cos(a1),
          r1 * Math.sin(a1) * Math.sin(Math.PI * 0.38),
          r1 * Math.sin(a1) * Math.cos(Math.PI * 0.38)
        );
        trail1.position.copy(sat1.position);
        trail1.rotation.y = a1 + 0.3;

        const a2 = -t * 0.45;
        const r2 = 2.65;
        sat2.position.set(
          r2 * Math.cos(a2) * Math.cos(-Math.PI * 0.2),
          r2 * Math.sin(a2) * Math.sin(Math.PI * 0.55),
          r2 * Math.sin(a2) * Math.cos(Math.PI * 0.55)
        );
        trail2.position.copy(sat2.position);
        trail2.rotation.x = a2 + 0.3;

        const a3 = t * 0.38;
        const r3 = 2.95;
        sat3.position.set(
          r3 * Math.cos(a3) * Math.cos(Math.PI * 0.35),
          r3 * Math.sin(a3) * Math.sin(Math.PI * 0.22),
          r3 * Math.sin(a3) * Math.cos(Math.PI * 0.22)
        );
        trail3.position.copy(sat3.position);
        trail3.rotation.z = a3 + 0.3;

        hexParticles.forEach((hp) => {
          hp.mesh.rotation.x += hp.speed * 0.01;
          hp.mesh.rotation.y += hp.speed * 0.008;
          hp.mesh.position.y += Math.sin(t + hp.offset) * 0.003;
        });

        const pulse = 1 + Math.sin(t * 1.4) * 0.025;
        coreMesh.scale.setScalar(pulse);
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onPointerDown);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
      style={{ minHeight: 480 }}
    >
      {/* ── 5 Interactive Glass HUD Cards ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {DATA_MARKERS.map((marker, i) => {
          const positions = [
            { top: "5%", left: "46%" },       // Ideas — top center
            { top: "30%", left: "2%" },        // Data — left mid
            { top: "26%", right: "2%" },       // AI/ML — right upper
            { bottom: "16%", left: "6%" },     // Engineering — bottom-left
            { bottom: "12%", right: "8%" },    // Impact — bottom-right
          ];
          const pos = positions[i] || { top: "50%", left: "50%" };

          return (
            <div
              key={marker.id}
              onClick={() => onMarkerClick?.(marker)}
              className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 hover:-translate-y-1 group"
              style={pos}
            >
              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border shadow-lg backdrop-blur-xl bg-white/95 border-gray-200"
                style={{
                  boxShadow: "0 8px 28px -4px rgba(37, 99, 235, 0.1), 0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-sm shrink-0"
                  style={{
                    background: `${marker.color}16`,
                    color: marker.color,
                    border: `1px solid ${marker.color}28`,
                  }}
                >
                  {marker.icon}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors whitespace-nowrap">
                    {marker.label}
                  </div>
                  <div className="text-[9px] font-mono-code text-gray-400 leading-none whitespace-nowrap">
                    {marker.sublabel}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Drag hint ───────────────────────────────────────────────────────── */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <span
          className="text-[9px] font-mono-code px-2.5 py-1 rounded-full bg-white/80 text-gray-500 border border-gray-200/80 shadow-2xs"
        >
          drag to rotate
        </span>
      </div>
    </div>
  );
}
