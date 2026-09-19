import { useEffect, useRef } from "react";
import { DATA_MARKERS } from "./EarthScene3D";

interface MinimalWorldSceneProps {
  onMarkerClick?: (marker: { id: string; label: string; description: string }) => void;
}

export function MinimalWorldScene({ onMarkerClick }: MinimalWorldSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.38;

      // 1. Soft atmospheric light gradient
      const skyGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      skyGrad.addColorStop(0, "rgba(224, 242, 254, 0.45)");
      skyGrad.addColorStop(0.6, "rgba(240, 249, 255, 0.25)");
      skyGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Futuristic Floating City Sphere Silhouette & Biodome
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Biodome sky
      const domeGrad = ctx.createLinearGradient(cx, cy - R, cx, cy + R);
      domeGrad.addColorStop(0, "#bae6fd");
      domeGrad.addColorStop(0.5, "#e0f2fe");
      domeGrad.addColorStop(1, "#f0fdf4");
      ctx.fillStyle = domeGrad;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // Mountain / Island Base
      ctx.beginPath();
      ctx.moveTo(cx - R, cy + R * 0.4);
      ctx.bezierCurveTo(cx - R * 0.5, cy + R * 0.1, cx - R * 0.2, cy + R * 0.25, cx, cy + R * 0.2);
      ctx.bezierCurveTo(cx + R * 0.3, cy + R * 0.15, cx + R * 0.7, cy + R * 0.35, cx + R, cy + R * 0.4);
      ctx.lineTo(cx + R, cy + R);
      ctx.lineTo(cx - R, cy + R);
      ctx.closePath();
      ctx.fillStyle = "#86efac";
      ctx.fill();

      // City Tower Silhouettes in background
      const towers = [
        { x: -0.6, w: 0.1, h: 0.35 },
        { x: -0.45, w: 0.12, h: 0.5 },
        { x: -0.28, w: 0.14, h: 0.65 },
        { x: -0.1, w: 0.18, h: 0.78 }, // central spire
        { x: 0.12, w: 0.15, h: 0.68 },
        { x: 0.32, w: 0.12, h: 0.52 },
        { x: 0.48, w: 0.1, h: 0.38 },
      ];

      towers.forEach((tw) => {
        const tx = cx + tw.x * R;
        const twid = tw.w * R;
        const th = tw.h * R;
        const ty = cy + R * 0.3 - th;

        // Building gradient
        const bGrad = ctx.createLinearGradient(tx, ty, tx, ty + th);
        bGrad.addColorStop(0, "#ffffff");
        bGrad.addColorStop(0.5, "#e0f2fe");
        bGrad.addColorStop(1, "#93c5fd");
        ctx.fillStyle = bGrad;

        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(tx, ty, twid, th, [4, 4, 0, 0]) : ctx.rect(tx, ty, twid, th);
        ctx.fill();
        ctx.strokeStyle = "rgba(147, 197, 253, 0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Spire pinnacle
        if (tw.h > 0.6) {
          ctx.beginPath();
          ctx.moveTo(tx + twid / 2, ty);
          ctx.lineTo(tx + twid / 2, ty - 15);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Fluffy clouds inside biodome
      const cloudP = !prefersReduced ? (t * 0.08) % 1 : 0;
      for (let c = 0; c < 3; c++) {
        const clX = cx - R * 0.8 + ((c * 0.6 + cloudP) % 1.6) * R;
        const clY = cy - R * 0.1 + c * 25;
        ctx.beginPath();
        ctx.arc(clX, clY, 20, 0, Math.PI * 2);
        ctx.arc(clX + 15, clY - 8, 25, 0, Math.PI * 2);
        ctx.arc(clX + 35, clY, 18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.fill();
      }

      ctx.restore();

      // 3. Orbital Data Rings with Glowing Particle
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.15, R * 0.35, -0.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.25, R * 0.42, 0.15, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling Node on orbit
      if (!prefersReduced) {
        const angle = t * 0.8;
        const ox = cx + Math.cos(angle) * (R * 1.15) * Math.cos(-0.2) - Math.sin(angle) * (R * 0.35) * Math.sin(-0.2);
        const oy = cy + Math.cos(angle) * (R * 1.15) * Math.sin(-0.2) + Math.sin(angle) * (R * 0.35) * Math.cos(-0.2);
        ctx.beginPath();
        ctx.arc(ox, oy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#2563eb";
        ctx.shadowColor = "#3b82f6";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Glass Sphere Outer Ring & Highlight
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Subtle Glass Crescent Reflection
      ctx.beginPath();
      ctx.arc(cx, cy, R - 2, -Math.PI * 0.7, -Math.PI * 0.2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 4;
      ctx.stroke();

      t += 0.015;
    };

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const loop = () => {
      animRef.current = requestAnimationFrame(loop);
      if (!visible) return;
      draw();
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ minHeight: 480 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block", minHeight: 480 }}
        aria-label="Futuristic floating biodome city"
      />

      {/* ── 5 Interactive HUD Data Cards Over Floating Sphere ─────────── */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {DATA_MARKERS.map((marker, i) => {
          // Precise screen coordinates matching the reference image layout
          const positions = [
            { top: "8%", left: "55%" },   // Ideas (top center-right)
            { top: "28%", left: "10%" },  // Data (left)
            { top: "35%", right: "8%" },  // AI/ML (right)
            { bottom: "16%", left: "18%" }, // Engineering (bottom-left)
            { bottom: "12%", right: "16%" }, // Impact (bottom-right)
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
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border shadow-lg backdrop-blur-xl transition-all"
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
