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

  // Active tabs for interactive case study previews
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
        staggerChildren: 0.14,
        delayChildren: 0.08,
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

  // Marathi rewrite interactive demonstrator samples
  const koshVariations = {
    formal: {
      style: "औपचारिक (Formal)",
      text: "विद्यार्थ्यांनी निर्धारित वेळेत परीक्षेची पूर्वतयारी पूर्ण करणे अत्यावश्यक आहे.",
      fidelity: "98% Semantic Match",
      note: "Standard academic phrasing with precise Sanskritized Marathi lexicon.",
    },
    concise: {
      style: "संक्षिप्त (Concise)",
      text: "विद्यार्थ्यांनी परीक्षेची तयारी वेळेत करावी.",
      fidelity: "99% Semantic Match",
      note: "Reduces token count by 36% while preserving core directive intent.",
    },
    conversational: {
      style: "संभाषण (Conversational)",
      text: "परीक्षेची तयारी मुलांनी वेळेवरच करून घ्यायला हवी.",
      fidelity: "96% Semantic Match",
      note: "Colloquial Marathi construction suitable for spoken-language dialogues.",
    },
  };

  // Theme-adaptive classes
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const bodyColor = isDark ? "text-zinc-300" : "text-gray-600";
  const textMuted = isDark ? "text-zinc-400" : "text-gray-500";
  const chipBg = isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-gray-100 border-gray-200 text-gray-700";
  const innerCardBg = isDark ? "bg-zinc-900/40 border-zinc-850" : "bg-gray-50 border-gray-200";
  const subBoxBg = isDark ? "bg-zinc-950/80 border-zinc-850" : "bg-white border-gray-200 shadow-sm";
  const footerBorder = isDark ? "border-zinc-850" : "border-gray-200";

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
        <div className={`flex items-center gap-2 text-xs font-mono-code ${isDark ? "text-indigo-400" : "text-blue-600"}`}>
          <Database className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// SELECTED WORK · DATA × AI SYSTEMS</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif-display tracking-tight ${headingColor}`}>
          Featured Data &amp; AI Systems
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${textMuted}`}>
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
            spotlightColor={isDark ? "rgba(16, 185, 129, 0.14)" : "rgba(16, 185, 129, 0.08)"}
            onClick={() => handleOpenModal(digipath)}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-7 sm:p-9 shadow-xl cursor-pointer group relative overflow-hidden ${
              isDark
                ? "border-zinc-800 hover:border-emerald-500/50 bg-gradient-to-br from-zinc-950 via-[#0d1413] to-zinc-950"
                : "border-gray-200 hover:border-emerald-500/60 bg-white"
            }`}
          >
            {/* Subtle top indicator line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Editorial Storytelling (7 cols) */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                  <span className="text-emerald-500 font-bold uppercase tracking-wider">
                    ★ FLAGSHIP DATA PRODUCT
                  </span>
                  <span className={textMuted}>•</span>
                  <span className={textMuted}>
                    Verified Public GitHub
                  </span>
                </div>

                <div>
                  <h3 className={`text-2xl sm:text-3xl font-serif-display tracking-tight group-hover:text-emerald-500 transition-colors flex items-center gap-2.5 ${headingColor}`}>
                    <span>{digipath.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-code text-emerald-500 font-medium mt-1">
                    {digipath.tagline}
                  </p>
                </div>

                <p className={`text-sm leading-relaxed font-normal ${bodyColor}`}>
                  {digipath.description}
                </p>

                {/* Problem -> Data -> Decision Pipeline Box */}
                <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 font-mono-code ${innerCardBg} ${bodyColor}`}>
                  <div className={`flex items-center justify-between text-[11px] font-semibold ${textMuted}`}>
                    <span>DATA FLOW: INGESTION → MATRIX MATCH → DECISION</span>
                  </div>
                  <p className={`leading-relaxed font-sans text-xs ${bodyColor}`}>
                    Harmonizes disparate state admission tables and evaluates applicant percentage cutoffs across engineering branches, city preferences, and category quotas.
                  </p>
                </div>

                {/* Capabilities Checklist */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs ${bodyColor}`}>
                  {digipath.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {digipath.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono-code ${chipBg}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side: Visual Evidence & Screenshot (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Browser Mockup Frame with Real Screenshot */}
                <div className={`rounded-xl border overflow-hidden shadow-xl ${
                  isDark ? "border-zinc-800 bg-zinc-950" : "border-gray-200 bg-gray-100"
                }`}>
                  <div className={`px-3 py-2 border-b flex items-center justify-between ${
                    isDark ? "border-zinc-850 bg-zinc-900/80 text-zinc-400" : "border-gray-200 bg-gray-200/80 text-gray-500"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-[11px] font-mono-code">
                      digipath-college-predictor
                    </span>
                    <div className="w-4" />
                  </div>

                  <div className={`p-1.5 ${isDark ? "bg-zinc-950" : "bg-white"}`}>
                    <img
                      src={digipath.image}
                      alt="DigiPath Product Interface"
                      className="w-full h-auto rounded-lg object-cover group-hover:scale-[1.01] transition-transform"
                    />
                  </div>
                </div>

                {/* Metrics & Action Footer */}
                <div className={`p-3.5 rounded-xl border space-y-2 ${
                  isDark ? "bg-zinc-950/80 border-zinc-850" : "bg-gray-50 border-gray-200"
                }`}>
                  <div className="grid grid-cols-1 gap-1.5">
                    {digipath.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono-code ${
                          isDark ? "bg-zinc-900/40 text-zinc-300" : "bg-white border border-gray-200 text-gray-700"
                        }`}
                      >
                        <span className={`text-xs ${textMuted}`}>{m.label}</span>
                        <span className="font-semibold text-emerald-500">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-mono-code text-emerald-500 group-hover:underline font-semibold">
                      Inspect Architecture &amp; Case Study →
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
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono-code transition-all ${
                          isDark
                            ? "bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 border-zinc-750 text-zinc-200"
                            : "bg-gray-900 hover:bg-emerald-600 text-white border-gray-800"
                        }`}
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
              spotlightColor={isDark ? "rgba(99, 102, 241, 0.14)" : "rgba(37, 99, 235, 0.08)"}
              onClick={() => handleOpenModal(retailSales)}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-7 shadow-xl cursor-pointer group flex flex-col justify-between h-full space-y-5 text-left ${
                isDark
                  ? "border-zinc-800 hover:border-indigo-500/50 bg-gradient-to-br from-zinc-950 via-[#0f111a] to-zinc-950"
                  : "border-gray-200 hover:border-blue-500/60 bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl border ${
                      isDark ? "bg-indigo-950/60 border-indigo-500/30 text-indigo-400" : "bg-blue-50 border-blue-200 text-blue-600"
                    }`}>
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-mono-code font-bold uppercase tracking-wider block ${
                        isDark ? "text-indigo-300" : "text-blue-600"
                      }`}>
                        DATA ANALYTICS CASE STUDY
                      </span>
                      <span className={`text-[11px] font-mono-code ${textMuted}`}>
                        R · RStudio · Power BI
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs font-mono-code ${textMuted}`}>
                    Interactive Preview
                  </span>
                </div>

                <div>
                  <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-indigo-400 transition-colors flex items-center justify-between ${headingColor}`}>
                    <span>{retailSales.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className={`text-xs font-mono-code mt-1 ${textMuted}`}>
                    {retailSales.tagline}
                  </p>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
                  {retailSales.description}
                </p>

                {/* Analytical Insight Simulator (R + Power BI) */}
                <div
                  className={`p-4 rounded-xl border space-y-3 ${innerCardBg}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className={`font-bold uppercase tracking-wider text-[11px] ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                      DATA ANALYTICS INSIGHTS (R &amp; POWER BI)
                    </span>
                    <span className={`text-[11px] ${isDark ? "text-indigo-400" : "text-blue-600"}`}>Interactive</span>
                  </div>

                  {/* Tabs */}
                  <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg text-xs font-mono-code ${
                    isDark ? "bg-zinc-950/80" : "bg-gray-200/80"
                  }`}>
                    <button
                      onClick={() => {
                        soundManager.playHover();
                        setRetailTab("margins");
                      }}
                      className={`py-1 px-2 rounded-md transition-all ${
                        retailTab === "margins"
                          ? "bg-indigo-600 text-white font-semibold"
                          : isDark ? "text-zinc-400 hover:text-zinc-200" : "text-gray-600 hover:text-gray-900"
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
                          : isDark ? "text-zinc-400 hover:text-zinc-200" : "text-gray-600 hover:text-gray-900"
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
                          : isDark ? "text-zinc-400 hover:text-zinc-200" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Segments
                    </button>
                  </div>

                  {/* Dynamic Tab Body */}
                  <div className="text-xs font-mono-code space-y-2 pt-1">
                    {retailTab === "margins" && (
                      <div className="space-y-1.5">
                        <div className={`flex justify-between text-xs ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                          <span>West Region</span>
                          <span className="text-emerald-500 font-bold">+28.4% Net Margin</span>
                        </div>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-zinc-950" : "bg-gray-200"}`}>
                          <div className="h-full bg-emerald-400 w-[78%]" />
                        </div>

                        <div className={`flex justify-between text-xs pt-1 ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                          <span>Central Region</span>
                          <span className="text-amber-500 font-bold">-3.2% (Over-Discounting)</span>
                        </div>
                        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-zinc-950" : "bg-gray-200"}`}>
                          <div className="h-full bg-amber-400 w-[24%]" />
                        </div>
                      </div>
                    )}

                    {retailTab === "discounts" && (
                      <div className={`p-2.5 rounded-lg border space-y-1 ${subBoxBg}`}>
                        <div className={`font-bold text-xs ${isDark ? "text-indigo-300" : "text-blue-600"}`}>
                          Statistical Finding in R:
                        </div>
                        <p className={`text-xs leading-relaxed font-sans ${bodyColor}`}>
                          Promotional discounts &gt; 20% boosted sales volume by 34% but degraded overall transaction margin by 42%.
                        </p>
                      </div>
                    )}

                    {retailTab === "segments" && (
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className={`p-2 rounded-lg border ${subBoxBg}`}>
                          <div className={`text-[11px] ${textMuted}`}>Consumer</div>
                          <div className={`font-bold text-sm mt-0.5 ${isDark ? "text-indigo-300" : "text-blue-600"}`}>51.9%</div>
                        </div>
                        <div className={`p-2 rounded-lg border ${subBoxBg}`}>
                          <div className={`text-[11px] ${textMuted}`}>Corporate</div>
                          <div className={`font-bold text-sm mt-0.5 ${isDark ? "text-indigo-300" : "text-blue-600"}`}>30.2%</div>
                        </div>
                        <div className={`p-2 rounded-lg border ${subBoxBg}`}>
                          <div className={`text-[11px] ${textMuted}`}>Home Office</div>
                          <div className={`font-bold text-sm mt-0.5 ${isDark ? "text-indigo-300" : "text-blue-600"}`}>17.9%</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`text-xs font-mono-code ${textMuted}`}>
                  Note: Analyzed strictly using R/RStudio and Power BI.
                </div>
              </div>

              {/* Bottom Footer */}
              <div className={`pt-3 border-t flex items-center justify-between ${footerBorder}`}>
                <span className={`text-xs font-mono-code group-hover:underline font-semibold ${isDark ? "text-indigo-400" : "text-blue-600"}`}>
                  Explore Case Study Walkthrough →
                </span>
                <span className={`text-xs font-mono-code ${textMuted}`}>
                  Exploratory Analytics
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Project 3: Kosh — Marathi Text Rewriting & Style Transformation */}
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor={isDark ? "rgba(139, 92, 246, 0.14)" : "rgba(124, 58, 237, 0.08)"}
              onClick={() => handleOpenModal(kosh)}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-7 shadow-xl cursor-pointer group flex flex-col justify-between h-full space-y-5 text-left ${
                isDark
                  ? "border-zinc-800 hover:border-purple-500/50 bg-gradient-to-br from-zinc-950 via-[#120e1c] to-zinc-950"
                  : "border-gray-200 hover:border-purple-500/60 bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl border ${
                      isDark ? "bg-purple-950/60 border-purple-500/30 text-purple-400" : "bg-purple-50 border-purple-200 text-purple-600"
                    }`}>
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs font-mono-code font-bold uppercase tracking-wider block ${
                        isDark ? "text-purple-300" : "text-purple-600"
                      }`}>
                        MARATHI NLP &amp; TRANSFORMATION
                      </span>
                      <span className={`text-[11px] font-mono-code ${textMuted}`}>
                        Python · Devanagari Normalization
                      </span>
                    </div>
                  </div>

                  <span className={`text-xs font-mono-code ${textMuted}`}>
                    NLP Prototype
                  </span>
                </div>

                <div>
                  <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-purple-400 transition-colors flex items-center justify-between ${headingColor}`}>
                    <span>{kosh.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className={`text-xs font-mono-code mt-1 ${textMuted}`}>
                    {kosh.tagline}
                  </p>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
                  {kosh.description}
                </p>

                {/* Interactive Marathi Linguistic Demonstrator */}
                <div
                  className={`p-4 rounded-xl border space-y-3 ${innerCardBg}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className={`font-bold uppercase tracking-wider text-[11px] ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                      MARATHI REWRITE ENGINE PREVIEW
                    </span>
                    <span className={`text-[11px] ${isDark ? "text-purple-400" : "text-purple-600"}`}>Live Selector</span>
                  </div>

                  {/* Input Marathi text */}
                  <div className={`p-2.5 rounded-lg border text-xs ${subBoxBg}`}>
                    <span className={`text-[10px] font-mono-code block mb-1 ${textMuted}`}>
                      INPUT DEVANAGARI SENTENCE:
                    </span>
                    <p className={`font-sans font-medium ${isDark ? "text-zinc-200" : "text-gray-800"}`}>
                      "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे."
                    </p>
                  </div>

                  {/* Style Selector Chips */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-mono-code ${textMuted}`}>Tone:</span>
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
                            : isDark ? "bg-zinc-950 text-zinc-400 hover:text-zinc-200" : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tone.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Paraphrased Result Box */}
                  <div className={`p-3 rounded-lg border space-y-1 ${
                    isDark ? "bg-purple-950/30 border-purple-500/30" : "bg-purple-50/70 border-purple-200"
                  }`}>
                    <div className="flex items-center justify-between text-[11px] font-mono-code">
                      <span className={`font-semibold ${isDark ? "text-purple-300" : "text-purple-700"}`}>
                        OUTPUT: {koshVariations[koshTone].style}
                      </span>
                      <span className="text-emerald-500">
                        {koshVariations[koshTone].fidelity}
                      </span>
                    </div>
                    <p className={`font-sans text-xs font-medium pt-0.5 ${isDark ? "text-zinc-100" : "text-gray-900"}`}>
                      "{koshVariations[koshTone].text}"
                    </p>
                    <p className={`text-[11px] font-mono-code pt-0.5 ${textMuted}`}>
                      {koshVariations[koshTone].note}
                    </p>
                  </div>
                </div>

                <div className={`text-xs font-mono-code ${textMuted}`}>
                  Note: Formerly developed under internal project code SANGRAH.
                </div>
              </div>

              {/* Bottom Footer */}
              <div className={`pt-3 border-t flex items-center justify-between ${footerBorder}`}>
                <span className={`text-xs font-mono-code group-hover:underline font-semibold ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                  Inspect NLP Transformation Pipeline →
                </span>
                <span className={`text-xs font-mono-code ${textMuted}`}>
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
            spotlightColor={isDark ? "rgba(14, 165, 233, 0.12)" : "rgba(14, 165, 233, 0.08)"}
            onClick={() => handleOpenModal(systems)}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-6 sm:p-7 shadow-xl cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left ${
              isDark
                ? "border-zinc-800 hover:border-sky-500/40 bg-zinc-950/90"
                : "border-gray-200 hover:border-sky-500/60 bg-white"
            }`}
          >
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono-code">
                <span className="text-sky-500 font-bold uppercase">
                  SYSTEMS &amp; DEFENSE DEPTH
                </span>
                <span className={textMuted}>•</span>
                <span className={textMuted}>
                  ForensiQ &amp; ShadowNet
                </span>
              </div>

              <div>
                <h3 className={`text-xl sm:text-2xl font-serif-display group-hover:text-sky-400 transition-colors ${headingColor}`}>
                  Volatile Memory Forensics &amp; Real-Time Packet Anomaly Triage
                </h3>
                <p className={`text-xs font-mono-code mt-0.5 ${textMuted}`}>
                  Automated incident response tooling &amp; network inspection pipelines
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed font-normal ${bodyColor}`}>
                {systems.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {systems.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-0.5 rounded-lg border text-xs font-mono-code ${chipBg}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="text-xs font-mono-code text-sky-500 group-hover:underline font-semibold">
                Inspect Tooling →
              </span>
              <div className={`p-3 rounded-xl border transition-all ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-300 group-hover:text-white group-hover:border-sky-500/50"
                  : "bg-sky-50 border-sky-200 text-sky-700 group-hover:bg-sky-600 group-hover:text-white"
              }`}>
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
