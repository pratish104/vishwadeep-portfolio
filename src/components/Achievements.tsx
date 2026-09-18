import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { awardsData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function Achievements() {
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
    <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400">
          <Trophy className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// HONORS & RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Competitions & Technical Awards
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Competitive recognitions earned across inter-college AI challenges, IEEE research paper presentations, and engineering project expos.
        </p>
      </motion.div>

      {/* Editorial 3-Column Presentation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {awardsData.map((award, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <SpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.12)"
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 sm:p-7 h-full flex flex-col justify-between bg-zinc-950/80 border-zinc-850 hover:border-amber-500/40 transition-all shadow-lg space-y-5 text-left group"
            >
              <div className="space-y-3.5">
                {/* Number & Award Rank */}
                <div className="flex items-center justify-between">
                  <span className="font-serif-display text-3xl text-zinc-600 group-hover:text-amber-400/80 transition-colors">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-mono-code font-bold text-amber-300">
                    {award.highlight}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans leading-snug group-hover:text-amber-200 transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-xs font-mono-code text-amber-400/90 mt-1">
                    {award.category}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {award.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-850 text-xs font-mono-code text-zinc-400">
                <span>{award.date}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
