import { useEffect, useRef } from "react";

export function MinimalWorldScene() {
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

      // Subtle off-white background glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
      bgGlow.addColorStop(0, "rgba(235, 240, 250, 0.3)");
      bgGlow.addColorStop(1, "rgba(235, 240, 250, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W, H);

      // Latitude lines (horizontal arcs)
      const latitudes = 9;
      for (let i = 0; i <= latitudes; i++) {
        const lat = ((i / latitudes) - 0.5) * Math.PI;
        const ry = Math.cos(lat) * R;
        const y = cy + Math.sin(lat) * R;
        if (ry < 2) continue;

        const progress = !prefersReduced ? (t * 0.4 + i * 0.2) : 0;
        const pulse = 0.12 + Math.sin(progress) * 0.05;

        ctx.beginPath();
        ctx.ellipse(cx, y, ry, ry * 0.05, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${pulse})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Longitude lines (vertical arcs)
      const longitudes = 12;
      for (let i = 0; i < longitudes; i++) {
        const angle = (i / longitudes) * Math.PI;
        const progress = !prefersReduced ? (t * 0.3 + i * 0.15) : 0;
        const pulse = 0.1 + Math.sin(progress) * 0.04;

        ctx.beginPath();
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle + (!prefersReduced ? t * 0.05 : 0));
        ctx.ellipse(0, 0, 0.05 * R, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 99, 235, ${pulse})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // Outer orbit ring
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(37, 99, 235, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling data node on orbit
      if (!prefersReduced) {
        const nodeAngle = t * 0.6;
        const nx = cx + Math.cos(nodeAngle) * R * 1.15;
        const ny = cy + Math.sin(nodeAngle) * R * 1.15;
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.7)";
        ctx.fill();
        // Trail
        for (let trail = 1; trail <= 8; trail++) {
          const ta = t * 0.6 - trail * 0.08;
          const tx2 = cx + Math.cos(ta) * R * 1.15;
          const ty2 = cy + Math.sin(ta) * R * 1.15;
          ctx.beginPath();
          ctx.arc(tx2, ty2, 2 * (1 - trail / 8), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${0.5 * (1 - trail / 8)})`;
          ctx.fill();
        }
      }

      // Globe outer circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(37, 99, 235, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Subtle center glow
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
      centerGlow.addColorStop(0, "rgba(37, 99, 235, 0.04)");
      centerGlow.addColorStop(1, "rgba(37, 99, 235, 0)");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      t += 0.012;
    };

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
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
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block", minHeight: 400 }}
      aria-label="Wireframe globe data visualization"
    />
  );
}
