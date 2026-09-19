import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export function ThemeAtmosphere() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle seeds for subtle ambient life
    const count = theme === "dark" ? 120 : theme === "anime" ? 40 : 25;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + (theme === "dark" ? 0.8 : 1.5),
      speedX: (Math.random() - 0.5) * 0.4 + (theme === "anime" ? 0.3 : 0),
      speedY: (Math.random() - 0.5) * 0.3 + (theme === "anime" ? 0.4 : 0),
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      if (theme === "dark") {
        // Deep celestial nebula gradient
        const grad = ctx.createRadialGradient(
          width * 0.7,
          height * 0.3,
          50,
          width * 0.7,
          height * 0.3,
          width * 0.8
        );
        grad.addColorStop(0, "rgba(30, 58, 138, 0.25)");
        grad.addColorStop(0.4, "rgba(88, 28, 135, 0.15)");
        grad.addColorStop(1, "rgba(6, 9, 19, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Star particles
        particles.forEach((p) => {
          p.opacity = 0.3 + Math.sin(t * 2 + p.angle) * 0.3;
          ctx.fillStyle = `rgba(224, 242, 254, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y -= 0.1;
          if (p.y < 0) p.y = height;
        });
      } else if (theme === "anime") {
        // Twilight peach/lavender sunset horizon
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "rgba(253, 242, 248, 0.95)");
        grad.addColorStop(0.5, "rgba(255, 237, 213, 0.4)");
        grad.addColorStop(1, "rgba(254, 242, 242, 0.9)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Floating Sakura Petals
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          if (p.x > width) p.x = 0;
          if (p.y > height) p.y = 0;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(t + p.angle) * 0.5);
          ctx.fillStyle = `rgba(244, 114, 182, ${p.opacity * 0.55})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2.5, p.size * 1.5, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      } else {
        // Light Editorial: Warm Sunbeam & crisp daylight atmosphere
        const sunGrad = ctx.createRadialGradient(
          width * 0.75,
          height * 0.2,
          20,
          width * 0.75,
          height * 0.2,
          width * 0.6
        );
        sunGrad.addColorStop(0, "rgba(254, 243, 199, 0.45)");
        sunGrad.addColorStop(0.5, "rgba(239, 246, 255, 0.2)");
        sunGrad.addColorStop(1, "rgba(248, 247, 244, 0)");
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);

        // Soft dust motes
        particles.forEach((p) => {
          p.y -= 0.15;
          if (p.y < 0) p.y = height;
          ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity * 0.15})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}
