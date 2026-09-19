import { useEffect, useRef } from "react";
import { DATA_MARKERS } from "./EarthScene3D";

interface AnimeWorldSceneProps {
  scrollProgress?: number;
  onMarkerClick?: (marker: { id: string; label: string; description: string }) => void;
}

export function AnimeWorldScene({ scrollProgress = 0, onMarkerClick }: AnimeWorldSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const stateRef = useRef({
    time: 0,
    petals: [] as Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotVel: number;
      opacity: number;
    }>,
    birds: [] as Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      phase: number;
      size: number;
    }>,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize 45 sakura petals
    const petals = Array.from({ length: prefersReduced ? 0 : 45 }, () => ({
      x: Math.random() * 1.2 - 0.1,
      y: Math.random() * 1.2 - 0.1,
      vx: (Math.random() - 0.5) * 0.0015 + 0.0006,
      vy: 0.0009 + Math.random() * 0.0012,
      size: 4 + Math.random() * 6,
      rotation: Math.random() * Math.PI * 2,
      rotVel: (Math.random() - 0.5) * 0.05,
      opacity: 0.5 + Math.random() * 0.45,
    }));

    // Initialize 6 birds
    const birds = Array.from({ length: prefersReduced ? 0 : 6 }, (_, i) => ({
      x: -0.1 + i * 0.06,
      y: 0.18 + Math.random() * 0.12,
      vx: 0.0005 + Math.random() * 0.0003,
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

      // Parallax offsets
      const pSky = { x: (mx - 0.5) * 6, y: (my - 0.5) * 4 };
      const pFar = { x: (mx - 0.5) * 12, y: (my - 0.5) * 8 };
      const pMid = { x: (mx - 0.5) * 20, y: (my - 0.5) * 12 };
      const pNear = { x: (mx - 0.5) * 32, y: (my - 0.5) * 18 };
      const scrollDrift = scrollProgress * 40;

      // ── 1. Sky & Sun Gradient ──────────────────────────────────────────────
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.85);
      skyGrad.addColorStop(0, "#99c5f8"); // Clear anime blue
      skyGrad.addColorStop(0.35, "#cbe2fd"); // Soft azure
      skyGrad.addColorStop(0.65, "#fed7aa"); // Warm peach horizon
      skyGrad.addColorStop(0.85, "#fef08a"); // Golden sun glow
      skyGrad.addColorStop(1, "rgba(254, 240, 138, 0)");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H * 0.85);

      // Sun Core and Volumetric Rays
      const sunX = W * 0.65 + pSky.x * 0.4;
      const sunY = H * 0.16 + pSky.y * 0.4 - scrollDrift * 0.3;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, H * 0.35);
      sunGlow.addColorStop(0, "rgba(255, 250, 220, 0.9)");
      sunGlow.addColorStop(0.2, "rgba(255, 225, 140, 0.45)");
      sunGlow.addColorStop(0.6, "rgba(255, 190, 100, 0.15)");
      sunGlow.addColorStop(1, "rgba(255, 180, 80, 0)");
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Fluffy Cumulonimbus Anime Clouds ────────────────────────────────
      ctx.save();
      ctx.translate(pSky.x, pSky.y - scrollDrift * 0.15);
      const drawCloud = (cx: number, cy: number, scale: number) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(cx, cy, 45 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 40 * scale, cy - 18 * scale, 35 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 80 * scale, cy - 5 * scale, 42 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 120 * scale, cy + 10 * scale, 30 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 55 * scale, cy + 20 * scale, 48 * scale, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCloud(W * 0.15, H * 0.22, 1.2);
      drawCloud(W * 0.78, H * 0.18, 1.5);
      drawCloud(W * 0.45, H * 0.14, 0.9);
      ctx.restore();

      // ── 3. Mt. Fuji Silhouette with Snow Cap ──────────────────────────────
      ctx.save();
      ctx.translate(pFar.x, pFar.y - scrollDrift * 0.2);

      // Mountain Body
      ctx.fillStyle = "#6366f130";
      ctx.beginPath();
      ctx.moveTo(W * 0.05, H * 0.7);
      ctx.lineTo(W * 0.42, H * 0.24); // Left slope
      ctx.lineTo(W * 0.47, H * 0.24); // Flat crater top
      ctx.lineTo(W * 0.85, H * 0.7); // Right slope
      ctx.closePath();
      ctx.fill();

      // Snow Cap
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.beginPath();
      ctx.moveTo(W * 0.38, H * 0.31);
      ctx.lineTo(W * 0.42, H * 0.24);
      ctx.lineTo(W * 0.47, H * 0.24);
      ctx.lineTo(W * 0.51, H * 0.31);
      // Serrated snow edge
      ctx.lineTo(W * 0.48, H * 0.33);
      ctx.lineTo(W * 0.46, H * 0.31);
      ctx.lineTo(W * 0.44, H * 0.34);
      ctx.lineTo(W * 0.41, H * 0.32);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 4. Main & Secondary Floating Islands ───────────────────────────────
      // Central Hero Floating Island
      const drawFloatingIsland = (
        ix: number,
        iy: number,
        iw: number,
        ih: number,
        hasWaterfall = true,
        hasShrine = true
      ) => {
        ctx.save();
        ctx.translate(pMid.x, pMid.y - scrollDrift * 0.35);

        // Island Rock Bottom (Jagged earthen base)
        ctx.beginPath();
        ctx.moveTo(ix - iw * 0.5, iy);
        ctx.quadraticCurveTo(ix - iw * 0.2, iy + ih * 1.5, ix, iy + ih * 2.2);
        ctx.quadraticCurveTo(ix + iw * 0.3, iy + ih * 1.3, ix + iw * 0.5, iy);
        ctx.closePath();
        const rockGrad = ctx.createLinearGradient(ix, iy, ix, iy + ih * 2.2);
        rockGrad.addColorStop(0, "#785b3a");
        rockGrad.addColorStop(0.6, "#4a3520");
        rockGrad.addColorStop(1, "#271b0e");
        ctx.fillStyle = rockGrad;
        ctx.fill();

        // Island Grass Plateau Top
        ctx.beginPath();
        ctx.ellipse(ix, iy, iw * 0.5, ih * 0.45, 0, 0, Math.PI * 2);
        const grassGrad = ctx.createRadialGradient(ix, iy - ih * 0.2, 0, ix, iy, iw * 0.5);
        grassGrad.addColorStop(0, "#86efac");
        grassGrad.addColorStop(0.5, "#34d399");
        grassGrad.addColorStop(1, "#15803d");
        ctx.fillStyle = grassGrad;
        ctx.fill();

        // Traditional Japanese Pavilion/Shrine
        if (hasShrine) {
          const sx = ix - iw * 0.1;
          const sy = iy - ih * 0.25;
          // Red Torii Gate / Pavilion Base
          ctx.fillStyle = "#dc2626";
          ctx.fillRect(sx - 14, sy - 18, 4, 18);
          ctx.fillRect(sx + 10, sy - 18, 4, 18);
          // Curved Roof
          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.moveTo(sx - 24, sy - 18);
          ctx.quadraticCurveTo(sx, sy - 26, sx + 24, sy - 18);
          ctx.lineTo(sx + 20, sy - 22);
          ctx.quadraticCurveTo(sx, sy - 28, sx - 20, sy - 22);
          ctx.closePath();
          ctx.fill();
        }

        // Cherry Blossom Tree
        const tx = ix + iw * 0.18;
        const ty = iy - ih * 0.15;
        // Trunk
        ctx.fillStyle = "#5c3d2e";
        ctx.fillRect(tx - 3, ty - 22, 6, 22);
        // Blossom Canopy
        const bGrad = ctx.createRadialGradient(tx, ty - 32, 0, tx, ty - 32, iw * 0.22);
        bGrad.addColorStop(0, "rgba(255, 192, 203, 0.95)");
        bGrad.addColorStop(0.6, "rgba(244, 114, 182, 0.85)");
        bGrad.addColorStop(1, "rgba(236, 72, 153, 0)");
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.ellipse(tx, ty - 32, iw * 0.22, ih * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cascading Waterfall off Cliff Edge
        if (hasWaterfall) {
          const wfx = ix - iw * 0.22;
          const wfGrad = ctx.createLinearGradient(wfx, iy, wfx, iy + ih * 2.6);
          wfGrad.addColorStop(0, "rgba(186, 230, 253, 0.9)");
          wfGrad.addColorStop(0.5, "rgba(125, 211, 252, 0.7)");
          wfGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.fillStyle = wfGrad;
          ctx.beginPath();
          ctx.moveTo(wfx - 5, iy);
          ctx.quadraticCurveTo(wfx - 10 + Math.sin(time + 1) * 3, iy + ih * 1.3, wfx - 14, iy + ih * 2.6);
          ctx.lineTo(wfx - 4, iy + ih * 2.6);
          ctx.quadraticCurveTo(wfx + Math.sin(time + 1) * 3, iy + ih * 1.3, wfx + 5, iy);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      };

      // Main Center Island
      drawFloatingIsland(W * 0.52, H * 0.32, W * 0.32, H * 0.08, true, true);
      // Secondary Left Island
      drawFloatingIsland(W * 0.24, H * 0.22, W * 0.16, H * 0.05, false, false);
      // Secondary Right Island
      drawFloatingIsland(W * 0.82, H * 0.26, W * 0.18, H * 0.055, true, false);

      // ── 5. Drifting Sakura Petals (Particles) ───────────────────────────────
      if (!prefersReduced) {
        for (const petal of stateRef.current.petals) {
          ctx.save();
          ctx.globalAlpha = petal.opacity;
          ctx.translate(petal.x * W, petal.y * H);
          ctx.rotate(petal.rotation);
          ctx.fillStyle = "rgba(251, 146, 60, 0.2)"; // warm underglow
          ctx.beginPath();
          ctx.ellipse(0, 0, petal.size, petal.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(244, 114, 182, 0.85)"; // vibrant pink
          ctx.fill();
          ctx.restore();

          petal.x += petal.vx + (mx - 0.5) * 0.0004;
          petal.y += petal.vy;
          petal.rotation += petal.rotVel;
          if (petal.y > 1.1) {
            petal.y = -0.05;
            petal.x = Math.random() * 1.2 - 0.1;
          }
        }
      }

      // ── 6. Flying Birds Flock ───────────────────────────────────────────────
      if (!prefersReduced) {
        for (const bird of stateRef.current.birds) {
          ctx.save();
          ctx.translate(
            bird.x * W + pNear.x * 0.3,
            bird.y * H + Math.sin(bird.phase) * 6 + pNear.y * 0.3 - scrollDrift * 0.1
          );
          ctx.strokeStyle = "rgba(40, 30, 30, 0.75)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(-bird.size, Math.sin(bird.phase * 2) * bird.size * 0.35);
          ctx.quadraticCurveTo(0, -bird.size * 0.25, bird.size, Math.sin(bird.phase * 2 + 1) * bird.size * 0.35);
          ctx.stroke();
          ctx.restore();

          bird.x += bird.vx;
          bird.phase += 0.06;
          if (bird.x > 1.15) bird.x = -0.1;
        }
      }

      stateRef.current.time += 0.015;
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      if (!isVisible) return;
      drawScene();
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [scrollProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ minHeight: 480 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block", minHeight: 480 }}
        aria-label="Anime nature floating islands world with Mt. Fuji and cherry blossoms"
      />

      {/* Floating 5 Data Marker HUD cards placed over the Anime Islands */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {DATA_MARKERS.map((m, idx) => {
          // Positions calculated to float gracefully around the anime sky islands
          const positions = [
            { left: "55%", top: "12%" }, // Ideas (top peak)
            { left: "28%", top: "24%" }, // Data (left floating island)
            { left: "74%", top: "28%" }, // AI/ML (right floating island)
            { left: "42%", top: "45%" }, // Engineering (central pavilion)
            { left: "68%", top: "52%" }, // Impact (near waterfall)
          ];
          const pos = positions[idx] || positions[0];

          return (
            <div
              key={m.id}
              style={{ left: pos.left, top: pos.top }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
              onClick={() => onMarkerClick?.({ id: m.id, label: m.label, description: m.description })}
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-xl shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:-translate-y-1"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  borderColor: "rgba(244, 114, 182, 0.4)",
                  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12), 0 0 12px rgba(244, 114, 182, 0.2)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold font-mono-code text-gray-900">{m.label}</span>
                  <span className="text-[9px] font-mono-code text-gray-500">{m.sublabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
