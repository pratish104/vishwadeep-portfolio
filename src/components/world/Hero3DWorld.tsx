import { useEffect, useRef } from "react";
import * as THREE from "three";
import { DATA_MARKERS } from "./EarthScene3D";

interface Hero3DWorldProps {
  onMarkerClick?: (marker: { id: string; label: string; description: string }) => void;
}

export function Hero3DWorld({ onMarkerClick }: Hero3DWorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.clientWidth || 600;
    let H = mount.clientHeight || 550;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. Scene, Camera, Renderer ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000);
    camera.position.set(0, 0.4, 4.8);

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
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    // ── 2. Ambient & Directional Sun Lighting ────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xe0f2fe, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.8);
    sunLight.position.set(4, 6, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-5, 2, -3);
    scene.add(rimLight);

    const warmFill = new THREE.DirectionalLight(0xfef08a, 1.2);
    warmFill.position.set(2, -4, 3);
    scene.add(warmFill);

    // ── 3. Central Floating Metropolis Biodome Group ─────────────────────────
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Island Base (Terra-formed low-poly / smooth sphere hemisphere)
    const islandGeo = new THREE.SphereGeometry(1.3, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.58);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.65,
      metalness: 0.1,
      flatShading: true,
    });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.y = -0.15;
    islandMesh.receiveShadow = true;
    islandMesh.castShadow = true;
    worldGroup.add(islandMesh);

    // Lower Rocky Cliff Crust
    const cliffGeo = new THREE.ConeGeometry(1.35, 1.1, 28);
    const cliffMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.85,
      flatShading: true,
    });
    const cliffMesh = new THREE.Mesh(cliffGeo, cliffMat);
    cliffMesh.rotation.x = Math.PI;
    cliffMesh.position.y = -0.7;
    worldGroup.add(cliffMesh);

    // ── 4. 3D Architectural City Spires & Skyscrapers ────────────────────────
    const cityGroup = new THREE.Group();
    worldGroup.add(cityGroup);

    const buildings = [
      { x: 0, z: 0, h: 1.4, w: 0.22, col: 0xffffff }, // Central Spire
      { x: -0.32, z: 0.2, h: 1.05, w: 0.18, col: 0xbae6fd },
      { x: 0.35, z: 0.18, h: 0.95, w: 0.16, col: 0xe0f2fe },
      { x: -0.22, z: -0.28, h: 0.85, w: 0.17, col: 0x93c5fd },
      { x: 0.26, z: -0.25, h: 0.78, w: 0.15, col: 0xffffff },
      { x: 0.52, z: 0, h: 0.65, w: 0.14, col: 0xbae6fd },
      { x: -0.5, z: 0, h: 0.72, w: 0.14, col: 0x93c5fd },
      { x: 0, z: 0.42, h: 0.8, w: 0.16, col: 0xffffff },
    ];

    buildings.forEach((b) => {
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.w);
      const bMat = new THREE.MeshStandardMaterial({
        color: b.col,
        metalness: 0.4,
        roughness: 0.2,
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(b.x, b.h / 2 + 0.15, b.z);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      cityGroup.add(bMesh);

      // Spire tip on central pinnacle
      if (b.h > 1.2) {
        const tipGeo = new THREE.ConeGeometry(b.w * 0.6, 0.45, 12);
        const tipMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          emissiveIntensity: 0.6,
        });
        const tipMesh = new THREE.Mesh(tipGeo, tipMat);
        tipMesh.position.set(b.x, b.h + 0.35, b.z);
        cityGroup.add(tipMesh);
      }
    });

    // ── 5. Luminous Transparent Glass Dome Shell ─────────────────────────────
    const domeGeo = new THREE.SphereGeometry(1.5, 36, 24);
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.05,
      ior: 1.4,
      thickness: 0.4,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
      side: THREE.FrontSide,
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    worldGroup.add(domeMesh);

    // ── 6. Glowing Orbital Data Rings & Traveling Nodes ──────────────────────
    const orbitRing1Geo = new THREE.TorusGeometry(2.0, 0.015, 12, 64);
    const orbitRing1Mat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRing1 = new THREE.Mesh(orbitRing1Geo, orbitRing1Mat);
    orbitRing1.rotation.x = Math.PI * 0.42;
    orbitRing1.rotation.y = Math.PI * 0.12;
    scene.add(orbitRing1);

    const orbitRing2Geo = new THREE.TorusGeometry(2.25, 0.012, 12, 64);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.rotation.x = Math.PI * 0.58;
    orbitRing2.rotation.y = -Math.PI * 0.18;
    scene.add(orbitRing2);

    // Traveling Data Node Spheres
    const node1Geo = new THREE.SphereGeometry(0.06, 16, 16);
    const node1Mat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x3b82f6,
      emissiveIntensity: 1.2,
    });
    const node1Mesh = new THREE.Mesh(node1Geo, node1Mat);
    scene.add(node1Mesh);

    const node2Geo = new THREE.SphereGeometry(0.05, 16, 16);
    const node2Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x34d399,
      emissiveIntensity: 1.2,
    });
    const node2Mesh = new THREE.Mesh(node2Geo, node2Mat);
    scene.add(node2Mesh);

    // ── 7. Floating 3D Marker Anchors with Dotted Line Connectors ────────────
    const markerAnchors: THREE.Mesh[] = [];
    DATA_MARKERS.forEach((m) => {
      const anchorGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const anchorMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(m.color),
        emissive: new THREE.Color(m.color),
        emissiveIntensity: 0.9,
      });
      const anchorMesh = new THREE.Mesh(anchorGeo, anchorMat);
      anchorMesh.position.set(m.pos[0] * 1.55, m.pos[1] * 1.55, m.pos[2] * 1.55);
      worldGroup.add(anchorMesh);
      markerAnchors.push(anchorMesh);
    });

    // ── 8. Interaction: Pointer Drag, Parallax & Hover ────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const targetRot = { x: 0.1, y: 0.2 };
    let rotVel = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        rotVel.y = dx * 0.005;
        rotVel.x = dy * 0.005;
        worldGroup.rotation.y += rotVel.y;
        worldGroup.rotation.x += rotVel.x;
        prevMouse = { x: e.clientX, y: e.clientY };
      } else if (!prefersReduced) {
        // Subtle Parallax Tilt
        targetRot.y = normX * 0.25;
        targetRot.x = -normY * 0.18 + 0.1;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // ── 9. Window Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      W = mount.clientWidth;
      H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ── 10. Animation Loop ───────────────────────────────────────────────────
    let animId = 0;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReduced) {
        t += 0.015;

        // Auto Slow Rotation & Smooth Inertia
        if (!isDragging) {
          worldGroup.rotation.y += 0.0025;
          worldGroup.rotation.x += (targetRot.x - worldGroup.rotation.x) * 0.05;
          rotVel.x *= 0.92;
          rotVel.y *= 0.92;
        }

        // Gentle Floating Levitation Bob
        worldGroup.position.y = Math.sin(t * 0.8) * 0.08;

        // Orbit Data Nodes traveling along tori
        const a1 = t * 0.7;
        node1Mesh.position.set(
          Math.cos(a1) * 2.0 * Math.cos(Math.PI * 0.12),
          Math.sin(a1) * 2.0 * Math.sin(Math.PI * 0.42),
          Math.sin(a1) * 2.0 * Math.cos(Math.PI * 0.42)
        );

        const a2 = -t * 0.6;
        node2Mesh.position.set(
          Math.cos(a2) * 2.25 * Math.cos(-Math.PI * 0.18),
          Math.sin(a2) * 2.25 * Math.sin(Math.PI * 0.58),
          Math.sin(a2) * 2.25 * Math.cos(Math.PI * 0.58)
        );
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerdown", onPointerDown);

      renderer.dispose();
      islandGeo.dispose();
      islandMat.dispose();
      cliffGeo.dispose();
      cliffMat.dispose();
      domeGeo.dispose();
      domeMat.dispose();
      orbitRing1Geo.dispose();
      orbitRing1Mat.dispose();
      orbitRing2Geo.dispose();
      orbitRing2Mat.dispose();
      node1Geo.dispose();
      node1Mat.dispose();
      node2Geo.dispose();
      node2Mat.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="relative w-full h-full cursor-grab active:cursor-grabbing select-none" style={{ minHeight: 480 }}>
      {/* ── 5 Interactive HUD Data Cards Layered Directly Over 3D Scene ─────── */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {DATA_MARKERS.map((marker, i) => {
          // Precise coordinate layout matching reference screenshots
          const positions = [
            { top: "6%", left: "50%" },     // Ideas (top center)
            { top: "26%", left: "4%" },     // Data (left)
            { top: "32%", right: "4%" },    // AI/ML (right)
            { bottom: "14%", left: "12%" }, // Engineering (bottom-left)
            { bottom: "10%", right: "12%" }, // Impact (bottom-right)
          ];
          const pos = positions[i] || { top: "50%", left: "50%" };

          return (
            <div
              key={marker.id}
              onClick={() => onMarkerClick?.(marker)}
              className="absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group"
              style={pos}
            >
              <div
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-200"
                style={{
                  background: "rgba(255, 255, 255, 0.92)",
                  borderColor: "rgba(229, 231, 235, 0.8)",
                  boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-sm"
                  style={{
                    background: `${marker.color}18`,
                    color: marker.color,
                  }}
                >
                  {marker.icon}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {marker.label}
                  </div>
                  <div className="text-[9px] font-mono-code text-gray-500 leading-none">
                    {marker.sublabel}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
