import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

export function AllProjectsModal({ isOpen, onClose, onSelectProject }: AllProjectsModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Data Product", "Data Analytics", "NLP & AI", "Systems Engineering"];

  const filteredProjects =
    activeCategory === "All"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative w-full max-w-5xl h-[88vh] flex flex-col rounded-3xl border shadow-2xl z-10 overflow-hidden ${
              isDark
                ? "bg-[#0c101d]/95 border-white/10 text-white"
                : "bg-white/95 border-gray-200 text-gray-900"
            }`}
          >
            {/* Header */}
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b shrink-0 ${
                isDark ? "bg-[#111628]/80 border-white/10" : "bg-gray-50/90 border-gray-200"
              }`}
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-blue-500">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COMPLETE PORTFOLIO INVENTORY ({featuredProjects.length} Systems)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif-display tracking-tight mt-0.5">
                  All Engineering &amp; AI Projects
                </h2>
              </div>

              <div className="flex items-center gap-3">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveCategory(cat);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all ${
                        activeCategory === cat
                          ? isDark
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-blue-600 text-white font-bold"
                          : isDark
                          ? "bg-white/5 hover:bg-white/10 text-zinc-300"
                          : "bg-gray-200/70 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className={`p-2 rounded-xl transition-colors border shrink-0 ${
                    isDark
                      ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-600"
                  }`}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Project Cards Grid */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 project-explorer-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                      isDark
                        ? "bg-[#14192b]/80 border-white/10 hover:border-blue-500/50 hover:bg-[#1a213a]"
                        : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg shadow-sm"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code uppercase font-bold"
                          style={{
                            backgroundColor: `${proj.accentColor}20`,
                            color: proj.accentColor,
                          }}
                        >
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono-code text-zinc-400">
                          {proj.statusLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold group-hover:text-blue-500 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                          {proj.tagline}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono-code border ${
                              isDark
                                ? "bg-black/30 border-white/10 text-zinc-300"
                                : "bg-gray-50 border-gray-200 text-gray-600"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.technologies.length > 4 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono-code text-zinc-400">
                            +{proj.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-black/5 dark:border-white/10">
                      <span className="text-xs font-mono-code text-blue-500 font-semibold group-hover:underline flex items-center gap-1">
                        <span>Explore Case Study</span>
                        <span>→</span>
                      </span>
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.playClick();
                          }}
                          className={`p-1.5 rounded-lg border ${
                            isDark
                              ? "bg-white/5 hover:bg-white/10 text-zinc-300"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                          title="GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer summary */}
            <div
              className={`px-6 sm:px-8 py-3.5 border-t shrink-0 flex items-center justify-between text-xs font-mono-code ${
                isDark ? "bg-[#111628]/80 border-white/10 text-zinc-400" : "bg-gray-50/90 border-gray-200 text-gray-500"
              }`}
            >
              <span>Showing {filteredProjects.length} of {featuredProjects.length} Projects</span>
              <span>DATA × AI × ENGINEERING</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
