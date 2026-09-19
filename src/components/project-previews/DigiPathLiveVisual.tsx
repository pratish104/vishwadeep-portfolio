import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Filter, AlertTriangle, Eye, Sparkles, Building2, Sliders } from "lucide-react";
import { useState } from "react";
import { soundManager } from "../../utils/audio";

interface CollegeCutoff {
  name: string;
  city: string;
  branch: string;
  openCutoff: number;
  obcCutoff: number;
  scCutoff: number;
}

const SAMPLE_COLLEGES: CollegeCutoff[] = [
  {
    name: "MGM College of Engineering & Tech",
    city: "Navi Mumbai",
    branch: "Computer Engineering",
    openCutoff: 84.5,
    obcCutoff: 81.2,
    scCutoff: 72.0,
  },
  {
    name: "Pillai College of Engineering",
    city: "Panvel",
    branch: "Computer Engineering",
    openCutoff: 87.8,
    obcCutoff: 84.6,
    scCutoff: 75.4,
  },
  {
    name: "Fr. Conceicao Rodrigues Inst of Tech",
    city: "Vashi, Navi Mumbai",
    branch: "Information Technology",
    openCutoff: 91.2,
    obcCutoff: 88.5,
    scCutoff: 79.0,
  },
  {
    name: "Veermata Jijabai Tech Inst (VJTI)",
    city: "Mumbai",
    branch: "Computer Engineering",
    openCutoff: 97.8,
    obcCutoff: 96.2,
    scCutoff: 89.5,
  },
];

export function DigiPathLiveVisual({ isDark = true }: { isDark?: boolean }) {
  const [viewMode, setViewMode] = useState<"engine" | "screenshot">("engine");
  const [percentile, setPercentile] = useState<number>(88.5);
  const [category, setCategory] = useState<"open" | "obc" | "sc">("open");
  const [branch, setBranch] = useState<string>("Computer Engineering");
  const [showScamGuard, setShowScamGuard] = useState<boolean>(true);

  // Compute live match state
  const evaluatedColleges = SAMPLE_COLLEGES.map((c) => {
    const required =
      category === "open"
        ? c.openCutoff
        : category === "obc"
        ? c.obcCutoff
        : c.scCutoff;

    let status: "eligible" | "borderline" | "reach" = "reach";
    if (percentile >= required + 1.5) {
      status = "eligible";
    } else if (percentile >= required - 1.5) {
      status = "borderline";
    }

    return {
      ...c,
      required,
      status,
      diff: (percentile - required).toFixed(1),
    };
  });

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden transition-all duration-300 ${
        isDark ? "bg-[#080b14]/90 border-white/10" : "bg-white border-emerald-100 shadow-sm"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header with Mode Toggle ─────────────────────────────────────────── */}
      <div
        className={`px-3.5 py-2 border-b flex items-center justify-between text-xs font-mono-code ${
          isDark ? "bg-[#0e1322]/80 border-white/10 text-zinc-300" : "bg-emerald-50/70 border-emerald-100 text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[11px]">DigiPath Cutoff Simulation</span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/20 dark:bg-black/40 text-[10px]">
          <button
            onClick={() => {
              soundManager.playHover();
              setViewMode("engine");
            }}
            className={`px-2 py-0.5 rounded-md transition-all ${
              viewMode === "engine"
                ? "bg-emerald-500 text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sliders className="w-3 h-3 inline mr-1" />
            Live Engine
          </button>
          <button
            onClick={() => {
              soundManager.playHover();
              setViewMode("screenshot");
            }}
            className={`px-2 py-0.5 rounded-md transition-all ${
              viewMode === "screenshot"
                ? "bg-emerald-500 text-black font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3 inline mr-1" />
            Real UI
          </button>
        </div>
      </div>

      {/* ── Content Area ────────────────────────────────────────────────────── */}
      <div className="p-3 space-y-2.5">
        {viewMode === "engine" ? (
          <>
            {/* Input Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono-code">
              {/* Score / Percentile Slider */}
              <div className={`p-2 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
                <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-1">
                  <span>Score / %:</span>
                  <span className="font-bold text-emerald-400 text-xs">{percentile}%</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="99"
                  step="0.5"
                  value={percentile}
                  onChange={(e) => setPercentile(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-black/30 rounded-lg"
                />
              </div>

              {/* Category Selector */}
              <div className={`p-2 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
                <span className="text-[10px] text-zinc-400 block mb-1">Category:</span>
                <div className="flex gap-1">
                  {(["open", "obc", "sc"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        soundManager.playHover();
                        setCategory(cat);
                      }}
                      className={`flex-1 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                        category === cat
                          ? "bg-emerald-500 text-black shadow-sm"
                          : isDark ? "bg-black/30 text-zinc-400" : "bg-white text-gray-600 border border-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch Filter */}
              <div className={`p-2 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
                <span className="text-[10px] text-zinc-400 block mb-1">Branch:</span>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className={`w-full text-[10px] p-0.5 rounded bg-transparent font-mono-code focus:outline-none ${
                    isDark ? "text-zinc-200" : "text-gray-800"
                  }`}
                >
                  <option value="Computer Engineering" className="bg-zinc-900 text-zinc-100">Computer Engg</option>
                  <option value="Information Technology" className="bg-zinc-900 text-zinc-100">Information Tech</option>
                  <option value="AI & Data Science" className="bg-zinc-900 text-zinc-100">AI & Data Science</option>
                </select>
              </div>
            </div>

            {/* Live Matched Results List */}
            <div className="space-y-1.5 text-xs font-mono-code">
              {evaluatedColleges.slice(0, 3).map((col, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                    col.status === "eligible"
                      ? isDark
                        ? "bg-emerald-950/20 border-emerald-500/30 text-zinc-200"
                        : "bg-emerald-50/50 border-emerald-200 text-gray-800"
                      : col.status === "borderline"
                      ? isDark
                        ? "bg-amber-950/20 border-amber-500/30 text-zinc-200"
                        : "bg-amber-50/50 border-amber-200 text-gray-800"
                      : isDark
                      ? "bg-[#0b0e1a]/60 border-white/5 text-zinc-400"
                      : "bg-gray-50 border-gray-100 text-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <div className="truncate">
                      <span className="font-semibold block truncate text-[11px]">{col.name}</span>
                      <span className="text-[9px] opacity-70">{col.city} · Cutoff: {col.required}%</span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      col.status === "eligible"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : col.status === "borderline"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {col.status === "eligible"
                      ? "● Likely (+ " + col.diff + "%)"
                      : col.status === "borderline"
                      ? "● Borderline (" + col.diff + "%)"
                      : "○ Reach (" + col.diff + "%)"}
                  </span>
                </div>
              ))}
            </div>

            {/* Heuristic Scam Guard Pill */}
            <div
              onClick={() => setShowScamGuard(!showScamGuard)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-[10px] font-mono-code cursor-pointer ${
                showScamGuard
                  ? isDark
                    ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : isDark
                  ? "bg-zinc-900 border-white/5 text-zinc-500"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Rule Heuristics: Flag Unverified Direct Quota Listings</span>
              </div>
              <span className="font-bold text-[9px]">
                {showScamGuard ? "ACTIVE" : "OFF"}
              </span>
            </div>
          </>
        ) : (
          /* Real UI Screenshot preview */
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src="/projects/digipath.png"
              alt="DigiPath Real Application Interface"
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] font-mono-code text-white/90">
                Verified DigiPath Production Architecture · Python &amp; SQL Engine
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
