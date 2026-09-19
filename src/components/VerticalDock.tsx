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
      className="fixed left-3 lg:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5 p-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-gray-200/90 shadow-xl"
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
            className={`group relative p-2.5 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
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
            <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl text-[11px] font-mono-code font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150 shadow-lg border border-gray-200 bg-white text-gray-900 z-50">
              {item.label}
            </span>
          </a>
        );
      })}
    </motion.aside>
  );
}
