import { motion } from "framer-motion";
import { Award, CheckCircle, Sparkles, Trophy } from "lucide-react";
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

  return (
    <section id="awards" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-14 text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono-code shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>// HONORS & VERIFIED RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display text-white tracking-tight">
          Competitions & Technical Awards
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Verified inter-collegiate achievements across artificial intelligence, technical research presentations, and project exhibitions.
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
            <SpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.14)"
              onMouseEnter={() => soundManager.playHover()}
              className="p-6 h-full flex flex-col justify-between bg-zinc-950/80 border-zinc-800/90 hover:border-amber-500/40 transition-colors shadow-lg space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono-code text-amber-300 font-bold">
                    {award.highlight}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans leading-snug">
                    {award.title}
                  </h3>
                  <div className="text-xs font-mono-code text-amber-400/90 mt-1">
                    {award.category}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {award.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
                <span>Verified Academic Award</span>
                <span className="text-amber-400/80 font-semibold">{award.date}</span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
