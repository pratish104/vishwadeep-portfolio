import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  ExternalLink,
  Github,
  Layers,
  Network,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { ProjectModal } from "./ProjectModal";
import { SpotlightCard } from "./SpotlightCard";

export function ProjectsBento() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Separate DigiPath as the flagship hero project
  const digipath = featuredProjects.find((p) => p.id === "digipath") || featuredProjects[3];
  const secondaryProjects = featuredProjects.filter((p) => p.id !== "digipath");

  const getCategoryIcon = (category: ProjectItem["category"]) => {
    switch (category) {
      case "Cybersecurity":
        return Shield;
      case "AI & Networks":
        return Network;
      case "NLP & AI":
        return Brain;
      case "Machine Learning":
        return Sparkles;
      default:
        return Code2;
    }
  };

  const handleOpenModal = (project: ProjectItem) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-12 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>// PRODUCTION ARSENAL & SYSTEMS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Featured Engineering Systems
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          High-performance machine learning decision engines, defensive cybersecurity toolkits, and deep learning platforms. Click any system to inspect technical specifications.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="space-y-6"
      >
        {/* ========================================================================= */}
        {/* 1. PRIMARY FULL-WIDTH FLAGSHIP HERO CARD: DIGIPATH                        */}
        {/* ========================================================================= */}
        {digipath && (
          <motion.div variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.18)"
              onClick={() => handleOpenModal(digipath)}
              onMouseEnter={() => soundManager.playHover()}
              className="p-7 sm:p-9 border-emerald-500/40 hover:border-emerald-400/80 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-emerald-950/20 shadow-2xl shadow-emerald-500/10 cursor-pointer group relative overflow-hidden"
            >
              {/* Shimmering Animated Gradient Border Highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 animate-pulse" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Title, Domain, Description, Checklist (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                      <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
                      FLAGSHIP PLATFORM
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
                      ● {digipath.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors flex items-center gap-3">
                      <span>{digipath.title}</span>
                      <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-emerald-400/90 font-medium mt-1">
                      {digipath.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {digipath.description}
                  </p>

                  {/* Architecture Banner */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 text-xs font-mono text-zinc-300">
                    <span className="text-emerald-400 font-bold">PIPELINE ARCH: </span>
                    {digipath.architecture}
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {digipath.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {digipath.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono font-medium text-emerald-300/90 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Live Telemetry & Metrics Showcase (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-zinc-300 font-bold uppercase">
                          ML INFERENCE TELEMETRY
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        STATUS: ACTIVE
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {digipath.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 text-xs"
                        >
                          <span className="font-mono text-zinc-400">{m.label}</span>
                          <span className="font-mono font-bold text-emerald-300">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Action Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 group-hover:underline flex items-center gap-1.5 font-semibold">
                        <span>Inspect Full Architecture</span>
                        <span>→</span>
                      </span>

                      <a
                        href={digipath.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.playClick();
                        }}
                        className="p-2.5 rounded-xl bg-zinc-900 hover:bg-emerald-500 hover:text-zinc-950 border border-zinc-700 text-zinc-300 transition-all shadow-md"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 2. SUBSEQUENT BENTO GRID: FORENSIQ, SHADOWNET, SANGRAH                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryProjects.map((project) => {
            const Icon = getCategoryIcon(project.category);
            return (
              <motion.div key={project.id} variants={itemVariants}>
                <SpotlightCard
                  spotlightColor={`${project.color}25`}
                  onClick={() => handleOpenModal(project)}
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-6 sm:p-7 h-full flex flex-col justify-between group shadow-xl cursor-pointer hover:border-zinc-700"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/50 group-hover:scale-110 transition-transform"
                          style={{ color: project.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-medium text-zinc-300">
                          {project.category}
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Architecture Callout */}
                    <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-850 text-xs font-mono text-zinc-400">
                      <span className="text-cyan-400 font-semibold">ARCH: </span>
                      {project.architecture}
                    </div>
                  </div>

                  {/* Bottom: Tech Stack Chips & Action Link */}
                  <div className="pt-5 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-950 text-[10px] font-mono text-zinc-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300 font-medium shrink-0">
                      Specs →
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
