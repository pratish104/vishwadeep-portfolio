import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playSuccess();
    navigator.clipboard.writeText(profileData.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-zinc-400">
            {profileData.status}
          </span>
        </motion.div>

        {/* Main Headings */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Engineering resilient systems with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              AI & Security
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Hi, I’m <span className="text-zinc-100 font-medium">{profileData.name}</span>{" "}
            <span className="text-zinc-500 font-mono text-sm">({profileData.preferredName})</span> — a Computer Engineering student specializing in{" "}
            <span className="text-zinc-200 font-medium">Full-Stack Development</span>,{" "}
            <span className="text-zinc-200 font-medium">Machine Learning</span>, and{" "}
            <span className="text-zinc-200 font-medium">Cybersecurity</span>.
          </motion.p>
        </div>

        {/* Highlight Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-1"
        >
          {[
            "Full-Stack Systems",
            "Deep Learning & NLP",
            "Digital Forensics",
            "FastAPI & React",
            "Kali Linux & Python",
          ].map((tag) => (
            <span
              key={tag}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono text-zinc-300 hover:border-cyan-500/40 hover:text-white transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action Buttons & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="#projects"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all shadow-lg shadow-white/5 hover:scale-105 active:scale-95"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#terminal"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-850 border border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300 font-mono text-xs font-semibold tracking-wide transition-all shadow-md shadow-emerald-500/5 hover:scale-105"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Open Terminal CLI</span>
          </a>

          {/* Quick Social Buttons */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-zinc-800">
            <a
              href={profileData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={profileData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-blue-400 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-cyan-400 transition-all"
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

        {/* Minimal Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-10 max-w-3xl mx-auto"
        >
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-left flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
