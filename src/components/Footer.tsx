import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profileData } from "../data/portfolioData";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-850/80 py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
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
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={profileData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profileData.links.email}`}
            className="hover:text-zinc-300 transition-colors"
          >
            Email
          </a>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all ml-2"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
