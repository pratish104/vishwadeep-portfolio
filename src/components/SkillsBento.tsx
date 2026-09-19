import { motion } from "framer-motion";
import { Binary, Brain, Code2, Database, Terminal } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { skillCategories } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function SkillsBento() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const headingColor = isDark ? "text-white" : "text-gray-900";
  const bodyColor = isDark ? "text-zinc-400" : "text-gray-500";
  const cardBg = isDark ? "bg-[var(--bg-surface)]/80 border-[var(--border-subtle)]" : "bg-white border-gray-200";
  const sectionAccent = isDark ? "text-emerald-400" : "text-emerald-600";
  const primarySkillClass = isDark
    ? "bg-[var(--bg-elevated)] text-zinc-100 border-[var(--border-mid)] font-medium"
    : "bg-gray-900 text-white border-gray-700 font-medium";
  const secondarySkillClass = isDark
    ? "bg-[var(--bg-base)]/50 text-zinc-400 border-[var(--border-subtle)]/80"
    : "bg-gray-100 text-gray-500 border-gray-200";
  const domainIconColors = [
    isDark
      ? "text-emerald-400 bg-emerald-950/60 border-emerald-500/30 hover:border-emerald-500/50"
      : "text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-300",
    isDark
      ? "text-indigo-400 bg-indigo-950/60 border-indigo-500/30 hover:border-indigo-500/50"
      : "text-blue-600 bg-blue-50 border-blue-200 hover:border-blue-300",
    isDark
      ? "text-sky-400 bg-sky-950/60 border-sky-500/30 hover:border-sky-500/50"
      : "text-violet-600 bg-violet-50 border-violet-200 hover:border-violet-300",
  ];
  const titleColorByIndex = [
    isDark ? "text-emerald-200" : "text-emerald-700",
    isDark ? "text-indigo-200" : "text-blue-700",
    isDark ? "text-sky-200" : "text-violet-700",
  ];

  const domainIcons = [Database, Brain, Terminal];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className={`flex items-center gap-2 text-xs font-mono-code ${sectionAccent}`}>
          <Binary className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// TECHNICAL STACK & ARSENAL</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif-display tracking-tight ${headingColor}`}>
          Technical Arsenal & Core Stack
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${bodyColor}`}>
          Clear distinction between core daily analytical tooling and specialized modeling environments.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {skillCategories.map((cat, idx) => {
          const Icon = domainIcons[idx] || Code2;
          return (
            <motion.div key={cat.title} variants={itemVariants}>
              <div
                onMouseEnter={() => soundManager.playHover()}
                className={`p-6 sm:p-7 h-full flex flex-col justify-between rounded-2xl border transition-colors shadow-sm space-y-6 text-left ${cardBg} ${domainIconColors[idx]}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${domainIconColors[idx]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className={`text-base font-bold ${titleColorByIndex[idx]}`}>{cat.title}</h3>
                      <span className={`text-xs font-mono-code block mt-0.5 ${bodyColor}`}>{cat.subtitle}</span>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed font-normal ${bodyColor}`}>{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill) => {
                      const isPrimary = skill.tier === "primary";
                      return (
                        <span
                          key={skill.name}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono-code transition-colors cursor-default border ${
                            isPrimary ? primarySkillClass : secondarySkillClass
                          }`}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono-code ${isDark ? "border-[var(--border-subtle)] text-zinc-400" : "border-gray-100 text-gray-400"}`}>
                  <span>{cat.subtitle}</span>
                  <span>0{idx + 1} // DOMAIN</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
