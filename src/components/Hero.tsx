import { motion } from "framer-motion";
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
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { JapaneseBalconyOverlay } from "./world/JapaneseBalconyOverlay";
import { WorldEnvironment } from "./world/WorldEnvironment";

interface HeroProps {
  onOpenTerminal?: () => void;
}

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
  const isDark = theme !== "light";
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Dynamic Theme-based typography & classes matching the reference images
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const roleColor =
    theme === "anime"
      ? "text-blue-600 dark:text-blue-400"
      : theme === "light"
      ? "text-blue-700 font-semibold"
      : "text-cyan-400";
  const bodyColor = isDark ? "text-zinc-300" : "text-gray-600";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-500";
  const badgeBg =
    theme === "light"
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : "bg-emerald-950/60 border-emerald-500/30 text-emerald-300";
  const primaryBtnClass =
    theme === "light"
      ? "bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-black/10"
      : "bg-white hover:bg-zinc-100 text-zinc-950 font-bold shadow-xl shadow-white/10";
  const secondaryBtnClass =
    theme === "light"
      ? "bg-white hover:bg-gray-100 border-gray-200 text-gray-800 shadow-sm"
      : "bg-[#141829]/90 hover:bg-[#1a2035] border-white/10 text-zinc-200 shadow-lg";
  const iconBtnClass =
    theme === "light"
      ? "bg-white hover:bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900"
      : "bg-[#141829]/90 hover:bg-[#1a2035] border-white/10 text-zinc-300 hover:text-white";

  return (
    <section
      id="about"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-4 overflow-hidden"
    >
      {/* ── Background Japanese Balcony Framing & Foliage ─────────────────────── */}
      <JapaneseBalconyOverlay />

      {/* ── Main Hero Composition (Split Grid) ─────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* ── Left Column: Identity, Bio, Credentials, CTAs (5 cols) ─────────── */}
        <div className="lg:col-span-5 space-y-4 text-left pt-2 lg:pt-0">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono-code font-medium ${badgeBg}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profileData.status}</span>
            </div>
          </motion.div>

          {/* Subtitle Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-xs font-mono-code font-bold tracking-widest text-indigo-400 uppercase"
          >
            DATA × AI × ENGINEERING
          </motion.div>

          {/* Name Display */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={`text-4xl sm:text-5xl lg:text-6xl font-serif-display tracking-tight leading-[1.08] ${headingColor}`}
          >
            {profileData.name}
          </motion.h1>

          {/* Role Header */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`text-lg sm:text-xl font-medium tracking-tight ${roleColor}`}
          >
            Data Analyst &amp; Applied AI Developer
          </motion.p>

          {/* Bio Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-xs sm:text-sm leading-relaxed max-w-md font-normal ${bodyColor}`}
          >
            Transforming unstandardized records into dependable decision
            intelligence. Creator of{" "}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#projects");
              }}
              className="text-emerald-400 font-semibold hover:underline"
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
            className="space-y-1 text-xs font-mono-code pt-1"
          >
            <div className={`flex items-center gap-1.5 ${mutedColor}`}>
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>MGM College of Engg. &amp; Tech, Panvel (B.E. 2026)</span>
            </div>
            <div className={`flex items-center gap-1.5 pl-5 ${mutedColor}`}>
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 ${primaryBtnClass}`}
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 hover:scale-[1.02] ${secondaryBtnClass}`}
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>

            {/* Quick Profile Icons */}
            <div className="flex items-center gap-1 pl-1">
              <a
                href={profileData.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`p-2.5 rounded-xl border transition-all ${iconBtnClass}`}
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
                className={`p-2.5 rounded-xl border transition-all hover:text-blue-400 ${iconBtnClass}`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-2.5 rounded-xl border transition-all ${iconBtnClass}`}
                title="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400" />
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
              className={`inline-flex items-center gap-2 text-xs font-mono-code transition-colors ${mutedColor} hover:${headingColor}`}
            >
              <MousePointer2 className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
              <span>Scroll to explore</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right / Center Column: Interactive 3D World (7 cols) ───────────── */}
        <div className="lg:col-span-7 relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
          <WorldEnvironment className="w-full h-full rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
