import { useEffect, useRef, useState } from "react";
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
function AnimeWorld({ scrollRatio, mouse }: { scrollRatio: number; mouse: { x: number; y: number } }) {
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

    // Sakura petals
    const petals = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 5 + 3,
      speedX: Math.random() * 0.9 + 0.3,
      speedY: Math.random() * 0.7 + 0.4,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      alpha: Math.random() * 0.6 + 0.3,
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

  const castleY = 10 + scrollRatio * 25 + mouse.y * 2;
  const castleX = 78 + mouse.x * 2;

  return (
    <div className="fixed inset-0 pointer-events-none -z-1 overflow-hidden">
      {/* Soft Pastel Sunset Horizon Gradient */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background:
            "linear-gradient(175deg, #fdf2f8 0%, #fce7f3 25%, #f5f3ff 55%, #ecfdf5 100%)",
        }}
      />

      {/* Falling Sakura Petals Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* ── Visual Anchor 1: Mt. Fuji Silhouette (Background) ───────────────── */}
      <div
        className="absolute transition-all duration-700 ease-out opacity-35"
        style={{
          bottom: "15%",
          right: "10%",
          width: 520,
          height: 240,
          transform: `translateY(${scrollRatio * -40}px)`,
        }}
      >
        <svg viewBox="0 0 500 220" className="w-full h-full">
          {/* Mountain Base */}
          <polygon points="250,20 480,220 20,220" fill="#a78bfa" />
          {/* Snow Peak */}
          <polygon points="250,20 290,65 210,65" fill="#ffffff" />
          <polygon points="250,20 270,75 250,60 230,75" fill="#f3e8ff" />
        </svg>
      </div>

      {/* ── Visual Anchor 2: JAPANESE CASTLE & PAGODA (Midground Anchor) ────── */}
      <div
        className="absolute transition-all duration-500 ease-out"
        style={{
          left: `${castleX}%`,
          top: `${castleY}%`,
          transform: "translate(-50%, 0)",
          width: 320,
          height: 380,
        }}
      >
        <svg viewBox="0 0 300 360" className="w-full h-full opacity-85">
          <defs>
            <linearGradient id="castleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#2e1065" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Pagoda Roof 1 (Top Spire) */}
          <line x1="150" y1="10" x2="150" y2="40" stroke="#f472b6" strokeWidth="3" />
          <circle cx="150" cy="10" r="4" fill="#fbbf24" />

          {/* Tier 1 Roof */}
          <path d="M 150,40 Q 110,65 80,70 L 220,70 Q 190,65 150,40 Z" fill="url(#castleGrad)" />
          <rect x="110" y="70" width="80" height="35" fill="url(#castleGrad)" />
          {/* Shoji Window Light */}
          <rect x="135" y="80" width="10" height="15" fill="#fbbf24" opacity="0.9" rx="1" />
          <rect x="155" y="80" width="10" height="15" fill="#fbbf24" opacity="0.9" rx="1" />

          {/* Tier 2 Roof */}
          <path d="M 150,100 Q 90,130 50,135 L 250,135 Q 210,130 150,100 Z" fill="url(#castleGrad)" />
          <rect x="90" y="135" width="120" height="50" fill="url(#castleGrad)" />
          {/* Windows */}
          <rect x="115" y="150" width="14" height="20" fill="#f59e0b" opacity="0.85" rx="1" />
          <rect x="143" y="150" width="14" height="20" fill="#f59e0b" opacity="0.85" rx="1" />
          <rect x="171" y="150" width="14" height="20" fill="#f59e0b" opacity="0.85" rx="1" />

          {/* Tier 3 Wide Castle Foundation Roof */}
          <path d="M 150,185 Q 60,225 10,230 L 290,230 Q 240,225 150,185 Z" fill="url(#castleGrad)" />
          <rect x="60" y="230" width="180" height="90" fill="url(#castleGrad)" />

          {/* Castle Stone Base */}
          <path d="M 50,320 L 250,320 L 270,360 L 30,360 Z" fill="#3b0764" />
        </svg>
      </div>

      {/* ── Visual Anchor 3: Hanging Japanese Scroll Banner (Top-Right Margin) ── */}
      <div className="absolute top-28 right-12 z-20 select-none pointer-events-none hidden lg:block">
        <div className="bg-[#fdf4f8]/95 border border-pink-300 shadow-md rounded-b-2xl p-2.5 text-center flex flex-col items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
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
