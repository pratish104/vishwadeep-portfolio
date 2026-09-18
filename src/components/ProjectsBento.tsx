import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  ExternalLink,
  FileCode2,
  Filter,
  Github,
  Layers,
  PieChart,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { ProjectModal } from "./ProjectModal";
import { SpotlightCard } from "./SpotlightCard";

export function ProjectsBento() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Active tabs for interactive case study previews
  const [retailTab, setRetailTab] = useState<"margins" | "discounts" | "segments">("margins");
  const [koshTone, setKoshTone] = useState<"formal" | "concise" | "conversational">("formal");

  const digipath = featuredProjects.find((p) => p.id === "digipath")!;
  const retailSales = featuredProjects.find((p) => p.id === "retail-sales")!;
  const kosh = featuredProjects.find((p) => p.id === "kosh")!;
  const systems = featuredProjects.find((p) => p.id === "forensiq-shadownet")!;

  const handleOpenModal = (project: ProjectItem) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // Marathi Paraphrasing sample variations for Kosh
  const koshVariations = {
    formal: {
      text: "विद्यार्थ्यांनी परीक्षा पूर्वतयारी विहित वेळेत पूर्ण करणे अनिवार्य आहे.",
      style: "Formal / विहित शैली",
      fidelity: "0.96 Semantic Retained",
      note: "Higher vocabulary register with active syntactic compliance",
    },
    concise: {
      text: "विद्यार्थ्यांनी वेळेवर परीक्षा तयारी पूर्ण करावी.",
      style: "Concise / संक्षिप्त",
      fidelity: "0.94 Semantic Retained",
      note: "Eliminated redundant modifiers while preserving core directive",
    },
    conversational: {
      text: "सगळ्या विद्यार्थ्यांनी वेळेत परीक्षेची तयारी करून घेतली पाहिजे.",
      style: "Conversational / सुलभ",
      fidelity: "0.92 Semantic Retained",
      note: "Natural vernacular cadence suitable for accessible reading",
    },
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-14 text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono-code shadow-sm">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>// APPLIED DATA PRODUCTS & ENGINEERING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Featured Engineering Systems
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          From unstandardized college admission records to retail revenue diagnostics and Marathi natural language processing.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="space-y-8"
      >
        {/* ========================================================================= */}
        {/* 1. PRIMARY FLAGSHIP PROJECT: DIGIPATH (FULL-WIDTH HERO)                  */}
        {/* ========================================================================= */}
        <motion.div variants={itemVariants}>
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.15)"
            onClick={() => handleOpenModal(digipath)}
            onMouseEnter={() => soundManager.playHover()}
            className="p-7 sm:p-9 border-emerald-500/30 hover:border-emerald-400/60 bg-gradient-to-br from-zinc-950 via-[#0d1414] to-zinc-950 shadow-2xl cursor-pointer group relative overflow-hidden"
          >
            {/* Top gradient highlight border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Editorial Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    FLAGSHIP PROJECT
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono-code text-zinc-300">
                    {digipath.statusLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display text-white tracking-tight group-hover:text-emerald-300 transition-colors flex items-center gap-3">
                    <span>{digipath.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-code text-emerald-400/90 font-medium mt-1">
                    {digipath.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {digipath.description}
                </p>

                {/* Pipeline Callout */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 text-xs font-mono-code text-zinc-300 space-y-1">
                  <div className="text-emerald-400 font-bold uppercase text-[11px]">
                    PIPELINE ARCHITECTURE:
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {digipath.architecture}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {digipath.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-2 text-xs text-zinc-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {digipath.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono-code font-medium text-emerald-300/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Actual Project Screenshot & Metrics (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Visual Browser Mockup with Real Screenshot */}
                <div className="rounded-2xl border border-zinc-700/60 bg-zinc-950/90 overflow-hidden shadow-xl">
                  {/* Browser top chrome */}
                  <div className="px-3 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-mono-code text-zinc-400 truncate max-w-[200px]">
                      digipath-college-predictor
                    </span>
                    <div className="w-4" />
                  </div>

                  {/* Screenshot */}
                  <div className="p-2 bg-zinc-950">
                    <img
                      src={digipath.image}
                      alt="DigiPath Interface"
                      className="w-full h-auto rounded-lg object-cover group-hover:scale-[1.01] transition-transform"
                    />
                  </div>
                </div>

                {/* Metrics Box */}
                <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400 pb-2 border-b border-zinc-850">
                    <span className="text-zinc-300 font-semibold">VERIFIED ARCHITECTURE METRICS</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {digipath.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/50 border border-zinc-850 text-xs"
                      >
                        <span className="font-mono-code text-zinc-400 text-[11px]">{m.label}</span>
                        <span className="font-mono-code font-bold text-emerald-300">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-mono-code text-emerald-400 group-hover:underline font-semibold">
                      Inspect Architecture →
                    </span>

                    {digipath.github && (
                      <a
                        href={digipath.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                        }}
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 border border-zinc-700 text-zinc-300 transition-all shadow-md"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2 & 3: RETAIL SALES ANALYSIS & KOSH MARATHI PARAPHRASER                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project 2: Retail Sales Analysis & BI Dashboard */}
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.15)"
              onClick={() => handleOpenModal(retailSales)}
              onMouseEnter={() => soundManager.playHover()}
              className="p-7 border-indigo-500/30 hover:border-indigo-400/60 bg-gradient-to-br from-zinc-950 via-[#0f111a] to-zinc-950 shadow-xl cursor-pointer group flex flex-col justify-between h-full space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono-code font-semibold text-indigo-300">
                      {retailSales.category}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono-code text-zinc-400">
                    {retailSales.statusLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif-display text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                    <span>{retailSales.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs font-mono-code text-zinc-400 mt-1">
                    {retailSales.tagline}
                  </p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {retailSales.description}
                </p>

                {/* Interactive Analytical Insight Simulator */}
                <div
                  className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider font-semibold">
                      INTERACTIVE EDA INSIGHTS (R & POWER BI)
                    </span>
                    <span className="text-[10px] font-mono-code text-indigo-400">
                      Sample Telemetry
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-900/70 rounded-xl text-[11px] font-mono-code">
                    <button
                      onClick={() => {
                        soundManager.playHover();
                        setRetailTab("margins");
                      }}
                      className={`py-1.5 px-2 rounded-lg transition-all ${
                        retailTab === "margins"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Margins
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playHover();
                        setRetailTab("discounts");
                      }}
                      className={`py-1.5 px-2 rounded-lg transition-all ${
                        retailTab === "discounts"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Discount Impact
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playHover();
                        setRetailTab("segments");
                      }}
                      className={`py-1.5 px-2 rounded-lg transition-all ${
                        retailTab === "segments"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Segments
                    </button>
                  </div>

                  {/* Tab Display Content */}
                  <div className="text-xs font-mono-code space-y-2 pt-1">
                    {retailTab === "margins" && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-zinc-300">
                          <span>West Region</span>
                          <span className="text-emerald-400 font-bold">+28.4% Net Margin</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 w-[78%]" />
                        </div>

                        <div className="flex justify-between text-zinc-300 pt-1">
                          <span>Central Region</span>
                          <span className="text-amber-400 font-bold">-3.2% (Over-Discounting)</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 w-[24%]" />
                        </div>
                      </div>
                    )}

                    {retailTab === "discounts" && (
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                        <div className="text-indigo-300 font-bold text-[11px]">
                          Key Finding in R Analysis:
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                          Discounts surpassing 20% boosted sales volume by 34% but degraded overall transaction profitability by 42%.
                        </p>
                      </div>
                    )}

                    {retailTab === "segments" && (
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                        <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-850">
                          <div className="text-zinc-400">Consumer</div>
                          <div className="text-indigo-300 font-bold text-xs mt-0.5">51.9%</div>
                        </div>
                        <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-850">
                          <div className="text-zinc-400">Corporate</div>
                          <div className="text-indigo-300 font-bold text-xs mt-0.5">30.2%</div>
                        </div>
                        <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-850">
                          <div className="text-zinc-400">Home Office</div>
                          <div className="text-indigo-300 font-bold text-xs mt-0.5">17.9%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Strict Tool Note */}
                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 text-[11px] font-mono-code text-indigo-300/90">
                  <span className="text-zinc-400">Tools: </span>
                  R, RStudio, Power BI (EDA & Reporting)
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-mono-code text-indigo-400 group-hover:underline font-semibold">
                  Explore Case Study →
                </span>
                <span className="text-[10px] font-mono-code text-zinc-400">
                  Analytical Modeling
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Project 3: Kosh — Marathi Text Rewriting & Style Transformation */}
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.15)"
              onClick={() => handleOpenModal(kosh)}
              onMouseEnter={() => soundManager.playHover()}
              className="p-7 border-purple-500/30 hover:border-purple-400/60 bg-gradient-to-br from-zinc-950 via-[#120e1c] to-zinc-950 shadow-xl cursor-pointer group flex flex-col justify-between h-full space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono-code font-semibold text-purple-300">
                      {kosh.category}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono-code text-zinc-400">
                    {kosh.statusLabel}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif-display text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                    <span>{kosh.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs font-mono-code text-zinc-400 mt-1">
                    {kosh.tagline}
                  </p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {kosh.description}
                </p>

                {/* Interactive Marathi Paraphraser Demo */}
                <div
                  className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider font-semibold">
                      INTERACTIVE MARATHI REWRITE ENGINE
                    </span>
                    <span className="text-[10px] font-mono-code text-purple-400">
                      NLP Prototype
                    </span>
                  </div>

                  {/* Input Sentence */}
                  <div className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-850 text-xs">
                    <span className="text-[10px] font-mono-code text-zinc-400 block mb-1">
                      INPUT DEVANAGARI PAYLOAD:
                    </span>
                    <p className="font-sans text-zinc-200 font-medium">
                      "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे."
                    </p>
                  </div>

                  {/* Style Selector Chips */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono-code text-zinc-400">Tone:</span>
                    {(["formal", "concise", "conversational"] as const).map((tone) => (
                      <button
                        key={tone}
                        onClick={() => {
                          soundManager.playHover();
                          setKoshTone(tone);
                        }}
                        className={`px-2 py-1 rounded-md text-[10px] font-mono-code transition-all ${
                          koshTone === tone
                            ? "bg-purple-600 text-white font-bold"
                            : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {tone.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Paraphrased Output Result */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono-code">
                      <span className="text-purple-300 font-semibold">
                        OUTPUT: {koshVariations[koshTone].style}
                      </span>
                      <span className="text-emerald-400">
                        {koshVariations[koshTone].fidelity}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-zinc-100 font-medium pt-0.5">
                      "{koshVariations[koshTone].text}"
                    </p>
                    <p className="text-[10px] font-mono-code text-zinc-400 pt-0.5">
                      {koshVariations[koshTone].note}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 text-[11px] font-mono-code text-purple-300/90">
                  <span className="text-zinc-400">Internal Code: </span>
                  Formerly developed as project SANGRAH
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-mono-code text-purple-400 group-hover:underline font-semibold">
                  Inspect NLP Pipeline →
                </span>
                <span className="text-[10px] font-mono-code text-zinc-400">
                  Devanagari Processing
                </span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SYSTEMS ENGINEERING DEPTH: FORENSIQ & SHADOWNET                        */}
        {/* ========================================================================= */}
        <motion.div variants={itemVariants}>
          <SpotlightCard
            spotlightColor="rgba(14, 165, 233, 0.14)"
            onClick={() => handleOpenModal(systems)}
            onMouseEnter={() => soundManager.playHover()}
            className="p-7 border-sky-500/30 hover:border-sky-400/60 bg-gradient-to-br from-zinc-950 via-[#0a1219] to-zinc-950 shadow-xl cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-mono-code font-bold uppercase">
                  SYSTEMS & DEFENSE DEPTH
                </span>
                <span className="text-[11px] font-mono-code text-zinc-400">
                  ForensiQ & ShadowNet
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif-display text-white group-hover:text-sky-300 transition-colors">
                  Volatile Memory Forensics & Real-Time Packet Anomaly Triage
                </h3>
                <p className="text-xs font-mono-code text-sky-400/90 mt-1">
                  Automated incident response tooling & network inspection pipelines
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {systems.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {systems.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono-code text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="text-xs font-mono-code text-sky-400 group-hover:underline font-semibold">
                Inspect Tooling →
              </span>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white group-hover:border-sky-500/50 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

