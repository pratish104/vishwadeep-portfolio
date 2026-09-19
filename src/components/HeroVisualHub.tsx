import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { soundManager } from "../utils/audio";

const HUD_CARDS = [
  {
    id: "ideas",
    label: "Ideas",
    sublabel: "Start here",
    description:
      "Every data product begins with identifying high-value problems and unstandardized domain records.",
    color: "#f59e0b",
    icon: "💡",
    pos: { top: "6%", left: "44%" },
  },
  {
    id: "data",
    label: "Data",
    sublabel: "Raw to structured",
    description:
      "Ingesting, normalizing, and cleaning complex tabular data and multi-year cutoff records.",
    color: "#2563eb",
    icon: "📊",
    pos: { top: "32%", left: "4%" },
  },
  {
    id: "aiml",
    label: "AI/ML",
    sublabel: "Models & insights",
    description:
      "Machine learning prediction algorithms, Marathi NLP transformation, and statistical modeling.",
    color: "#7c3aed",
    icon: "❄️",
    pos: { top: "26%", right: "4%" },
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "Build & deploy",
    description:
      "Full-stack APIs, forensic pipeline tooling, and robust production-ready systems.",
    color: "#3b82f6",
    icon: "⚙️",
    pos: { bottom: "16%", left: "10%" },
  },
  {
    id: "impact",
    label: "Impact",
    sublabel: "Real world value",
    description:
      "Empowering students with admission intelligence and businesses with profitability insights.",
    color: "#16a34a",
    icon: "🌱",
    pos: { bottom: "12%", right: "10%" },
  },
];

export function HeroVisualHub() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [selectedHud, setSelectedHud] = useState<(typeof HUD_CARDS)[0] | null>(null);

  const handleHudClick = (card: (typeof HUD_CARDS)[0]) => {
    soundManager.playClick();
    setSelectedHud(selectedHud?.id === card.id ? null : card);
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center select-none">
      {/* ── Central Orbital Intelligence SVG Visualization ─────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          className="w-[90%] h-[90%] max-w-[480px] max-h-[480px] opacity-80"
        >
          {/* Subtle Outer Glow Filter */}
          <defs>
            <filter id="hub-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                stopColor={isDark ? "#38bdf8" : isAnime ? "#f472b6" : "#3b82f6"}
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor={isDark ? "#818cf8" : isAnime ? "#c084fc" : "#60a5fa"}
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>

          {/* Concentric Orbital Rings */}
          <circle
            cx="250"
            cy="250"
            r="190"
            fill="none"
            stroke="url(#orbit-grad)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="animate-[spin_40s_linear_infinite]"
          />
          <circle
            cx="250"
            cy="250"
            r="140"
            fill="none"
            stroke={isDark ? "rgba(56, 189, 248, 0.25)" : isAnime ? "rgba(244, 114, 182, 0.3)" : "rgba(37, 99, 235, 0.2)"}
            strokeWidth="1.5"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="210"
            ry="90"
            fill="none"
            stroke={isDark ? "rgba(129, 140, 248, 0.35)" : isAnime ? "rgba(236, 72, 153, 0.3)" : "rgba(96, 165, 250, 0.3)"}
            strokeWidth="1.5"
            transform="rotate(-25 250 250)"
          />

          {/* Central Glass Globe Sphere */}
          <circle
            cx="250"
            cy="250"
            r="75"
            fill={isDark ? "rgba(14, 25, 53, 0.85)" : isAnime ? "rgba(255, 240, 245, 0.85)" : "rgba(239, 246, 255, 0.85)"}
            stroke={isDark ? "#38bdf8" : isAnime ? "#f472b6" : "#2563eb"}
            strokeWidth="2"
            filter="url(#hub-glow)"
          />

          {/* Central Core Network Nodes */}
          <circle cx="250" cy="250" r="12" fill={isDark ? "#38bdf8" : isAnime ? "#ec4899" : "#2563eb"} />
          <circle cx="220" cy="235" r="5" fill={isDark ? "#818cf8" : isAnime ? "#f472b6" : "#60a5fa"} />
          <circle cx="275" cy="230" r="6" fill={isDark ? "#34d399" : isAnime ? "#a78bfa" : "#10b981"} />
          <circle cx="260" cy="275" r="5" fill={isDark ? "#fbbf24" : isAnime ? "#fbbf24" : "#f59e0b"} />
          <circle cx="225" cy="268" r="4" fill={isDark ? "#f472b6" : isAnime ? "#34d399" : "#8b5cf6"} />

          {/* Connection Lines */}
          <line x1="250" y1="250" x2="220" y2="235" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"} strokeWidth="1" />
          <line x1="250" y1="250" x2="275" y2="230" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"} strokeWidth="1" />
          <line x1="250" y1="250" x2="260" y2="275" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"} strokeWidth="1" />
          <line x1="250" y1="250" x2="225" y2="268" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"} strokeWidth="1" />
          <line x1="220" y1="235" x2="225" y2="268" stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} strokeWidth="1" />
          <line x1="275" y1="230" x2="260" y2="275" stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"} strokeWidth="1" />
        </svg>
      </div>

      {/* ── Handwritten Signature in Background (Matching Reference) ───────── */}
      <div
        className={`absolute right-4 top-14 pointer-events-none select-none text-right font-serif-display italic transition-opacity ${
          isDark ? "text-zinc-600 opacity-40" : isAnime ? "text-pink-400 opacity-50" : "text-gray-400 opacity-60"
        }`}
      >
        <div className="text-xl sm:text-2xl leading-none">Small Steps</div>
        <div className="text-xl sm:text-2xl leading-none mt-1">Big Impact</div>
        <div className="text-[10px] font-mono-code not-italic mt-1">— Vishwadeep</div>
      </div>

      {/* ── 5 Interactive Floating Glass HUD Cards ──────────────────────────── */}
      <div className="relative w-full h-full">
        {HUD_CARDS.map((card, i) => {
          const isSelected = selectedHud?.id === card.id;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              style={card.pos}
              className="absolute pointer-events-auto z-30"
            >
              <motion.div
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleHudClick(card)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 shadow-lg ${
                  isSelected
                    ? isDark
                      ? "bg-[#0b1224] border-cyan-400 ring-2 ring-cyan-400/30"
                      : isAnime
                      ? "bg-white border-pink-500 ring-2 ring-pink-500/20"
                      : "bg-white border-blue-500 ring-2 ring-blue-500/20"
                    : isDark
                    ? "bg-[#0b1224]/90 border-white/15 hover:border-cyan-400/50 text-white shadow-black/60"
                    : isAnime
                    ? "bg-white/95 border-pink-200 hover:border-pink-400 text-gray-900 shadow-pink-900/[0.06]"
                    : "bg-white/95 border-gray-200/90 hover:border-blue-400 text-gray-900 shadow-blue-900/[0.06]"
                }`}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-2xs shrink-0"
                  style={{
                    background: isDark ? `${card.color}25` : `${card.color}15`,
                    color: card.color,
                    border: `1px solid ${card.color}35`,
                  }}
                >
                  {card.icon}
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">
                    {card.label}
                  </div>
                  <div
                    className={`text-[9px] font-mono-code leading-none mt-0.5 ${
                      isDark ? "text-zinc-400" : "text-gray-500"
                    }`}
                  >
                    {card.sublabel}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Selected HUD Tooltip Modal */}
        <AnimatePresence>
          {selectedHud && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.18 }}
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-80 p-4 rounded-2xl border shadow-2xl pointer-events-auto backdrop-blur-2xl ${
                isDark
                  ? "bg-[#0b1224]/98 border-cyan-500/40 text-white"
                  : isAnime
                  ? "bg-white/98 border-pink-300 text-gray-900"
                  : "bg-white/98 border-blue-200 text-gray-900"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{selectedHud.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold leading-none">
                      {selectedHud.label} — {selectedHud.sublabel}
                    </h4>
                    <span
                      className={`text-[10px] font-mono-code uppercase font-semibold ${
                        isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
                      }`}
                    >
                      Domain Discipline
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHud(null)}
                  className="opacity-60 hover:opacity-100 p-0.5 rounded-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p
                className={`text-xs mt-2 leading-relaxed ${
                  isDark ? "text-zinc-300" : "text-gray-600"
                }`}
              >
                {selectedHud.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
