import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { educationData, experienceTimeline } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function Experience() {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  const headingColor = isDark ? "text-white" : "text-gray-900";
  const bodyColor = isDark ? "text-zinc-300" : "text-gray-600";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-400";
  const cardBg = isDark
    ? "bg-[var(--bg-surface)]/80 border-[var(--border-subtle)] hover:border-[var(--border-mid)]"
    : "bg-white border-gray-200 hover:border-gray-300";
  const orgColor = isDark ? "text-indigo-300" : "text-blue-600";
  const roleColor = isDark ? "text-white" : "text-gray-900";
  const tagBg = isDark ? "bg-[var(--bg-base)] border-[var(--border-subtle)] text-zinc-400" : "bg-gray-100 border-gray-200 text-gray-500";
  const sectionAccent = isDark ? "text-indigo-400" : "text-blue-500";
  const timelineBorder = isDark ? "border-[var(--border-subtle)]" : "border-gray-200";
  const nodeBorder = isDark ? "border-indigo-400" : "border-blue-400";
  const eduBg = isDark
    ? "bg-[var(--bg-surface)]/80 border-[var(--border-subtle)] hover:border-[var(--border-mid)]"
    : "bg-white border-gray-200 hover:border-gray-300";
  const eduInst = isDark ? "text-emerald-300/90" : "text-emerald-600";
  const eduBadge = isDark ? "text-emerald-400" : "text-emerald-600";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10 text-left"
      >
        <div className={`flex items-center gap-2 text-xs font-mono-code ${sectionAccent}`}>
          <Briefcase className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider">// INDUSTRY WORK & ACADEMIC BACKGROUND</span>
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif-display tracking-tight ${headingColor}`}>
          Experience & Education
        </h2>
        <p className={`text-sm sm:text-base max-w-2xl font-normal leading-relaxed ${bodyColor}`}>
          Applied internships in exploratory data analysis, dataset collection, and record verification, supported by Computer Engineering coursework.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Experience column */}
        <div className="lg:col-span-7 space-y-5">
          <div className={`flex items-center gap-2 pb-2 border-b text-xs font-mono-code uppercase tracking-wider font-semibold ${sectionAccent} ${timelineBorder}`}>
            <Briefcase className="w-4 h-4" />
            <span>Practical Experience & Internships</span>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className={`relative border-l ml-3 space-y-6 pl-6 ${timelineBorder}`}
          >
            {experienceTimeline.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative group">
                <div className={`absolute -left-[31px] top-4 w-2.5 h-2.5 rounded-full border-2 group-hover:scale-125 transition-transform ${isDark ? "bg-[var(--bg-base)]" : "bg-white"} ${nodeBorder}`} />
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className={`p-5 sm:p-6 space-y-2.5 rounded-2xl border transition-colors ${cardBg}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code">
                    <span className={`font-bold uppercase tracking-wide ${orgColor}`}>{item.organization}</span>
                    <span className={mutedColor}>{item.period}</span>
                  </div>
                  <div>
                    <h3 className={`text-base sm:text-lg font-bold ${roleColor}`}>{item.role}</h3>
                    <span className="text-xs font-mono-code text-emerald-500">● {item.type}</span>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed font-normal ${bodyColor}`}>{item.summary}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className={`px-2 py-0.5 rounded-md text-xs font-mono-code border ${tagBg}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education column */}
        <div className="lg:col-span-5 space-y-5">
          <div className={`flex items-center gap-2 pb-2 border-b text-xs font-mono-code uppercase tracking-wider font-semibold text-emerald-500 ${timelineBorder}`}>
            <GraduationCap className="w-4 h-4" />
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
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  className={`p-5 rounded-2xl border space-y-1.5 transition-colors ${eduBg}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-sm font-bold leading-snug ${roleColor}`}>{edu.degree}</h4>
                    <span className={`text-xs font-mono-code font-bold shrink-0 ${eduBadge}`}>{edu.badge}</span>
                  </div>
                  <p className={`text-xs font-mono-code ${eduInst}`}>{edu.institution}</p>
                  <p className={`text-xs leading-relaxed font-normal ${bodyColor}`}>{edu.details}</p>
                  <div className={`text-xs font-mono-code pt-0.5 ${mutedColor}`}>{edu.period}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
