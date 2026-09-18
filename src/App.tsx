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

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-200 antialiased relative overflow-x-hidden">
      {/* 60fps Interactive Particle Constellation Canvas */}
      <CyberCanvasBackground />

      {/* Subtle Background Cyber Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#27272a0a_1px,transparent_1px),linear-gradient(to_bottom,#27272a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Floating Modern Navbar with Audio FX Equalizer */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative z-10">
        <Hero />
        <ProjectsBento />
        <SkillsBento />
        <DeveloperTerminal />
        <Experience />
        <Contact />
      </main>

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
}
