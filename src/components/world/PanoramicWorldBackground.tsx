import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

export function PanoramicWorldBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isDark = theme === "dark";
  const isAnime = theme === "anime";

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

    // Floating ambient dust particles (light or dark)
    const particles = Array.from({ length: prefersReduced ? 0 : 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.15 - Math.random() * 0.25,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.25,
    }));

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (isDark) {
        // ── DARK THEME: Deep Space with Nebula ──────────────────────────────
        const darkSky = ctx.createLinearGradient(0, 0, 0, H);
        darkSky.addColorStop(0, "#040509");
        darkSky.addColorStop(0.45, "#07091a");
        darkSky.addColorStop(1, "#040711");
        ctx.fillStyle = darkSky;
        ctx.fillRect(0, 0, W, H);

        // Nebula glow top-right
        const neb1 = ctx.createRadialGradient(W * 0.72, H * 0.22, 0, W * 0.72, H * 0.22, W * 0.5);
        neb1.addColorStop(0, "rgba(63, 84, 246, 0.14)");
        neb1.addColorStop(0.5, "rgba(99, 45, 189, 0.06)");
        neb1.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = neb1;
        ctx.fillRect(0, 0, W, H);

        // Faint bottom horizon light
        const bottomGlow = ctx.createLinearGradient(0, H * 0.75, 0, H);
        bottomGlow.addColorStop(0, "rgba(0,0,0,0)");
        bottomGlow.addColorStop(1, "rgba(10, 20, 60, 0.35)");
        ctx.fillStyle = bottomGlow;
        ctx.fillRect(0, 0, W, H);

        // Stars
        if (!prefersReduced) {
          for (let s = 0; s < 160; s++) {
            const sx = ((s * 137.5 + t * 0.5) % W);
            const sy = (s * 71.3 + Math.sin(t * 0.4 + s) * 0.8) % H;
            const brightness = 0.4 + Math.sin(t * 1.2 + s * 0.8) * 0.3;
            const radius = 0.7 + (s % 3) * 0.5;
            ctx.beginPath();
            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 210, 255, ${brightness * 0.8})`;
            ctx.fill();
          }
        }

      } else if (isAnime) {
        // ── ANIME THEME: Pastel Twilight — Lavender / Peach Sky ─────────────
        const animeSky = ctx.createLinearGradient(0, 0, 0, H);
        animeSky.addColorStop(0, "#c4b5fd");
        animeSky.addColorStop(0.35, "#fbcfe8");
        animeSky.addColorStop(0.65, "#fef3c7");
        animeSky.addColorStop(1, "#fdf2f8");
        ctx.fillStyle = animeSky;
        ctx.fillRect(0, 0, W, H);

        // Horizon glow
        const horizGlow = ctx.createRadialGradient(W * 0.5, H * 0.75, 0, W * 0.5, H * 0.75, W * 0.7);
        horizGlow.addColorStop(0, "rgba(253, 186, 116, 0.4)");
        horizGlow.addColorStop(0.5, "rgba(244, 114, 182, 0.15)");
        horizGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = horizGlow;
        ctx.fillRect(0, 0, W, H);

        // Distant mountain silhouettes — blue/purple gradient
        ctx.beginPath();
        ctx.moveTo(0, H * 0.55);
        ctx.bezierCurveTo(W * 0.12, H * 0.44, W * 0.28, H * 0.56, W * 0.45, H * 0.47);
        ctx.bezierCurveTo(W * 0.62, H * 0.38, W * 0.78, H * 0.52, W, H * 0.45);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = "rgba(167, 139, 250, 0.28)";
        ctx.fill();

        // Midground rolling hills
        ctx.beginPath();
        ctx.moveTo(0, H * 0.68);
        ctx.bezierCurveTo(W * 0.18, H * 0.6, W * 0.42, H * 0.7, W * 0.66, H * 0.62);
        ctx.bezierCurveTo(W * 0.82, H * 0.56, W * 0.93, H * 0.66, W, H * 0.62);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = "rgba(216, 180, 254, 0.22)";
        ctx.fill();

        // Soft clouds
        if (!prefersReduced) {
          for (let c = 0; c < 4; c++) {
            const cx = ((c * W * 0.3 + t * 6) % (W * 1.3)) - W * 0.15;
            const cy = H * (0.06 + c * 0.07);
            ctx.beginPath();
            ctx.arc(cx, cy, 28, 0, Math.PI * 2);
            ctx.arc(cx + 24, cy - 8, 36, 0, Math.PI * 2);
            ctx.arc(cx + 56, cy - 4, 30, 0, Math.PI * 2);
            ctx.arc(cx + 82, cy, 22, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
            ctx.fill();
          }
        }

      } else {
        // ── LIGHT THEME (PRIMARY): Bright Editorial Landscape — Premium Daylight ──

        // 1. Crisp blue-white sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, "#cce8fb");
        skyGrad.addColorStop(0.28, "#ddf0fd");
        skyGrad.addColorStop(0.55, "#eef8fe");
        skyGrad.addColorStop(0.78, "#f5fbfe");
        skyGrad.addColorStop(1, "#f8f7f4");
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // 2. Large warm sun disc — upper right
        const sunX = W * 0.82;
        const sunY = H * 0.1;

        // Outer atmospheric haze
        const sunHaze = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.55);
        sunHaze.addColorStop(0, "rgba(255, 247, 179, 0.7)");
        sunHaze.addColorStop(0.25, "rgba(253, 224, 100, 0.22)");
        sunHaze.addColorStop(0.6, "rgba(255, 244, 200, 0.08)");
        sunHaze.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = sunHaze;
        ctx.fillRect(0, 0, W, H);

        // Sun disc
        ctx.beginPath();
        ctx.arc(sunX, sunY, 38, 0, Math.PI * 2);
        const sunDisc = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 38);
        sunDisc.addColorStop(0, "rgba(255, 252, 220, 0.95)");
        sunDisc.addColorStop(0.6, "rgba(254, 240, 138, 0.7)");
        sunDisc.addColorStop(1, "rgba(253, 224, 100, 0)");
        ctx.fillStyle = sunDisc;
        ctx.fill();

        // 3. Faint light rays from sun
        if (!prefersReduced) {
          ctx.save();
          ctx.translate(sunX, sunY);
          ctx.globalAlpha = 0.04 + Math.sin(t * 0.5) * 0.01;
          for (let r = 0; r < 8; r++) {
            const angle = (r / 8) * Math.PI * 2 + t * 0.03;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * W * 0.9, Math.sin(angle) * W * 0.9);
            ctx.lineWidth = 40;
            ctx.strokeStyle = "rgba(255, 250, 200, 1)";
            ctx.stroke();
          }
          ctx.restore();
          ctx.globalAlpha = 1;
        }

        // 4. Far distant mountain ridge — very pale blue
        ctx.beginPath();
        ctx.moveTo(0, H * 0.5);
        ctx.bezierCurveTo(W * 0.08, H * 0.43, W * 0.22, H * 0.55, W * 0.38, H * 0.46);
        ctx.bezierCurveTo(W * 0.52, H * 0.38, W * 0.68, H * 0.5, W * 0.84, H * 0.42);
        ctx.bezierCurveTo(W * 0.92, H * 0.38, W * 0.97, H * 0.44, W, H * 0.42);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = "rgba(186, 224, 248, 0.38)";
        ctx.fill();

        // 5. Mid mountain range — slightly richer
        ctx.beginPath();
        ctx.moveTo(0, H * 0.58);
        ctx.bezierCurveTo(W * 0.14, H * 0.52, W * 0.3, H * 0.62, W * 0.5, H * 0.54);
        ctx.bezierCurveTo(W * 0.66, H * 0.48, W * 0.8, H * 0.58, W, H * 0.52);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = "rgba(147, 210, 240, 0.28)";
        ctx.fill();

        // 6. Foreground rolling green hills at bottom
        ctx.beginPath();
        ctx.moveTo(0, H * 0.72);
        ctx.bezierCurveTo(W * 0.15, H * 0.66, W * 0.35, H * 0.74, W * 0.55, H * 0.68);
        ctx.bezierCurveTo(W * 0.72, H * 0.63, W * 0.88, H * 0.7, W, H * 0.67);
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        const hillGrad = ctx.createLinearGradient(0, H * 0.68, 0, H);
        hillGrad.addColorStop(0, "rgba(187, 247, 208, 0.35)");
        hillGrad.addColorStop(0.5, "rgba(167, 243, 208, 0.22)");
        hillGrad.addColorStop(1, "rgba(134, 239, 172, 0.15)");
        ctx.fillStyle = hillGrad;
        ctx.fill();

        // 7. Soft animated cumulus clouds
        if (!prefersReduced) {
          for (let c = 0; c < 5; c++) {
            const cx = ((c * W * 0.28 + t * 7) % (W * 1.4)) - W * 0.18;
            const cy = H * (0.05 + c * 0.065);
            const scale = 0.8 + (c % 3) * 0.3;
            ctx.beginPath();
            ctx.arc(cx, cy, 30 * scale, 0, Math.PI * 2);
            ctx.arc(cx + 26 * scale, cy - 10 * scale, 40 * scale, 0, Math.PI * 2);
            ctx.arc(cx + 62 * scale, cy - 5 * scale, 34 * scale, 0, Math.PI * 2);
            ctx.arc(cx + 90 * scale, cy, 26 * scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${0.55 + c * 0.04})`;
            ctx.fill();
          }
        }

        // 8. Bottom gradient fade to page color
        const bottomFade = ctx.createLinearGradient(0, H * 0.7, 0, H);
        bottomFade.addColorStop(0, "rgba(248, 247, 244, 0)");
        bottomFade.addColorStop(1, "rgba(248, 247, 244, 0.92)");
        ctx.fillStyle = bottomFade;
        ctx.fillRect(0, 0, W, H);
      }

      // Ambient floating dust particles
      if (!prefersReduced) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) {
            p.y = H + 10;
            p.x = Math.random() * W;
          }
          if (p.x < -10) p.x = W + 10;
          if (p.x > W + 10) p.x = -10;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          if (isDark) {
            ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity * 0.7})`;
          } else if (isAnime) {
            ctx.fillStyle = `rgba(244, 114, 182, ${p.opacity * 0.6})`;
          } else {
            ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity * 0.45})`;
          }
          ctx.fill();
        });
      }

      t += 0.016;
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.01 }
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
  }, [isDark, isAnime]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
