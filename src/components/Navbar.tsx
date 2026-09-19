import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Command,
  FileText,
  Menu,
  Moon,
  Mountain,
  Music,
  Pause,
  Play,
  Search,
  SkipBack,
  SkipForward,
  Sun,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme, type Theme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";
import { soundManager, TRACKS, type Track } from "../utils/audio";

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
  const isDark = theme !== "light";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [musicDropdown, setMusicDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(soundManager.getIsPlaying());
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [currentTrack, setCurrentTrack] = useState<Track>(soundManager.getCurrentTrack());
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const musicDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    soundManager.setTrackChangeCallback((t) => {
      setCurrentTrack(t);
      setIsPlaying(soundManager.getIsPlaying());
    });
  }, []);

  // Update track if theme changes
  useEffect(() => {
    soundManager.setTheme(theme);
    setCurrentTrack(soundManager.getCurrentTrack());
  }, [theme]);

  // Global Ctrl+K / Cmd+K listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        soundManager.playClick();
        onOpenTerminal?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenTerminal]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdown(false);
      }
      if (musicDropdownRef.current && !musicDropdownRef.current.contains(e.target as Node)) {
        setMusicDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handlePlayToggle = () => {
    const nowPlaying = soundManager.toggle();
    setIsPlaying(nowPlaying);
    setCurrentTrack(soundManager.getCurrentTrack());
  };

  const handleNextTrack = () => {
    soundManager.playClick();
    const t = soundManager.nextTrack();
    setCurrentTrack(t);
    setIsPlaying(soundManager.getIsPlaying());
  };

  const handlePrevTrack = () => {
    soundManager.playClick();
    const t = soundManager.prevTrack();
    setCurrentTrack(t);
    setIsPlaying(soundManager.getIsPlaying());
  };

  const handleSelectTrack = (idx: number) => {
    soundManager.playClick();
    const t = soundManager.selectTrack(idx);
    setCurrentTrack(t);
    setIsPlaying(true);
    setMusicDropdown(false);
  };

  const handleThemeChange = (t: Theme) => {
    soundManager.playClick();
    setTheme(t);
    setThemeDropdown(false);
  };

  const currentThemeOption = THEME_OPTIONS.find((o) => o.id === theme) ?? THEME_OPTIONS[0];
  const ThemeIcon = currentThemeOption.Icon;

  // Dynamic theme-based styles matching the reference images
  const navBg =
    theme === "light"
      ? scrolled
        ? "bg-white/90 border-gray-200/90 shadow-lg shadow-black/[0.03]"
        : "bg-white/75 border-gray-200/60"
      : theme === "anime"
      ? scrolled
        ? "bg-[#132036]/90 border-[#1e3050]/90 shadow-xl shadow-black/40"
        : "bg-[#132036]/70 border-[#1e3050]/60"
      : scrolled
      ? "bg-[#090b14]/90 border-[#1c2236]/90 shadow-2xl shadow-black/60"
      : "bg-[#0d101c]/70 border-[#1e2338]/60";

  const textColor = theme === "light" ? "text-gray-900" : "text-zinc-100";
  const mutedColor = theme === "light" ? "text-gray-500" : "text-zinc-400";
  const pillBg =
    theme === "light"
      ? "bg-gray-100/90 hover:bg-gray-200/80 border-gray-200 text-gray-700"
      : theme === "anime"
      ? "bg-[#182840]/90 hover:bg-[#203454] border-[#22395d] text-zinc-200"
      : "bg-[#121626]/90 hover:bg-[#181d32] border-[#202740] text-zinc-200";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 flex justify-center pointer-events-none"
    >
      <div
        className={`w-full max-w-7xl flex items-center justify-between px-3 sm:px-5 py-2 rounded-2xl transition-all duration-300 pointer-events-auto backdrop-blur-2xl border ${navBg}`}
      >
        {/* Left: Brand Avatar & Name */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playClick();
            smoothScrollTo("#about");
          }}
          className={`flex items-center gap-2.5 font-semibold tracking-tight transition-transform active:scale-95 group ${textColor}`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full rounded-full bg-[#0d0f17] flex items-center justify-center text-[11px] font-mono-code font-bold text-indigo-300">
              VP
            </div>
          </div>
          <span className={`text-sm font-semibold hidden md:inline tracking-tight ${textColor}`}>
            {profileData.name}
          </span>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundManager.playHover()}
              onClick={(e) => {
                e.preventDefault();
                soundManager.playClick();
                smoothScrollTo(link.href);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                idx === 0
                  ? theme === "light"
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "bg-indigo-950/60 text-indigo-300 font-semibold border border-indigo-500/30"
                  : `${mutedColor} hover:${textColor} hover:bg-black/5 dark:hover:bg-white/5`
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Search / Command Pill, Music Player, Theme Switcher, Resume */}
        <div className="flex items-center gap-2">
          {/* Search / Command Console Pill (`Explore my universe... Ctrl K`) */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-mono-code transition-all shadow-sm group ${pillBg}`}
              title="Search & Command Console (Ctrl + K)"
              aria-label="Open Command Console"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className={`text-[11px] font-sans ${mutedColor}`}>
                Explore my universe...
              </span>
              <kbd
                className={`text-[9px] px-1.5 py-0.5 rounded border font-mono-code ${
                  theme === "light"
                    ? "bg-white border-gray-200 text-gray-500"
                    : "bg-black/40 border-white/10 text-zinc-400"
                }`}
              >
                Ctrl K
              </kbd>
            </button>
          )}

          {/* LoFi Music Player Pill matching the reference images */}
          <div ref={musicDropdownRef} className="relative hidden md:block">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono-code transition-all shadow-sm ${pillBg}`}
            >
              <button
                onClick={() => setMusicDropdown(!musicDropdown)}
                className="flex items-center gap-2 text-left"
                title="Select ambient track"
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isPlaying
                      ? "bg-gradient-to-tr from-indigo-500 to-emerald-400 text-black animate-pulse"
                      : "bg-indigo-950/80 text-indigo-300"
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col leading-none max-w-[90px] xl:max-w-[110px]">
                  <span className={`text-[11px] font-semibold truncate ${textColor}`}>
                    {currentTrack.artist}
                  </span>
                  <span className={`text-[9px] truncate ${mutedColor}`}>
                    {currentTrack.name}
                  </span>
                </div>
              </button>

              {/* Prev / Play / Next Track Buttons */}
              <div className="flex items-center gap-0.5 pl-1 border-l border-white/10 dark:border-white/10">
                <button
                  onClick={handlePrevTrack}
                  className={`p-1 rounded-lg hover:bg-white/10 transition-colors ${mutedColor} hover:${textColor}`}
                  title="Previous Track"
                >
                  <SkipBack className="w-3 h-3" />
                </button>
                <button
                  onClick={handlePlayToggle}
                  className={`p-1.5 rounded-lg transition-all ${
                    isPlaying
                      ? "bg-indigo-500 text-white shadow-sm shadow-indigo-500/40"
                      : "hover:bg-white/10 text-zinc-300"
                  }`}
                  title={isPlaying ? "Pause" : "Play Ambient LoFi"}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  onClick={handleNextTrack}
                  className={`p-1 rounded-lg hover:bg-white/10 transition-colors ${mutedColor} hover:${textColor}`}
                  title="Next Track"
                >
                  <SkipForward className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Track Selector Dropdown */}
            <AnimatePresence>
              {musicDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 top-full mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 backdrop-blur-2xl ${
                    theme === "light"
                      ? "bg-white/95 border-gray-200"
                      : "bg-[#0f1322]/95 border-[#202740]"
                  }`}
                >
                  <div className={`px-2 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider ${mutedColor}`}>
                    Select Ambient Track
                  </div>
                  <div className="space-y-1 mt-1">
                    {TRACKS.map((t, idx) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectTrack(idx)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-mono-code transition-colors text-left ${
                          currentTrack.id === t.id
                            ? "bg-indigo-600 text-white font-semibold"
                            : isDark
                            ? "text-zinc-300 hover:bg-zinc-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{t.name}</span>
                          <span className="text-[10px] opacity-70">{t.artist}</span>
                        </div>
                        {currentTrack.id === t.id && (
                          <span className="text-xs">●</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Selector Dropdown (Moon / Sun / Mountain icons) */}
          <div ref={themeDropdownRef} className="relative">
            <button
              onClick={() => setThemeDropdown(!themeDropdown)}
              onMouseEnter={() => soundManager.playHover()}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 shadow-sm ${pillBg}`}
              title="Switch Visual World Theme"
              aria-label="Switch Theme"
              aria-expanded={themeDropdown}
            >
              <ThemeIcon className="w-4 h-4 text-indigo-400" />
            </button>

            <AnimatePresence>
              {themeDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 top-full mt-2 w-48 rounded-2xl border shadow-2xl p-1.5 z-50 backdrop-blur-2xl ${
                    theme === "light"
                      ? "bg-white/95 border-gray-200"
                      : "bg-[#0f1322]/95 border-[#202740]"
                  }`}
                >
                  <div className={`px-3 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider ${mutedColor}`}>
                    Visual Worlds
                  </div>
                  {THEME_OPTIONS.map((option) => {
                    const Ic = option.Icon;
                    const isActive = theme === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleThemeChange(option.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                          isActive
                            ? "text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-sm"
                            : theme === "light"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-zinc-300 hover:bg-white/5"
                        }`}
                      >
                        <Ic className="w-4 h-4" />
                        <span>{option.label}</span>
                        {isActive && <span className="ml-auto text-xs font-bold">✓</span>}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resume PDF */}
          <a
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shadow-sm group ${
              theme === "light"
                ? "bg-gray-900 hover:bg-gray-800 text-white"
                : "bg-zinc-100 hover:bg-white text-zinc-950 font-semibold"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`p-2 rounded-xl border lg:hidden ${pillBg}`}
            aria-label="Toggle Navigation Menu"
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
            className={`absolute top-16 left-3 right-3 rounded-2xl border shadow-2xl backdrop-blur-2xl flex flex-col lg:hidden pointer-events-auto overflow-hidden z-50 ${
              theme === "light"
                ? "bg-white/98 border-gray-200"
                : "bg-[#090b14]/98 border-[#1c2236]"
            }`}
          >
            <div className="p-3 space-y-1">
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
                      : "text-zinc-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className={`p-3 border-t ${theme === "light" ? "border-gray-100" : "border-white/10"} space-y-2`}>
              {/* Theme Selector */}
              <div className="flex gap-1.5">
                {THEME_OPTIONS.map((opt) => {
                  const Ic = opt.Icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        handleThemeChange(opt.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
                        theme === opt.id
                          ? "bg-indigo-600 text-white border-indigo-500 font-semibold"
                          : theme === "light"
                          ? "border-gray-200 text-gray-600 bg-gray-50"
                          : "border-white/10 text-zinc-300 bg-white/5"
                      }`}
                    >
                      <Ic className="w-3.5 h-3.5" />
                      <span>{opt.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Music Player Bar */}
              <div className={`flex items-center justify-between p-2 rounded-xl border ${pillBg}`}>
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-indigo-400" />
                  <div className="flex flex-col">
                    <span className={`text-xs font-semibold ${textColor}`}>{currentTrack.name}</span>
                    <span className={`text-[10px] ${mutedColor}`}>{currentTrack.artist}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={handlePrevTrack} className="p-1.5 rounded-lg hover:bg-white/10">
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handlePlayToggle}
                    className="p-1.5 rounded-lg bg-indigo-600 text-white"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={handleNextTrack} className="p-1.5 rounded-lg hover:bg-white/10">
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Command Console */}
              {onOpenTerminal && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono-code border transition-colors ${
                    theme === "light"
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                      : "bg-indigo-950/60 border-indigo-500/30 text-indigo-300"
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>Open Developer CLI Sandbox</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
