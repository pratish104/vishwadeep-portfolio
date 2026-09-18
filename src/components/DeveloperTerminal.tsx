import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Copy,
  CornerDownLeft,
  Maximize2,
  Minimize2,
  Sparkles,
  Terminal as TerminalIcon,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { featuredProjects, profileData, skillCategories } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export function DeveloperTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const getTimestamp = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
  };

  // Initial welcome message on load
  useEffect(() => {
    setHistory([
      {
        id: "init",
        command: "welcome",
        timestamp: getTimestamp(),
        output: (
          <div className="space-y-1.5 text-zinc-300">
            <p className="text-cyan-400 font-bold">
              ⚡ QUANTUM_CLI v2.4.0 (x86_64-linux-gnu)
            </p>
            <p className="text-zinc-400">
              Welcome to Vishwadeep Pratap’s developer console. Type{" "}
              <span className="text-emerald-400 font-bold underline">help</span> to view available system commands or click the shortcut chips below.
            </p>
          </div>
        ),
      },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    soundManager.playSuccess();
    const time = getTimestamp();

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-semibold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400 font-bold">whoami</span> — Display engineer bio & credentials</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — List all 4 core production systems</div>
              <div><span className="text-emerald-400 font-bold">forensiq</span> — Inspect ForensiQ Cyber Forensic toolkit</div>
              <div><span className="text-emerald-400 font-bold">shadownet</span> — Inspect ShadowNet AI Network Defender</div>
              <div><span className="text-emerald-400 font-bold">sangrah</span> — Inspect SANGRAH NLP Paraphraser</div>
              <div><span className="text-emerald-400 font-bold">digipath</span> — Inspect DigiPath ML Predictor</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — View technical skills & proficiencies</div>
              <div><span className="text-emerald-400 font-bold">contact</span> — Output email and social networks</div>
              <div><span className="text-emerald-400 font-bold">resume</span> — Download official verified resume (PDF)</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Clear terminal output history</div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "bio":
        outputNode = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-white font-bold text-sm">
              {profileData.name} ({profileData.preferredName})
            </p>
            <p className="text-cyan-300 font-mono">{profileData.title}</p>
            <p className="text-zinc-400 leading-relaxed">{profileData.summary}</p>
            <div className="flex gap-4 pt-1 text-[11px] font-mono text-zinc-500">
              <span>STATUS: {profileData.status}</span>
              <span>LOCATION: {profileData.location}</span>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-semibold">CORE SYSTEMS DEPLOYED:</p>
            <div className="space-y-2">
              {featuredProjects.map((p) => (
                <div key={p.id} className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{p.title} <span className="text-zinc-500 font-normal">[{p.category}]</span></span>
                    <span className="text-[10px] text-emerald-400">● {p.badge}</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] mt-0.5">{p.tagline}</p>
                  <p className="text-cyan-400 text-[10px] font-mono mt-1">Type '{p.id}' for deep dive</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "forensiq":
      case "shadownet":
      case "sangrah":
      case "digipath": {
        const proj = featuredProjects.find((p) => p.id === trimmed);
        if (proj) {
          outputNode = (
            <div className="space-y-2 text-xs p-3 rounded-xl bg-zinc-900/70 border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-bold text-sm">{proj.title}</span>
                <span className="text-[10px] font-mono text-zinc-400">{proj.category}</span>
              </div>
              <p className="text-zinc-300 text-xs">{proj.description}</p>
              <div className="text-[11px] text-zinc-400 font-mono">
                <span className="text-emerald-400">ARCH: </span>{proj.architecture}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-zinc-950 text-[10px] text-zinc-300 border border-zinc-800">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 pt-1">GitHub: {proj.github}</p>
            </div>
          );
        }
        break;
      }

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-semibold">VERIFIED TECHNICAL MATRIX:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skillCategories.map((c) => (
                <div key={c.title} className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <p className="text-white font-bold text-[11px] mb-1">{c.title}</p>
                  <p className="text-zinc-400 text-[10px]">
                    {c.skills.map((s) => s.name).join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <p className="text-fuchsia-400 font-semibold">TRANSMISSION CHANNELS:</p>
            <p>📧 Email: <span className="text-white font-mono">{profileData.links.email}</span></p>
            <p>🔗 LinkedIn: <a href={profileData.links.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{profileData.links.linkedin}</a></p>
            <p>🐙 GitHub: <a href={profileData.links.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{profileData.links.github}</a></p>
          </div>
        );
        break;

      case "resume":
        window.open(profileData.links.resume, "_blank");
        outputNode = (
          <p className="text-xs text-emerald-400 font-mono">
            ✔ Initiated download for {profileData.links.resume}
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "sudo":
        outputNode = (
          <p className="text-xs text-amber-400 font-mono">
            [ACCESS_GRANTED] Permission level: ROOT_MASTERY. You are now wielding full administrative privileges.
          </p>
        );
        break;

      case "matrix":
        outputNode = (
          <p className="text-xs text-emerald-400 font-mono animate-pulse">
            01010110 01101001 01110011 01101000 01110111 01100001 01100100 01100101 01100101 01110000 // QUANTUM REALITY DECRYPTED
          </p>
        );
        break;

      default:
        soundManager.playError();
        outputNode = (
          <p className="text-xs text-red-400 font-mono">
            Command not recognized: '{trimmed}'. Type <span className="underline font-bold">help</span> to view available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output: outputNode,
        timestamp: time,
      },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    executeCommand(inputVal);
    setInputVal("");
  };

  const quickCommands = ["help", "projects", "skills", "forensiq", "contact", "clear"];

  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="space-y-2 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <TerminalIcon className="w-3 h-3 text-emerald-400" />
          <span>// INTERACTIVE DEVELOPER SANDBOX</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Developer Terminal CLI
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Interact directly with the system. Type commands or click the shortcut chips below to query project architecture and specs.
        </p>
      </div>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`rounded-3xl bg-zinc-950/95 border border-zinc-800 shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? "fixed inset-4 z-50 max-w-none max-h-none" : "relative w-full"
        }`}
        style={{
          boxShadow: "0 20px 60px -15px rgba(0, 229, 255, 0.15)",
        }}
      >
        {/* Terminal Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:opacity-100" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:opacity-100" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-100" />
            <span className="text-xs font-mono text-zinc-400 ml-2 hidden sm:inline">
              pratish@quantum-core:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setHistory([]);
              }}
              className="p-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="p-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
              title={isExpanded ? "Collapse" : "Maximize"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs custom-scrollbar min-h-[260px] max-h-[420px] bg-zinc-950/90 cursor-text"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">pratish@quantum:~$</span>
                <span className="text-white font-bold">{item.command}</span>
                <span className="text-[10px] text-zinc-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-zinc-800/80 text-zinc-300">
                {item.output}
              </div>
            </div>
          ))}

          {/* Prompt Line */}
          <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold shrink-0">pratish@quantum:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                soundManager.playTerminalKey();
                setInputVal(e.target.value);
              }}
              placeholder="type 'help' or any command..."
              className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-zinc-600 caret-cyan-400"
              autoFocus
            />
            <button type="submit" className="text-zinc-500 hover:text-cyan-400 transition-colors">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>

          <div ref={terminalEndRef} />
        </div>

        {/* Bottom Quick Command Chips */}
        <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">
            QUICK_RUN:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                executeCommand(cmd);
              }}
              className="px-2.5 py-1 rounded-md bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-500/40 text-cyan-300 hover:text-cyan-200 text-[11px] font-mono transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
