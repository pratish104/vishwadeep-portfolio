import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

// ─── DARK WORLD: Earth + Moon Cinematic Space Environment ─────────────────────
function DarkWorld({ scrollRatio, mouse }: { scrollRatio: number; mouse: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Stars data
    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      // Deep space nebula background
      const neb1 = ctx.createRadialGradient(
        w * (0.7 + mouse.x * 0.05),
        h * (0.3 + mouse.y * 0.05),
        50,
        w * 0.7,
        h * 0.3,
        w * 0.65
      );
      neb1.addColorStop(0, "rgba(14, 55, 125, 0.35)");
      neb1.addColorStop(0.4, "rgba(88, 28, 135, 0.2)");
      neb1.addColorStop(1, "transparent");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, w, h);

      // Stars rendering with twinkling
      stars.forEach((s) => {
        const pulse = 0.35 + Math.sin(t * s.speed * 50 + s.angle) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x + mouse.x * 10 * (s.r * 0.5), s.y + mouse.y * 10 * (s.r * 0.5), s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${pulse})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouse]);

  // Dynamic scroll-driven positions for Earth & Moon across the ENTIRE PAGE
  // Hero (scroll 0) -> Earth top-right 60%
  // Projects (scroll 0.25) -> Earth shifts right, Moon comes into view
  // Experience (scroll 0.5) -> Earth recedes into cosmic depth
  // Skills/Contact (scroll 0.85+) -> Earth horizon rim returns bottom-right
  const earthX = 65 + Math.sin(scrollRatio * Math.PI * 2) * 15 + mouse.x * 3;
  const earthY = 18 + scrollRatio * 55 + mouse.y * 3;
  const earthScale = Math.max(0.45, 1 - scrollRatio * 0.5);

  const moonX = 85 - scrollRatio * 30 - mouse.x * 4;
  const moonY = 8 + scrollRatio * 70 - mouse.y * 4;

  return (
    <div className="fixed inset-0 pointer-events-none -z-1 overflow-hidden">
      {/* Base Deep Space Gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: "linear-gradient(165deg, #030611 0%, #070d22 40%, #09112a 70%, #040817 100%)",
        }}
      />

      {/* Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── Visual Anchor 1: THE EARTH (Dynamic Scroll & Parallax) ─────────── */}
      <div
        className="absolute transition-all duration-700 ease-out"
        style={{
          left: `${earthX}%`,
          top: `${earthY}%`,
          transform: `translate(-50%, -50%) scale(${earthScale})`,
          width: 380,
          height: 380,
        }}
      >
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            background: "radial-gradient(circle at 35% 30%, #1d4ed8 0%, #1e3a8a 40%, #0f172a 85%)",
            boxShadow:
              "0 0 100px rgba(56, 189, 248, 0.35), 0 0 40px rgba(37, 99, 235, 0.25), inset -24px -24px 60px rgba(0,0,20,0.85)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
          }}
        >
          {/* Earth Continents & City Lights Simulation */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_120s_linear_infinite]">
              {/* Landmass silhouettes */}
              <path
                d="M 30,50 Q 50,20 80,40 T 130,30 T 170,70 T 120,120 T 70,160 T 20,110 Z"
                fill="#2563eb"
                opacity="0.6"
              />
              <path
                d="M 110,90 Q 140,70 180,90 T 160,150 T 100,160 Z"
                fill="#1d4ed8"
                opacity="0.5"
              />
              {/* City light dots */}
              <circle cx="55" cy="45" r="1.5" fill="#fef08a" />
              <circle cx="75" cy="35" r="2" fill="#38bdf8" />
              <circle cx="95" cy="50" r="1.5" fill="#fef08a" />
              <circle cx="125" cy="65" r="2" fill="#38bdf8" />
              <circle cx="145" cy="85" r="1.5" fill="#fef08a" />
              <circle cx="65" cy="105" r="1.5" fill="#38bdf8" />
            </svg>
          </div>

          {/* Atmosphere Blue Rim Glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 25%, rgba(56,189,248,0.3) 0%, transparent 65%)",
            }}
          />

          {/* Night Terminator Shadow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, transparent 35%, rgba(2, 6, 23, 0.85) 100%)",
            }}
          />
        </div>
      </div>

      {/* ── Visual Anchor 2: THE MOON (Dynamic Orbit Position) ────────────── */}
      <div
        className="absolute transition-all duration-700 ease-out"
        style={{
          left: `${moonX}%`,
          top: `${moonY}%`,
          transform: "translate(-50%, -50%)",
          width: 90,
          height: 90,
        }}
      >
        <div
          className="w-full h-full rounded-full relative"
          style={{
            background: "radial-gradient(circle at 38% 35%, #e2e8f0 0%, #94a3b8 65%, #475569 100%)",
            boxShadow: "0 0 25px rgba(226, 232, 240, 0.35), inset -6px -6px 14px rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(226, 232, 240, 0.3)",
          }}
        >
          {/* Moon Craters */}
          <div className="absolute top-3 left-4 w-3.5 h-3.5 rounded-full bg-slate-500/30 border border-slate-400/20" />
          <div className="absolute top-8 left-9 w-5 h-5 rounded-full bg-slate-600/30 border border-slate-400/20" />
          <div className="absolute bottom-4 left-5 w-4 h-4 rounded-full bg-slate-600/25 border border-slate-400/20" />
        </div>
      </div>

      {/* Ambient Horizon Glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(14, 55, 125, 0.35) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── ANIME WORLD: Japanese Castle & Mountain Landscape Environment ─────────────
// ─── ANIME WORLD: Interactive Three.js Japanese Castle Diorama ───────────────
// This is intentionally an original scene. The inspiration is the general
// "explore a coherent 3D world" pattern, not another site's visual assets.
function AnimeWorld({ scrollRatio, mouse }: { scrollRatio: number; mouse: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(scrollRatio);
  const mouseRef = useRef(mouse);
  const [hint, setHint] = useState("Drag to orbit · scroll to travel");

  useEffect(() => {
    scrollRef.current = scrollRatio;
    mouseRef.current = mouse;
  }, [scrollRatio, mouse]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#8796b8");
    scene.fog = new THREE.FogExp2("#8796b8", 0.028);
    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 120);
    const target = new THREE.Vector3(2.8, 2.25, -0.8);
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const interactive: THREE.Object3D[] = [];
    const petals: Array<{ mesh: THREE.Mesh; speed: number; sway: number; phase: number }> = [];
    const clouds: THREE.Group[] = [];
    const lanternLights: THREE.PointLight[] = [];
    let hovered: THREE.Object3D | undefined;
    let dragging = false;
    let lastPointer = { x: 0, y: 0 };
    let orbitYaw = -0.35;
    let orbitPitch = 0.16;
    let distance = 23;
    let bellSpin = 0;
    const previousCursor = document.body.style.cursor;

    const mat = (color: string, roughness = 0.8, metalness = 0) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const meshes = {
      cedar: mat("#183f39"),
      grass: mat("#2d6657"),
      stone: mat("#627078"),
      plaster: mat("#e8d8bd"),
      timber: mat("#4f3429"),
      roof: mat("#1c3140", 0.62),
      gold: mat("#d99d38", 0.35, 0.3),
      blossom: mat("#ee8eac", 0.72),
      path: mat("#c89870"),
    };
    const addMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, position: [number, number, number], scale?: [number, number, number]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      if (scale) mesh.scale.set(...scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    };
    const box = (size: [number, number, number], position: [number, number, number], material: THREE.Material) =>
      addMesh(new THREE.BoxGeometry(...size), material, position);

    // Ground, river and layered foothills establish a physical miniature scale.
    const ground = addMesh(new THREE.PlaneGeometry(70, 70, 1, 1), meshes.grass, [0, -1.05, 0]);
    ground.rotation.x = -Math.PI / 2;
    const path = addMesh(new THREE.PlaneGeometry(4.3, 33), meshes.path, [0, -1.0, 6]);
    path.rotation.x = -Math.PI / 2;
    path.rotation.z = 0.13;
    const riverMaterial = new THREE.MeshPhysicalMaterial({ color: "#5da6b6", roughness: 0.16, metalness: 0.12, transparent: true, opacity: 0.78 });
    const river = addMesh(new THREE.PlaneGeometry(5, 45), riverMaterial, [-10, -0.98, 1]);
    river.rotation.x = -Math.PI / 2;
    river.rotation.z = -0.16;

    const mountainMaterial = mat("#4d6270");
    const farMountainMaterial = mat("#71839a");
    [[-16, 5, -17, 8], [-7, 3.2, -20, 6], [11, 6, -19, 9], [20, 3, -13, 7]].forEach(([x, y, z, s], index) => {
      const mountain = addMesh(new THREE.ConeGeometry(s, y * 2.8, 6), index % 2 ? farMountainMaterial : mountainMaterial, [x, y - 1, z]);
      mountain.rotation.y = index * 0.4;
    });

    // Castle: independently built stone rampart, timber frame, plaster walls and tiled roofs.
    const castle = new THREE.Group();
    castle.position.set(4.7, -0.95, -1.8);
    castle.scale.setScalar(0.78);
    scene.add(castle);
    const castleMesh = (geometry: THREE.BufferGeometry, material: THREE.Material, pos: [number, number, number]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      castle.add(mesh);
      return mesh;
    };
    const roof = (width: number, depth: number, y: number) => {
      const canopy = castleMesh(new THREE.ConeGeometry(Math.max(width, depth) * 0.88, 0.82, 4), meshes.roof, [0, y, 0]);
      canopy.scale.set(width / Math.max(width, depth), 1, depth / Math.max(width, depth));
      canopy.rotation.y = Math.PI / 4;
      return canopy;
    };
    castleMesh(new THREE.BoxGeometry(7, 1.25, 5.4), meshes.stone, [0, 0.62, 0]);
    castleMesh(new THREE.BoxGeometry(5.5, 2.35, 4.1), meshes.plaster, [0, 2.25, 0]);
    roof(6.7, 5.2, 3.85);
    castleMesh(new THREE.BoxGeometry(3.8, 2.1, 3.05), meshes.plaster, [0, 5.05, 0]);
    roof(4.95, 4.1, 6.35);
    castleMesh(new THREE.BoxGeometry(2.35, 1.8, 2.05), meshes.plaster, [0, 7.75, 0]);
    roof(3.35, 3.0, 8.82);
    castleMesh(new THREE.CylinderGeometry(0.07, 0.07, 1.25), meshes.gold, [0, 9.85, 0]);
    castleMesh(new THREE.SphereGeometry(0.16), meshes.gold, [0, 10.5, 0]);
    // Timber beams and warm shoji windows make the building legible at distance.
    [-2.15, -0.72, 0.72, 2.15].forEach((x) => {
      castleMesh(new THREE.BoxGeometry(0.18, 2.3, 0.15), meshes.timber, [x, 2.25, 2.1]);
      castleMesh(new THREE.BoxGeometry(0.15, 2.02, 0.12), meshes.timber, [x * 0.58, 5.05, 1.58]);
    });
    const windowMaterial = new THREE.MeshStandardMaterial({ color: "#ffc85f", emissive: "#e58b22", emissiveIntensity: 1.3, roughness: 0.55 });
    [-1.45, 0, 1.45].forEach((x) => castleMesh(new THREE.BoxGeometry(0.66, 0.85, 0.08), windowMaterial, [x, 2.45, 2.14]));
    castleMesh(new THREE.BoxGeometry(0.86, 1.05, 0.12), meshes.timber, [0, 1.62, 2.16]);

    const registerInteraction = (object: THREE.Object3D, label: string, action: () => void) => {
      object.userData.interaction = { label, action };
      interactive.push(object);
    };
    registerInteraction(castle, "Castle gate · explore projects", () => { window.location.hash = "#projects"; });

    const tree = (x: number, z: number, scale: number, blossom = false) => {
      const group = new THREE.Group();
      group.position.set(x, -1, z);
      group.scale.setScalar(scale);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.33, 2.2, 7), meshes.timber);
      trunk.position.y = 1.05;
      trunk.castShadow = true;
      group.add(trunk);
      if (blossom) {
        for (let i = 0; i < 7; i++) {
          const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95 + (i % 2) * 0.17, 1), meshes.blossom);
          crown.position.set((i % 3 - 1) * 0.7, 2.5 + (i % 2) * 0.5, (Math.floor(i / 3) - 1) * 0.65);
          crown.castShadow = true;
          group.add(crown);
        }
      } else {
        [2.4, 1.85, 1.25].forEach((radius, index) => {
          const foliage = new THREE.Mesh(new THREE.ConeGeometry(radius, 2.4, 8), meshes.cedar);
          foliage.position.y = 2 + index * 0.92;
          foliage.castShadow = true;
          group.add(foliage);
        });
      }
      scene.add(group);
      return group;
    };
    [[-7, -1, 1.35], [-6, -7, 1.1], [8, -5, 1.25], [10, 4, 1.05], [-3, 8, 0.9], [8, 9, 0.78]].forEach(([x, z, s], i) => tree(x, z, s, i % 2 === 0));

    const lantern = (x: number, z: number) => {
      const group = new THREE.Group();
      group.position.set(x, -1, z);
      const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 1.75, 6), meshes.stone);
      stone.position.y = 0.88;
      group.add(stone);
      const housing = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.55, 0.72), windowMaterial);
      housing.position.y = 1.85;
      group.add(housing);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.73, 0.42, 4), meshes.roof);
      cap.position.y = 2.3;
      cap.rotation.y = Math.PI / 4;
      group.add(cap);
      scene.add(group);
      const glow = new THREE.PointLight("#ffb65c", 0.9, 7, 2);
      glow.position.set(x, 1.15, z);
      scene.add(glow);
      lanternLights.push(glow);
      registerInteraction(group, "Stone lantern · change the mood", () => {
        lanternLights.forEach((light) => { light.intensity = light.intensity > 0.15 ? 0.08 : 1.35; });
      });
    };
    lantern(-2.3, 6.8);
    lantern(2.2, 8.8);

    // A small bell is a tactile scene detail and a purposeful click target.
    const bell = addMesh(new THREE.SphereGeometry(0.38, 18, 12), meshes.gold, [-4.4, 2.2, 2.5]);
    bell.scale.y = 1.25;
    registerInteraction(bell, "Temple bell · ring the garden", () => { bellSpin += 2.8; });

    const ambient = new THREE.HemisphereLight("#f8c9b4", "#173e42", 2.2);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight("#ffe4bd", 3.4);
    sun.position.set(-9, 16, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    scene.add(sun);
    const rim = new THREE.PointLight("#f48bb1", 3, 22);
    rim.position.set(8, 6, -8);
    scene.add(rim);

    // Slow drifting clouds, plus individual petals with velocity and wind sway.
    const cloudMat = new THREE.MeshStandardMaterial({ color: "#f6d9dc", transparent: true, opacity: 0.46, roughness: 1 });
    for (let i = 0; i < 5; i++) {
      const cloud = new THREE.Group();
      for (let j = 0; j < 4; j++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(1.2 + j * 0.18, 12, 8), cloudMat);
        puff.position.set(j * 1.05, (j % 2) * 0.28, (j % 3) * 0.25);
        cloud.add(puff);
      }
      cloud.position.set(-16 + i * 7, 7 + (i % 2) * 2.1, -13 - i * 2);
      cloud.scale.setScalar(0.65 + (i % 3) * 0.18);
      clouds.push(cloud);
      scene.add(cloud);
    }
    const petalGeometry = new THREE.SphereGeometry(0.075, 7, 5);
    for (let i = 0; i < 130; i++) {
      const petal = new THREE.Mesh(petalGeometry, meshes.blossom);
      petal.position.set((Math.random() - 0.5) * 25, Math.random() * 12 - 1, (Math.random() - 0.5) * 22);
      petal.scale.set(1.8, 0.42, 0.8);
      petal.castShadow = i < 24;
      petals.push({ mesh: petal, speed: 0.45 + Math.random() * 0.75, sway: 0.35 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 });
      scene.add(petal);
    }

    const resolveInteraction = (object: THREE.Object3D | null) => {
      let current = object;
      while (current) {
        if (current.userData.interaction) return current;
        current = current.parent;
      }
      return undefined;
    };
    const updatePointer = (event: PointerEvent) => {
      pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(interactive, true)[0];
      const next = resolveInteraction(hit?.object ?? null);
      if (next !== hovered) {
        hovered = next;
        document.body.style.cursor = next ? "pointer" : previousCursor;
        setHint(next ? next.userData.interaction.label : "Drag to orbit · scroll to travel");
      }
      if (dragging) {
        orbitYaw -= (event.clientX - lastPointer.x) * 0.006;
        orbitPitch = THREE.MathUtils.clamp(orbitPitch + (event.clientY - lastPointer.y) * 0.004, -0.22, 0.72);
      }
      lastPointer = { x: event.clientX, y: event.clientY };
    };
    const isControl = (element: EventTarget | null) => element instanceof Element && Boolean(element.closest("a,button,input,textarea,select,[role='button']"));
    const onPointerDown = (event: PointerEvent) => {
      if (!isControl(event.target)) {
        dragging = true;
        lastPointer = { x: event.clientX, y: event.clientY };
      }
    };
    const onPointerUp = (event: PointerEvent) => {
      const moved = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
      if (dragging && moved < 8 && hovered && !isControl(event.target)) hovered.userData.interaction.action();
      dragging = false;
    };
    const onWheel = (event: WheelEvent) => {
      if (!isControl(event.target)) distance = THREE.MathUtils.clamp(distance + event.deltaY * 0.012, 14, 29);
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);

    let frame = 0;
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const travel = scrollRef.current;
      const targetYaw = dragging ? orbitYaw : orbitYaw + mouseRef.current.x * 0.28;
      const scrollYaw = targetYaw + travel * 0.75;
      const scrollDistance = distance - travel * 2.8;
      target.set(2.8 - travel * 1.8, 2.25 + travel * 0.75, -0.8 - travel * 2.5);
      const desired = new THREE.Vector3(
        target.x + Math.sin(scrollYaw) * Math.cos(orbitPitch) * scrollDistance,
        target.y + Math.sin(orbitPitch) * scrollDistance + 1.5,
        target.z + Math.cos(scrollYaw) * Math.cos(orbitPitch) * scrollDistance,
      );
      camera.position.lerp(desired, 0.055);
      camera.lookAt(target);
      riverMaterial.map = null;
      riverMaterial.opacity = 0.67 + Math.sin(elapsed * 1.3) * 0.1;
      clouds.forEach((cloud, index) => { cloud.position.x += 0.004 + index * 0.0008; if (cloud.position.x > 19) cloud.position.x = -19; });
      petals.forEach((petal) => {
        petal.mesh.position.y -= petal.speed * 0.018;
        petal.mesh.position.x += Math.sin(elapsed * petal.sway + petal.phase) * 0.012;
        petal.mesh.rotation.x += 0.025;
        petal.mesh.rotation.z += 0.019;
        if (petal.mesh.position.y < -1.2) petal.mesh.position.set((Math.random() - 0.5) * 25, 11, (Math.random() - 0.5) * 22);
      });
      bell.rotation.z = Math.sin(elapsed * 7) * Math.min(bellSpin, 0.22);
      bellSpin *= 0.973;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      document.body.style.cursor = previousCursor;
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
        const material = (object as THREE.Mesh).material;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else if (material) material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-1 overflow-hidden" aria-label="Interactive Japanese castle world">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-[0.88]" />
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/35 bg-[#172b36]/55 px-4 py-2 text-center font-mono-code text-[10px] tracking-wide text-white/90 shadow-lg backdrop-blur-md sm:text-xs">
        {hint}
      </div>
    </div>
  );
}

// Previous CSS/SVG version retained only as an internal fallback reference; it is
// not mounted. The active AnimeWorld above is the interactive Three.js experience.
function AnimeWorldLegacy({ scrollRatio, mouse }: { scrollRatio: number; mouse: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Falling Sakura Petals
    const petals = Array.from({ length: 65 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 5 + 3,
      speedX: Math.random() * 0.9 + 0.3,
      speedY: Math.random() * 0.7 + 0.4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      alpha: Math.random() * 0.65 + 0.3,
    }));

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      petals.forEach((p) => {
        p.x += p.speedX + Math.sin(t * 0.6 + p.rot) * 0.35;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        if (p.y > h + 20) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x > w + 20) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#f472b6";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.7, p.size * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Parallax calculations
  const bgX = mouse.x * 0.8;
  const bgY = mouse.y * 0.8;
  const midX = mouse.x * 2.5;
  const castleY = 8 + scrollRatio * 30 + mouse.y * 2.5;
  const castleX = 76 + midX;
  const fgX = mouse.x * 5.5;

  return (
    <div className="fixed inset-0 pointer-events-none -z-1 overflow-hidden">
      {/* ── Background Layer 0: Soft Twilight Sunset Sky Gradient ─────────── */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background:
            "linear-gradient(180deg, #15213f 0%, #59658e 28%, #e6a1a8 57%, #f3d5be 72%, #47645d 100%)",
        }}
      />

      {/* Falling Sakura Petals Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── Background Layer 1: sunset, far ridges and atmospheric perspective ── */}
      <div
        className="absolute inset-0 opacity-90 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${bgX * 5}px, ${bgY * 3 - scrollRatio * 20}px)` }}
      >
        <div
          className="absolute -top-24 left-[18%] h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,237,190,.95) 0%, rgba(255,185,157,.34) 38%, transparent 70%)", filter: "blur(8px)" }}
        />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="anime-ridge-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6c6b91" />
              <stop offset="1" stopColor="#485775" />
            </linearGradient>
            <linearGradient id="anime-ridge-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#40566c" />
              <stop offset="1" stopColor="#263f4a" />
            </linearGradient>
            <linearGradient id="anime-mist" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(255,234,218,.7)" />
              <stop offset="1" stopColor="rgba(244,200,196,0)" />
            </linearGradient>
          </defs>
          <path d="M0 520 L130 405 L250 490 L390 310 L545 500 L700 370 L820 470 L980 275 L1150 470 L1300 350 L1440 465 V900 H0Z" fill="url(#anime-ridge-far)" opacity=".7" />
          <path d="M0 590 L170 460 L285 535 L470 365 L620 550 L775 425 L920 555 L1080 340 L1240 520 L1440 420 V900 H0Z" fill="url(#anime-ridge-mid)" opacity=".82" />
          <path d="M0 470 C270 420 480 505 720 460 C980 410 1190 480 1440 430 V680 H0Z" fill="url(#anime-mist)" opacity=".82" />
        </svg>
      </div>

      {/* ── Background Layer 2: snow-capped peak behind the castle ─────────── */}
      <div
        className="absolute transition-transform duration-500 ease-out opacity-70"
        style={{
          bottom: "18%",
          right: "8%",
          width: 540,
          height: 250,
          transform: `translate(${bgX * 10}px, ${scrollRatio * -40 + bgY * 10}px)`,
        }}
      >
        <svg viewBox="0 0 500 220" className="w-full h-full">
          <polygon points="250,15 490,220 10,220" fill="#344d64" />
          {/* Snow-Capped Peak */}
          <polygon points="250,15 295,65 205,65" fill="#ffffff" />
          <polygon points="250,15 275,80 250,65 225,80" fill="#dce7e5" opacity="0.9" />
        </svg>
      </div>

      {/* ── Midground Layer 3: wooded slopes and a winding approach ────────── */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] opacity-95 transition-transform duration-500" style={{ transform: `translate(${midX}px, ${scrollRatio * 18}px)` }}>
        <svg viewBox="0 0 1440 520" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="anime-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#355d55" />
              <stop offset="1" stopColor="#163834" />
            </linearGradient>
            <linearGradient id="anime-path" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e7b28f" stopOpacity=".65" />
              <stop offset="1" stopColor="#9f654f" stopOpacity=".9" />
            </linearGradient>
          </defs>
          <path d="M0 210 C210 120 390 235 600 170 C825 102 1100 230 1440 145 V520 H0Z" fill="url(#anime-ground)" />
          <path d="M865 180 C790 270 790 350 690 520 H1080 C1030 410 990 295 865 180Z" fill="url(#anime-path)" opacity=".58" />
          {Array.from({ length: 36 }, (_, i) => {
            const x = (i * 91) % 1440;
            const y = 185 + ((i * 47) % 175);
            const s = 18 + ((i * 13) % 35);
            return <path key={i} d={`M${x} ${y + s} L${x + s / 2} ${y} L${x + s} ${y + s}Z`} fill={i % 3 === 0 ? "#183f3b" : "#245148"} opacity=".92" />;
          })}
        </svg>
      </div>

      {/* ── Midground Layer 4: Japanese castle on a stone hillside ─────────── */}
      <div
        className="absolute transition-all duration-500 ease-out"
        style={{
          left: `${castleX}%`,
          top: `${castleY}%`,
          transform: "translate(-50%, 0)",
          width: 340,
          height: 420,
        }}
      >
        <svg viewBox="0 0 320 400" className="w-full h-full opacity-90">
          <defs>
            <linearGradient id="castleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1e2c8" stopOpacity=".98" />
              <stop offset="100%" stopColor="#b7a38e" stopOpacity=".98" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#283c4f" stopOpacity="1" />
              <stop offset="100%" stopColor="#142636" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Top Spire & Ornament (Finial) */}
          <line x1="160" y1="8" x2="160" y2="35" stroke="#f472b6" strokeWidth="3" />
          <circle cx="160" cy="8" r="4.5" fill="#fbbf24" />

          {/* Tier 1 Curved Roof */}
          <path d="M 160,35 Q 120,60 85,65 L 235,65 Q 200,60 160,35 Z" fill="url(#roofGrad)" />
          <rect x="115" y="65" width="90" height="38" fill="url(#castleGrad)" />
          {/* Tier 1 Glowing Shoji Windows */}
          <rect x="135" y="76" width="12" height="18" fill="#fbbf24" opacity="0.95" rx="1" />
          <rect x="173" y="76" width="12" height="18" fill="#fbbf24" opacity="0.95" rx="1" />

          {/* Tier 2 Mid Roof */}
          <path d="M 160,103 Q 95,133 50,138 L 270,138 Q 225,133 160,103 Z" fill="url(#roofGrad)" />
          <rect x="90" y="138" width="140" height="52" fill="url(#castleGrad)" />
          {/* Tier 2 Windows */}
          <rect x="115" y="152" width="16" height="24" fill="#f59e0b" opacity="0.9" rx="1" />
          <rect x="152" y="152" width="16" height="24" fill="#f59e0b" opacity="0.9" rx="1" />
          <rect x="189" y="152" width="16" height="24" fill="#f59e0b" opacity="0.9" rx="1" />

          {/* Tier 3 Main Foundation Roof */}
          <path d="M 160,190 Q 60,232 5,238 L 315,238 Q 260,232 160,190 Z" fill="url(#roofGrad)" />
          <rect x="55" y="238" width="210" height="95" fill="url(#castleGrad)" />
          {/* Main Entry Windows & Wooden Beams */}
          <rect x="85" y="255" width="22" height="35" fill="#fbbf24" opacity="0.85" rx="1" />
          <rect x="149" y="255" width="22" height="35" fill="#f59e0b" opacity="0.85" rx="1" />
          <rect x="213" y="255" width="22" height="35" fill="#fbbf24" opacity="0.85" rx="1" />

          {/* Stone Rampart Base (Ishigaki Foundation) */}
          <path d="M 45,333 L 275,333 L 295,400 L 25,400 Z" fill="#607079" />
          <line x1="100" y1="333" x2="90" y2="400" stroke="#40505a" strokeWidth="2" opacity="0.65" />
          <line x1="160" y1="333" x2="160" y2="400" stroke="#40505a" strokeWidth="2" opacity="0.65" />
          <line x1="220" y1="333" x2="230" y2="400" stroke="#40505a" strokeWidth="2" opacity="0.65" />
        </svg>
      </div>

      {/* ── Foreground Layer 5: pine silhouettes give the castle scale ─────── */}
      <div
        className="absolute transition-transform duration-500 ease-out opacity-80"
        style={{
          left: `${castleX - 16}%`,
          top: `${castleY + 12}%`,
          width: 140,
          height: 180,
          transform: `translate(${fgX * 2}px, 0)`,
        }}
      >
        <svg viewBox="0 0 100 150" className="w-full h-full">
          {/* Japanese Pine Silhouette */}
          <polygon points="50,10 85,60 15,60" fill="#15803d" />
          <polygon points="50,45 90,95 10,95" fill="#166534" />
          <polygon points="50,80 95,135 5,135" fill="#14532d" />
          <rect x="44" y="135" width="12" height="15" fill="#451a03" />
        </svg>
      </div>

      <div className="absolute -bottom-8 -left-8 h-[48%] w-[34%] min-w-72 opacity-95 transition-transform duration-300" style={{ transform: `translateX(${fgX * 3}px)` }}>
        <svg viewBox="0 0 300 460" className="h-full w-full" preserveAspectRatio="xMinYMax meet">
          <path d="M70 460 L122 112 L154 460Z" fill="#173b37" />
          <path d="M18 360 L125 86 L244 360 L193 330 L274 430 L0 430 L74 352Z" fill="#0f302f" />
          <path d="M95 460 L203 172 L248 460Z" fill="#245049" />
          <path d="M135 352 L204 132 L294 352 L250 322 L300 412 L98 412Z" fill="#183e3a" />
          <path d="M22 176 C55 108 114 112 144 174 C105 211 51 217 22 176Z" fill="#a8345d" opacity=".8" />
          <path d="M10 230 C63 170 126 180 164 236 C111 270 47 268 10 230Z" fill="#d04c78" opacity=".7" />
        </svg>
      </div>

      {/* ── Foreground Layer 4: Japanese Stone Lanterns (Tōrō) & Pathway ───── */}
      <div
        className="absolute bottom-6 right-16 z-10 transition-transform duration-300 pointer-events-none hidden md:block"
        style={{ transform: `translate(${fgX * 4}px, 0)` }}
      >
        <div className="flex items-end gap-6">
          {/* Stone Lantern (Tōrō 1) */}
          <svg viewBox="0 0 60 100" className="w-12 h-20">
            <rect x="25" y="80" width="10" height="20" fill="#475569" />
            <polygon points="30,50 50,65 10,65" fill="#334155" />
            <rect x="18" y="65" width="24" height="15" fill="#fbbf24" opacity="0.9" />
            <polygon points="30,30 55,50 5,50" fill="#1e293b" />
            <circle cx="30" cy="25" r="3" fill="#f59e0b" />
          </svg>

          {/* Stone Lantern (Tōrō 2 - Smaller) */}
          <svg viewBox="0 0 60 100" className="w-10 h-16 opacity-90">
            <rect x="25" y="80" width="10" height="20" fill="#475569" />
            <polygon points="30,50 50,65 10,65" fill="#334155" />
            <rect x="18" y="65" width="24" height="15" fill="#fbbf24" opacity="0.9" />
            <polygon points="30,30 55,50 5,50" fill="#1e293b" />
            <circle cx="30" cy="25" r="3" fill="#f59e0b" />
          </svg>
        </div>
      </div>

      {/* ── Visual Anchor: Hanging Japanese Scroll Banner (Top-Right Margin) ── */}
      <div className="absolute top-28 right-12 z-20 select-none pointer-events-none hidden lg:block">
        <div className="bg-[#fdf4f8]/95 border border-pink-300 shadow-md rounded-b-2xl p-2.5 text-center flex flex-col items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          <span className="font-serif-display font-bold text-base text-pink-700 writing-mode-vertical tracking-widest">
            継続は力なり
          </span>
          <span className="text-[8px] font-mono-code text-pink-600 uppercase tracking-tighter">
            Consistency Builds Futures
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── LIGHT WORLD: Bright Editorial Earth & Daylight Environment ───────────────
function LightWorld({ scrollRatio, mouse }: { scrollRatio: number; mouse: { x: number; y: number } }) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-1 overflow-hidden">
      {/* Warm Sunlit Base Gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background:
            "linear-gradient(140deg, #fefcf8 0%, #f6f3ea 35%, #eef5fc 70%, #f2f8ff 100%)",
        }}
      />

      {/* Sun Bloom Light Top-Right */}
      <div
        className="absolute -top-40 right-1/4 w-[750px] h-[750px] rounded-full pointer-events-none transition-transform duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(254, 243, 199, 0.6) 0%, rgba(239, 246, 255, 0.3) 55%, transparent 80%)",
          filter: "blur(40px)",
          transform: `translate(${mouse.x * 15}px, ${mouse.y * 15}px)`,
        }}
      />

      {/* Rolling Landscape Silhouette (Distant Midground) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72 opacity-25 transition-transform duration-500"
        style={{ transform: `translateY(${scrollRatio * -30}px)` }}
      >
        <svg viewBox="0 0 1200 300" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path
            d="M 0,300 L 0,220 Q 250,160 550,210 T 1050,180 T 1200,200 L 1200,300 Z"
            fill="#93c5fd"
          />
          <path
            d="M 0,300 L 0,250 Q 350,210 750,240 T 1200,220 L 1200,300 Z"
            fill="#86efac"
          />
        </svg>
      </div>

      {/* Houseplant Leaves Frame (Left & Right Margins) */}
      <div className="absolute top-10 -left-10 w-64 h-96 opacity-30 select-none">
        <svg viewBox="0 0 200 300" className="w-full h-full text-emerald-700 fill-current">
          <path d="M 10,10 Q 90,80 40,160 Q 120,100 180,180 Q 80,210 10,290 Z" />
        </svg>
      </div>
    </div>
  );
}

// ─── Master Export: Whole-Page Interactive World Engine ───────────────────────
export function ThemeAtmosphere() {
  const { theme } = useTheme();
  const [scrollRatio, setScrollRatio] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollRatio(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (theme === "dark") return <DarkWorld scrollRatio={scrollRatio} mouse={mouse} />;
  if (theme === "anime") return <AnimeWorld scrollRatio={scrollRatio} mouse={mouse} />;
  return <LightWorld scrollRatio={scrollRatio} mouse={mouse} />;
}
