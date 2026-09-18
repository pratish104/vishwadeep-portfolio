import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Menu, Terminal, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(!soundManager.getIsMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    const isNowActive = soundManager.toggleMute();
    setAudioActive(isNowActive);
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Terminal", href: "#terminal" },
    { label: "Journey", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-center pointer-events-none"
    >
      <div
        className={`w-full max-w-5xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "bg-zinc-950/85 border border-zinc-800/80 backdrop-blur-xl shadow-2xl shadow-black/80"
            : "bg-zinc-950/50 border border-zinc-800/40 backdrop-blur-md"
        }`}
      >
        {/* Brand / Name */}
        <a
          href="#"
          onClick={() => soundManager.playClick()}
          className="flex items-center gap-2 text-zinc-100 font-semibold tracking-tight hover:text-white transition-colors group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.4)]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-mono font-bold text-cyan-300">
              VP
            </div>
          </div>
          <span className="text-sm font-medium hidden sm:inline">
            {profileData.name}
          </span>
          <span className="text-xs text-zinc-500 font-mono hidden md:inline">
            / {profileData.preferredName}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs: Audio Equalizer, Status & Resume */}
        <div className="flex items-center gap-2">
          {/* Audio Equalizer Button */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs font-mono ${
              audioActive
                ? "bg-cyan-950/70 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            }`}
            title={audioActive ? "Mute Sound Effects" : "Enable Web Audio FX"}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] h-2 bg-cyan-400 animate-pulse" />
                  <span className="w-[2px] h-3 bg-cyan-400 animate-ping" />
                  <span className="w-[2px] h-1.5 bg-cyan-400 animate-pulse" />
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </div>

          <a
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-all shadow-sm group"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-950 transition-colors" />
            <span className="hidden sm:inline">Resume</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 left-4 right-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 md:hidden pointer-events-auto"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 mt-2 rounded-xl bg-zinc-100 text-zinc-950 font-medium text-sm"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume (PDF)</span>
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
