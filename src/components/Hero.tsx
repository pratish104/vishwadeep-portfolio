import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart2,
  Binary,
  BookOpen,
  Check,
  ChevronRight,
  Database,
  FileText,
  Filter,
  Github,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

interface HeroProps {
  onOpenTerminal?: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeDomain, setActiveDomain] = useState<"digipath" | "retail" | "kosh">("digipath");

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Authorial Data Transformation Matrix Cases
  const transformationCases = {
    digipath: {
      domain: "Admissions Intelligence (DigiPath)",
      tag: "Flagship Data Product",
      accent: "emerald",
      inputData: "MHT-CET: 89.4% · Quota: General · Branch: Computer Engg",
      rawFormat: "Raw multi-year admission cutoff PDFs & unstandardized tables",
      transformation: "Category harmonization → Multi-parameter percentile matrix ranking",
      outputResult: "Predicted Eligible: MGM College of Engg. & Tech (Cutoff: 87.2%)",
      verdict: "High Probability Match · Scam Filter Verified",
    },
    retail: {
      domain: "Retail Profitability (R + Power BI)",
      tag: "Exploratory Analytics",
      accent: "indigo",
      inputData: "Central Region · Furniture Subcategory · Applied Discount: 35%",
      rawFormat: "Transactional order logs with seasonal noise and return variances",
      transformation: "Data cleaning (R) → Profit elasticity equation → Margin variance modeling",
      outputResult: "Negative Net Margin: -4.2% despite +34% sales volume surge",
      verdict: "Actionable Insight: Cap promotional discount at 20%",
    },
    kosh: {
      domain: "Marathi NLP & Rewriting (Kosh)",
      tag: "Language Technology",
      accent: "purple",
      inputData: 'विद्यार्थ्यांनी वेळेवर परीक्षेची तयारी पूर्ण करावी.',
      rawFormat: "Raw vernacular Devanagari text input",
      transformation: "Morphological tokenization → Semantic preservation scoring → Formality shift",
      outputResult: 'विद्यार्थ्यांनी परीक्षा पूर्वतयारी विहित वेळेत पूर्ण करणे अनिवार्य आहे.',
      verdict: "0.96 Semantic Retention · Formal Register",
    },
  };

  const currentCase = transformationCases[activeDomain];

  return (
    <section
      id="about"
      className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Subtle ambient gradient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-tr from-indigo-500/10 via-emerald-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Narrative, Positioning, and Person (7 cols) */}
        <div className="lg:col-span-7 space-y-5 text-left">
          {/* Top Status & Discipline Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-code text-xs text-zinc-300 font-medium">
                {profileData.status}
              </span>
            </div>

            <span className="text-zinc-600">•</span>

            <span className="font-mono-code text-xs text-indigo-300 font-semibold tracking-wide">
              {profileData.positioning}
            </span>
          </motion.div>

          {/* Name & Headline */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif-display text-white tracking-tight leading-[1.06]"
            >
              {profileData.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="text-lg sm:text-xl font-medium text-indigo-200/95 font-sans"
            >
              Data Analyst & Applied AI Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed font-normal"
            >
              Transforming unstandardized records into dependable decision intelligence. Creator of{" "}
              <a href="#projects" className="text-emerald-400 font-medium hover:underline">
                DigiPath
              </a>{" "}
              (admissions predictor), retail profitability modeling with R & Power BI, and Marathi NLP systems.
            </motion.p>
          </div>

          {/* Factual Credential Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-code text-zinc-400 border-l border-indigo-500/40 pl-3.5 py-0.5"
          >
            <span className="text-zinc-300">MGM College of Engg. & Tech, Panvel (B.E. 2026)</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span>Navi Mumbai, India</span>
          </motion.div>

          {/* Primary Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs sm:text-sm transition-all shadow-md shadow-white/5 hover:scale-[1.02] active:scale-95"
            >
              <span>Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5 text-zinc-700" />
            </a>

            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-750 text-zinc-200 text-xs sm:text-sm font-medium transition-all hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            {onOpenTerminal && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenTerminal();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono-code text-xs transition-all"
                title="Open Interactive Terminal Sandbox (Ctrl+K)"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>CLI</span>
              </button>
            )}

            {/* Quick Links */}
            <div className="flex items-center gap-1 pl-2 border-l border-zinc-800">
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-blue-400 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-indigo-300 transition-all"
                title="Copy email address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: The Authorial "Data Transformation Engine" (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.14)"
            className="p-6 bg-zinc-950/90 border-zinc-800 shadow-2xl space-y-4"
          >
            {/* Header: Title & Selector */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono-code text-zinc-200 font-semibold uppercase tracking-wider">
                  DATA TRANSFORMATION ENGINE
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-zinc-400">
                Live Logic Flow
              </span>
            </div>

            {/* Interactive Domain Selector Chips */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-900/70 rounded-xl text-xs font-mono-code">
              {(
                [
                  { id: "digipath", label: "Admissions" },
                  { id: "retail", label: "Retail EDA" },
                  { id: "kosh", label: "Marathi NLP" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playHover();
                    setActiveDomain(tab.id);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                    activeDomain === tab.id
                      ? "bg-zinc-800 text-white font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Live 3-Stage Transformation Process */}
            <div className="space-y-2.5 pt-1 font-mono-code text-xs">
              {/* Stage 1: Input Data Stream */}
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-850/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400 font-bold uppercase">01 / INPUT DATA STREAM</span>
                  <span className="text-zinc-400 text-[10px]">Unprocessed Record</span>
                </div>
                <p className="text-zinc-200 font-medium pt-0.5">{currentCase.inputData}</p>
                <p className="text-[11px] text-zinc-400 leading-normal">{currentCase.rawFormat}</p>
              </div>

              {/* Stage 2: Transformation Logic */}
              <div className="p-3 rounded-xl bg-indigo-950/25 border border-indigo-500/25 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-indigo-300 font-bold uppercase">02 / ANALYTICAL TRANSFORMATION</span>
                  <span className="text-indigo-400 text-[10px]">Processing</span>
                </div>
                <p className="text-zinc-200 text-[11px] leading-relaxed font-sans">{currentCase.transformation}</p>
              </div>

              {/* Stage 3: Synthesized Intelligence */}
              <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/25 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-300 font-bold uppercase">03 / DECISION INTELLIGENCE</span>
                  <span className="text-emerald-400 text-[10px]">Validated Output</span>
                </div>
                <p className="text-emerald-200 font-semibold">{currentCase.outputResult}</p>
                <p className="text-[11px] text-zinc-400">{currentCase.verdict}</p>
              </div>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-xs font-mono-code text-zinc-400">
              <span className="text-zinc-400">
                Domain: <span className="text-zinc-300">{currentCase.tag}</span>
              </span>
              <span className="text-indigo-400 hover:underline cursor-pointer" onClick={() => soundManager.playClick()}>
                Explore project ↓
              </span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Subtle organic connector pointing into Selected Work */}
      <div className="flex justify-center pt-8">
        <a
          href="#projects"
          className="flex items-center gap-1.5 text-xs font-mono-code text-zinc-400 hover:text-zinc-300 transition-colors"
        >
          <span>Selected Work</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
