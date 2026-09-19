import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { WorldEnvironment } from "./world/WorldEnvironment";

interface HeroProps {
  onOpenTerminal?: () => void;
}

const PIPELINE_STEPS = [
  { num: "01", label: "Data", sub: "Collect & Clean" },
  { num: "02", label: "Transform", sub: "Analyze & Model" },
  { num: "03", label: "Intelligence", sub: "Generate Insights" },
  { num: "04", label: "Engineering", sub: "Build & Deploy" },
  { num: "05", label: "Impact", sub: "Real World Value" },
];

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = id === "" ? document.body : document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Hero({ onOpenTerminal }: HeroProps) {
  const { theme } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Theme-adaptive styles
  const headingColor = theme === "light" ? "text-gray-900" : "text-white";
  const bodyColor = theme === "light" ? "text-gray-600" : "text-zinc-300";
  const mutedColor = theme === "light" ? "text-gray-400" : "text-zinc-500";
  const subheadColor = theme === "light" ? "text-blue-600" : "text-indigo-300";
  const accentColor = theme === "anime" ? "text-pink-400" : theme === "light" ? "text-blue-600" : "text-emerald-400";
  const primaryBtnClass = theme === "light"
    ? "bg-gray-900 hover:bg-gray-800 text-white"
    : "bg-zinc-100 hover:bg-white text-zinc-950";
  const secondaryBtnClass = theme === "light"
    ? "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700"
    : "bg-[var(--bg-elevated)]/90 hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-zinc-200";
  const iconBtnClass = theme === "light"
    ? "bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-500 hover:text-gray-800"
    : "bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-zinc-400 hover:text-white";
  const credentialClass = theme === "light"
    ? "text-gray-500 border-blue-300/60 pl-3"
    : "text-zinc-400 border-[var(--accent-primary)]/40 pl-3";
  const pipelineBg = theme === "light"
    ? "bg-gray-50 border-gray-200"
    : "bg-[var(--bg-surface)]/70 border-[var(--border-subtle)]";
  const pipelineActive = theme === "light"
    ? "text-blue-700 font-semibold"
    : "text-[var(--accent-secondary)] font-semibold";

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col pt-24 pb-0 overflow-hidden"
    >
      {/* Main two-column layout */}
      <div className="flex-1 flex flex-col lg:flex-row items-center gap-0 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Left — Hero copy */}
        <div className="w-full lg:w-[42%] lg:pr-8 pt-4 pb-8 lg:pb-0 space-y-5 text-left z-10">
          {/* Status + positioning */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`font-mono-code text-xs font-medium ${bodyColor}`}>
                {profileData.status}
              </span>
            </div>
            <span className={mutedColor}>·</span>
            <span className={`font-mono-code text-xs font-semibold tracking-wide ${subheadColor}`}>
              {profileData.positioning}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className={`text-4xl sm:text-5xl xl:text-6xl font-serif-display tracking-tight leading-[1.07] ${headingColor}`}
          >
            {profileData.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className={`text-lg sm:text-xl font-medium ${subheadColor}`}
          >
            Data Analyst &amp; Applied AI Developer
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-sm sm:text-base max-w-lg leading-relaxed font-normal ${bodyColor}`}
          >
            Transforming unstandardized records into dependable decision
            intelligence. Creator of{" "}
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#projects"); }}
              className={`font-medium hover:underline ${accentColor}`}
            >
              DigiPath
            </a>{" "}
            (admissions predictor), retail profitability modeling with R &amp; Power BI,
            and Marathi NLP systems.
          </motion.p>

          {/* Credential anchor */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-code border-l py-0.5 ${credentialClass}`}
          >
            <span className={theme === "light" ? "text-gray-700" : "text-zinc-300"}>
              MGM College of Engg. &amp; Tech, Panvel (B.E. 2026)
            </span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span>Navi Mumbai, India</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#projects"
              onMouseEnter={() => soundManager.playHover()}
              onClick={(e) => { e.preventDefault(); soundManager.playClick(); smoothScrollTo("#projects"); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02] active:scale-95 ${primaryBtnClass}`}
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all hover:scale-[1.02] ${secondaryBtnClass}`}
            >
              <FileText className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
            </a>

            {/* Quick icon links */}
            <div className={`flex items-center gap-1 pl-2 border-l ${theme === "light" ? "border-gray-200" : "border-[var(--border-subtle)]"}`}>
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`p-2.5 rounded-xl transition-all ${iconBtnClass}`}
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
                className={`p-2.5 rounded-xl transition-all hover:text-blue-400 ${iconBtnClass}`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-2.5 rounded-xl transition-all ${iconBtnClass}`}
                title="Copy email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-1.5 pt-4"
          >
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#projects"); }}
              className={`flex items-center gap-1.5 text-xs font-mono-code transition-colors ${mutedColor} hover:${bodyColor}`}
            >
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll to explore</span>
            </a>
          </motion.div>
        </div>

        {/* Right — Interactive 3D World */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full lg:w-[58%] relative"
          style={{ height: "clamp(360px, 55vh, 640px)" }}
        >
          {/* Japanese accent quote — visible in all themes */}
          <div
            className="absolute right-4 top-6 z-10 text-right select-none pointer-events-none"
            aria-hidden="true"
          >
            <div
              className={`font-serif-display text-xl sm:text-2xl leading-tight italic ${
                theme === "light" ? "text-gray-300" : theme === "anime" ? "text-pink-300/40" : "text-zinc-700"
              }`}
            >
              Small Steps
              <br />
              Big Impact
            </div>
            <div className={`text-xs font-mono-code mt-1 ${
              theme === "light" ? "text-gray-300" : theme === "anime" ? "text-pink-400/50" : "text-zinc-600"
            }`}>
              — Vishwadeep
            </div>
          </div>

          {/* Kanji vertical banner for anime/dark */}
          {(theme === "anime" || theme === "dark") && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 select-none pointer-events-none"
              aria-hidden="true"
              style={{ writingMode: "vertical-rl" }}
            >
              <span
                className={`font-serif-display text-sm tracking-[0.4em] kanji-text ${
                  theme === "anime" ? "text-pink-300/30" : "text-zinc-700/60"
                }`}
              >
                継続は力なり
              </span>
            </div>
          )}

          <WorldEnvironment className="rounded-2xl overflow-hidden" />
        </motion.div>
      </div>

      {/* Pipeline Bar — full width at bottom of hero */}
      <div className={`w-full mt-auto border-t ${theme === "light" ? "border-gray-200" : "border-[var(--border-subtle)]"}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 ${pipelineBg}`}>
          <div className="flex items-center justify-between overflow-x-auto gap-2 sm:gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2 shrink-0">
                <div className="text-center">
                  <div className={`text-[10px] font-mono-code ${mutedColor}`}>{step.num}</div>
                  <div className={`text-xs font-semibold ${i === 2 ? pipelineActive : (theme === "light" ? "text-gray-800" : "text-zinc-200")}`}>
                    {step.label}
                  </div>
                  <div className={`text-[10px] font-mono-code ${mutedColor}`}>{step.sub}</div>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className={`w-8 sm:w-16 h-px ${theme === "light" ? "bg-gray-300" : "bg-[var(--border-subtle)]"} mx-2 shrink-0`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
