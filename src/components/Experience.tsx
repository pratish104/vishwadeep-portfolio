import { motion } from "framer-motion";
import { Award, BookOpen, ChevronRight, Code, ShieldCheck } from "lucide-react";
import { experienceTimeline } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function Experience() {
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
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-14 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 text-xs font-mono shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>// JOURNEY & MILESTONES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Academic & Technical Evolution
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          From Computer Engineering fundamentals to building automated cybersecurity forensic engines and predictive machine learning models.
        </p>
      </motion.div>

      {/* Timeline List with Staggered Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="relative border-l border-zinc-800 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8"
      >
        {experienceTimeline.map((item) => (
          <motion.div key={item.phase} variants={itemVariants} className="relative group">
            {/* Timeline Glowing Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] group-hover:scale-125 transition-transform" />

            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.14)"
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 sm:p-7 space-y-3 shadow-lg hover:border-zinc-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
                  PHASE {item.phase} // {item.period}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {item.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-zinc-950/90 border border-zinc-800 text-[11px] font-mono text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
