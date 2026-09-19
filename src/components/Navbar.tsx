import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Menu,
  Music,
  Pause,
  Play,
  Search,
  SkipBack,
  SkipForward,
  Terminal,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = id === "" ? document.body : document.getElementById(id);
  if (!el) return;
  const navH = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [musicDropdown, setMusicDropdown] = useState(false);
  const [isPlaying, setIsPlaying] = useState(soundManager.getIsPlaying());
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [currentTrack, setCurrentTrack] = useState<Track>(soundManager.getCurrentTrack());
  const [activeSection, setActiveSection] = useState("about");
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
    soundManager.setTrackChangeCallback((t) => {
      setCurrentTrack(t);
      setIsPlaying(soundManager.getIsPlaying());
    });
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

  // Close dropdowns on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
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

  const handleToggleMute = () => {
    soundManager.playClick();
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 py-3 ${
        scrolled ? "py-2" : "py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* ── Left: Brand Avatar & Name ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-sm"
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
            <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-mono-code font-bold text-[11px] shadow-sm">
              VP
            </div>
            <span className="font-serif-display font-bold text-gray-900 text-sm tracking-tight hidden sm:inline-block">
              {profileData.name}
            </span>
          </a>
        </motion.div>

        {/* ── Center: Floating Navigation Tabs (Matching Reference) ─────────── */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-sm"
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
                className={`relative px-3.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-blue-700 font-semibold bg-blue-50/80 shadow-sm"
                    : "text-gray-600 hover:text-gray-950 hover:bg-gray-100/60"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </motion.nav>

        {/* ── Right Controls: Search, Music Player & Tools ──────────────────── */}
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
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 text-xs text-gray-500 hover:text-gray-900 shadow-sm transition-all hover:scale-105"
            title="Search & Commands (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500 hidden md:inline">Explore my universe...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-mono-code text-gray-500 border border-gray-200">
              Ctrl K
            </kbd>
          </button>

          {/* LoFi Audio Player Pill (Matching Reference) */}
          <div ref={musicDropdownRef} className="relative">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-sm">
              <button
                onClick={handlePlayToggle}
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center gap-2 text-left group"
                title={isPlaying ? "Pause Music" : "Play LoFi Focus"}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-sm">
                  {isPlaying ? (
                    <Pause className="w-2.5 h-2.5" />
                  ) : (
                    <Play className="w-2.5 h-2.5 ml-0.5" />
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="text-[11px] font-bold text-gray-900 leading-none">
                    {currentTrack.name}
                  </div>
                  <div className="text-[9px] font-mono-code text-gray-500 leading-none mt-0.5">
                    {currentTrack.artist}
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-0.5 pl-1 border-l border-gray-200">
                <button
                  onClick={handlePrevTrack}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
                  title="Previous Track"
                >
                  <SkipBack className="w-3 h-3" />
                </button>
                <button
                  onClick={handleNextTrack}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
                  title="Next Track"
                >
                  <SkipForward className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setMusicDropdown(!musicDropdown)}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
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
                  className="absolute right-0 mt-2 w-64 p-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-xl z-50"
                >
                  <div className="px-2.5 py-1.5 text-xs font-mono-code text-gray-500 border-b border-gray-100 flex items-center justify-between">
                    <span>FOCUS PLAYLIST</span>
                    <button
                      onClick={handleToggleMute}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {TRACKS.map((t, idx) => (
                      <button
                        key={t.name}
                        onClick={() => handleSelectTrack(idx)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors ${
                          currentTrack.name === t.name
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div>
                          <div className="font-medium leading-tight">{t.name}</div>
                          <div className="text-[10px] text-gray-500 leading-none">{t.artist}</div>
                        </div>
                        {currentTrack.name === t.name && isPlaying && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Terminal / Command Launcher */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminal?.();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="p-2 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 text-gray-700 hover:text-gray-900 shadow-sm transition-all hover:scale-105"
            title="Open Developer Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200/80 text-gray-700 shadow-sm"
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
            className="lg:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-gray-200 shadow-xl overflow-hidden"
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
                  className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                <a
                  href={profileData.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-900 text-white text-xs font-semibold shadow-sm"
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
