import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Layers,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll without causing width jitter
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundManager.playClick();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Reset scroll position when new project opens
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const isDark = theme === "dark";
  const bg = isDark ? "bg-[var(--bg-surface)]" : "bg-white";
  const headerBg = isDark ? "bg-[var(--bg-elevated)]/80" : "bg-gray-50/90";
  const borderColor = isDark ? "border-[var(--border-subtle)]" : "border-gray-200";
  const textPrimary = isDark ? "text-zinc-100" : "text-gray-900";
  const textSecondary = isDark ? "text-zinc-300" : "text-gray-600";
  const textMuted = isDark ? "text-zinc-400" : "text-gray-400";
  const cardBg = isDark ? "bg-[var(--bg-elevated)]/60" : "bg-gray-50";
  const tagBg = isDark ? "bg-[var(--bg-base)] border-[var(--border-subtle)] text-zinc-300" : "bg-gray-100 border-gray-200 text-gray-700";

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => { soundManager.playClick(); onClose(); }}
          />

          {/* Panel — full screen on mobile, large card on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative w-full sm:max-w-4xl h-[92dvh] sm:h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl border shadow-2xl z-10 overflow-hidden ${bg} ${borderColor}`}
            style={{ boxShadow: `0 0 80px -20px ${project.accentColor}28` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent top bar */}
            <div
              className="h-[3px] w-full shrink-0"
              style={{ background: `linear-gradient(to right, ${project.accentColor}, ${project.accentColor}80)` }}
            />

            {/* Sticky header */}
            <div className={`flex items-center justify-between px-5 sm:px-8 py-4 border-b shrink-0 ${headerBg} ${borderColor} backdrop-blur-md`}>
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-mono-code uppercase tracking-widest" style={{ color: project.accentColor }}>
                    {project.category} // CASE STUDY
                  </div>
                  <h2 className={`text-base sm:text-lg font-bold leading-tight truncate ${textPrimary}`}>
                    {project.title}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <span className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-mono-code border ${tagBg}`}>
                  {project.statusLabel}
                </span>
                <button
                  onClick={() => { soundManager.playClick(); onClose(); }}
                  className={`p-2 rounded-xl transition-colors border ${isDark ? "bg-zinc-800/80 hover:bg-zinc-700 border-zinc-700 text-zinc-400 hover:text-white" : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-500 hover:text-gray-900"}`}
                  aria-label="Close project"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable body — natural scrolling */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain project-explorer-body"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="px-5 sm:px-8 py-6 space-y-7 pb-8">
                {/* Tagline & description */}
                <div className="space-y-2">
                  <p className="text-sm font-mono-code font-medium" style={{ color: project.accentColor }}>
                    {project.tagline}
                  </p>
                  <p className={`text-sm leading-relaxed ${textSecondary}`}>
                    {project.description}
                  </p>
                </div>

                {/* Screenshot (DigiPath) */}
                {project.image && (
                  <div className={`rounded-2xl overflow-hidden border ${borderColor} ${cardBg} p-2 shadow-inner`}>
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-auto rounded-xl object-cover"
                      style={{ maxHeight: 280 }}
                    />
                    <p className={`text-[10px] font-mono-code text-center mt-2 pb-1 ${textMuted}`}>
                      DigiPath interface · Local development build
                    </p>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex flex-col gap-1 ${cardBg} ${borderColor}`}
                    >
                      <span className={`text-[10px] font-mono-code uppercase tracking-wider ${textMuted}`}>
                        {metric.label}
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold font-mono-code ${textPrimary}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Problem & Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${cardBg} ${borderColor}`}>
                    <div className="flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase text-amber-500">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Problem Statement</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${textSecondary}`}>
                      {project.problemStatement}
                    </p>
                  </div>
                  <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${cardBg} ${borderColor}`}>
                    <div className="flex items-center gap-1.5 text-xs font-mono-code font-semibold uppercase text-emerald-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Engineering Approach</span>
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${textSecondary}`}>
                      {project.approach}
                    </p>
                  </div>
                </div>

                {/* Pipeline */}
                <div className="space-y-3">
                  <div className={`flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider font-semibold ${textPrimary}`}>
                    <Layers className="w-3.5 h-3.5" style={{ color: project.accentColor }} />
                    <span>Data Pipeline &amp; Methodology</span>
                  </div>
                  <div className={`p-4 rounded-2xl border space-y-2 ${cardBg} ${borderColor}`}>
                    {project.pipeline.map((step, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${cardBg} ${borderColor}`}
                      >
                        <span className="font-bold shrink-0 text-xs font-mono-code" style={{ color: project.accentColor }}>
                          ▸
                        </span>
                        <span className={`text-xs leading-relaxed font-mono-code ${textSecondary}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className={`text-xs font-mono-code uppercase tracking-wider font-semibold ${textPrimary}`}>
                    Key Capabilities &amp; Features
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className={`flex items-start gap-2 p-3 rounded-xl border text-xs ${textSecondary} ${cardBg} ${borderColor}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <div className={`text-[10px] font-mono-code uppercase tracking-wider ${textMuted}`}>
                    Verified Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono-code border ${tagBg}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.toolsNote && (
                    <p className={`text-[11px] font-mono-code italic ${textMuted}`}>
                      Note: {project.toolsNote}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className={`px-5 sm:px-8 py-4 border-t shrink-0 flex items-center justify-between ${headerBg} ${borderColor}`}>
              <span className={`text-[11px] font-mono-code hidden sm:inline ${textMuted}`}>
                Status: {project.statusLabel}
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95 ${isDark ? "bg-zinc-100 hover:bg-white text-zinc-950" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95 ${isDark ? "bg-zinc-100 hover:bg-white text-zinc-950" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                  >
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                ) : (
                  <span className={`text-xs font-mono-code px-3 py-2 rounded-xl border ${tagBg}`}>
                    Academic / Portfolio Case Study
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
