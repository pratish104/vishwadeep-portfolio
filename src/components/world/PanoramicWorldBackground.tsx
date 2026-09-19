import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

export function PanoramicWorldBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Falling Sakura Petals & Floating Ambient Particles
    const petals = Array.from({ length: prefersReduced ? 0 : 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: 0.3 + Math.random() * 0.6,
      vy: 0.5 + Math.random() * 0.8,
      size: 4 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.4 + Math.random() * 0.4,
    }));

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (isLight) {
        // ── 1. LIGHT THEME: Sunlit Nature & Panoramic Bay Window Sky ──────────
        // Sky Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, "#dbeafe"); // Soft sky blue
        skyGrad.addColorStop(0.4, "#eff6ff");
        skyGrad.addColorStop(0.8, "#fdfcf9");
        skyGrad.addColorStop(1, "#f8f7f4");
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Warm Sun Glow from top right
        const sunGlow = ctx.createRadialGradient(W * 0.8, H * 0.15, 0, W * 0.8, H * 0.15, W * 0.6);
        sunGlow.addColorStop(0, "rgba(254, 243, 199, 0.6)");
        sunGlow.addColorStop(0.4, "rgba(253, 230, 138, 0.2)");
        sunGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = sunGlow;
        ctx.fillRect(0, 0, W, H);

        // Distant Misty Mountain Ridges (Layer 1 - farthest)
        ctx.beginPath();
        ctx.moveTo(0, H * 0.55);
        ctx.bezierCurveTo(W * 0.2, H * 0.48, W * 0.4, H * 0.58, W * 0.6, H * 0.5);
        ctx.bezierCurveTo(W * 0.75, H * 0.44, W * 0.88, H * 0.52, W, H * 0.48);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = "rgba(191, 219, 254, 0.35)";
        ctx.fill();

        // Mt. Fuji Silhouette (Center-Right in distance)
        const fujiX = W * 0.62;
        const fujiY = H * 0.48;
        const fujiW = W * 0.22;
        ctx.beginPath();
        ctx.moveTo(fujiX - fujiW * 0.5, fujiY);
        ctx.quadraticCurveTo(fujiX - fujiW * 0.15, fujiY - H * 0.18, fujiX, fujiY - H * 0.2);
        ctx.quadraticCurveTo(fujiX + fujiW * 0.15, fujiY - H * 0.18, fujiX + fujiW * 0.5, fujiY);
        ctx.closePath();
        ctx.fillStyle = "rgba(147, 197, 253, 0.4)";
        ctx.fill();

        // Mt. Fuji Snow Cap
        ctx.beginPath();
        ctx.moveTo(fujiX - fujiW * 0.14, fujiY - H * 0.16);
        ctx.quadraticCurveTo(fujiX - fujiW * 0.08, fujiY - H * 0.19, fujiX, fujiY - H * 0.2);
        ctx.quadraticCurveTo(fujiX + fujiW * 0.08, fujiY - H * 0.19, fujiX + fujiW * 0.14, fujiY - H * 0.16);
        ctx.lineTo(fujiX + fujiW * 0.08, fujiY - H * 0.14);
        ctx.lineTo(fujiX, fujiY - H * 0.15);
        ctx.lineTo(fujiX - fujiW * 0.08, fujiY - H * 0.14);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fill();

        // Midground Mountain Ridge with Lush Greenery (Layer 2)
        ctx.beginPath();
        ctx.moveTo(0, H * 0.65);
        ctx.bezierCurveTo(W * 0.25, H * 0.58, W * 0.5, H * 0.68, W * 0.75, H * 0.6);
        ctx.bezierCurveTo(W * 0.88, H * 0.56, W * 0.95, H * 0.62, W, H * 0.58);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = "rgba(187, 247, 208, 0.4)";
        ctx.fill();

        // Drifting Fluffy White Clouds
        for (let i = 0; i < 4; i++) {
          const cx = ((i * W * 0.3 + t * 12) % (W * 1.3)) - W * 0.15;
          const cy = H * (0.12 + i * 0.08);
          ctx.beginPath();
          ctx.arc(cx, cy, 35, 0, Math.PI * 2);
          ctx.arc(cx + 25, cy - 12, 45, 0, Math.PI * 2);
          ctx.arc(cx + 60, cy - 8, 38, 0, Math.PI * 2);
          ctx.arc(cx + 85, cy, 30, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
          ctx.fill();
        }
      } else if (isAnime) {
        // ── 2. ANIME THEME: Vibrant Japanese Garden & Evening Landscape ───────
        const animeSky = ctx.createLinearGradient(0, 0, 0, H);
        animeSky.addColorStop(0, "#bae6fd");
        animeSky.addColorStop(0.5, "#fce7f3");
        animeSky.addColorStop(1, "#fdf2f8");
        ctx.fillStyle = animeSky;
        ctx.fillRect(0, 0, W, H);

        // Mt Fuji & Pink Twilight Clouds
        const fujiX = W * 0.65;
        const fujiY = H * 0.5;
        const fujiW = W * 0.26;
        ctx.beginPath();
        ctx.moveTo(fujiX - fujiW * 0.5, fujiY);
        ctx.quadraticCurveTo(fujiX - fujiW * 0.15, fujiY - H * 0.22, fujiX, fujiY - H * 0.24);
        ctx.quadraticCurveTo(fujiX + fujiW * 0.15, fujiY - H * 0.22, fujiX + fujiW * 0.5, fujiY);
        ctx.closePath();
        ctx.fillStyle = "rgba(244, 114, 182, 0.35)";
        ctx.fill();
      } else {
        // ── 3. DARK THEME: Starry Deep Space & Celestial Nebula ───────────────
        const darkSky = ctx.createLinearGradient(0, 0, 0, H);
        darkSky.addColorStop(0, "#060812");
        darkSky.addColorStop(0.5, "#0b1226");
        darkSky.addColorStop(1, "#090c18");
        ctx.fillStyle = darkSky;
        ctx.fillRect(0, 0, W, H);

        // Nebula Glow
        const nebula = ctx.createRadialGradient(W * 0.7, H * 0.3, 0, W * 0.7, H * 0.3, W * 0.5);
        nebula.addColorStop(0, "rgba(99, 102, 241, 0.15)");
        nebula.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
        nebula.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Animate Falling Sakura Petals Across the Environment ───────────────
      if (!prefersReduced) {
        petals.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;

          if (p.y > H + 20) {
            p.y = -20;
            p.x = Math.random() * W;
          }
          if (p.x > W + 20) {
            p.x = -20;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(244, 114, 182, ${p.opacity * 0.6})`
            : `rgba(244, 114, 182, ${p.opacity * 0.8})`;
          ctx.fill();
          ctx.restore();
        });
      }

      t += 0.016;
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
      draw();
    };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [isDark, isAnime, isLight]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
