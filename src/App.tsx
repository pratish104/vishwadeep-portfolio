import { useState } from "react";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { DeveloperTerminal } from "./components/DeveloperTerminal";
import { Experience } from "./components/Experience";
import { FloatingChatTrigger } from "./components/FloatingChatTrigger";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ProjectsBento } from "./components/ProjectsBento";
import { SkillsBento } from "./components/SkillsBento";
import { TelemetryPipeline } from "./components/TelemetryPipeline";
import { VerticalDock } from "./components/VerticalDock";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function AppContent() {
  useSmoothScroll();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen antialiased relative overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-900 transition-colors duration-400"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Background Grid Pattern ────────────────────────────────────────── */}
      {theme === "light" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e3db 1px, transparent 1px), linear-gradient(to bottom, #e5e3db 1px, transparent 1px)",
            backgroundSize: "6rem 6rem",
          }}
        />
      )}

      {theme === "dark" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1e2a4a 1px, transparent 1px), linear-gradient(to bottom, #1e2a4a 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        />
      )}

      {theme === "anime" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f3d2e0 1px, transparent 1px), linear-gradient(to bottom, #f3d2e0 1px, transparent 1px)",
            backgroundSize: "5rem 5rem",
          }}
        />
      )}

      {/* ── Left Quick-Navigation Vertical Dock (Matching Reference) ─────────── */}
      <VerticalDock />

      {/* ── Top Floating Navigation Bar with Theme Switcher & LoFi Music ─────── */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* ── Main Content Flow ─────────────────────────────────────────────────── */}
      <main className="relative z-10 pl-0 md:pl-16 lg:pl-20 transition-all duration-300">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ProjectsBento />
        <Experience />
        <Achievements />
        <SkillsBento />
        <Contact />
      </main>

      {/* ── Bottom Telemetry Pipeline Bar (Matching Reference) ───────────────── */}
      <TelemetryPipeline />

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Floating Chat Action Trigger (Bottom Right) ───────────────────────── */}
      <FloatingChatTrigger onClick={() => setIsTerminalOpen(true)} />

      {/* ── Developer Terminal / Command Palette (Ctrl+K) ────────────────────── */}
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
