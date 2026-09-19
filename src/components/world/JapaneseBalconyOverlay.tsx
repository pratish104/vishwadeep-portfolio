import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export function JapaneseBalconyOverlay() {
  const { theme } = useTheme();
  const isAnime = theme === "anime";
  const isDark = theme === "dark";
  const isLight = theme === "light";

  if (isLight) return null; // Clean minimal architectural look for Light theme

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* ── 1. Top-Right Sakura Tree Canopy Framing ──────────────────────────── */}
      <div className="absolute -top-6 -right-10 w-72 sm:w-96 md:w-[480px] h-64 sm:h-80 opacity-90 transition-opacity duration-500">
        <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
          {/* Main Branches */}
          <path
            d="M400 0 C320 40 240 30 180 80 C150 110 120 120 80 140"
            stroke={isAnime ? "#5c3d2e" : "#2a1c14"}
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M260 45 C220 75 190 120 160 160"
            stroke={isAnime ? "#5c3d2e" : "#2a1c14"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M320 20 C290 80 270 140 250 190"
            stroke={isAnime ? "#5c3d2e" : "#2a1c14"}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Sakura Blossom Clusters */}
          {[
            { cx: 160, cy: 90, r: 28 },
            { cx: 120, cy: 130, r: 24 },
            { cx: 200, cy: 70, r: 32 },
            { cx: 250, cy: 50, r: 36 },
            { cx: 290, cy: 95, r: 30 },
            { cx: 220, cy: 130, r: 26 },
            { cx: 170, cy: 170, r: 22 },
            { cx: 80, cy: 145, r: 18 },
            { cx: 330, cy: 60, r: 34 },
            { cx: 260, cy: 180, r: 25 },
          ].map((c, i) => (
            <g key={i}>
              <circle
                cx={c.cx}
                cy={c.cy}
                r={c.r}
                fill={isAnime ? "url(#sakuraGradAnime)" : "url(#sakuraGradDark)"}
                opacity="0.9"
              />
              <circle
                cx={c.cx + 5}
                cy={c.cy - 3}
                r={c.r * 0.7}
                fill={isAnime ? "#fbcfe8" : "#f472b6"}
                opacity="0.8"
              />
            </g>
          ))}

          <defs>
            <radialGradient id="sakuraGradAnime" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="60%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sakuraGradDark" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="70%" stopColor="#be185d" />
              <stop offset="100%" stopColor="#831843" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* ── 2. Hanging Japanese Lantern with Calligraphy '継続' (Right side) ── */}
      <div className="absolute right-6 sm:right-12 top-28 sm:top-36 flex flex-col items-center z-20">
        {/* Hanging Rope */}
        <div
          className="w-0.5 h-10 sm:h-14"
          style={{ background: isAnime ? "#78350f" : "#451a03" }}
        />
        {/* Lantern Cap */}
        <div
          className="w-12 sm:w-16 h-2 rounded-full"
          style={{ background: isAnime ? "#292524" : "#1c1917" }}
        />
        {/* Glowing Paper Lantern Body */}
        <div
          className="relative w-11 sm:w-14 h-16 sm:h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-2xl"
          style={{
            background: isDark
              ? "radial-gradient(circle, #ffedd5 0%, #f97316 65%, #c2410c 100%)"
              : "radial-gradient(circle, #fffbeb 0%, #fbbf24 60%, #d97706 100%)",
            borderColor: isDark ? "#ea580c" : "#f59e0b",
            boxShadow: isDark
              ? "0 0 35px 8px rgba(249, 115, 22, 0.45), 0 0 60px 15px rgba(249, 115, 22, 0.2)"
              : "0 0 25px 6px rgba(251, 191, 36, 0.35)",
          }}
        >
          {/* Kanji Calligraphy on Lantern */}
          <span
            className="text-base sm:text-lg font-serif-display font-bold leading-none select-none"
            style={{
              color: isDark ? "#431407" : "#78350f",
              textShadow: "0 0 4px rgba(255,255,255,0.4)",
            }}
          >
            継続
          </span>
        </div>
        {/* Lantern Base & Tassel */}
        <div
          className="w-8 sm:w-10 h-1.5 rounded-full"
          style={{ background: isAnime ? "#292524" : "#1c1917" }}
        />
        <div
          className="w-0.5 h-6 sm:h-8"
          style={{ background: isDark ? "#c2410c" : "#b45309" }}
        />
      </div>

      {/* ── 3. Handwritten Brush Quote on Sky ─────────────────────────────────── */}
      <div className="absolute right-6 sm:right-28 top-56 sm:top-64 text-right z-10">
        <div
          className="font-serif-display text-lg sm:text-2xl italic tracking-wide leading-tight"
          style={{
            color: isDark ? "rgba(226, 232, 240, 0.7)" : "rgba(30, 41, 59, 0.75)",
            textShadow: isDark ? "0 2px 10px rgba(0,0,0,0.8)" : "none",
          }}
        >
          Small
          <br />
          Steps
          <br />
          Big
          <br />
          Impact
        </div>
        <div
          className="text-[11px] font-mono-code mt-1 font-semibold"
          style={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          — Vishwadeep
        </div>
      </div>

      {/* ── 4. Hanging Japanese Calligraphy Banner (Left side in Anime Mode) ─── */}
      {isAnime && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-4 sm:left-20 top-24 z-20 flex flex-col items-center"
        >
          {/* Wooden Hanging Rod */}
          <div className="w-16 h-2 rounded-full bg-[#5c3d2e] shadow-md" />
          {/* Scroll Canvas */}
          <div
            className="w-12 sm:w-14 py-6 px-1 rounded-b-xl border shadow-xl flex flex-col items-center justify-between"
            style={{
              background: "rgba(255, 253, 248, 0.9)",
              borderColor: "#e5e0d8",
            }}
          >
            {/* Vertical Kanji '継続は力なり' */}
            <span
              className="font-serif-display text-sm sm:text-base font-bold text-gray-800 tracking-[0.25em]"
              style={{ writingMode: "vertical-rl" }}
            >
              継続は力なり
            </span>
            <div className="mt-3 text-[8px] font-mono-code text-gray-500 text-center leading-tight">
              Consistency
              <br />
              Builds
              <br />
              Futures
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 5. Wooden Balcony Environment (Bottom Right Foreground) ──────────── */}
      <div className="absolute right-0 bottom-0 w-80 sm:w-[420px] md:w-[500px] h-48 sm:h-64 z-20 pointer-events-none">
        <svg viewBox="0 0 500 260" className="w-full h-full" fill="none">
          {/* Wooden Balcony Railing */}
          {/* Top Handrail */}
          <rect
            x="0"
            y="130"
            width="500"
            height="18"
            rx="4"
            fill={isDark ? "#1c140e" : "#785338"}
            stroke={isDark ? "#2a1e16" : "#5c3d28"}
            strokeWidth="2"
          />
          {/* Balcony Balusters */}
          {[40, 90, 140, 190, 240, 290, 340, 390, 440].map((bx) => (
            <rect
              key={bx}
              x={bx}
              y="148"
              width="10"
              height="112"
              fill={isDark ? "#17100b" : "#65452d"}
            />
          ))}
          {/* Lower Balcony Rail */}
          <rect
            x="0"
            y="210"
            width="500"
            height="14"
            fill={isDark ? "#1c140e" : "#785338"}
          />
          {/* Wooden Table/Plank on Railing */}
          <path
            d="M120 130 L480 130 L490 150 L110 150 Z"
            fill={isDark ? "#261b13" : "#8c6244"}
          />

          {/* Steaming Mug of Coffee */}
          <g transform="translate(180, 85)">
            {/* Mug Body */}
            <rect
              x="0"
              y="15"
              width="26"
              height="30"
              rx="4"
              fill={isDark ? "#e2e8f0" : "#ffffff"}
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Mug Handle */}
            <path
              d="M26 22 C32 22 32 36 26 36"
              stroke={isDark ? "#cbd5e1" : "#94a3b8"}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Coffee Surface */}
            <ellipse cx="13" cy="17" rx="10" ry="3" fill="#3e2723" />
            {/* Rising Steam Wiggles */}
            <path
              d="M8 10 Q12 4 8 0 M15 11 Q19 5 15 1 M21 12 Q24 7 21 3"
              stroke={isDark ? "rgba(255,255,255,0.45)" : "rgba(100,116,139,0.5)"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Sleeping Cat Curled on Mat */}
          <g transform="translate(240, 95)">
            {/* Soft Woven Mat */}
            <ellipse
              cx="45"
              cy="34"
              rx="42"
              ry="12"
              fill={isDark ? "#332219" : "#d6bba0"}
            />
            {/* Cat Body */}
            <ellipse
              cx="44"
              cy="25"
              rx="28"
              ry="18"
              fill={isDark ? "#ea580c" : "#f97316"}
            />
            {/* Cat White Belly / Patches */}
            <ellipse cx="46" cy="27" rx="16" ry="10" fill="#fff" />
            {/* Cat Head */}
            <circle
              cx="22"
              cy="23"
              r="14"
              fill={isDark ? "#ea580c" : "#f97316"}
            />
            {/* Cat Ears */}
            <polygon
              points="14,12 20,4 24,14"
              fill={isDark ? "#ea580c" : "#f97316"}
            />
            <polygon
              points="24,14 28,5 34,14"
              fill={isDark ? "#ea580c" : "#f97316"}
            />
            {/* Sleeping Eyes (curved lines) */}
            <path
              d="M16 23 Q19 26 22 23 M23 23 Q26 26 29 23"
              stroke="#7c2d12"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Cat Tail curled around body */}
            <path
              d="M68 28 C74 20 74 38 60 38"
              stroke={isDark ? "#ea580c" : "#f97316"}
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          {/* Stack of Books */}
          <g transform="translate(360, 65)">
            {/* Book 1: Code / Learn */}
            <rect
              x="0"
              y="45"
              width="70"
              height="16"
              rx="2"
              fill="#3b82f6"
              stroke="#1d4ed8"
              strokeWidth="1"
            />
            <text
              x="8"
              y="57"
              fill="#fff"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
            >
              {isAnime ? "Analyze" : "Code"}
            </text>

            {/* Book 2: Analyze / Build */}
            <rect
              x="4"
              y="30"
              width="65"
              height="15"
              rx="2"
              fill="#10b981"
              stroke="#047857"
              strokeWidth="1"
            />
            <text
              x="10"
              y="41"
              fill="#fff"
              fontSize="8.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
            >
              {isAnime ? "Build" : "Analyze"}
            </text>

            {/* Book 3: Build / Learn */}
            <rect
              x="8"
              y="16"
              width="60"
              height="14"
              rx="2"
              fill="#8b5cf6"
              stroke="#6d28d9"
              strokeWidth="1"
            />
            <text
              x="14"
              y="27"
              fill="#fff"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
            >
              {isAnime ? "Learn" : "Build"}
            </text>

            {/* Book 4: Grow / Repeat */}
            <rect
              x="12"
              y="4"
              width="54"
              height="12"
              rx="2"
              fill="#f59e0b"
              stroke="#b45309"
              strokeWidth="1"
            />
            <text
              x="17"
              y="13"
              fill="#fff"
              fontSize="7.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
            >
              {isAnime ? "Repeat" : "Grow"}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
