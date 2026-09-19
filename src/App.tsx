import { useState } from "react";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { DeveloperTerminal } from "./components/DeveloperTerminal";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ProjectsBento } from "./components/ProjectsBento";
import { SkillsBento } from "./components/SkillsBento";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function AppContent() {
  useSmoothScroll();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen antialiased relative overflow-x-hidden selection:bg-[var(--accent-primary)]/25 selection:text-[var(--text-primary)] theme-transition"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* Dark theme subtle grid */}
      {theme === "dark" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1e22300d 1px, transparent 1px), linear-gradient(to bottom, #1e22300d 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 70%, transparent 100%)",
          }}
        />
      )}

      {/* Light theme architectural lines */}
      {theme === "light" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e3db 1px, transparent 1px), linear-gradient(to bottom, #e5e3db 1px, transparent 1px)",
            backgroundSize: "6rem 6rem",
          }}
        />
      )}

      {/* Navbar */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main page content */}
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ProjectsBento />
        <Experience />
        <Achievements />
        <SkillsBento />
        <Contact />
      </main>

      <Footer />

      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
