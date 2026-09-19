import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { soundManager } from "../utils/audio";

// ─── 5 Core Disciplines (Clean Editorial Presentation — No Atoms, Globes or Orbits) ───
const DISCIPLINES = [
  {
    id: "ideas",
    num: "01",
    label: "Ideas & Discovery",
    sublabel: "Start here",
    description: "Identifying high-value domain problems and unstandardized record challenges.",
    impact: "Formulating clear analytical hypotheses",
    icon: "💡",
    color: "#f59e0b", // Amber
    tags: ["Domain Audits", "Problem Scoping", "Data Requirements"],
  },
  {
    id: "data",
    num: "02",
    label: "Data Engineering",
    sublabel: "Raw to structured",
    description: "Ingesting, normalizing, and cleaning complex tabular data and multi-year cutoff records.",
    impact: "Clean datasets & reliable schemas",
    icon: "📊",
    color: "#2563eb", // Blue
    tags: ["Python & SQL", "Data Cleaning", "Validation Logic"],
  },
  {
    id: "aiml",
    num: "03",
    label: "Applied AI & ML",
    sublabel: "Models & insights",
    description: "Machine learning prediction algorithms, Marathi NLP transformation, and statistical modeling.",
    impact: "Predictive power & semantic NLP",
    icon: "❄️",
    color: "#7c3aed", // Violet
    tags: ["Scikit-learn", "Marathi NLP", "Devanagari Parsing"],
  },
  {
    id: "engineering",
    num: "04",
    label: "Systems Engineering",
    sublabel: "Build & deploy",
    description: "Volatile RAM incident triage pipelines, network anomaly monitoring, and robust APIs.",
    impact: "Production stability & security hooks",
    icon: "⚙️",
    color: "#0ea5e9", // Sky
    tags: ["Linux Tooling", "Volatile Memory", "Stream Hooks"],
  },
  {
    id: "impact",
    num: "05",
    label: "Real-World Impact",
    sublabel: "Value delivered",
    description: "Empowering 500+ college aspirants with cutoffs & businesses with profit margin clarity.",
    impact: "Actionable decision intelligence",
    icon: "🌱",
    color: "#16a34a", // Emerald
    tags: ["DigiPath Platform", "Retail BI", "3 Award Certificates"],
  },
];

export function HeroVisualHub() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [selectedDiscipline, setSelectedDiscipline] = useState<(typeof DISCIPLINES)[0] | null>(null);

  const handleSelect = (item: (typeof DISCIPLINES)[0]) => {
    soundManager.playClick();
    setSelectedDiscipline(selectedDiscipline?.id === item.id ? null : item);
  };

  // Card theme tokens matching reference aesthetic
  const containerBorder = isDark
    ? "border-white/10 bg-[#0b1224]/80 text-white"
    : isAnime
    ? "border-pink-200/90 bg-white/90 text-gray-900"
    : "border-gray-200/90 bg-white/90 text-gray-900";

  return (
    <div className="relative w-full min-h-[460px] flex flex-col justify-between p-4 sm:p-6 rounded-3xl border backdrop-blur-2xl shadow-xl select-none overflow-hidden transition-all duration-300">
      {/* ── Background Subtle Ambient Glow (No Orbits/Atoms/Globes) ─────────── */}
      <div
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{
          background: isDark
            ? "radial-gradient(circle, #38bdf8 0%, transparent 70%)"
            : isAnime
            ? "radial-gradient(circle, #f472b6 0%, transparent 70%)"
            : "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Top Header Row: Discipline Matrix & Signature Watermark ───────── */}
      <div className="flex items-start justify-between gap-4 border-b pb-4 border-black/5 dark:border-white/10">
        <div className="space-y-1">
          <div
            className={`flex items-center gap-1.5 text-[11px] font-mono-code font-bold uppercase tracking-wider ${
              isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURE &amp; CAPABILITIES</span>
          </div>
          <h3 className="text-lg font-serif-display font-bold tracking-tight">
            Data × AI Development Pipeline
          </h3>
        </div>

        {/* Handwritten signature watermark matching reference */}
        <div
          className={`text-right font-serif-display italic select-none shrink-0 ${
            isDark
              ? "text-zinc-500 opacity-60"
              : isAnime
              ? "text-pink-400 opacity-70"
              : "text-gray-400 opacity-70"
          }`}
        >
          <div className="text-lg leading-none">Small Steps</div>
          <div className="text-lg leading-none mt-0.5">Big Impact</div>
          <div className="text-[9px] font-mono-code not-italic mt-0.5 opacity-80">— Vishwadeep</div>
        </div>
      </div>

      {/* ── Middle: 5 Discipline Cards Layout (Clean Vertical/Grid Stacking) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
        {DISCIPLINES.map((item) => {
          const isSelected = selectedDiscipline?.id === item.id;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(item)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 shadow-sm flex items-start gap-3 ${
                isSelected
                  ? isDark
                    ? "bg-[#111c38] border-cyan-400 ring-1 ring-cyan-400/40"
                    : isAnime
                    ? "bg-pink-50 border-pink-400 ring-1 ring-pink-400/40"
                    : "bg-blue-50 border-blue-400 ring-1 ring-blue-400/40"
                  : isDark
                  ? "bg-[#0f172a]/90 border-white/10 hover:border-cyan-400/50"
                  : isAnime
                  ? "bg-white/95 border-pink-200/80 hover:border-pink-400"
                  : "bg-white/95 border-gray-200/90 hover:border-blue-400"
              }`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 shadow-2xs font-bold"
                style={{
                  background: isDark ? `${item.color}25` : `${item.color}15`,
                  color: item.color,
                  border: `1px solid ${item.color}35`,
                }}
              >
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold font-sans tracking-tight truncate">
                    {item.label}
                  </span>
                  <span
                    className={`text-[9px] font-mono-code ${
                      isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
                    }`}
                  >
                    {item.num}
                  </span>
                </div>
                <p
                  className={`text-[11px] font-mono-code truncate mt-0.5 ${
                    isDark ? "text-zinc-400" : "text-gray-500"
                  }`}
                >
                  {item.sublabel}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Action Tags Column */}
        <div
          className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
            isDark
              ? "bg-[#0f172a]/60 border-white/10"
              : isAnime
              ? "bg-pink-50/50 border-pink-200/60"
              : "bg-gray-50/70 border-gray-200/70"
          }`}
        >
          <div className="text-[10px] font-mono-code font-bold uppercase opacity-60">
            ENGINEERING PRINCIPLES
          </div>
          <div className="flex flex-wrap gap-1.5 my-1">
            {["Analyze", "Build", isAnime ? "Learn" : "Explore", "Repeat"].map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono-code font-bold border ${
                  isDark
                    ? "bg-cyan-950/40 border-cyan-500/30 text-cyan-300"
                    : isAnime
                    ? "bg-pink-100/80 border-pink-300 text-pink-700"
                    : "bg-blue-100/80 border-blue-300 text-blue-800"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono-code opacity-70 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Click any discipline for details</span>
          </div>
        </div>
      </div>

      {/* ── Discipline Details Modal Overlay (If Selected) ────────────────── */}
      <AnimatePresence>
        {selectedDiscipline && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`p-4 rounded-2xl border shadow-xl backdrop-blur-2xl ${
              isDark
                ? "bg-[#0b1224] border-cyan-500/40 text-white"
                : isAnime
                ? "bg-white border-pink-300 text-gray-900"
                : "bg-white border-blue-300 text-gray-900"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{selectedDiscipline.icon}</span>
                <div>
                  <h4 className="text-sm font-bold font-sans">
                    {selectedDiscipline.num}. {selectedDiscipline.label}
                  </h4>
                  <span
                    className={`text-[10px] font-mono-code font-bold uppercase ${
                      isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
                    }`}
                  >
                    {selectedDiscipline.sublabel}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDiscipline(null)}
                className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-zinc-300" : "text-gray-600"}`}>
              {selectedDiscipline.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t mt-3 border-black/5 dark:border-white/10">
              {selectedDiscipline.tags.map((t) => (
                <span
                  key={t}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono-code border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-cyan-300"
                      : "bg-gray-100 border-gray-200 text-gray-800"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer Link Row ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-3 border-t text-[11px] font-mono-code border-black/5 dark:border-white/10 opacity-75">
        <span>Vishwadeep Pratap — Portfolio System</span>
        <a
          href="#projects"
          className={`flex items-center gap-1 font-bold hover:underline ${
            isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-600"
          }`}
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
