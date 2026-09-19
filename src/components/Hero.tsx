import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MousePointer2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface HeroProps {
  onOpenTerminal?: () => void;
}

const HUD_CARDS = [
  {
    id: "ideas",
    label: "Ideas",
    sublabel: "Start here",
    description:
      "Every data product begins with identifying high-value problems and unstandardized domain records.",
    color: "#f59e0b",
    icon: "💡",
    pos: { top: "8%", left: "48%" },
  },
  {
    id: "data",
    label: "Data",
    sublabel: "Raw to structured",
    description:
      "Ingesting, normalizing, and cleaning complex tabular data and multi-year cutoff records.",
    color: "#2563eb",
    icon: "📊",
    pos: { top: "34%", left: "6%" },
  },
  {
    id: "aiml",
    label: "AI/ML",
    sublabel: "Models & insights",
    description:
      "Machine learning prediction algorithms, Marathi NLP transformation, and statistical modeling.",
    color: "#7c3aed",
    icon: "❄️",
    pos: { top: "28%", right: "6%" },
  },
  {
    id: "engineering",
    label: "Engineering",
    sublabel: "Build & deploy",
    description:
      "Full-stack APIs, forensic pipeline tooling, and robust production-ready systems.",
    color: "#3b82f6",
    icon: "⚙️",
    pos: { bottom: "18%", left: "12%" },
  },
  {
    id: "impact",
    label: "Impact",
    sublabel: "Real world value",
    description:
      "Empowering students with admission intelligence and businesses with profitability insights.",
    color: "#16a34a",
    icon: "🌱",
    pos: { bottom: "14%", right: "14%" },
  },
];

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = id === "" ? document.body : document.getElementById(id);
  if (!el) return;
  const navH = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Hero({ onOpenTerminal }: HeroProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedHud, setSelectedHud] = useState<(typeof HUD_CARDS)[0] | null>(null);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleHudClick = (card: (typeof HUD_CARDS)[0]) => {
    soundManager.playClick();
    setSelectedHud(selectedHud?.id === card.id ? null : card);
  };

  // Determine active environment backdrop based on selected theme
  const bgImage =
    theme === "dark"
      ? "/environment/theme_dark_bg.jpg"
      : theme === "anime"
      ? "/environment/theme_anime_bg.jpg"
      : "/environment/theme_light_bg.jpg";

  return (
    <section
      id="about"
      className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* ── Seamless Full-Viewport Environment Layer ────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden transition-all duration-700">
        <img
          key={bgImage}
          src={bgImage}
          alt="Portfolio Environment Backdrop"
          className="w-full h-full object-cover object-center transition-opacity duration-700"
        />

        {/* Dynamic theme contrast gradient overlay for crisp text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 70% 65% at 25% 45%, rgba(6, 9, 19, 0.85) 0%, rgba(6, 9, 19, 0.45) 55%, rgba(6, 9, 19, 0.05) 100%)"
              : isAnime
              ? "radial-gradient(ellipse 70% 65% at 25% 45%, rgba(253, 245, 248, 0.88) 0%, rgba(253, 245, 248, 0.45) 55%, rgba(253, 245, 248, 0.05) 100%)"
              : "radial-gradient(ellipse 70% 65% at 25% 45%, rgba(248, 247, 244, 0.88) 0%, rgba(248, 247, 244, 0.45) 55%, rgba(248, 247, 244, 0.05) 100%)",
          }}
        />

        {/* Bottom smooth fade into featured projects section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(6, 9, 19, 0) 0%, #060913 100%)"
              : isAnime
              ? "linear-gradient(to bottom, rgba(253, 245, 248, 0) 0%, #fdf5f8 100%)"
              : "linear-gradient(to bottom, rgba(248, 247, 244, 0) 0%, #f8f7f4 100%)",
          }}
        />
      </div>

      {/* ── Main Hero Split Composition (Matching Reference Image) ──────────── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ── Left Column: Identity, Bio, Credentials, CTAs (5 cols) ─────────── */}
        <div className="lg:col-span-5 space-y-4 text-left pt-6 lg:pt-0">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2"
          >
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono-code font-medium shadow-xs backdrop-blur-md border ${
                isDark
                  ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                  : isAnime
                  ? "bg-rose-50/90 border-rose-200 text-rose-800"
                  : "bg-emerald-50/95 border-emerald-200/90 text-emerald-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{profileData.status}</span>
            </div>
          </motion.div>

          {/* Subtitle Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`text-xs font-mono-code font-bold tracking-widest uppercase ${
              isDark ? "text-cyan-400" : isAnime ? "text-pink-600" : "text-blue-700"
            }`}
          >
            DATA × AI × ENGINEERING
          </motion.div>

          {/* Name Display */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-serif-display tracking-tight leading-[1.08] ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {profileData.name}
          </motion.h1>

          {/* Role Header */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-lg sm:text-xl font-medium tracking-tight font-sans ${
              isDark ? "text-cyan-300" : isAnime ? "text-pink-600" : "text-blue-600"
            }`}
          >
            Data Analyst &amp; Applied AI Developer
          </motion.p>

          {/* Bio Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-xs sm:text-sm leading-relaxed max-w-md font-normal ${
              isDark ? "text-zinc-300" : "text-gray-700"
            }`}
          >
            Transforming unstandardized records into dependable decision
            intelligence. Creator of{" "}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#projects");
              }}
              className={`font-semibold hover:underline ${
                isDark ? "text-cyan-400" : "text-emerald-700"
              }`}
            >
              DigiPath
            </a>{" "}
            (admissions predictor), retail profitability modeling with R &amp; Power BI,
            and Marathi NLP systems.
          </motion.p>

          {/* Academic & Geographic Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`space-y-1.5 text-xs font-mono-code pt-1 ${
              isDark ? "text-zinc-400" : "text-gray-600"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">🎓</span>
              <span>MGM College of Engg. &amp; Tech, Panvel (B.E. 2026)</span>
            </div>
            <div className="flex items-center gap-1.5 pl-6">
              <MapPin
                className={`w-3.5 h-3.5 shrink-0 -ml-5 ${
                  isDark ? "text-cyan-400" : isAnime ? "text-pink-500" : "text-blue-600"
                }`}
              />
              <span>Navi Mumbai, India</span>
            </div>
          </motion.div>

          {/* Action CTAs and Profile Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2.5 pt-2"
          >
            <a
              href="#projects"
              onMouseEnter={() => soundManager.playHover()}
              onClick={(e) => {
                e.preventDefault();
                soundManager.playClick();
                smoothScrollTo("#projects");
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                isDark
                  ? "bg-white text-gray-950 hover:bg-zinc-100 shadow-white/10"
                  : isAnime
                  ? "bg-pink-600 hover:bg-pink-700 text-white shadow-pink-500/20"
                  : "bg-gray-900 hover:bg-gray-800 text-white shadow-black/10"
              }`}
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold border backdrop-blur-xl transition-all duration-200 hover:scale-[1.02] ${
                isDark
                  ? "bg-[#0f172a]/80 border-white/10 text-white hover:bg-[#1e293b]"
                  : "bg-white/95 hover:bg-white border-gray-200 text-gray-800 shadow-2xs"
              }`}
            >
              <FileText
                className={`w-4 h-4 ${
                  isDark ? "text-cyan-400" : isAnime ? "text-pink-500" : "text-blue-600"
                }`}
              />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>

            {/* Quick Profile Icons */}
            <div className="flex items-center gap-1.5 pl-1">
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`p-2.5 rounded-full border backdrop-blur-xl transition-all hover:scale-105 ${
                  isDark
                    ? "bg-[#0f172a]/80 border-white/10 text-zinc-300 hover:text-white"
                    : "bg-white/95 hover:bg-white border-gray-200 text-gray-700 hover:text-gray-950 shadow-2xs"
                }`}
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profileData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`p-2.5 rounded-full border backdrop-blur-xl transition-all hover:scale-105 ${
                  isDark
                    ? "bg-[#0f172a]/80 border-white/10 text-zinc-300 hover:text-cyan-400"
                    : "bg-white/95 hover:bg-white border-gray-200 text-gray-700 hover:text-blue-600 shadow-2xs"
                }`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-2.5 rounded-full border backdrop-blur-xl transition-all hover:scale-105 ${
                  isDark
                    ? "bg-[#0f172a]/80 border-white/10 text-zinc-300 hover:text-white"
                    : "bg-white/95 hover:bg-white border-gray-200 text-gray-700 hover:text-gray-950 shadow-2xs"
                }`}
                title="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#projects");
              }}
              className={`inline-flex items-center gap-2 text-xs font-mono-code transition-colors ${
                isDark ? "text-zinc-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <MousePointer2
                className={`w-3.5 h-3.5 animate-bounce ${
                  isDark ? "text-cyan-400" : isAnime ? "text-pink-500" : "text-blue-600"
                }`}
              />
              <span>Scroll to explore</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right Column: 5 Interactive Floating Glass HUD Cards (7 cols) ─── */}
        <div className="lg:col-span-7 relative w-full h-[460px] sm:h-[520px] md:h-[580px] flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            {HUD_CARDS.map((card, i) => {
              const isSelected = selectedHud?.id === card.id;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  style={card.pos}
                  className="absolute pointer-events-auto z-30"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleHudClick(card)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 shadow-md ${
                      isSelected
                        ? isDark
                          ? "bg-[#0b1224] border-cyan-400 ring-2 ring-cyan-400/20 shadow-xl"
                          : "bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-xl"
                        : isDark
                        ? "bg-[#0b1224]/85 border-white/10 hover:border-white/20 text-white"
                        : isAnime
                        ? "bg-[#fff2f6]/92 border-pink-200/90 text-gray-900"
                        : "bg-white/95 border-gray-200/90 hover:border-gray-300 text-gray-900"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center text-sm shadow-2xs shrink-0"
                      style={{
                        background: isDark ? `${card.color}25` : `${card.color}15`,
                        color: card.color,
                        border: `1px solid ${card.color}30`,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-bold leading-tight">
                        {card.label}
                      </div>
                      <div
                        className={`text-[9px] font-mono-code leading-none mt-0.5 ${
                          isDark ? "text-zinc-400" : "text-gray-500"
                        }`}
                      >
                        {card.sublabel}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Selected HUD Tooltip Modal */}
            <AnimatePresence>
              {selectedHud && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-80 p-4 rounded-2xl border shadow-2xl pointer-events-auto backdrop-blur-2xl ${
                    isDark
                      ? "bg-[#0b1224]/98 border-cyan-500/30 text-white"
                      : "bg-white/98 border-blue-200 text-gray-900"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{selectedHud.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold leading-none">
                          {selectedHud.label} — {selectedHud.sublabel}
                        </h4>
                        <span
                          className={`text-[10px] font-mono-code uppercase font-semibold ${
                            isDark ? "text-cyan-400" : "text-blue-600"
                          }`}
                        >
                          Domain Discipline
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedHud(null)}
                      className="opacity-60 hover:opacity-100 p-0.5 rounded-md"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p
                    className={`text-xs mt-2 leading-relaxed ${
                      isDark ? "text-zinc-300" : "text-gray-600"
                    }`}
                  >
                    {selectedHud.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
