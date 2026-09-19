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
import { HeroVisualHub } from "./HeroVisualHub";

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
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden"
    >
      {/* ── Main Hero Split Composition (Native React DOM — Zero Layering/Ghosting) ── */}
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

        {/* ── Right Column: Native Interactive Visual Hub (7 cols) ───────────── */}
        <div className="lg:col-span-7">
          <HeroVisualHub />
        </div>
      </div>
    </section>
  );
}
