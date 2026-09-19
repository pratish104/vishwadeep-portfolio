import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  Filter,
  Github,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { ProjectModal } from "./ProjectModal";
import { SpotlightCard } from "./SpotlightCard";

export function ProjectsBento() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Interactive tab states
  const [retailTab, setRetailTab] = useState<"margins" | "discounts" | "segments">("margins");
  const [koshTone, setKoshTone] = useState<"formal" | "concise" | "conversational">("formal");

  const digipath = featuredProjects.find((p) => p.id === "digipath") ?? featuredProjects[0];
  const retailSales = featuredProjects.find((p) => p.id === "retail-sales") ?? featuredProjects[1];
  const kosh = featuredProjects.find((p) => p.id === "kosh") ?? featuredProjects[2];
  const systems = featuredProjects.find((p) => p.id === "systems-depth") ?? featuredProjects[3];

  const handleOpenModal = (project: ProjectItem) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const koshVariations = {
    formal: {
      style: "औपचारिक (Formal)",
      text: "विद्यार्थ्यांनी परीक्षा पूर्वतयारी वेळेत पूर्ण करणे आवश्यक आहे.",
      fidelity: "Semantic Match",
    },
    concise: {
      style: "संक्षिप्त (Concise)",
      text: "विद्यार्थ्यांनी परीक्षेची तयारी वेळेत करावी.",
      fidelity: "Concise Form",
    },
    conversational: {
      style: "संभाषण (Conversational)",
      text: "परीक्षेची तयारी मुलांनी वेळेवरच करून घ्यायला हवी.",
      fidelity: "Spoken Dialect",
    },
  };

  // Card theme styling matching the reference images
  const cardBorder =
    theme === "light"
      ? "border-gray-200 hover:border-gray-300 bg-white/95 shadow-xl shadow-black/[0.04]"
      : theme === "anime"
      ? "border-[#1e3050] hover:border-[#2a4060] bg-[#121f35]/90 shadow-2xl shadow-black/40"
      : "border-[#1c2236] hover:border-[#283250] bg-[#0c0f1d]/90 shadow-2xl shadow-black/60";

  const headingColor = isDark ? "text-white" : "text-gray-900";
  const bodyColor = isDark ? "text-zinc-300" : "text-gray-600";
  const textMuted = isDark ? "text-zinc-400" : "text-gray-500";
  const innerBoxBg = isDark ? "bg-[#080a14]/80 border-white/10" : "bg-gray-50 border-gray-200";
  const chipBg = isDark ? "bg-[#14192b] border-white/10 text-zinc-300" : "bg-gray-100 border-gray-200 text-gray-700";

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* ── Section Header matching Reference ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div className="space-y-1.5">
          <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-400">
            // FEATURED PROJECTS
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-serif-display tracking-tight ${headingColor}`}>
            Selected Data &amp; AI Systems
          </h2>
          <p className={`text-xs sm:text-sm font-normal ${textMuted}`}>
            Real projects. Real problems. Real impact.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal(digipath)}
          onMouseEnter={() => soundManager.playHover()}
          className={`self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono-code transition-all hover:scale-105 ${
            isDark
              ? "bg-[#14192b] border-white/10 text-zinc-200 hover:text-white"
              : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
          }`}
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>

      {/* ── 3-Column Project Bento Grid ────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* ── CARD 1: DigiPath (Flagship) ────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <SpotlightCard
            spotlightColor={isDark ? "rgba(16, 185, 129, 0.16)" : "rgba(16, 185, 129, 0.08)"}
            onClick={() => handleOpenModal(digipath)}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full space-y-5 ${cardBorder}`}
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  ★ FLAGSHIP
                </span>
                <span className={`text-[11px] font-mono-code ${textMuted}`}>
                  Verified GitHub
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-emerald-400 transition-colors flex items-center justify-between ${headingColor}`}>
                  <span>DigiPath</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs font-mono-code text-emerald-400 font-medium mt-0.5">
                  Admission Decision Intelligence
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
                End-to-end college prediction platform for diploma and engineering aspirants.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Python", "ML", "Data Processing"].map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono-code ${chipBg}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interface Mockup */}
              <div className={`rounded-xl border p-2 overflow-hidden shadow-inner space-y-2 ${innerBoxBg}`}>
                <div className="flex items-center justify-between px-1 text-[10px] font-mono-code text-zinc-400">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-400/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                  </div>
                  <span>digipath.engine</span>
                </div>
                <img
                  src={digipath.image}
                  alt="DigiPath Screenshot"
                  className="w-full h-28 object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-code">
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-emerald-400 text-sm">State</div>
                  <div className={`text-[10px] ${textMuted}`}>Cutoffs Ingested</div>
                </div>
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-emerald-400 text-sm">Multi-Param</div>
                  <div className={`text-[10px] ${textMuted}`}>Prediction Match</div>
                </div>
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-emerald-400 text-sm">Scam Filter</div>
                  <div className={`text-[10px] ${textMuted}`}>Listing Rules</div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-emerald-400 font-semibold group-hover:underline">
              <span>Explore Project →</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ── CARD 2: Retail Sales Analysis (R + Power BI) ──────────────────── */}
        <motion.div variants={itemVariants}>
          <SpotlightCard
            spotlightColor={isDark ? "rgba(59, 130, 246, 0.16)" : "rgba(37, 99, 235, 0.08)"}
            onClick={() => handleOpenModal(retailSales)}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full space-y-5 ${cardBorder}`}
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold uppercase tracking-wider bg-blue-500/15 border border-blue-500/30 text-blue-400">
                  DATA ANALYTICS
                </span>
                <span className={`text-[11px] font-mono-code ${textMuted}`}>
                  Case Study
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-blue-400 transition-colors flex items-center justify-between ${headingColor}`}>
                  <span>Retail Sales Analysis</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs font-mono-code text-blue-400 font-medium mt-0.5">
                  R + Power BI Dashboard
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
                Exploratory analysis and interactive dashboards for retail sales data.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["R", "RStudio", "Power BI"].map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono-code ${chipBg}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactive Dashboard Chart Preview */}
              <div
                className={`rounded-xl border p-3 space-y-2.5 ${innerBoxBg}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className={`font-semibold text-[11px] ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                    Interactive Margin Triage
                  </span>
                  <span className="text-[10px] text-blue-400">Live Tabs</span>
                </div>

                {/* Sub tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-black/30 dark:bg-black/40 rounded-lg text-xs font-mono-code text-center">
                  <button
                    onClick={() => {
                      soundManager.playHover();
                      setRetailTab("margins");
                    }}
                    className={`py-1 rounded-md transition-all ${
                      retailTab === "margins"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Margins
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playHover();
                      setRetailTab("discounts");
                    }}
                    className={`py-1 rounded-md transition-all ${
                      retailTab === "discounts"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Discounts
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playHover();
                      setRetailTab("segments");
                    }}
                    className={`py-1 rounded-md transition-all ${
                      retailTab === "segments"
                        ? "bg-blue-600 text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Segments
                  </button>
                </div>

                {/* Tab content */}
                <div className="text-xs font-mono-code min-h-[64px] flex flex-col justify-center">
                  {retailTab === "margins" && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className={bodyColor}>West Region</span>
                        <span className="text-emerald-400 font-bold">+28.4% Net Margin</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[78%]" />
                      </div>
                      <div className="flex justify-between text-[11px] pt-0.5">
                        <span className={bodyColor}>Central Region</span>
                        <span className="text-amber-400 font-bold">-3.2% (Over-Discounting)</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[25%]" />
                      </div>
                    </div>
                  )}

                  {retailTab === "discounts" && (
                    <p className={`text-[11px] leading-relaxed font-sans ${bodyColor}`}>
                      Discounts &gt; 20% boosted sales volume by 34% but degraded overall margin by 42%.
                    </p>
                  )}

                  {retailTab === "segments" && (
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <div className="p-1 rounded bg-black/20">
                        <span className="text-[9px] block text-zinc-400">Consumer</span>
                        <span className="text-xs font-bold text-blue-400">51.9%</span>
                      </div>
                      <div className="p-1 rounded bg-black/20">
                        <span className="text-[9px] block text-zinc-400">Corporate</span>
                        <span className="text-xs font-bold text-blue-400">30.2%</span>
                      </div>
                      <div className="p-1 rounded bg-black/20">
                        <span className="text-[9px] block text-zinc-400">Home Office</span>
                        <span className="text-xs font-bold text-blue-400">17.9%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-code">
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-blue-400 text-sm">EDA</div>
                  <div className={`text-[10px] ${textMuted}`}>R / RStudio</div>
                </div>
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-blue-400 text-sm">KPIs</div>
                  <div className={`text-[10px] ${textMuted}`}>Margin Modeling</div>
                </div>
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-blue-400 text-sm">4 Regions</div>
                  <div className={`text-[10px] ${textMuted}`}>Power BI Dash</div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-blue-400 font-semibold group-hover:underline">
              <span>Explore Project →</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ── CARD 3: Kosh (Marathi NLP) ─────────────────────────────────────── */}
        <motion.div variants={itemVariants}>
          <SpotlightCard
            spotlightColor={isDark ? "rgba(168, 85, 247, 0.16)" : "rgba(147, 51, 234, 0.08)"}
            onClick={() => handleOpenModal(kosh)}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full space-y-5 ${cardBorder}`}
          >
            <div className="space-y-4">
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold uppercase tracking-wider bg-purple-500/15 border border-purple-500/30 text-purple-400">
                  NLP / LANGUAGE
                </span>
                <span className={`text-[11px] font-mono-code ${textMuted}`}>
                  Devanagari
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-purple-400 transition-colors flex items-center justify-between ${headingColor}`}>
                  <span>Kosh</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs font-mono-code text-purple-400 font-medium mt-0.5">
                  Marathi Text Rewriting System
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
                Context-aware Marathi paraphrasing and style transformation.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Python", "NLP", "mT5 / MBart"].map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono-code ${chipBg}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Interactive Devanagari Demonstration Box */}
              <div
                className={`rounded-xl border p-3 space-y-2.5 ${innerBoxBg}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className={`font-semibold text-[11px] ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                    Marathi Transformation
                  </span>
                  <span className="text-[10px] text-purple-400">Style Engine</span>
                </div>

                {/* Tone chips */}
                <div className="flex items-center gap-1.5">
                  {(["formal", "concise", "conversational"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        soundManager.playHover();
                        setKoshTone(t);
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono-code transition-all ${
                        koshTone === t
                          ? "bg-purple-600 text-white font-bold"
                          : "bg-black/30 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Input / Output view */}
                <div className="space-y-1 text-xs">
                  <div className="p-1.5 rounded bg-black/30 text-[11px]">
                    <span className="text-[9px] font-mono-code text-zinc-400 block">Input (मराठी):</span>
                    <p className={`font-medium ${isDark ? "text-zinc-200" : "text-gray-800"}`}>
                      "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे."
                    </p>
                  </div>
                  <div className="p-1.5 rounded bg-purple-950/40 border border-purple-500/30 text-[11px]">
                    <span className="text-[9px] font-mono-code text-purple-300 block">Output ({koshTone}):</span>
                    <p className="text-zinc-100 font-medium">
                      "{koshVariations[koshTone].text}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-code">
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-purple-400 text-sm">Devanagari</div>
                  <div className={`text-[10px] ${textMuted}`}>Preprocessing</div>
                </div>
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-purple-400 text-sm">Paraphrase</div>
                  <div className={`text-[10px] ${textMuted}`}>Style Transfer</div>
                </div>
                <div className={`p-2 rounded-xl border ${innerBoxBg}`}>
                  <div className="font-bold text-purple-400 text-sm">SANGRAH</div>
                  <div className={`text-[10px] ${textMuted}`}>Internal Code</div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-purple-400 font-semibold group-hover:underline">
              <span>Explore Project →</span>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>

      {/* ── Systems Engineering Depth Card below (ForensiQ & ShadowNet) ────────── */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-6"
      >
        <SpotlightCard
          spotlightColor={isDark ? "rgba(14, 165, 233, 0.12)" : "rgba(14, 165, 233, 0.08)"}
          onClick={() => handleOpenModal(systems)}
          onMouseEnter={() => soundManager.playHover()}
          className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${cardBorder}`}
        >
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono-code">
              <span className="text-sky-400 font-bold uppercase">
                SYSTEMS &amp; DEFENSE DEPTH
              </span>
              <span className={textMuted}>•</span>
              <span className={textMuted}>
                ForensiQ &amp; ShadowNet
              </span>
            </div>

            <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-sky-400 transition-colors ${headingColor}`}>
              Volatile Memory Forensics &amp; Real-Time Packet Anomaly Triage
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              {systems.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {systems.technologies.map((t) => (
                <span key={t} className={`px-2.5 py-0.5 rounded-lg border text-xs font-mono-code ${chipBg}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-mono-code text-sky-400 group-hover:underline font-semibold">
              Inspect Tooling →
            </span>
            <div className={`p-3 rounded-xl border transition-all ${
              isDark
                ? "bg-[#14192b] border-white/10 text-zinc-300 group-hover:text-white group-hover:border-sky-500/50"
                : "bg-sky-50 border-sky-200 text-sky-700 group-hover:bg-sky-600 group-hover:text-white"
            }`}>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </SpotlightCard>
      </motion.div>

      {/* ── Full-Viewport Project Case Study Modal ─────────────────────────────── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
