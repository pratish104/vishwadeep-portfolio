import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { ProjectModal } from "./ProjectModal";

export function ProjectsBento() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const digipath = featuredProjects.find((p) => p.id === "digipath") ?? featuredProjects[0];
  const retailSales = featuredProjects.find((p) => p.id === "retail-sales") ?? featuredProjects[1];
  const kosh = featuredProjects.find((p) => p.id === "kosh") ?? featuredProjects[2];

  const handleOpenModal = (project: ProjectItem) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  // Card themes matching the reference images
  const getCardStyle = (type: "digipath" | "retail" | "kosh") => {
    if (isDark) {
      if (type === "digipath") {
        return {
          bg: "bg-[#091815]/85 backdrop-blur-xl",
          border: "border-emerald-500/30 hover:border-emerald-500/60",
          shadow: "shadow-2xl shadow-emerald-950/40",
          badge: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
          title: "text-white",
          sub: "text-emerald-400 font-mono-code",
          body: "text-zinc-300",
          pill: "bg-[#102420] border-emerald-500/20 text-emerald-200",
          cta: "text-emerald-400 hover:text-emerald-300",
          boxBg: "bg-[#040e0c]/90 border-emerald-500/20",
          statVal: "text-emerald-400 font-bold",
          statLabel: "text-zinc-400",
        };
      }
      if (type === "retail") {
        return {
          bg: "bg-[#0b162a]/85 backdrop-blur-xl",
          border: "border-blue-500/30 hover:border-blue-500/60",
          shadow: "shadow-2xl shadow-blue-950/40",
          badge: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
          title: "text-white",
          sub: "text-blue-400 font-mono-code",
          body: "text-zinc-300",
          pill: "bg-[#11223e] border-blue-500/20 text-blue-200",
          cta: "text-blue-400 hover:text-blue-300",
          boxBg: "bg-[#050e1c]/90 border-blue-500/20",
          statVal: "text-blue-400 font-bold",
          statLabel: "text-zinc-400",
        };
      }
      return {
        bg: "bg-[#150e24]/85 backdrop-blur-xl",
        border: "border-purple-500/30 hover:border-purple-500/60",
        shadow: "shadow-2xl shadow-purple-950/40",
        badge: "bg-purple-500/20 text-purple-400 border border-purple-500/40",
        title: "text-white",
        sub: "text-purple-400 font-mono-code",
        body: "text-zinc-300",
        pill: "bg-[#201538] border-purple-500/20 text-purple-200",
        cta: "text-purple-400 hover:text-purple-300",
        boxBg: "bg-[#0d0718]/90 border-purple-500/20",
        statVal: "text-purple-400 font-bold",
        statLabel: "text-zinc-400",
      };
    }

    // Light Theme / Anime Theme (Pastel Clean Aesthetics matching Reference Image)
    if (type === "digipath") {
      return {
        bg: isAnime ? "bg-[#eaf8f0]/92 backdrop-blur-xl" : "bg-[#edf8f2]/95 backdrop-blur-xl",
        border: "border-emerald-200/80 hover:border-emerald-400",
        shadow: "shadow-xl shadow-emerald-900/[0.04]",
        badge: "bg-emerald-600 text-white font-bold",
        title: "text-gray-900",
        sub: "text-emerald-700 font-semibold",
        body: "text-gray-600",
        pill: "bg-white/90 border-emerald-200/60 text-emerald-800 font-medium",
        cta: "text-emerald-700 hover:text-emerald-800 font-bold",
        boxBg: "bg-white/90 border-emerald-100 shadow-sm",
        statVal: "text-emerald-800 font-bold",
        statLabel: "text-gray-500",
      };
    }
    if (type === "retail") {
      return {
        bg: isAnime ? "bg-[#eef5fe]/92 backdrop-blur-xl" : "bg-[#f1f6ff]/95 backdrop-blur-xl",
        border: "border-blue-200/80 hover:border-blue-400",
        shadow: "shadow-xl shadow-blue-900/[0.04]",
        badge: "bg-blue-600 text-white font-bold",
        title: "text-gray-900",
        sub: "text-blue-700 font-semibold",
        body: "text-gray-600",
        pill: "bg-white/90 border-blue-200/60 text-blue-800 font-medium",
        cta: "text-blue-700 hover:text-blue-800 font-bold",
        boxBg: "bg-white/90 border-blue-100 shadow-sm",
        statVal: "text-blue-800 font-bold",
        statLabel: "text-gray-500",
      };
    }
    return {
      bg: isAnime ? "bg-[#f8f2fe]/92 backdrop-blur-xl" : "bg-[#faf4ff]/95 backdrop-blur-xl",
      border: "border-purple-200/80 hover:border-purple-400",
      shadow: "shadow-xl shadow-purple-900/[0.04]",
      badge: "bg-purple-600 text-white font-bold",
      title: "text-gray-900",
      sub: "text-purple-700 font-semibold",
      body: "text-gray-600",
      pill: "bg-white/90 border-purple-200/60 text-purple-800 font-medium",
      cta: "text-purple-700 hover:text-purple-800 font-bold",
      boxBg: "bg-white/90 border-purple-100 shadow-sm",
      statVal: "text-purple-800 font-bold",
      statLabel: "text-gray-500",
    };
  };

  const dStyle = getCardStyle("digipath");
  const rStyle = getCardStyle("retail");
  const kStyle = getCardStyle("kosh");

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* ── Section Heading matching Reference ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div className="space-y-1">
          <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-500">
            // FEATURED PROJECTS
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-serif-display tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Selected Data &amp; AI Systems
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
            Real projects. Real problems. Real impact.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal(digipath)}
          onMouseEnter={() => soundManager.playHover()}
          className={`self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono-code transition-all hover:scale-105 ${
            isDark
              ? "bg-[#14192b] border-white/10 text-zinc-200 hover:text-white"
              : "bg-white/90 border-gray-200 text-gray-700 hover:bg-white shadow-sm"
          }`}
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── 3-Column Bento Grid Matching Exact Reference Composition ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── CARD 1: DigiPath ──────────────────────────────────────────────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleOpenModal(digipath)}
          className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${dStyle.bg} ${dStyle.border} ${dStyle.shadow}`}
        >
          <div className="space-y-3">
            {/* Badge */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono-code tracking-wider ${dStyle.badge}`}>
                ★ FLAGSHIP
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className={`text-xl font-serif-display tracking-tight ${dStyle.title}`}>
                DigiPath
              </h3>
              <p className={`text-xs ${dStyle.sub}`}>
                Admission Decision Intelligence
              </p>
            </div>

            {/* Short Description */}
            <p className={`text-xs leading-relaxed ${dStyle.body}`}>
              End-to-end college prediction platform for diploma and engineering aspirants.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["Python", "ML", "Data Processing"].map((tech) => (
                <span key={tech} className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code border ${dStyle.pill}`}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Visual Area: Real UI Interface Mockup */}
            <div className={`rounded-2xl border overflow-hidden p-1.5 mt-2 ${dStyle.boxBg}`}>
              <div className="rounded-xl overflow-hidden shadow-sm">
                <img
                  src="/projects/digipath.png"
                  alt="DigiPath Real Application Interface"
                  className="w-full h-36 sm:h-40 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>

            {/* Key Project Information Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs font-mono-code">
              <div>
                <div className={`text-sm ${dStyle.statVal}`}>500+</div>
                <div className={`text-[10px] ${dStyle.statLabel}`}>Colleges</div>
              </div>
              <div>
                <div className={`text-xs font-bold ${dStyle.statVal}`}>Multi-Param</div>
                <div className={`text-[10px] ${dStyle.statLabel}`}>Prediction</div>
              </div>
              <div>
                <div className={`text-xs font-bold ${dStyle.statVal}`}>Scam Filter</div>
                <div className={`text-[10px] ${dStyle.statLabel}`}>Integrated</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/10 text-center">
            <span className={`text-xs font-mono-code ${dStyle.cta} flex items-center justify-center gap-1 group-hover:underline`}>
              <span>{isDark ? "Explore Project" : "View Project"}</span>
              <span>→</span>
            </span>
          </div>
        </motion.div>

        {/* ── CARD 2: Retail Sales Analysis ─────────────────────────────────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleOpenModal(retailSales)}
          className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${rStyle.bg} ${rStyle.border} ${rStyle.shadow}`}
        >
          <div className="space-y-3">
            {/* Badge */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono-code uppercase tracking-wider ${rStyle.badge}`}>
                DATA ANALYTICS
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className={`text-xl font-serif-display tracking-tight ${rStyle.title}`}>
                Retail Sales Analysis
              </h3>
              <p className={`text-xs ${rStyle.sub}`}>
                R + Power BI Dashboard
              </p>
            </div>

            {/* Short Description */}
            <p className={`text-xs leading-relaxed ${rStyle.body}`}>
              Exploratory analysis and interactive dashboards for retail sales data.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["R", "RStudio", "Power BI"].map((tech) => (
                <span key={tech} className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code border ${rStyle.pill}`}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Visual Area: Analytics Multi-Chart Dashboard Mockup */}
            <div className={`rounded-2xl border p-2.5 mt-2 h-36 sm:h-40 flex flex-col justify-between ${rStyle.boxBg}`}>
              {/* Top mini trend chart */}
              <div className="w-full flex items-center justify-between px-1 text-[10px] font-mono-code text-zinc-400">
                <span>Revenue Trend</span>
                <span className="text-blue-500 font-bold">51K+ Records</span>
              </div>

              {/* Mini Charts Grid */}
              <div className="grid grid-cols-2 gap-2 items-center flex-1 py-1">
                {/* Mini SVG Line & Bar Chart */}
                <svg viewBox="0 0 120 55" className="w-full h-full">
                  <path
                    d="M 5 45 Q 35 30 65 38 T 115 12"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <rect x="15" y="25" width="8" height="25" rx="2" fill="#93c5fd" opacity="0.6" />
                  <rect x="35" y="15" width="8" height="35" rx="2" fill="#60a5fa" opacity="0.8" />
                  <rect x="55" y="20" width="8" height="30" rx="2" fill="#93c5fd" opacity="0.6" />
                  <rect x="75" y="10" width="8" height="40" rx="2" fill="#3b82f6" opacity="0.9" />
                  <rect x="95" y="5" width="8" height="45" rx="2" fill="#2563eb" />
                </svg>

                {/* Mini Regional Donut & Map Shape */}
                <div className="flex items-center justify-around h-full">
                  {/* Donut */}
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#bfdbfe"
                        strokeWidth="5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="5"
                        strokeDasharray="52, 100"
                      />
                    </svg>
                    <span className="absolute text-[8px] font-bold font-mono-code text-blue-600">52%</span>
                  </div>

                  {/* Mini Map Silhouette */}
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-600">
                    <span className="text-[9px] font-mono-code font-bold">4 Reg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Project Information Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs font-mono-code">
              <div>
                <div className={`text-sm ${rStyle.statVal}`}>11.6%</div>
                <div className={`text-[10px] ${rStyle.statLabel}`}>Profit Margin</div>
              </div>
              <div>
                <div className={`text-sm ${rStyle.statVal}`}>51K+</div>
                <div className={`text-[10px] ${rStyle.statLabel}`}>Transactions</div>
              </div>
              <div>
                <div className={`text-sm ${rStyle.statVal}`}>4</div>
                <div className={`text-[10px] ${rStyle.statLabel}`}>Regions</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/10 text-center">
            <span className={`text-xs font-mono-code ${rStyle.cta} flex items-center justify-center gap-1 group-hover:underline`}>
              <span>{isDark ? "Explore Project" : "View Project"}</span>
              <span>→</span>
            </span>
          </div>
        </motion.div>

        {/* ── CARD 3: Kosh (Marathi NLP) ─────────────────────────────────────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleOpenModal(kosh)}
          className={`relative p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group overflow-hidden ${kStyle.bg} ${kStyle.border} ${kStyle.shadow}`}
        >
          {/* Top-Right Soft Watermark Devanagari Character 'अने' */}
          <div
            className="absolute right-4 top-2 text-4xl sm:text-5xl font-bold font-serif-display select-none pointer-events-none opacity-15 text-purple-600"
            aria-hidden="true"
          >
            अने
          </div>

          <div className="space-y-3 relative z-10">
            {/* Badge */}
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono-code uppercase tracking-wider ${kStyle.badge}`}>
                NLP / LANGUAGE
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className={`text-xl font-serif-display tracking-tight ${kStyle.title}`}>
                Kosh
              </h3>
              <p className={`text-xs ${kStyle.sub}`}>
                Marathi Text Rewriting System
              </p>
            </div>

            {/* Short Description */}
            <p className={`text-xs leading-relaxed ${kStyle.body}`}>
              Context-aware Marathi paraphrasing and style transformation.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["Python", "NLP", "mT5 / MBart"].map((tech) => (
                <span key={tech} className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code border ${kStyle.pill}`}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Visual Area: Devanagari Transformation Box */}
            <div className={`rounded-2xl border p-2.5 mt-2 h-36 sm:h-40 flex flex-col justify-between space-y-1.5 ${kStyle.boxBg}`}>
              {/* Input section */}
              <div className="p-1.5 rounded-xl bg-black/5 dark:bg-black/20 text-xs">
                <span className="text-[9px] font-mono-code text-purple-600 dark:text-purple-400 block font-semibold">
                  Input (मराठी)
                </span>
                <p className="font-sans text-[11px] leading-snug line-clamp-2">
                  "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे."
                </p>
              </div>

              {/* Output section */}
              <div className="p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                <span className="text-[9px] font-mono-code text-purple-600 dark:text-purple-400 block font-semibold">
                  Output (Formal)
                </span>
                <p className="font-sans text-[11px] font-medium text-purple-900 dark:text-purple-200 leading-snug line-clamp-2">
                  "विद्यार्थ्यांनी परीक्षा पूर्वतयारी वेळेत पूर्ण करणे आवश्यक आहे."
                </p>
              </div>
            </div>

            {/* Key Project Information Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs font-mono-code">
              <div>
                <div className={`text-xs font-bold ${kStyle.statVal}`}>Devanagari</div>
                <div className={`text-[10px] ${kStyle.statLabel}`}>UTF-8 Logic</div>
              </div>
              <div>
                <div className={`text-xs font-bold ${kStyle.statVal}`}>Multi-Tone</div>
                <div className={`text-[10px] ${kStyle.statLabel}`}>Paraphraser</div>
              </div>
              <div>
                <div className={`text-xs font-bold ${kStyle.statVal}`}>SANGRAH</div>
                <div className={`text-[10px] ${kStyle.statLabel}`}>Architecture</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/10 text-center relative z-10">
            <span className={`text-xs font-mono-code ${kStyle.cta} flex items-center justify-center gap-1 group-hover:underline`}>
              <span>{isDark ? "Explore Project" : "View Project"}</span>
              <span>→</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Full-Viewport Project Case Study Modal ─────────────────────────────── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
