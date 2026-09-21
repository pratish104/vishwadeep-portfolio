import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { profileData } from "../data/portfolioData";

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`border-t py-10 px-4 sm:px-6 max-w-6xl mx-auto ${
        isDark ? "border-[var(--border-subtle)]" : "border-gray-200"
      }`}
    >
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
        isDark ? "text-zinc-500" : "text-gray-400"
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>
            © {new Date().getFullYear()} {profileData.name} ({profileData.preferredName})
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profileData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 transition-colors hover:${isDark ? "text-zinc-300" : "text-gray-700"}`}
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <a
            href={profileData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 transition-colors hover:text-blue-500`}
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <a
            href={`mailto:${profileData.links.email}`}
            className={`flex items-center gap-1.5 transition-colors hover:${isDark ? "text-zinc-300" : "text-gray-700"}`}
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
          <button
            onClick={scrollToTop}
            className={`p-1.5 rounded-lg border transition-all ml-2 ${
              isDark
                ? "bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] border-[var(--border-subtle)] text-zinc-400 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-400 hover:text-gray-800"
            }`}
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className={`mt-4 text-center text-[10px] font-mono-code ${isDark ? "text-zinc-700" : "text-gray-300"}`}>
        Built with curiosity · DATA × AI × ENGINEERING · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
