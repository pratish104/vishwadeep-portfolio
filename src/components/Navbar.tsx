import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Menu, Terminal, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
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
    { label: "Experience", href: "#experience" },
    { label: "Awards", href: "#awards" },
    { label: "Skills", href: "#skills" },
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
            ? "bg-[#090a0f]/90 border border-zinc-800/90 backdrop-blur-xl shadow-2xl shadow-black/80"
            : "bg-[#090a0f]/60 border border-zinc-800/50 backdrop-blur-md"
        }`}
      >
        {/* Brand / Name */}
        <a
          href="#"
          onClick={() => soundManager.playClick()}
          className="flex items-center gap-2 text-zinc-100 font-semibold tracking-tight hover:text-white transition-colors group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-mono-code font-bold text-indigo-300">
              VP
            </div>
          </div>
          <span className="text-sm font-medium hidden sm:inline font-sans">
            {profileData.name}
          </span>
          <span className="text-xs text-zinc-400 font-mono-code hidden md:inline">
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
              className="px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 transition-all font-sans"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs: Terminal, Audio, Status & Resume */}
        <div className="flex items-center gap-2">
          {/* Developer Terminal Easter Egg Button */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-indigo-300 hover:border-indigo-500/40 transition-all flex items-center gap-1 text-xs font-mono-code"
              title="Open Terminal Sandbox"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[10px] text-zinc-400">CLI</span>
            </button>
          )}

          {/* Audio Equalizer Button */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs font-mono-code ${
              audioActive
                ? "bg-indigo-950/70 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-300"
            }`}
            title={audioActive ? "Mute Web Audio" : "Enable Web Audio FX"}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] h-2 bg-indigo-400 animate-pulse" />
                  <span className="w-[2px] h-3 bg-indigo-400 animate-ping" />
                  <span className="w-[2px] h-1.5 bg-indigo-400 animate-pulse" />
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-mono-code text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </div>

          <a
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-medium transition-all shadow-sm group font-sans"
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
          className="absolute top-16 left-4 right-4 p-4 rounded-2xl bg-[#090a0f] border border-zinc-800 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 md:hidden pointer-events-auto"
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

          {onOpenTerminal && (
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-300 hover:bg-zinc-900 transition-colors text-left"
            >
              <Terminal className="w-4 h-4" />
              <span>Developer CLI Sandbox</span>
            </button>
          )}

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
