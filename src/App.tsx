import { useState } from "react";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { CyberCanvasBackground } from "./components/CyberCanvasBackground";
import { DeveloperTerminal } from "./components/DeveloperTerminal";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ProjectsBento } from "./components/ProjectsBento";
import { SkillsBento } from "./components/SkillsBento";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  // Initialize Lenis Kinetic Smooth Scroll
  useSmoothScroll();

  // Developer Terminal Easter Egg State
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 selection:bg-indigo-500/25 selection:text-indigo-200 antialiased relative overflow-x-hidden">
      {/* Calm Ambient Node Canvas */}
      <CyberCanvasBackground />

      {/* Subtle Engineering Grid Backdrop */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e22300d_1px,transparent_1px),linear-gradient(to_bottom,#1e22300d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Floating Modern Pill Navbar */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ProjectsBento />
        <Experience />
        <Achievements />
        <SkillsBento />
        <Contact />
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer />

      {/* Developer Terminal Easter Egg Sandbox */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
