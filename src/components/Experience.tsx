import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { educationData, experienceTimeline } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function Experience() {
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

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-400">
          <Briefcase className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// INDUSTRY WORK & ACADEMIC BACKGROUND</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Experience & Education
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Applied internships in exploratory data analysis, dataset collection, and record verification, supported by Computer Engineering coursework.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Left Column: Industry Experience (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-850 text-xs font-mono-code text-zinc-400 uppercase tracking-wider font-semibold">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Practical Experience & Internships</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="relative border-l border-zinc-800 ml-3 space-y-6 pl-6"
          >
            {experienceTimeline.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-4 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-indigo-400 group-hover:scale-125 transition-transform" />

                <SpotlightCard
                  spotlightColor="rgba(99, 102, 241, 0.12)"
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-6 space-y-2.5 bg-zinc-950/80 border-zinc-850 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
                    <span className="font-bold text-indigo-300 uppercase tracking-wide">
                      {item.organization}
                    </span>
                    <span className="text-zinc-400">
                      {item.period}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors font-sans">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono-code text-emerald-400">
                      ● {item.type}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Formal Education (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-850 text-xs font-mono-code text-zinc-400 uppercase tracking-wider font-semibold">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Formal Education</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-4"
          >
            {educationData.map((edu, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <SpotlightCard
                  spotlightColor="rgba(16, 185, 129, 0.12)"
                  onMouseEnter={() => soundManager.playHover()}
                  className="p-5 bg-zinc-950/80 border-zinc-850 space-y-1.5 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-zinc-100 font-sans leading-snug">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono-code font-bold text-emerald-400 shrink-0">
                      {edu.badge}
                    </span>
                  </div>

                  <p className="text-xs font-mono-code text-emerald-300/90">
                    {edu.institution}
                  </p>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {edu.details}
                  </p>

                  <div className="text-xs font-mono-code text-zinc-400 pt-0.5">
                    {edu.period}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
