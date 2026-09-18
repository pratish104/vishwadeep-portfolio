import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle,
  Cpu,
  Database,
  Layers,
  Server,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import { skillCategories } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { SpotlightCard } from "./SpotlightCard";

export function SkillsBento() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return Shield;
      case "Brain":
        return Brain;
      case "Layers":
        return Layers;
      case "Terminal":
        return Terminal;
      default:
        return Cpu;
    }
  };

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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-3 mb-12 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>// TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Skills & Specializations
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Core technical competencies across Machine Learning, defensive cybersecurity operations, typed web engineering, and Linux internals.
        </p>
      </motion.div>

      {/* Bento Grid Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Large Bento Tile: Core Stack Focus (Spans Full Width) */}
        <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-4">
          <SpotlightCard
            spotlightColor="rgba(0, 229, 255, 0.16)"
            onMouseEnter={() => soundManager.playHover()}
            className="p-7 sm:p-8 bg-gradient-to-br from-zinc-950 via-zinc-900/60 to-zinc-950 border-zinc-800 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  CORE ARSENAL & PRIMARY STACK
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                Specialized in high-concurrency Python & FastAPI backends, typed React architectures, offensive/defensive Kali Linux tooling, and PyTorch deep neural networks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6">
              {[
                "Full-Stack Development",
                "Machine Learning",
                "Cybersecurity",
                "React",
                "FastAPI",
                "Python",
                "PyTorch",
                "Kali Linux",
                "Digital Forensics",
                "Network Security",
                "Pandas & NumPy",
                "SQL & Databases",
              ].map((skill) => (
                <span
                  key={skill}
                  onMouseEnter={() => soundManager.playHover()}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-950/90 border border-zinc-700/60 text-zinc-200 text-xs font-mono font-medium hover:border-cyan-400/80 hover:text-white transition-all shadow-sm cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* 4 Categorized Bento Tiles */}
        {skillCategories.map((category) => {
          const Icon = getCategoryIcon(category.iconName);
          return (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="md:col-span-1 lg:col-span-2"
            >
              <SpotlightCard
                spotlightColor="rgba(16, 185, 129, 0.14)"
                onMouseEnter={() => soundManager.playHover()}
                className="p-6 h-full flex flex-col justify-between group shadow-lg hover:border-zinc-700"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850 text-xs text-zinc-300 hover:border-zinc-700 transition-colors"
                      >
                        <span className="font-mono">{skill.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
