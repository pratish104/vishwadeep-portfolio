import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { soundManager } from "../utils/audio";

// ─── 5 Core Disciplines (Floating Editorial Presentation — Open to World Environment) ───
const DISCIPLINES = [
  { id: "ideas", num: "01", label: "Ideas & Discovery", sublabel: "Start here", icon: "💡", color: "#f59e0b" },
  { id: "data", num: "02", label: "Data Engineering", sublabel: "Raw to structured", icon: "📊", color: "#2563eb" },
  { id: "aiml", num: "03", label: "Applied AI & ML", sublabel: "Models & insights", icon: "❄️", color: "#7c3aed" },
  { id: "engineering", num: "04", label: "Systems Engineering", sublabel: "Build & deploy", icon: "⚙️", color: "#0ea5e9" },
  { id: "impact", num: "05", label: "Real-World Impact", sublabel: "Value delivered", icon: "🌱", color: "#16a34a" },
];

export function HeroVisualHub() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-[420px] flex flex-col justify-between py-2 select-none">
      {/* ── Signature Watermark (Floating natively in the World) ───────────── */}
      <div
        className={`absolute right-0 top-0 text-right font-serif-display italic pointer-events-none transition-opacity ${
          isDark
            ? "text-cyan-400/40"
            : isAnime
            ? "text-pink-500/50"
            : "text-blue-600/40"
        }`}
      >
        <div className="text-xl sm:text-2xl leading-none">Small Steps</div>
        <div className="text-xl sm:text-2xl leading-none mt-1">Big Impact</div>
        <div className="text-[10px] font-mono-code not-italic mt-1.5 opacity-80">— Vishwadeep</div>
      </div>

      {/* ── Header: Discipline Matrix Label ─────────────────────────────────── */}
      <div className="space-y-1 pt-2">
        <div
          className={`flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase tracking-wider ${
            isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>DATA × AI DEVELOPMENT PIPELINE</span>
        </div>
        <p className={`text-xs font-mono-code ${isDark ? "text-zinc-400" : "text-gray-600"}`}>
          Core technical focus &amp; architectural disciplines
        </p>
      </div>

      {/* ── Floating Discipline Badges (Open Flow Layout) ──────────────────── */}
      <div className="space-y-2.5 my-4">
        {DISCIPLINES.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              whileHover={{ x: 6 }}
              onClick={() => {
                soundManager.playClick();
                setActiveId(isActive ? null : item.id);
              }}
              className={`flex items-center justify-between p-3 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 shadow-sm ${
                isActive
                  ? isDark
                    ? "bg-[#0b1224]/95 border-cyan-400 text-white shadow-cyan-500/20"
                    : isAnime
                    ? "bg-white/95 border-pink-400 text-gray-900 shadow-pink-500/20"
                    : "bg-white/95 border-blue-500 text-gray-900 shadow-blue-500/20"
                  : isDark
                  ? "bg-[#0b1224]/75 border-white/10 text-white hover:border-cyan-400/50"
                  : isAnime
                  ? "bg-white/80 border-pink-200/80 text-gray-900 hover:border-pink-400"
                  : "bg-white/85 border-gray-200/90 text-gray-900 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: isDark ? `${item.color}25` : `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}35`,
                  }}
                >
                  {item.icon}
                </span>
                <div>
                  <div className="text-xs font-bold font-sans leading-tight">
                    <span className="text-[10px] font-mono-code opacity-50 mr-1.5">{item.num}</span>
                    {item.label}
                  </div>
                  <div
                    className={`text-[10px] font-mono-code leading-none mt-0.5 ${
                      isDark ? "text-zinc-400" : "text-gray-500"
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[9px] font-mono-code font-bold uppercase px-2 py-0.5 rounded-full border hidden sm:inline-block ${
                    isDark
                      ? "bg-white/5 border-white/10 text-zinc-300"
                      : "bg-gray-100 border-gray-200 text-gray-700"
                  }`}
                >
                  Verified Discipline
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Footer: Engineering Principles & Direct Project Jump ───────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-mono-code font-bold uppercase opacity-70">
            Principles:
          </span>
          <div className="flex items-center gap-1">
            {["Analyze", "Build", isAnime ? "Learn" : "Explore", "Repeat"].map((tag) => (
              <span
                key={tag}
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold ${
                  isDark
                    ? "bg-cyan-950/50 text-cyan-300"
                    : isAnime
                    ? "bg-pink-100 text-pink-700"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playClick();
            const el = document.getElementById("projects");
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
          }}
          className={`text-[11px] font-mono-code font-bold flex items-center gap-1 hover:underline ${
            isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
          }`}
        >
          <span>Explore Projects</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
