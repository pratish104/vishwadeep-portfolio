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
import { ThemeAtmosphere } from "./components/ThemeAtmosphere";
import { VerticalDock } from "./components/VerticalDock";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

function AppContent() {
  useSmoothScroll();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div
      className="min-h-screen antialiased relative overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-900 transition-colors duration-400"
      style={{
        backgroundColor: "transparent",
        color: "var(--text-primary)",
      }}
    >
      {/* ── Dynamic Atmospheric Canvas Background (Zero Screenshot Artifacts) ─ */}
      <ThemeAtmosphere />


      {/* ── Left Quick-Navigation Vertical Dock ───────────────────────────────── */}
      <VerticalDock />

      {/* ── Top Floating Navigation Bar with Theme Switcher & LoFi Music ─────── */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* ── Main Content Flow (Single DOM Hierarchy — No Ghosting) ───────────── */}
      <main className="relative z-10 pl-0 md:pl-16 lg:pl-20 transition-all duration-300">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ProjectsBento />
        <Experience />
        <Achievements />
        <SkillsBento />
        <Contact />
      </main>

      {/* ── Bottom Telemetry Pipeline Bar ────────────────────────────────────── */}
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
  return <AppContent />;
}
