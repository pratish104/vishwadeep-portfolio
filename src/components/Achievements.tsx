import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { awardsData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function Achievements() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardBg = isDark
    ? "bg-[var(--bg-surface)]/80 border-[var(--border-subtle)] hover:border-[var(--accent-tertiary)]/40"
    : "bg-white border-gray-200 hover:border-amber-300";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const bodyColor = isDark ? "text-zinc-300" : "text-gray-600";
  const numColor = isDark ? "text-zinc-700 group-hover:text-amber-400/80" : "text-gray-200 group-hover:text-amber-400";
  const dateColor = isDark ? "text-zinc-500 border-[var(--border-subtle)]" : "text-gray-400 border-gray-200";
  const labelColor = isDark ? "text-amber-300" : "text-amber-600";
  const categoryColor = isDark ? "text-amber-400/90" : "text-amber-500";
  const sectionAccent = isDark ? "text-amber-400" : "text-amber-500";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className={`flex items-center gap-2 text-xs font-mono-code ${sectionAccent}`}>
          <Trophy className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// HONORS & RECOGNITION</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif-display tracking-tight ${headingColor}`}>
          Competitions & Technical Awards
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${bodyColor}`}>
          Competitive recognitions earned across inter-college AI challenges, IEEE research paper presentations, and engineering project expos.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {awardsData.map((award, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <div
              onMouseEnter={() => soundManager.playHover()}
              className={`p-6 sm:p-7 h-full flex flex-col justify-between rounded-2xl border transition-all shadow-lg space-y-5 text-left group cursor-default ${cardBg}`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`font-serif-display text-3xl transition-colors ${numColor}`}>
                    0{idx + 1}
                  </span>
                  <span className={`text-xs font-mono-code font-bold ${labelColor}`}>
                    {award.highlight}
                  </span>
                </div>
                <div>
                  <h3 className={`text-base sm:text-lg font-bold leading-snug transition-colors ${headingColor}`}>
                    {award.title}
                  </h3>
                  <p className={`text-xs font-mono-code mt-1 ${categoryColor}`}>
                    {award.category}
                  </p>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed font-normal ${bodyColor}`}>
                  {award.description}
                </p>
              </div>
              <div className={`pt-3 border-t text-xs font-mono-code ${dateColor}`}>
                <span>{award.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
