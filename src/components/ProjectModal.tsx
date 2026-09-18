import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Database,
  ExternalLink,
  FileCode,
  Github,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect } from "react";
import { ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        soundManager.playClick();
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl bg-[#0d0f17] border border-zinc-700/80 shadow-2xl text-zinc-100 overflow-hidden z-10 my-auto"
        style={{
          boxShadow: `0 0 60px -15px ${project.accentColor}30`,
        }}
      >
        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/90 bg-zinc-900/60"
          style={{ borderTop: `3px solid ${project.accentColor}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: project.accentColor }}
            />
            <div>
              <div className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest">
                SYSTEM DEEP DIVE // {project.category}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-zinc-950 text-[10px] font-mono-code text-zinc-300 border border-zinc-800">
              {project.statusLabel}
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-750 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Tagline & Core Summary */}
          <div className="space-y-2">
            <p className="text-sm font-mono-code text-indigo-300 font-medium">
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Actual Project Image Preview (if present, e.g. DigiPath) */}
          {project.image && (
            <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-950 p-2 shadow-inner">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-xl object-cover max-h-72"
              />
              <p className="text-[10px] font-mono-code text-zinc-400 text-center mt-2 pb-1">
                Actual DigiPath interface screenshot · Local development build
              </p>
            </div>
          )}

          {/* Metrics / Key Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1 font-mono-code">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Problem & Approach Duo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-amber-400/90 font-semibold uppercase">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Problem Statement</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400/90 font-semibold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Engineering Approach</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Pipeline & Dataflow */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-300 uppercase tracking-wider font-semibold">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Data Pipeline & Methodology</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2 font-mono-code text-xs text-zinc-300">
              {project.pipeline.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-zinc-850"
                >
                  <span className="text-indigo-400 font-bold shrink-0">▸</span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono-code text-zinc-300 uppercase tracking-wider font-semibold">
              Key Capabilities & Features
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-850 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Deployed */}
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
              Verified Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.toolsNote && (
              <p className="text-[11px] font-mono-code text-zinc-400 italic mt-1">
                Note: {project.toolsNote}
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-zinc-800/90 bg-zinc-900/40 flex items-center justify-between">
          <span className="text-[11px] font-mono-code text-zinc-400 hidden sm:inline">
            Status: {project.statusLabel}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>Explore GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
              </a>
            ) : (
              <span className="text-xs font-mono-code text-zinc-400 bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-800">
                Academic / Portfolio Case Study
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

