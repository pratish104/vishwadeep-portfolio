import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
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
import { soundManager, type Track } from "../utils/audio";

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
  { id: "light", label: "Light (Default)", Icon: Sun },
  { id: "dark", label: "Dark (Space)", Icon: Moon },
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
  const [musicDropdown, setMusicDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(soundManager.getIsPlaying());
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [volume, setVolume] = useState(soundManager.getVolume());
  const [currentTrack, setCurrentTrack] = useState<Track>(soundManager.getCurrentTrack());
  const [activeSection, setActiveSection] = useState("about");

  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const musicDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 180;
      for (const item of [...NAV_LINKS].reverse()) {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = soundManager.subscribeTrackChange((t, playing) => {
      setCurrentTrack(t);
      setIsPlaying(playing);
    });
    return () => {
      unsub();
    };
  }, []);

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

  // Close dropdowns on outside click
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

  const handlePlayToggle = async () => {
    soundManager.playClick();
    const playing = await soundManager.toggle();
    setIsPlaying(playing);
    setCurrentTrack(soundManager.getCurrentTrack());
  };

  const handleNextTrack = async () => {
    soundManager.playClick();
    await soundManager.nextTrack();
    setCurrentTrack(soundManager.getCurrentTrack());
    setIsPlaying(soundManager.getIsPlaying());
  };

  const handlePrevTrack = async () => {
    soundManager.playClick();
    await soundManager.prevTrack();
    setCurrentTrack(soundManager.getCurrentTrack());
    setIsPlaying(soundManager.getIsPlaying());
  };

  const handleSelectTrack = async (idx: number) => {
    soundManager.playClick();
    await soundManager.selectTrack(idx);
    setCurrentTrack(soundManager.getCurrentTrack());
    setIsPlaying(soundManager.getIsPlaying());
    setMusicDropdown(false);
  };

  const handleToggleMute = () => {
    soundManager.playClick();
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    setVolume(soundManager.getVolume());
  };

  const handleVolumeChange = (value: number) => {
    soundManager.setVolume(value);
    setVolume(value);
    setIsMuted(value === 0);
  };

  const handleThemeChange = (newTheme: Theme) => {
    soundManager.playClick();
    setTheme(newTheme);
    setThemeDropdown(false);
  };

  const currentThemeOption = THEME_OPTIONS.find((o) => o.id === theme) ?? THEME_OPTIONS[0];
  const ThemeIcon = currentThemeOption.Icon;

  // Theme-specific UI token classes matching reference screenshots
  const navPillBg =
    theme === "dark"
      ? "bg-[#0b1224]/90 border-white/10 text-white shadow-xl shadow-black/40"
      : theme === "anime"
      ? "bg-[#fff2f6]/92 border-pink-200/80 text-[#2d1822] shadow-sm"
      : "bg-white/92 border-gray-200/90 text-gray-900 shadow-sm";

  const activeTabClass =
    theme === "dark"
      ? "bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30"
      : theme === "anime"
      ? "bg-pink-100 text-pink-600 font-bold border border-pink-200"
      : "bg-blue-50 text-blue-700 font-bold border border-blue-200/60";

  const hoverTabClass =
    theme === "dark"
      ? "text-zinc-300 hover:text-white hover:bg-white/5"
      : theme === "anime"
      ? "text-gray-700 hover:text-pink-600 hover:bg-pink-50/60"
      : "text-gray-600 hover:text-gray-950 hover:bg-gray-100/60";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 py-3 ${
        scrolled ? "py-2" : "py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
        {/* ── Left: Brand Avatar & Name ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-xl border ${navPillBg}`}
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              smoothScrollTo("#about");
            }}
            className="flex items-center gap-2.5 group"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-code font-bold text-[11px] shadow-sm ${
                theme === "dark"
                  ? "bg-gradient-to-tr from-cyan-600 to-blue-600 text-white"
                  : theme === "anime"
                  ? "bg-gradient-to-tr from-pink-500 to-rose-400 text-white"
                  : "bg-gray-900 text-white"
              }`}
            >
              VP
            </div>
            <span className="font-serif-display font-bold text-sm tracking-tight hidden sm:inline-block">
              {profileData.name}
            </span>
          </a>
        </motion.div>

        {/* ── Center: Floating Navigation Tabs (Matching Reference) ─────────── */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-xl border ${navPillBg}`}
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  soundManager.playClick();
                  smoothScrollTo(link.href);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative px-3.5 py-1 rounded-full text-xs transition-all duration-200 ${
                  isActive ? activeTabClass : hoverTabClass
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </motion.nav>

        {/* ── Right Controls: Search, Music Player & Theme Switcher ─────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-2"
        >
          {/* Search Trigger (Ctrl+K) */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminal?.();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border text-xs shadow-sm transition-all hover:scale-105 ${navPillBg}`}
            title="Search & Commands (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 opacity-60" />
            <span className="opacity-75 hidden md:inline">Explore my universe...</span>
            <kbd
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono-code border ${
                theme === "dark"
                  ? "bg-white/10 border-white/10 text-zinc-300"
                  : "bg-gray-100 border-gray-200 text-gray-600"
              }`}
            >
              Ctrl K
            </kbd>
          </button>

          {/* LoFi Audio Player Pill (Matching Reference) */}
          <div ref={musicDropdownRef} className="relative">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border shadow-sm ${navPillBg}`}>
              <button
                onClick={handlePlayToggle}
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-2 text-left group"
                title={isPlaying ? "Pause Music" : "Play LoFi Focus"}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm ${
                    theme === "dark"
                      ? "bg-cyan-500"
                      : theme === "anime"
                      ? "bg-pink-500"
                      : "bg-blue-600"
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-2.5 h-2.5" />
                  ) : (
                    <Play className="w-2.5 h-2.5 ml-0.5" />
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="text-[11px] font-bold leading-none">
                    {currentTrack.name}
                  </div>
                  <div className="text-[9px] font-mono-code opacity-60 leading-none mt-0.5">
                    {currentTrack.artist}
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-0.5 pl-1 border-l border-black/10 dark:border-white/10">
                <button
                  onClick={handlePrevTrack}
                  className="p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
                  title="Previous Track"
                >
                  <SkipBack className="w-3 h-3" />
                </button>
                <button
                  onClick={handleNextTrack}
                  className="p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
                  title="Next Track"
                >
                  <SkipForward className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setMusicDropdown(!musicDropdown)}
                  className="p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
                  title="Track List"
                >
                  <Music className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Music Tracks Menu */}
            <AnimatePresence>
              {musicDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-2 w-64 p-2 rounded-2xl backdrop-blur-2xl border shadow-xl z-50 ${
                    theme === "dark"
                      ? "bg-[#0b1224]/98 border-white/10 text-white"
                      : "bg-white/98 border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="px-2.5 py-1.5 text-xs font-mono-code opacity-60 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                    <span>FOCUS PLAYLIST</span>
                    <button onClick={handleToggleMute} className="opacity-70 hover:opacity-100">
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <label className="flex items-center gap-2 px-2.5 py-2 border-b border-black/5 dark:border-white/10 text-[10px] font-mono-code opacity-80">
                    <Volume2 className="w-3.5 h-3.5 shrink-0" />
                    <input
                      aria-label="Music volume"
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(event) => handleVolumeChange(Number(event.target.value))}
                      className="w-full accent-current"
                    />
                    <span className="w-7 text-right">{Math.round(volume * 100)}%</span>
                  </label>
                  <div className="py-1 space-y-0.5 max-h-60 overflow-y-auto">
                    {soundManager.getPlaylist().map((t, idx) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelectTrack(idx)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors ${
                          currentTrack.id === t.id
                            ? theme === "dark"
                              ? "bg-cyan-500/20 text-cyan-400 font-bold"
                              : theme === "anime"
                              ? "bg-pink-100 text-pink-700 font-bold"
                              : "bg-blue-50 text-blue-700 font-bold"
                            : "opacity-80 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <div>
                          <div className="font-medium leading-tight">{t.name}</div>
                          <div className="text-[10px] opacity-60 leading-none">{t.artist}</div>
                        </div>
                        {currentTrack.id === t.id && isPlaying && (
                          <span
                            className={`w-2 h-2 rounded-full animate-pulse ${
                              theme === "dark" ? "bg-cyan-400" : theme === "anime" ? "bg-pink-500" : "bg-blue-500"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Theme Selector Dropdown (Light / Dark / Anime matching Reference) ─ */}
          <div ref={themeDropdownRef} className="relative">
            <button
              onClick={() => {
                soundManager.playClick();
                setThemeDropdown(!themeDropdown);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-xl border text-xs shadow-sm transition-all hover:scale-105 ${navPillBg}`}
              title="Switch Theme (Light, Dark, Anime)"
            >
              <ThemeIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono-code font-medium">{currentThemeOption.label}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            <AnimatePresence>
              {themeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-2 w-48 p-1.5 rounded-2xl backdrop-blur-2xl border shadow-xl z-50 ${
                    theme === "dark"
                      ? "bg-[#0b1224]/98 border-white/10 text-white"
                      : "bg-white/98 border-gray-200 text-gray-900"
                  }`}
                >
                  <div className="px-2.5 py-1 text-[10px] font-mono-code opacity-50 uppercase tracking-wider">
                    Select Theme
                  </div>
                  {THEME_OPTIONS.map((opt) => {
                    const OptIcon = opt.Icon;
                    const isCurrent = theme === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleThemeChange(opt.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono-code transition-colors ${
                          isCurrent
                            ? theme === "dark"
                              ? "bg-cyan-500/20 text-cyan-400 font-bold"
                              : theme === "anime"
                              ? "bg-pink-100 text-pink-700 font-bold"
                              : "bg-blue-50 text-blue-700 font-bold"
                            : "opacity-75 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <OptIcon className="w-3.5 h-3.5" />
                          <span>{opt.label}</span>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Terminal Launcher Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminal?.();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-2 rounded-full backdrop-blur-xl border shadow-sm transition-all hover:scale-105 ${navPillBg}`}
            title="Open Developer Terminal (Ctrl+K)"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`lg:hidden p-2 rounded-full backdrop-blur-xl border shadow-sm ${navPillBg}`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* ── Mobile Navigation Drawer ────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden mt-2 p-4 rounded-3xl backdrop-blur-2xl border shadow-xl overflow-hidden ${
              theme === "dark"
                ? "bg-[#0b1224]/98 border-white/10 text-white"
                : "bg-white/98 border-gray-200 text-gray-900"
            }`}
          >
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playClick();
                    setMobileMenuOpen(false);
                    smoothScrollTo(link.href);
                  }}
                  className="block px-4 py-2.5 rounded-2xl text-sm font-medium hover:bg-blue-50 dark:hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-2">
                <a
                  href={profileData.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs font-semibold shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume (PDF)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
