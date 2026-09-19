import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Code2,
  FolderGit2,
  Home,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { soundManager } from "../utils/audio";

interface DockItem {
  id: string;
  label: string;
  href: string;
  Icon: React.ElementType;
}

const DOCK_ITEMS: DockItem[] = [
  { id: "about", label: "Home", href: "#about", Icon: Home },
  { id: "projects", label: "Projects", href: "#projects", Icon: FolderGit2 },
  { id: "experience", label: "Experience", href: "#experience", Icon: Briefcase },
  { id: "awards", label: "Awards", href: "#awards", Icon: Award },
  { id: "skills", label: "Skills", href: "#skills", Icon: Code2 },
  { id: "contact", label: "Contact", href: "#contact", Icon: Mail },
];

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = id === "" ? document.body : document.getElementById(id);
  if (!el) return;
  const navH = 80;
  const y = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export function VerticalDock() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of [...DOCK_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed left-3 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5 p-2 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300"
      style={{
        background:
          theme === "light"
            ? "rgba(255, 255, 255, 0.75)"
            : theme === "anime"
            ? "rgba(19, 32, 54, 0.75)"
            : "rgba(13, 16, 26, 0.75)",
        borderColor:
          theme === "light"
            ? "rgba(229, 231, 235, 0.8)"
            : theme === "anime"
            ? "rgba(30, 48, 80, 0.8)"
            : "rgba(30, 34, 48, 0.8)",
        boxShadow:
          theme === "light"
            ? "0 10px 30px -10px rgba(0,0,0,0.1)"
            : "0 20px 40px -15px rgba(0,0,0,0.6)",
      }}
      aria-label="Quick navigation dock"
    >
      {DOCK_ITEMS.map((item) => {
        const Icon = item.Icon;
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              soundManager.playClick();
              smoothScrollTo(item.href);
            }}
            onMouseEnter={() => soundManager.playHover()}
            className={`group relative p-2.5 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
              isActive
                ? theme === "light"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : theme === "anime"
                  ? "bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-500/30"
                  : "bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/40"
                : isDark
                ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80"
            }`}
            title={item.label}
            aria-label={item.label}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] font-mono-code font-medium tracking-tight">
              {item.label}
            </span>

            {/* Hover tooltip */}
            <span
              className={`absolute left-full ml-3 px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 shadow-xl border ${
                isDark
                  ? "bg-zinc-900/95 text-zinc-100 border-zinc-700"
                  : "bg-white/95 text-gray-900 border-gray-200"
              }`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </motion.aside>
  );
}
