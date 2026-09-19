import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// ─── Light Theme: Warm Editorial Daylight Sunroom ─────────────────────────────
function LightAtmosphere() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Warm sunlit base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #fef9f0 0%, #f7f3ea 30%, #eef5fd 70%, #f0f8ff 100%)",
        }}
      />
      {/* Sun bloom top-right */}
      <div
        className="absolute -top-32 right-1/3 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,243,185,0.55) 0%, rgba(239,246,255,0.25) 55%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      {/* Warm room floor glow bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background:
            "linear-gradient(to top, rgba(255,243,230,0.4) 0%, transparent 100%)",
        }}
      />
      {/* Ambient left-side green tint (plant light spill) */}
      <div
        className="absolute top-0 bottom-0 -left-20 w-80"
        style={{
          background:
            "linear-gradient(to right, rgba(187,247,208,0.18) 0%, transparent 100%)",
        }}
      />
      {/* Right-side window light beam */}
      <div
        className="absolute top-0 -right-20 w-80 h-full"
        style={{
          background:
            "linear-gradient(to left, rgba(254,249,195,0.25) 0%, transparent 100%)",
        }}
      />
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

// ─── Dark Theme: Deep Space / Earth Night ─────────────────────────────────────
function DarkAtmosphere() {
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
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Star field
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.015 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      // Deep space nebula
      const grad = ctx.createRadialGradient(w * 0.65, h * 0.3, 0, w * 0.65, h * 0.3, w * 0.7);
      grad.addColorStop(0, "rgba(14, 42, 110, 0.6)");
      grad.addColorStop(0.35, "rgba(68, 17, 119, 0.3)");
      grad.addColorStop(0.7, "rgba(6, 9, 22, 0.15)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Purple accent nebula left
      const nebLeft = ctx.createRadialGradient(w * 0.15, h * 0.6, 0, w * 0.15, h * 0.6, w * 0.4);
      nebLeft.addColorStop(0, "rgba(88, 28, 135, 0.2)");
      nebLeft.addColorStop(1, "transparent");
      ctx.fillStyle = nebLeft;
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach((s) => {
        const pulse = 0.4 + Math.sin(t * s.speed * 60 + s.angle) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
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
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #060913 0%, #090e22 45%, #0c1130 100%)" }}
      />
      {/* Animated star canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Horizon glow (planet/Earth edge) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(to top, rgba(14,42,110,0.5) 0%, rgba(30,58,138,0.2) 50%, transparent 100%)",
        }}
      />
      {/* Top-right deep cyan glow (star cluster) */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}

// ─── Anime Theme: Japanese Floating Islands + Sakura Atmosphere ───────────────
function AnimeAtmosphere() {
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
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const petals = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 5 + 3,
      speedX: Math.random() * 0.8 + 0.3,
      speedY: Math.random() * 0.6 + 0.4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    let t = 0;
    const render = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      petals.forEach((p) => {
        p.x += p.speedX + Math.sin(t * 0.5 + p.rot) * 0.3;
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
        ctx.fillStyle = "#f9a8d4";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.6, p.size * 0.8, 0, 0, Math.PI * 2);
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

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft pastel sky base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, #fef1f8 0%, #fde8f2 25%, #f0f4ff 60%, #e8f5e9 100%)",
        }}
      />
      {/* Top sky light */}
      <div
        className="absolute top-0 left-0 right-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,241,248,0.95) 0%, transparent 100%)",
        }}
      />
      {/* Cherry blossom canvas layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Bottom ground mist */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56"
        style={{
          background:
            "linear-gradient(to top, rgba(255,240,250,0.6) 0%, transparent 100%)",
        }}
      />
      {/* Left edge warm glow */}
      <div
        className="absolute top-0 bottom-0 left-0 w-48"
        style={{
          background:
            "linear-gradient(to right, rgba(253,232,240,0.5) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────
export function ThemeAtmosphere() {
  const { theme } = useTheme();

  if (theme === "dark") return <DarkAtmosphere />;
  if (theme === "anime") return <AnimeAtmosphere />;
  return <LightAtmosphere />;
}
