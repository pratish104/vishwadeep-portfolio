import { motion } from "framer-motion";
import {
  Binary,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Terminal,
} from "lucide-react";
import { skillCategories } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function SkillsBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
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

  const domainIcons = [Database, Brain, Terminal];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-14 text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono-code shadow-sm">
          <Binary className="w-3.5 h-3.5 text-emerald-400" />
          <span>// TECHNICAL CAPABILITIES & TOOLING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Technical Arsenal & Core Stack
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Structured by operational domain: exploratory data validation, statistical modeling, machine learning, and systems engineering.
        </p>
      </motion.div>

      {/* 3 Domain Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {skillCategories.map((cat, idx) => {
          const Icon = domainIcons[idx] || Code2;
          const accentBorder =
            idx === 0
              ? "hover:border-emerald-500/40"
              : idx === 1
              ? "hover:border-indigo-500/40"
              : "hover:border-sky-500/40";
          const iconColor =
            idx === 0
              ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/30"
              : idx === 1
              ? "text-indigo-400 bg-indigo-950/60 border-indigo-500/30"
              : "text-sky-400 bg-sky-950/60 border-sky-500/30";

          return (
            <motion.div key={cat.title} variants={itemVariants}>
              <SpotlightCard
                spotlightColor="rgba(99, 102, 241, 0.12)"
                onMouseEnter={() => soundManager.playHover()}
                className={`p-6 h-full flex flex-col justify-between bg-zinc-950/80 border-zinc-800/90 ${accentBorder} transition-colors shadow-lg space-y-6`}
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-sans">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] font-mono-code text-zinc-400 mt-0.5 leading-snug">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono-code text-zinc-200 hover:text-white hover:border-zinc-700 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
                  <span>Verified Competency</span>
                  <span className="text-zinc-400">0{idx + 1} // DOMAIN</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

