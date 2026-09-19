import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Menu,
  Moon,
  Mountain,
  Music,
  Pause,
  Play,
  Sun,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme, type Theme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#awards" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const THEME_OPTIONS: { id: Theme; label: string; Icon: React.ElementType }[] = [
  { id: "dark", label: "Dark (Space)", Icon: Moon },
  { id: "light", label: "Light (Minimal)", Icon: Sun },
  { id: "anime", label: "Anime (Nature)", Icon: Mountain },
];

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = id === "" ? document.body : document.getElementById(id);
  if (!el) return;
  const navH = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [trackName, setTrackName] = useState(soundManager.getCurrentTrack().name);
  const [trackArtist, setTrackArtist] = useState(soundManager.getCurrentTrack().artist);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update music player track info when theme changes
  useEffect(() => {
    soundManager.setTheme(theme);
    const track = soundManager.getCurrentTrack();
    setTrackName(track.name);
    setTrackArtist(track.artist);
  }, [theme]);

  // Close theme dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const togglePlay = () => {
    const nowPlaying = soundManager.toggle();
    setIsPlaying(nowPlaying);
    if (nowPlaying) {
      const track = soundManager.getCurrentTrack();
      setTrackName(track.name);
      setTrackArtist(track.artist);
    }
  };

  const toggleMute = () => {
    const nowActive = soundManager.toggleMute();
    setIsMuted(!nowActive);
    if (nowActive && !isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleThemeChange = (t: Theme) => {
    soundManager.playClick();
    setTheme(t);
    setThemeDropdown(false);
    const track = soundManager.getCurrentTrack();
    setTrackName(track.name);
    setTrackArtist(track.artist);
  };

  const currentThemeOption = THEME_OPTIONS.find((o) => o.id === theme) ?? THEME_OPTIONS[0];
  const ThemeIcon = currentThemeOption.Icon;

  // Dynamic theme-based classes
  const navBg = theme === "light"
    ? (scrolled ? "bg-white/95 border-gray-200/90" : "bg-white/75 border-gray-200/50")
    : (scrolled
        ? "bg-[var(--bg-base)]/90 border-[var(--border-subtle)]/90"
        : "bg-[var(--bg-base)]/60 border-[var(--border-subtle)]/50");
  const textColor = theme === "light" ? "text-gray-900" : "text-zinc-100";
  const mutedColor = theme === "light" ? "text-gray-500" : "text-zinc-400";
  const surfaceBg = theme === "light" ? "bg-gray-100 border-gray-200" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)]";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 flex justify-center pointer-events-none"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between px-4 sm:px-5 py-2 rounded-full transition-all duration-300 pointer-events-auto backdrop-blur-xl shadow-sm ${navBg} border`}
      >
        {/* Brand */}
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); soundManager.playClick(); smoothScrollTo("#about"); }}
          className={`flex items-center gap-2 font-semibold tracking-tight transition-colors group ${textColor}`}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1.5px] flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <div className="w-full h-full rounded-full bg-[var(--bg-base)] flex items-center justify-center text-[10px] font-mono-code font-bold text-indigo-300">
              VP
            </div>
          </div>
          <span className={`text-sm font-medium hidden sm:inline ${textColor}`}>
            {profileData.name}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundManager.playHover()}
              onClick={(e) => {
                e.preventDefault();
                soundManager.playClick();
                smoothScrollTo(link.href);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-[var(--bg-elevated)] ${mutedColor} hover:${textColor}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Music Player Pill */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border ${surfaceBg} text-xs font-mono-code`}
          >
            <Music className={`w-3 h-3 shrink-0 ${mutedColor}`} />
            <div className="hidden md:flex flex-col leading-none min-w-0 max-w-[100px]">
              <span className={`text-[10px] font-semibold truncate ${textColor}`}>{trackArtist}</span>
              <span className={`text-[9px] ${mutedColor} truncate`}>{trackName}</span>
            </div>
            {/* Equalizer bars (animated when playing) */}
            {isPlaying && !isMuted && (
              <div className="flex items-end gap-[2px] h-3 shrink-0">
                {[1.4, 1, 0.7, 1, 1.3].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-[var(--accent-primary)] animate-pulse"
                    style={{
                      height: `${h * 6}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.4 + i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
            <button
              onClick={togglePlay}
              className={`p-1 rounded-full hover:bg-[var(--accent-primary)]/10 transition-colors ${textColor}`}
              title={isPlaying ? "Pause" : "Play ambient music"}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={toggleMute}
              className={`p-1 rounded-full hover:bg-[var(--accent-primary)]/10 transition-colors ${isMuted ? mutedColor : textColor}`}
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute music" : "Mute music"}
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
          </div>

          {/* Theme Selector */}
          <div ref={themeDropdownRef} className="relative">
            <button
              onClick={() => setThemeDropdown(!themeDropdown)}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-2 rounded-full border transition-all flex items-center gap-1 ${surfaceBg} ${textColor} hover:border-[var(--accent-primary)]/40`}
              title="Switch theme"
              aria-label="Switch theme"
              aria-expanded={themeDropdown}
            >
              <ThemeIcon className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {themeDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 top-full mt-2 w-44 rounded-2xl border shadow-2xl overflow-hidden z-50 ${
                    theme === "light"
                      ? "bg-white border-gray-200"
                      : "bg-[var(--bg-elevated)] border-[var(--border-subtle)]"
                  }`}
                >
                  {THEME_OPTIONS.map((option) => {
                    const Ic = option.Icon;
                    const isActive = theme === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleThemeChange(option.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-colors text-left ${
                          isActive
                            ? "text-[var(--accent-primary)] bg-[var(--accent-primary)]/10"
                            : theme === "light"
                            ? "text-gray-700 hover:bg-gray-50"
                            : "text-zinc-300 hover:bg-[var(--border-subtle)]"
                        }`}
                      >
                        <Ic className="w-3.5 h-3.5" />
                        <span>{option.label}</span>
                        {isActive && <span className="ml-auto">✓</span>}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CLI Easter Egg */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-2 rounded-full border transition-all hidden md:flex items-center gap-1 ${surfaceBg} ${mutedColor} hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/40 text-xs font-mono-code`}
              title="Open Terminal (CLI Easter Egg)"
              aria-label="Open terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px]">CLI</span>
            </button>
          )}

          {/* Resume */}
          <a
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm group ${
              theme === "light"
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "bg-zinc-100 hover:bg-white text-zinc-950"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`p-2 rounded-full border lg:hidden ${surfaceBg} ${mutedColor}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-16 left-4 right-4 rounded-2xl border shadow-2xl backdrop-blur-2xl flex flex-col lg:hidden pointer-events-auto overflow-hidden z-50 ${
              theme === "light"
                ? "bg-white/98 border-gray-200"
                : "bg-[var(--bg-base)]/98 border-[var(--border-subtle)]"
            }`}
          >
            {/* Nav links */}
            <div className="p-3 space-y-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playClick();
                    setMobileMenuOpen(false);
                    smoothScrollTo(link.href);
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    theme === "light"
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-zinc-300 hover:text-white hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Theme + Music controls */}
            <div className={`p-3 border-t ${theme === "light" ? "border-gray-100" : "border-[var(--border-subtle)]"} space-y-2`}>
              {/* Theme switcher */}
              <div className="flex gap-1.5">
                {THEME_OPTIONS.map((opt) => {
                  const Ic = opt.Icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => { handleThemeChange(opt.id); setMobileMenuOpen(false); }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors border ${
                        theme === opt.id
                          ? "border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10"
                          : theme === "light"
                          ? "border-gray-200 text-gray-500 hover:bg-gray-50"
                          : "border-[var(--border-subtle)] text-zinc-400 hover:bg-[var(--bg-elevated)]"
                      }`}
                    >
                      <Ic className="w-3.5 h-3.5" />
                      <span className="hidden xs:inline">{opt.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Music + Resume row */}
              <div className="flex gap-2">
                <button
                  onClick={togglePlay}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                    theme === "light"
                      ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                      : "border-[var(--border-subtle)] text-zinc-300 hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? "Pause Music" : "Play Music"}</span>
                </button>

                <a
                  href={profileData.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { soundManager.playClick(); setMobileMenuOpen(false); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    theme === "light"
                      ? "bg-gray-900 text-white"
                      : "bg-zinc-100 text-zinc-950"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              </div>

              {onOpenTerminal && (
                <button
                  onClick={() => { soundManager.playClick(); setMobileMenuOpen(false); onOpenTerminal(); }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    theme === "light"
                      ? "text-indigo-600 hover:bg-indigo-50"
                      : "text-indigo-300 hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>Developer CLI Sandbox</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
