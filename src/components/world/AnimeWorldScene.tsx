import { useEffect, useRef } from "react";

interface AnimeWorldSceneProps {
  scrollProgress?: number; // 0–1 for scroll-driven effects
}

export function AnimeWorldScene({ scrollProgress = 0 }: AnimeWorldSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const stateRef = useRef({
    time: 0,
    petals: [] as Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; rotation: number; rotVel: number; opacity: number;
    }>,
    birds: [] as Array<{
      x: number; y: number; vx: number; vy: number;
      phase: number; size: number;
    }>,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize sakura petals
    const petals = Array.from({ length: prefersReduced ? 0 : 40 }, () => ({
      x: Math.random() * 1.2 - 0.1,
      y: Math.random() * 1.2 - 0.1,
      vx: (Math.random() - 0.5) * 0.0012,
      vy: 0.0008 + Math.random() * 0.001,
      size: 3 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotVel: (Math.random() - 0.5) * 0.04,
      opacity: 0.5 + Math.random() * 0.5,
    }));

    const birds = Array.from({ length: prefersReduced ? 0 : 5 }, (_, i) => ({
      x: -0.05 + i * 0.05,
      y: 0.18 + Math.random() * 0.1,
      vx: 0.0004 + Math.random() * 0.0003,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      size: 5 + Math.random() * 4,
    }));

    stateRef.current.petals = petals;
    stateRef.current.birds = birds;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    const drawScene = () => {
      if (!ctx || !canvas) return;
      const W = canvas.width;
      const H = canvas.height;
      const { time } = stateRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      // Parallax offsets per layer
      const p0 = { x: (mx - 0.5) * 4, y: (my - 0.5) * 2 };   // sky
      const p1 = { x: (mx - 0.5) * 8, y: (my - 0.5) * 4 };   // far mountains
      const p2 = { x: (mx - 0.5) * 14, y: (my - 0.5) * 6 };  // mid islands
      const p3 = { x: (mx - 0.5) * 22, y: (my - 0.5) * 10 }; // near elements
      const scrollOff = scrollProgress * 30;

      // ── LAYER 0: Sky gradient ─────────────────────────────────────────────
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.75);
      skyGrad.addColorStop(0, "#d4aaee");   // soft lavender top
      skyGrad.addColorStop(0.25, "#f0c5d0"); // warm rose
      skyGrad.addColorStop(0.55, "#fed7aa"); // peach horizon
      skyGrad.addColorStop(0.75, "#fde68a"); // warm glow
      skyGrad.addColorStop(1, "#86efac20"); // fade to transparent
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H * 0.75);

      // Sun glow
      const sunX = W * 0.7 + p0.x * 0.3;
      const sunY = H * 0.18 + p0.y * 0.3 - scrollOff * 0.5;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, H * 0.22);
      sunGlow.addColorStop(0, "rgba(255, 230, 150, 0.7)");
      sunGlow.addColorStop(0.3, "rgba(255, 200, 100, 0.25)");
      sunGlow.addColorStop(1, "rgba(255, 170, 80, 0)");
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, W, H);

      // ── LAYER 1: Far mountains (Mt. Fuji-inspired silhouette) ─────────────
      ctx.save();
      ctx.translate(p1.x, p1.y - scrollOff * 0.2);
      ctx.fillStyle = "rgba(130, 100, 160, 0.35)";
      ctx.beginPath();
      ctx.moveTo(W * -0.05, H * 0.75);
      // Far ridge
      ctx.lineTo(W * 0.05, H * 0.48);
      ctx.lineTo(W * 0.15, H * 0.62);
      ctx.lineTo(W * 0.25, H * 0.44);
      // Fuji peak
      ctx.lineTo(W * 0.35, H * 0.26);
      ctx.lineTo(W * 0.38, H * 0.24);  // peak tip
      ctx.lineTo(W * 0.41, H * 0.26);
      ctx.lineTo(W * 0.52, H * 0.42);
      ctx.lineTo(W * 0.62, H * 0.50);
      ctx.lineTo(W * 0.72, H * 0.35);
      ctx.lineTo(W * 0.82, H * 0.55);
      ctx.lineTo(W * 0.95, H * 0.48);
      ctx.lineTo(W * 1.05, H * 0.6);
      ctx.lineTo(W * 1.05, H * 0.75);
      ctx.closePath();
      ctx.fill();

      // Snow cap on Fuji
      ctx.fillStyle = "rgba(255, 252, 248, 0.8)";
      ctx.beginPath();
      ctx.moveTo(W * 0.35, H * 0.275);
      ctx.lineTo(W * 0.38, H * 0.24);
      ctx.lineTo(W * 0.41, H * 0.275);
      ctx.lineTo(W * 0.39, H * 0.29);
      ctx.lineTo(W * 0.37, H * 0.29);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── LAYER 2: Far mist band ─────────────────────────────────────────────
      ctx.save();
      ctx.translate(p1.x, p1.y - scrollOff * 0.15);
      const mistGrad = ctx.createLinearGradient(0, H * 0.52, 0, H * 0.66);
      mistGrad.addColorStop(0, "rgba(255, 240, 255, 0)");
      mistGrad.addColorStop(0.4, "rgba(255, 245, 255, 0.45)");
      mistGrad.addColorStop(1, "rgba(255, 240, 255, 0)");
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, H * 0.52, W, H * 0.14);
      ctx.restore();

      // ── LAYER 2: Floating islands ─────────────────────────────────────────
      const islands = [
        { x: 0.38, y: 0.28, w: 0.25, h: 0.09, color: "#4a7c59" },
        { x: 0.58, y: 0.2, w: 0.15, h: 0.06, color: "#5a8a6a" },
        { x: 0.2, y: 0.38, w: 0.12, h: 0.045, color: "#3d6b4f" },
      ];

      for (const isl of islands) {
        ctx.save();
        ctx.translate(p2.x, p2.y - scrollOff * 0.3);
        const ix = isl.x * W;
        const iy = isl.y * H;
        const iw = isl.w * W;
        const ih = isl.h * H;

        // Island soil/rock bottom
        ctx.beginPath();
        ctx.ellipse(ix, iy + ih * 0.3, iw * 0.5, ih * 0.8, 0, 0, Math.PI * 2);
        const rockGrad = ctx.createLinearGradient(ix, iy - ih, ix, iy + ih);
        rockGrad.addColorStop(0, "#6b5a3e");
        rockGrad.addColorStop(1, "#3d3020");
        ctx.fillStyle = rockGrad;
        ctx.fill();

        // Island grass top
        ctx.beginPath();
        ctx.ellipse(ix, iy - ih * 0.1, iw * 0.5, ih * 0.5, 0, 0, Math.PI * 2);
        const grassGrad = ctx.createRadialGradient(ix, iy - ih * 0.2, 0, ix, iy - ih * 0.2, iw * 0.5);
        grassGrad.addColorStop(0, "#7bc87a");
        grassGrad.addColorStop(0.6, isl.color);
        grassGrad.addColorStop(1, "#2d5a3d");
        ctx.fillStyle = grassGrad;
        ctx.fill();

        // Cherry blossom tree on main island
        if (isl.w > 0.15) {
          const tx = ix - iw * 0.05;
          const ty = iy - ih * 0.5;
          // trunk
          ctx.fillStyle = "#5c3a1e";
          ctx.fillRect(tx - 3, ty, 6, ih * 0.45);
          // blossom canopy
          const blossomGrad = ctx.createRadialGradient(tx, ty - ih * 0.1, 0, tx, ty - ih * 0.1, iw * 0.18);
          blossomGrad.addColorStop(0, "rgba(255, 180, 200, 0.95)");
          blossomGrad.addColorStop(0.5, "rgba(255, 150, 175, 0.85)");
          blossomGrad.addColorStop(1, "rgba(255, 120, 150, 0)");
          ctx.fillStyle = blossomGrad;
          ctx.beginPath();
          ctx.ellipse(tx, ty - ih * 0.1, iw * 0.18, ih * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();

          // Waterfall from island edge
          const wfx = ix + iw * 0.3;
          const wfGrad = ctx.createLinearGradient(wfx, iy, wfx, iy + ih * 2.5);
          wfGrad.addColorStop(0, "rgba(160, 210, 255, 0.7)");
          wfGrad.addColorStop(0.5, "rgba(130, 190, 255, 0.4)");
          wfGrad.addColorStop(1, "rgba(100, 170, 255, 0)");
          ctx.fillStyle = wfGrad;
          ctx.beginPath();
          ctx.moveTo(wfx - 4, iy);
          ctx.quadraticCurveTo(wfx - 8 + Math.sin(time * 0.5) * 3, iy + ih * 1.2, wfx - 12, iy + ih * 2.5);
          ctx.quadraticCurveTo(wfx + Math.sin(time * 0.7) * 3, iy + ih * 1.2, wfx + 4, iy);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // ── LAYER 3: Lake / ground plane ──────────────────────────────────────
      ctx.save();
      ctx.translate(p2.x * 0.3, p2.y * 0.3 - scrollOff * 0.1);
      const lakeY = H * 0.68;
      const lakeGrad = ctx.createLinearGradient(0, lakeY, 0, H);
      lakeGrad.addColorStop(0, "rgba(80, 140, 200, 0.6)");
      lakeGrad.addColorStop(0.4, "rgba(60, 120, 180, 0.8)");
      lakeGrad.addColorStop(1, "rgba(40, 90, 150, 0.9)");
      ctx.fillStyle = lakeGrad;
      ctx.beginPath();
      ctx.ellipse(W * 0.5, lakeY + H * 0.05, W * 0.7, H * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lake reflection shimmer
      for (let r = 0; r < 8; r++) {
        const rx = W * (0.2 + r * 0.08) + Math.sin(time * 0.8 + r) * 4;
        const ry = lakeY + r * 3;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + Math.sin(time + r) * 0.03})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rx - 15 + Math.sin(time + r) * 5, ry);
        ctx.lineTo(rx + 15, ry);
        ctx.stroke();
      }
      ctx.restore();

      // ── LAYER 3: Foreground Sakura trees ──────────────────────────────────
      const fgTrees = [
        { x: -0.02, y: 0.72, trunk: 0.22, r: 0.14 },
        { x: 0.92, y: 0.68, trunk: 0.18, r: 0.12 },
      ];
      for (const tr of fgTrees) {
        ctx.save();
        ctx.translate(p3.x, p3.y - scrollOff * 0.05);
        const tx = tr.x * W;
        const ty = tr.y * H;
        ctx.fillStyle = "#4a2c12";
        const trunkH = tr.trunk * H;
        ctx.fillRect(tx - 8, ty - trunkH, 16, trunkH + H * 0.05);
        // Branches
        ctx.strokeStyle = "#4a2c12";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(tx, ty - trunkH);
        ctx.quadraticCurveTo(tx - W * 0.05, ty - trunkH - H * 0.06, tx - W * 0.08, ty - trunkH - H * 0.12);
        ctx.moveTo(tx, ty - trunkH);
        ctx.quadraticCurveTo(tx + W * 0.04, ty - trunkH - H * 0.05, tx + W * 0.09, ty - trunkH - H * 0.1);
        ctx.stroke();
        // Blossom canopy
        const rr = tr.r * W;
        const blossomGrad = ctx.createRadialGradient(tx, ty - trunkH - rr * 0.3, 0, tx, ty - trunkH - rr * 0.3, rr);
        blossomGrad.addColorStop(0, "rgba(255, 190, 215, 0.98)");
        blossomGrad.addColorStop(0.5, "rgba(250, 160, 185, 0.9)");
        blossomGrad.addColorStop(0.9, "rgba(240, 130, 165, 0.5)");
        blossomGrad.addColorStop(1, "rgba(220, 120, 155, 0)");
        ctx.fillStyle = blossomGrad;
        ctx.beginPath();
        ctx.ellipse(tx, ty - trunkH - rr * 0.3, rr, rr * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        // Secondary canopy
        ctx.beginPath();
        ctx.ellipse(tx - rr * 0.4, ty - trunkH, rr * 0.65, rr * 0.6, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(tx + rr * 0.4, ty - trunkH, rr * 0.65, rr * 0.6, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── LAYER 4: Sakura petals (particles) ───────────────────────────────
      if (!prefersReduced) {
        for (const petal of stateRef.current.petals) {
          ctx.save();
          ctx.globalAlpha = petal.opacity;
          ctx.translate(petal.x * W, petal.y * H);
          ctx.rotate(petal.rotation);
          // Petal shape (simple ellipse)
          ctx.fillStyle = `rgba(255, 180, 200, ${petal.opacity})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, petal.size, petal.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Update
          petal.x += petal.vx + (mx - 0.5) * 0.0003;
          petal.y += petal.vy;
          petal.rotation += petal.rotVel;
          if (petal.y > 1.1) {
            petal.y = -0.05;
            petal.x = Math.random();
          }
          if (petal.x < -0.05) petal.x = 1.05;
          if (petal.x > 1.05) petal.x = -0.05;
        }
      }

      // ── LAYER 5: Birds ────────────────────────────────────────────────────
      if (!prefersReduced) {
        for (const bird of stateRef.current.birds) {
          ctx.save();
          ctx.translate(bird.x * W + p3.x * 0.5, bird.y * H + Math.sin(bird.phase) * 6 + p3.y * 0.5 - scrollOff * 0.04);
          ctx.strokeStyle = "rgba(60, 40, 40, 0.6)";
          ctx.lineWidth = bird.size * 0.3;
          ctx.beginPath();
          // Simple bird V-shape
          ctx.moveTo(-bird.size, Math.sin(bird.phase * 2) * bird.size * 0.3);
          ctx.quadraticCurveTo(0, -bird.size * 0.2, bird.size, Math.sin(bird.phase * 2 + 1) * bird.size * 0.3);
          ctx.stroke();
          ctx.restore();

          bird.x += bird.vx;
          bird.phase += 0.05;
          if (bird.x > 1.1) bird.x = -0.1;
        }
      }

      // ── Vignette overlay ──────────────────────────────────────────────────
      const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      stateRef.current.time += 0.012;
    };

    // ── Visibility pause ─────────────────────────────────────────────────────
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      if (!visible) return;
      drawScene();
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block", minHeight: 400 }}
      aria-label="Animated nature scene with floating islands, cherry blossom trees, and mountains"
    />
  );
}
