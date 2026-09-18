import { motion } from "framer-motion";
import {
  Binary,
  Brain,
  Code2,
  Database,
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

  const domainIcons = [Database, Brain, Terminal];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400">
          <Binary className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// TECHNICAL STACK & ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Technical Arsenal & Core Stack
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Clear distinction between core daily analytical tooling and specialized modeling environments.
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
                className={`p-6 sm:p-7 h-full flex flex-col justify-between bg-zinc-950/80 border-zinc-850 ${accentBorder} transition-colors shadow-lg space-y-6 text-left`}
              >
                <div className="space-y-4">
                  {/* Domain Header */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-sans">
                          {cat.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono-code text-zinc-400 block mt-0.5">
                        {cat.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {cat.description}
                  </p>

                  {/* Skills Grid with Tiered Hierarchy */}
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => {
                        const isPrimary = skill.tier === "primary";
                        return (
                          <span
                            key={skill.name}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono-code transition-colors cursor-default ${
                              isPrimary
                                ? "bg-zinc-900 text-zinc-100 font-medium border border-zinc-750"
                                : "bg-zinc-950/50 text-zinc-400 border border-zinc-850/80"
                            }`}
                          >
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                  <span>{cat.subtitle}</span>
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
