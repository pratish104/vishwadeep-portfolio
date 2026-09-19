import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { featuredProjects, ProjectItem } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { AllProjectsModal } from "./AllProjectsModal";
import { ProjectModal } from "./ProjectModal";

export function ProjectsBento() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  const digipath = featuredProjects.find((p) => p.id === "digipath") ?? featuredProjects[0];
  const retailSales = featuredProjects.find((p) => p.id === "retail-sales") ?? featuredProjects[1];
  const kosh = featuredProjects.find((p) => p.id === "kosh") ?? featuredProjects[2];

  const handleOpenModal = (project: ProjectItem) => {
    soundManager.playClick();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* ── Section Heading matching Reference ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div className="space-y-1">
          <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-emerald-600">
            // FEATURED PROJECTS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display tracking-tight text-gray-900">
            Selected Data &amp; AI Systems
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Real projects. Real problems. Real impact.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setIsAllProjectsOpen(true);
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 bg-white/95 text-gray-800 hover:bg-gray-50 shadow-sm text-xs font-mono-code font-semibold transition-all hover:scale-105"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── 3-Column Bento Grid Matching Exact Reference Composition ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── CARD 1: DigiPath (Mint Green Pastel Glass Card) ──────────────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleOpenModal(digipath)}
          className="p-5 sm:p-6 rounded-3xl border border-emerald-200/90 bg-[#edf8f2]/95 backdrop-blur-xl shadow-xl shadow-emerald-900/[0.04] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
        >
          <div className="space-y-3">
            {/* Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold tracking-wider bg-emerald-600 text-white shadow-sm">
                ★ FLAGSHIP
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-xl font-serif-display tracking-tight text-gray-900 group-hover:text-emerald-800 transition-colors">
                DigiPath
              </h3>
              <p className="text-xs text-emerald-700 font-semibold font-mono-code">
                Admission Decision Intelligence
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs leading-relaxed text-gray-600">
              End-to-end college prediction platform for diploma and engineering aspirants.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["Python", "ML", "Data Processing"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-medium bg-white/90 border border-emerald-200/80 text-emerald-800 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Visual Area: Real UI Interface Screenshot */}
            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-1.5 mt-2 shadow-sm overflow-hidden">
              <div className="rounded-xl overflow-hidden shadow-2xs">
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
                <div className="text-sm font-bold text-emerald-800">500+</div>
                <div className="text-[10px] text-gray-500">Colleges</div>
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-800">Multi-Param</div>
                <div className="text-[10px] text-gray-500">Prediction</div>
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-800">Scam Filter</div>
                <div className="text-[10px] text-gray-500">Integrated</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-3 mt-2 border-t border-emerald-200/60 text-center">
            <span className="text-xs font-mono-code font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1 group-hover:underline">
              <span>View Project</span>
              <span>→</span>
            </span>
          </div>
        </motion.div>

        {/* ── CARD 2: Retail Sales Analysis (Soft Sky Blue Pastel Glass Card) ── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleOpenModal(retailSales)}
          className="p-5 sm:p-6 rounded-3xl border border-blue-200/90 bg-[#f1f6ff]/95 backdrop-blur-xl shadow-xl shadow-blue-900/[0.04] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
        >
          <div className="space-y-3">
            {/* Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                DATA ANALYTICS
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-xl font-serif-display tracking-tight text-gray-900 group-hover:text-blue-800 transition-colors">
                Retail Sales Analysis
              </h3>
              <p className="text-xs text-blue-700 font-semibold font-mono-code">
                R + Power BI Dashboard
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs leading-relaxed text-gray-600">
              Exploratory analysis and interactive dashboards for retail sales data.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["R", "RStudio", "Power BI"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-medium bg-white/90 border border-blue-200/80 text-blue-800 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Visual Area: Analytics Multi-Chart Dashboard Mockup */}
            <div className="rounded-2xl border border-blue-100 bg-white/90 p-2.5 mt-2 h-36 sm:h-40 flex flex-col justify-between shadow-sm">
              {/* Top mini trend header */}
              <div className="w-full flex items-center justify-between px-1 text-[10px] font-mono-code text-gray-500">
                <span>Revenue Trend</span>
                <span className="text-blue-600 font-bold">51K+ Records</span>
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
                        stroke="#dbeafe"
                        strokeWidth="5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="5"
                        strokeDasharray="52, 100"
                      />
                    </svg>
                    <span className="absolute text-[8px] font-bold font-mono-code text-blue-700">52%</span>
                  </div>

                  {/* Mini Map Silhouette */}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-700">
                    <span className="text-[9px] font-mono-code font-bold">4 Reg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Project Information Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs font-mono-code">
              <div>
                <div className="text-sm font-bold text-blue-800">11.6%</div>
                <div className="text-[10px] text-gray-500">Profit Margin</div>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-800">51K+</div>
                <div className="text-[10px] text-gray-500">Transactions</div>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-800">4</div>
                <div className="text-[10px] text-gray-500">Regions</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-3 mt-2 border-t border-blue-200/60 text-center">
            <span className="text-xs font-mono-code font-bold text-blue-700 hover:text-blue-800 flex items-center justify-center gap-1 group-hover:underline">
              <span>View Project</span>
              <span>→</span>
            </span>
          </div>
        </motion.div>

        {/* ── CARD 3: Kosh (Soft Lavender Pastel Glass Card) ────────────────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleOpenModal(kosh)}
          className="relative p-5 sm:p-6 rounded-3xl border border-purple-200/90 bg-[#faf4ff]/95 backdrop-blur-xl shadow-xl shadow-purple-900/[0.04] transition-all duration-300 flex flex-col justify-between cursor-pointer group overflow-hidden"
        >
          {/* Top-Right Soft Watermark Devanagari Character 'अने' */}
          <div
            className="absolute right-4 top-2 text-4xl sm:text-5xl font-bold font-serif-display select-none pointer-events-none opacity-15 text-purple-700"
            aria-hidden="true"
          >
            अने
          </div>

          <div className="space-y-3 relative z-10">
            {/* Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-purple-600 text-white shadow-sm">
                NLP / LANGUAGE
              </span>
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3 className="text-xl font-serif-display tracking-tight text-gray-900 group-hover:text-purple-800 transition-colors">
                Kosh
              </h3>
              <p className="text-xs text-purple-700 font-semibold font-mono-code">
                Marathi Text Rewriting System
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs leading-relaxed text-gray-600">
              Context-aware Marathi paraphrasing and style transformation.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["Python", "NLP", "mT5 / MBart"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-medium bg-white/90 border border-purple-200/80 text-purple-800 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Visual Area: Devanagari Transformation Box */}
            <div className="rounded-2xl border border-purple-100 bg-white/90 p-2.5 mt-2 h-36 sm:h-40 flex flex-col justify-between space-y-1.5 shadow-sm">
              {/* Input section */}
              <div className="p-1.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs">
                <span className="text-[9px] font-mono-code text-purple-700 block font-bold">
                  Input (मराठी)
                </span>
                <p className="font-sans text-[11px] leading-snug text-gray-800 line-clamp-2">
                  "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे."
                </p>
              </div>

              {/* Output section */}
              <div className="p-1.5 rounded-xl bg-purple-100/70 border border-purple-200 text-xs">
                <span className="text-[9px] font-mono-code text-purple-800 block font-bold">
                  Output (Formal)
                </span>
                <p className="font-sans text-[11px] font-medium text-purple-950 leading-snug line-clamp-2">
                  "विद्यार्थ्यांनी परीक्षा पूर्वतयारी वेळेत पूर्ण करणे आवश्यक आहे."
                </p>
              </div>
            </div>

            {/* Key Project Information Row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs font-mono-code">
              <div>
                <div className="text-xs font-bold text-purple-800">Devanagari</div>
                <div className="text-[10px] text-gray-500">UTF-8 Logic</div>
              </div>
              <div>
                <div className="text-xs font-bold text-purple-800">Multi-Tone</div>
                <div className="text-[10px] text-gray-500">Paraphraser</div>
              </div>
              <div>
                <div className="text-xs font-bold text-purple-800">SANGRAH</div>
                <div className="text-[10px] text-gray-500">Architecture</div>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-3 mt-2 border-t border-purple-200/60 text-center relative z-10">
            <span className="text-xs font-mono-code font-bold text-purple-700 hover:text-purple-800 flex items-center justify-center gap-1 group-hover:underline">
              <span>View Project</span>
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

      {/* ── Complete Portfolio Inventory Explorer Modal (All 5 Projects) ──────── */}
      <AllProjectsModal
        isOpen={isAllProjectsOpen}
        onClose={() => setIsAllProjectsOpen(false)}
        onSelectProject={(proj) => {
          setIsAllProjectsOpen(false);
          setSelectedProject(proj);
        }}
      />
    </section>
  );
}
