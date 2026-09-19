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
import { PanoramicWorldBackground } from "./components/world/PanoramicWorldBackground";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function AppContent() {
  useSmoothScroll();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen antialiased relative overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-900 theme-transition"
      style={{
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Panoramic Illustrated Environment Background ─────────────────────── */}
      <PanoramicWorldBackground />
      {theme === "dark" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1e22300f 1px, transparent 1px), linear-gradient(to bottom, #1e22300f 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 20%, #000 70%, transparent 100%)",
          }}
        />
      )}

      {theme === "light" && (
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e3db 1px, transparent 1px), linear-gradient(to bottom, #e5e3db 1px, transparent 1px)",
            backgroundSize: "6rem 6rem",
          }}
        />
      )}

      {/* ── Left Quick-Navigation Vertical Dock (Matching Reference) ─────────── */}
      <VerticalDock />

      {/* ── Top Floating Navigation Bar with Search & Music Player ───────────── */}
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
