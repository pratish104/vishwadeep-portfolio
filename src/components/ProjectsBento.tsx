import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  ExternalLink,
  Filter,
  Github,
  Layers,
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
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // Authentic Marathi Paraphrasing sample variations for Kosh
  const koshVariations = {
    formal: {
      text: "विद्यार्थ्यांनी परीक्षा पूर्वतयारी विहित वेळेत पूर्ण करणे अनिवार्य आहे.",
      style: "Formal / विहित शैली",
      fidelity: "0.96 Semantic Retained",
      note: "Formal register with normative syntactic structure",
    },
    concise: {
      text: "विद्यार्थ्यांनी वेळेवर परीक्षा तयारी पूर्ण करावी.",
      style: "Concise / संक्षिप्त",
      fidelity: "0.94 Semantic Retained",
      note: "Streamlined phrasing while preserving core action",
    },
    conversational: {
      text: "सगळ्या विद्यार्थ्यांनी वेळेत परीक्षेची तयारी करून घेतली पाहिजे.",
      style: "Conversational / सुलभ",
      fidelity: "0.92 Semantic Retained",
      note: "Natural vernacular cadence for readable communication",
    },
  };

  return (
    <section id="projects" className="pt-4 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2.5 mb-10 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-400">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold uppercase tracking-wider">// SELECTED WORK · DATA × AI SYSTEMS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Featured Data & AI Systems
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Applied decision intelligence products, exploratory statistical analytics, and Devanagari natural language modeling.
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
            spotlightColor="rgba(16, 185, 129, 0.14)"
            onClick={() => handleOpenModal(digipath)}
            onMouseEnter={() => soundManager.playHover()}
            className="p-7 sm:p-9 border-zinc-800 hover:border-emerald-500/50 bg-gradient-to-br from-zinc-950 via-[#0d1413] to-zinc-950 shadow-xl cursor-pointer group relative overflow-hidden"
          >
            {/* Subtle top indicator line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Editorial Storytelling (7 cols) */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">
                    ★ FLAGSHIP DATA PRODUCT
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">
                    Verified Public GitHub
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-display text-white tracking-tight group-hover:text-emerald-300 transition-colors flex items-center gap-2.5">
                    <span>{digipath.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-code text-emerald-400/90 font-medium mt-1">
                    {digipath.tagline}
                  </p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {digipath.description}
                </p>

                {/* Problem -> Data -> Decision Pipeline Box */}
                <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-850 text-xs text-zinc-300 space-y-1.5 font-mono-code">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold">
                    <span>DATA FLOW: INGESTION → MATRIX MATCH → DECISION</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                    Harmonizes disparate state admission tables and evaluates applicant percentage cutoffs across engineering branches, city preferences, and category quotas.
                  </p>
                </div>

                {/* Capabilities Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-zinc-300">
                  {digipath.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {digipath.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Visual Evidence & Screenshot (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Browser Mockup Frame with Real Screenshot */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
                  <div className="px-3 py-2 border-b border-zinc-850 bg-zinc-900/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    </div>
                    <span className="text-[11px] font-mono-code text-zinc-400">
                      digipath-college-predictor
                    </span>
                    <div className="w-4" />
                  </div>

                  <div className="p-1.5 bg-zinc-950">
                    <img
                      src={digipath.image}
                      alt="DigiPath Product Interface"
                      className="w-full h-auto rounded-lg object-cover group-hover:scale-[1.01] transition-transform"
                    />
                  </div>
                </div>

                {/* Metrics & Action Footer */}
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-2">
                  <div className="grid grid-cols-1 gap-1.5">
                    {digipath.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/40 text-xs font-mono-code"
                      >
                        <span className="text-zinc-400 text-xs">{m.label}</span>
                        <span className="font-semibold text-emerald-300">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-mono-code text-emerald-400 group-hover:underline font-semibold">
                      Inspect Architecture & Case Study →
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
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 border border-zinc-750 text-zinc-200 text-xs font-mono-code transition-all"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ========================================================================= */}
        {/* 2 & 3: RETAIL SALES ANALYSIS (ANALYTICS) & KOSH (MARATHI NLP)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project 2: Retail Sales Analysis & BI Dashboard */}
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.14)"
              onClick={() => handleOpenModal(retailSales)}
              onMouseEnter={() => soundManager.playHover()}
              className="p-7 border-zinc-800 hover:border-indigo-500/50 bg-gradient-to-br from-zinc-950 via-[#0f111a] to-zinc-950 shadow-xl cursor-pointer group flex flex-col justify-between h-full space-y-5 text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-code font-bold text-indigo-300 uppercase tracking-wider block">
                        DATA ANALYTICS CASE STUDY
                      </span>
                      <span className="text-[11px] font-mono-code text-zinc-400">
                        R · RStudio · Power BI
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono-code text-zinc-400">
                    Interactive Preview
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

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {retailSales.description}
                </p>

                {/* Analytical Insight Simulator (R + Power BI) */}
                <div
                  className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 space-y-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                      DATA ANALYTICS INSIGHTS (R & POWER BI)
                    </span>
                    <span className="text-indigo-400 text-[11px]">Interactive</span>
                  </div>

                  {/* Tabs */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950/80 rounded-lg text-xs font-mono-code">
                    <button
                      onClick={() => {
                        soundManager.playHover();
                        setRetailTab("margins");
                      }}
                      className={`py-1 px-2 rounded-md transition-all ${
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
                      className={`py-1 px-2 rounded-md transition-all ${
                        retailTab === "discounts"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Discounting
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playHover();
                        setRetailTab("segments");
                      }}
                      className={`py-1 px-2 rounded-md transition-all ${
                        retailTab === "segments"
                          ? "bg-indigo-600 text-white font-semibold"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Segments
                    </button>
                  </div>

                  {/* Dynamic Tab Body */}
                  <div className="text-xs font-mono-code space-y-2 pt-1">
                    {retailTab === "margins" && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-zinc-300 text-xs">
                          <span>West Region</span>
                          <span className="text-emerald-400 font-bold">+28.4% Net Margin</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 w-[78%]" />
                        </div>

                        <div className="flex justify-between text-zinc-300 text-xs pt-1">
                          <span>Central Region</span>
                          <span className="text-amber-400 font-bold">-3.2% (Over-Discounting)</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 w-[24%]" />
                        </div>
                      </div>
                    )}

                    {retailTab === "discounts" && (
                      <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-850 space-y-1">
                        <div className="text-indigo-300 font-bold text-xs">
                          Statistical Finding in R:
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          Promotional discounts &gt; 20% boosted sales volume by 34% but degraded overall transaction margin by 42%.
                        </p>
                      </div>
                    )}

                    {retailTab === "segments" && (
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-850">
                          <div className="text-zinc-400 text-[11px]">Consumer</div>
                          <div className="text-indigo-300 font-bold text-sm mt-0.5">51.9%</div>
                        </div>
                        <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-850">
                          <div className="text-zinc-400 text-[11px]">Corporate</div>
                          <div className="text-indigo-300 font-bold text-sm mt-0.5">30.2%</div>
                        </div>
                        <div className="p-2 rounded-lg bg-zinc-950/80 border border-zinc-850">
                          <div className="text-zinc-400 text-[11px]">Home Office</div>
                          <div className="text-indigo-300 font-bold text-sm mt-0.5">17.9%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs font-mono-code text-zinc-400">
                  Note: Analyzed strictly using R/RStudio and Power BI.
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-3 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-xs font-mono-code text-indigo-400 group-hover:underline font-semibold">
                  Explore Case Study Walkthrough →
                </span>
                <span className="text-xs font-mono-code text-zinc-400">
                  Exploratory Analytics
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Project 3: Kosh — Marathi Text Rewriting & Style Transformation */}
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(139, 92, 246, 0.14)"
              onClick={() => handleOpenModal(kosh)}
              onMouseEnter={() => soundManager.playHover()}
              className="p-7 border-zinc-800 hover:border-purple-500/50 bg-gradient-to-br from-zinc-950 via-[#120e1c] to-zinc-950 shadow-xl cursor-pointer group flex flex-col justify-between h-full space-y-5 text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-code font-bold text-purple-300 uppercase tracking-wider block">
                        MARATHI NLP & TRANSFORMATION
                      </span>
                      <span className="text-[11px] font-mono-code text-zinc-400">
                        Python · Devanagari Normalization
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono-code text-zinc-400">
                    NLP Prototype
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

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {kosh.description}
                </p>

                {/* Interactive Marathi Linguistic Demonstrator */}
                <div
                  className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 space-y-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                      MARATHI REWRITE ENGINE PREVIEW
                    </span>
                    <span className="text-purple-400 text-[11px]">Live Selector</span>
                  </div>

                  {/* Input Marathi text */}
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-850 text-xs">
                    <span className="text-[10px] font-mono-code text-zinc-400 block mb-1">
                      INPUT DEVANAGARI SENTENCE:
                    </span>
                    <p className="font-sans text-zinc-200 font-medium">
                      "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे."
                    </p>
                  </div>

                  {/* Style Selector Chips */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono-code text-zinc-400">Tone:</span>
                    {(["formal", "concise", "conversational"] as const).map((tone) => (
                      <button
                        key={tone}
                        onClick={() => {
                          soundManager.playHover();
                          setKoshTone(tone);
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-mono-code transition-all ${
                          koshTone === tone
                            ? "bg-purple-600 text-white font-bold"
                            : "bg-zinc-950 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {tone.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Paraphrased Result Box */}
                  <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono-code">
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
                    <p className="text-[11px] font-mono-code text-zinc-400 pt-0.5">
                      {koshVariations[koshTone].note}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono-code text-zinc-400">
                  Note: Formerly developed under internal project code SANGRAH.
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-3 border-t border-zinc-850 flex items-center justify-between">
                <span className="text-xs font-mono-code text-purple-400 group-hover:underline font-semibold">
                  Inspect NLP Transformation Pipeline →
                </span>
                <span className="text-xs font-mono-code text-zinc-400">
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
            spotlightColor="rgba(14, 165, 233, 0.12)"
            onClick={() => handleOpenModal(systems)}
            onMouseEnter={() => soundManager.playHover()}
            className="p-6 sm:p-7 border-zinc-800 hover:border-sky-500/40 bg-zinc-950/90 shadow-xl cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left"
          >
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono-code">
                <span className="text-sky-400 font-bold uppercase">
                  SYSTEMS & DEFENSE DEPTH
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">
                  ForensiQ & ShadowNet
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-serif-display text-white group-hover:text-sky-300 transition-colors">
                  Volatile Memory Forensics & Real-Time Packet Anomaly Triage
                </h3>
                <p className="text-xs font-mono-code text-zinc-400 mt-0.5">
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
                    className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-300"
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
              <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white group-hover:border-sky-500/50 transition-all">
                <ArrowUpRight className="w-4 h-4" />
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
