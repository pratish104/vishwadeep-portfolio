import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: ProjectItem) => void;
}

export function AllProjectsModal({ isOpen, onClose, onSelectProject }: AllProjectsModalProps) {
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
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
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
            className="relative w-full max-w-5xl h-[88vh] flex flex-col rounded-3xl border border-gray-200 bg-white/98 text-gray-900 shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-gray-200 bg-gray-50/90 shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-blue-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COMPLETE PORTFOLIO INVENTORY ({featuredProjects.length} Systems)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif-display tracking-tight mt-0.5 text-gray-900">
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
                          ? "bg-blue-600 text-white font-bold shadow-sm"
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
                  className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 shadow-sm transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Project Cards List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 project-explorer-body">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectProject(proj);
                  }}
                  className="group p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 cursor-pointer"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold tracking-wide uppercase bg-blue-50 border border-blue-200 text-blue-700">
                        {proj.category}
                      </span>
                      {proj.id === "digipath" && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-emerald-600 text-white">
                          FLAGSHIP
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-serif-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                      {proj.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono-code bg-gray-100 border border-gray-200 text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono-code text-gray-400">
                          +{proj.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-950 transition-colors shadow-2xs"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-code font-bold bg-blue-600 group-hover:bg-blue-700 text-white shadow-sm transition-all"
                    >
                      <span>Deep Dive</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/80 flex items-center justify-between text-xs font-mono-code text-gray-500 shrink-0">
              <div>Showing {filteredProjects.length} of {featuredProjects.length} systems</div>
              <div>Click any project card to view full architectural case study</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
