import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Layers,
  Lock,
  Shield,
  Sparkles,
  Terminal,
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
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-zinc-950/95 border border-zinc-700/80 shadow-2xl shadow-cyan-500/5 text-zinc-100 overflow-hidden z-10 my-auto"
        style={{
          boxShadow: `0 0 50px -10px ${project.color}25`,
        }}
      >
        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/50"
          style={{ borderTop: `3px solid ${project.color}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: project.color }}
            />
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                SYSTEM DEEP DIVE // {project.category}
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-400 border border-zinc-700">
              {project.badge}
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Tagline & Overview */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-cyan-300 font-medium">
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Performance & Benchmark Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-sm font-semibold text-zinc-200 mt-1 font-mono">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Dataflow Pipeline Architecture */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>DATA PIPELINE & ARCHITECTURE FLOW</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 font-mono text-xs text-zinc-300">
              {project.dataflow.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-1.5 rounded-lg bg-zinc-950/60 border border-zinc-850"
                >
                  <span className="text-cyan-400 font-bold shrink-0">▸</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Engineering Specifications */}
          {project.securitySpecs && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>CORE SPECIFICATIONS & MODULES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.securitySpecs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900/30 border border-zinc-850 text-xs text-zinc-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Tech Stack */}
          <div className="space-y-2.5 pt-2">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              TECHNOLOGIES DEPLOYED
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            REPOSITORY: VERIFIED_PUBLIC
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Github className="w-4 h-4" />
              <span>Explore GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
            </a>

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-cyan-300 font-medium text-xs transition-all border border-zinc-700"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
