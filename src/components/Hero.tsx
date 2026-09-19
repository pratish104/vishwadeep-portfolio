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
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";
import { Hero3DWorld } from "./world/Hero3DWorld";

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
      className="relative min-h-[95vh] flex flex-col justify-between pt-24 pb-8 overflow-hidden"
    >
      {/* ── Seamless Full-Viewport Sunlit Editorial Room Environment ────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden">
        {/* Crisp high-resolution background asset */}
        <img
          src="/environment/editorial_light_env.jpg"
          alt="Sunlit Bay Window Overlooking Floating Eco-City"
          className="w-full h-full object-cover object-center opacity-95"
        />
        {/* Gentle gradient overlay to ensure perfect text contrast & readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 30% 45%, rgba(248, 247, 244, 0.88) 0%, rgba(248, 247, 244, 0.45) 60%, rgba(248, 247, 244, 0.1) 100%)",
          }}
        />
        {/* Bottom smooth fade into featured projects section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36"
          style={{
            background: "linear-gradient(to bottom, rgba(248, 247, 244, 0) 0%, #f8f7f4 100%)",
          }}
        />
      </div>

      {/* ── Main Hero Split Composition (Matching Reference Image) ──────────── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* ── Left Column: Identity, Bio, Credentials, CTAs (5 cols) ─────────── */}
        <div className="lg:col-span-5 space-y-4 text-left pt-4 lg:pt-0">
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-xs font-mono-code font-medium text-emerald-800 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{profileData.status}</span>
            </div>
          </motion.div>

          {/* Subtitle Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-xs font-mono-code font-bold tracking-widest text-blue-700 uppercase"
          >
            DATA × AI × ENGINEERING
          </motion.div>

          {/* Name Display */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif-display tracking-tight leading-[1.08] text-gray-900"
          >
            {profileData.name}
          </motion.h1>

          {/* Role Header */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg sm:text-xl font-medium tracking-tight text-blue-600 font-sans"
          >
            Data Analyst &amp; Applied AI Developer
          </motion.p>

          {/* Bio Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm leading-relaxed max-w-md font-normal text-gray-700"
          >
            Transforming unstandardized records into dependable decision
            intelligence. Creator of{" "}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("#projects");
              }}
              className="text-emerald-700 font-semibold hover:underline"
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
            className="space-y-1.5 text-xs font-mono-code pt-1 text-gray-600"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base">🎓</span>
              <span>MGM College of Engg. &amp; Tech, Panvel (B.E. 2026)</span>
            </div>
            <div className="flex items-center gap-1.5 pl-6">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 -ml-5" />
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-black/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 hover:bg-white border border-gray-200 text-gray-800 shadow-sm transition-all duration-200 hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4 text-blue-600" />
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
                className="p-2.5 rounded-full bg-white/95 hover:bg-white border border-gray-200 text-gray-700 hover:text-gray-950 shadow-sm transition-all hover:scale-105"
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
                className="p-2.5 rounded-full bg-white/95 hover:bg-white border border-gray-200 text-gray-700 hover:text-blue-600 shadow-sm transition-all hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => soundManager.playHover()}
                className="p-2.5 rounded-full bg-white/95 hover:bg-white border border-gray-200 text-gray-700 hover:text-gray-950 shadow-sm transition-all hover:scale-105"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600" />
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
              className="inline-flex items-center gap-2 text-xs font-mono-code text-gray-500 hover:text-gray-900 transition-colors"
            >
              <MousePointer2 className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
              <span>Scroll to explore</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right Column: Interactive 3D World & 5 HUD Data Cards (7 cols) ── */}
        <div className="lg:col-span-7 relative w-full h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
          <Hero3DWorld />
        </div>
      </div>
    </section>
  );
}
