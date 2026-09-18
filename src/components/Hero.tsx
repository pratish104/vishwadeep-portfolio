import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Database,
  FileText,
  Filter,
  Github,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
  Zap,
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
  const [activePipelineStage, setActivePipelineStage] = useState(1);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const pipelineStages = [
    {
      step: "01",
      name: "Data Ingestion",
      desc: "Multi-year admission cutoffs, retail transactions, speech audio",
      status: "Verified Ingestion",
      icon: Database,
      badge: "Ingestion Core",
    },
    {
      step: "02",
      name: "Sanitization & Schema",
      desc: "Missing value imputation, outlier detection, category normalization",
      status: "100% Schema Match",
      icon: Filter,
      badge: "Clean Pipeline",
    },
    {
      step: "03",
      name: "Algorithmic Logic",
      desc: "Multi-criteria ranking, profit margin modeling, Marathi NLP syntax",
      status: "Inference Ready",
      icon: Layers,
      badge: "Decision Logic",
    },
    {
      step: "04",
      name: "Decision Product",
      desc: "DigiPath predictor, executive BI dashboards, student discovery",
      status: "Actionable Outputs",
      icon: Sparkles,
      badge: "Product Delivery",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Subtle ambient light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-indigo-600/10 via-emerald-600/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Positioning & Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status & Discipline Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2.5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-code text-[11px] font-medium tracking-wide text-zinc-300">
                {profileData.status}
              </span>
            </div>

            <span className="px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-mono-code text-[11px] font-semibold tracking-wider uppercase">
              {profileData.positioning}
            </span>
          </motion.div>

          {/* Name & Primary Headline */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif-display font-normal tracking-tight text-white leading-[1.08]"
            >
              {profileData.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg sm:text-xl font-medium text-indigo-200/90 font-mono-code"
            >
              Data Analyst & Systems Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-normal"
            >
              Transforming messy, unstandardized datasets into predictable decision pipelines.
              Creator of <span className="text-zinc-100 font-semibold">DigiPath</span> (admissions decision platform), exploratory retail business analytics, and Marathi NLP systems.
            </motion.p>
          </div>

          {/* Academic & Geographic Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono-code text-zinc-400 border-l-2 border-indigo-500/40 pl-3.5 py-1"
          >
            <span>MGM College of Engg. & Tech, Panvel (B.E. 2026)</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span>Navi Mumbai, India</span>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs sm:text-sm transition-all shadow-lg shadow-white/5 hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-700/70 text-zinc-200 text-xs sm:text-sm font-medium transition-all shadow-md hover:scale-[1.02]"
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
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-indigo-950/30 hover:bg-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-300 font-mono-code text-xs transition-all"
                title="Launch Developer Terminal Easter Egg"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>CLI</span>
              </button>
            )}

            {/* Quick Links */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-800">
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-blue-400 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-indigo-300 transition-all"
                title="Copy Email Address"
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

        {/* Right Column: Architectural Pipeline Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <SpotlightCard
            spotlightColor="rgba(99, 102, 241, 0.16)"
            className="p-6 sm:p-7 border-zinc-800/90 bg-gradient-to-br from-zinc-950/90 via-zinc-900/40 to-zinc-950/90 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-mono-code text-zinc-300 font-semibold uppercase tracking-wider">
                  SYSTEM ARCHITECTURE
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-indigo-400/90 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-500/20">
                End-to-End Pipeline
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              How Vishwadeep designs data systems: connecting messy source records to validated, user-ready decision products.
            </p>

            {/* Interactive 4-Stage Pipeline */}
            <div className="space-y-2.5">
              {pipelineStages.map((stage, idx) => {
                const Icon = stage.icon;
                const isSelected = activePipelineStage === idx;
                return (
                  <div
                    key={stage.step}
                    onClick={() => {
                      soundManager.playHover();
                      setActivePipelineStage(idx);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-zinc-800/80 border-indigo-500/50 shadow-md shadow-indigo-500/10"
                        : "bg-zinc-950/60 border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg border text-xs ${
                            isSelected
                              ? "bg-indigo-950 border-indigo-500/40 text-indigo-300"
                              : "bg-zinc-900 border-zinc-800 text-zinc-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono-code font-bold text-zinc-500">
                              {stage.step}
                            </span>
                            <h4 className="text-xs font-semibold text-zinc-200">
                              {stage.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                            {stage.desc}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded-md shrink-0 ${
                          isSelected
                            ? "bg-indigo-500/20 text-indigo-300 font-semibold"
                            : "text-zinc-500"
                        }`}
                      >
                        {stage.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status Row */}
            <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] font-mono-code text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Deterministic Logic</span>
              </span>
              <span className="text-zinc-500">
                Stage {activePipelineStage + 1} of 4
              </span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}

