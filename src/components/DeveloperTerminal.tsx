import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CornerDownLeft,
  FileText,
  Terminal as TerminalIcon,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  awardsData,
  educationData,
  experienceTimeline,
  featuredProjects,
  profileData,
  skillCategories,
} from "../data/portfolioData";
import { soundManager } from "../utils/audio";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperTerminal({ isOpen, onClose }: DeveloperTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const getTimestamp = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: "init",
          command: "welcome",
          timestamp: getTimestamp(),
          output: (
            <div className="space-y-1 text-xs text-zinc-300">
              <p className="text-indigo-400 font-bold font-mono-code">
                ⚡ VP_TERMINAL v2.0 // DATA × AI × ENGINEERING
              </p>
              <p className="text-zinc-400">
                Welcome to Vishwadeep's interactive developer console. Type{" "}
                <span className="text-emerald-400 font-bold underline cursor-pointer" onClick={() => executeCommand("help")}>
                  help
                </span>{" "}
                or click the command chips below.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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
          <div className="space-y-1.5 text-xs font-mono-code">
            <p className="text-indigo-300 font-semibold">AVAILABLE SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-zinc-300">
              <div><span className="text-emerald-400 font-bold">whoami</span> — Engineer bio & summary</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — List all 4 core systems</div>
              <div><span className="text-emerald-400 font-bold">digipath</span> — Flagship college predictor</div>
              <div><span className="text-emerald-400 font-bold">retail</span> — Retail sales EDA & BI</div>
              <div><span className="text-emerald-400 font-bold">kosh</span> — Marathi NLP system</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — Verified technical abilities</div>
              <div><span className="text-emerald-400 font-bold">awards</span> — Competition honors</div>
              <div><span className="text-emerald-400 font-bold">experience</span> — Internships & education</div>
              <div><span className="text-emerald-400 font-bold">resume</span> — Open verified PDF</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Wipe terminal history</div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "bio":
        outputNode = (
          <div className="space-y-1 text-xs text-zinc-300 font-mono-code">
            <p className="text-white font-bold">{profileData.name} ({profileData.preferredName})</p>
            <p className="text-indigo-300">{profileData.role} — {profileData.positioning}</p>
            <p className="text-zinc-400">{profileData.summary}</p>
            <p className="text-emerald-400">Location: {profileData.location}</p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs font-mono-code">
            <p className="text-indigo-300 font-semibold">ENGINEERING PORTFOLIO SYSTEMS:</p>
            {featuredProjects.map((p) => (
              <div key={p.id} className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="flex justify-between items-center text-zinc-200 font-bold">
                  <span>{p.title}</span>
                  <span className="text-emerald-400 text-[10px]">{p.category}</span>
                </div>
                <p className="text-zinc-400 text-[11px] mt-0.5">{p.tagline}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "digipath": {
        const dp = featuredProjects.find((p) => p.id === "digipath")!;
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono-code text-zinc-300">
            <p className="text-emerald-400 font-bold">{dp.title}</p>
            <p className="text-zinc-300">{dp.description}</p>
            <p className="text-indigo-300">Stack: {dp.technologies.join(", ")}</p>
            {dp.github && (
              <a href={dp.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline flex items-center gap-1">
                <span>GitHub: {dp.github}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>
        );
        break;
      }

      case "retail": {
        const ret = featuredProjects.find((p) => p.id === "retail-sales")!;
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono-code text-zinc-300">
            <p className="text-indigo-400 font-bold">{ret.title}</p>
            <p className="text-zinc-300">{ret.description}</p>
            <p className="text-zinc-400">Tools: R, RStudio, Power BI</p>
          </div>
        );
        break;
      }

      case "kosh":
      case "sangrah": {
        const k = featuredProjects.find((p) => p.id === "kosh")!;
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono-code text-zinc-300">
            <p className="text-purple-400 font-bold">{k.title}</p>
            <p className="text-zinc-300">{k.description}</p>
            <p className="text-zinc-400">Internal code: formerly developed as SANGRAH</p>
          </div>
        );
        break;
      }

      case "skills":
        outputNode = (
          <div className="space-y-2 text-xs font-mono-code">
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <span className="text-indigo-300 font-bold">{cat.title}:</span>{" "}
                <span className="text-zinc-300">{cat.skills.join(" • ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "awards":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono-code">
            <p className="text-amber-400 font-bold">VERIFIED COMPETITION HONORS:</p>
            {awardsData.map((a, i) => (
              <div key={i} className="text-zinc-300">
                • <span className="text-white font-bold">{a.title}</span> — {a.category}
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        outputNode = (
          <div className="space-y-2 text-xs font-mono-code">
            <p className="text-indigo-300 font-bold">WORK EXPERIENCE & EDUCATION:</p>
            {experienceTimeline.map((e, i) => (
              <div key={i} className="text-zinc-300">
                • <span className="text-white font-bold">{e.role}</span> @ {e.organization} ({e.period})
              </div>
            ))}
            <div className="text-zinc-400 pt-1">
              Education: MGM College of Engg. & Tech, Panvel — B.E. Computer Engineering (2026)
            </div>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs font-mono-code text-zinc-300">
            <p className="text-indigo-400 font-bold">DIRECT CHANNELS:</p>
            <p>Email: <a href={`mailto:${profileData.links.email}`} className="text-emerald-400 underline">{profileData.links.email}</a></p>
            <p>GitHub: <a href={profileData.links.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{profileData.links.github}</a></p>
            <p>LinkedIn: <a href={profileData.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{profileData.links.linkedin}</a></p>
          </div>
        );
        break;

      case "resume":
        outputNode = (
          <div className="text-xs font-mono-code text-zinc-300">
            <p className="text-emerald-400">Opening official resume PDF...</p>
            <a href={profileData.links.resume} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline flex items-center gap-1 mt-1">
              <span>View Vishwadeep_Pratap_Resume.pdf</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        );
        window.open(profileData.links.resume, "_blank");
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        soundManager.playError();
        outputNode = (
          <div className="text-xs font-mono-code text-red-400">
            Command not recognized: "{cmd}". Type <span className="underline font-bold cursor-pointer" onClick={() => executeCommand("help")}>help</span> to view available system instructions.
          </div>
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

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundManager.playTerminalKey();
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl bg-[#0d0f17] border border-zinc-750 shadow-2xl shadow-indigo-500/10 text-zinc-100 overflow-hidden z-10 font-mono-code"
        >
          {/* Chrome Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-zinc-400 ml-2 font-bold">
                vp@engineer:~$ (Interactive Sandbox)
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <button
                onClick={() => setHistory([])}
                className="p-1 hover:text-white transition-colors"
                title="Clear terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:text-white transition-colors"
                title="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div className="p-4 overflow-y-auto space-y-3 max-h-[50vh] text-xs custom-scrollbar">
            {history.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                  <span>[{log.timestamp}]</span>
                  <span className="text-emerald-400">vp@system:~$</span>
                  <span className="text-zinc-200 font-bold">{log.command}</span>
                </div>
                <div className="pl-4 py-0.5">{log.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Chip Shortcuts */}
          <div className="px-4 py-2 bg-zinc-950/80 border-t border-zinc-850 flex flex-wrap gap-1.5 text-[11px]">
            {["help", "projects", "digipath", "retail", "kosh", "skills", "awards", "experience", "resume", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-0.5 rounded-md bg-zinc-900 hover:bg-indigo-950/60 border border-zinc-800 hover:border-indigo-500/40 text-zinc-400 hover:text-indigo-300 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <div className="px-4 py-3 bg-zinc-900/60 border-t border-zinc-800 flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-bold shrink-0">vp@system:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDownInput}
              placeholder="type 'help' or command..."
              className="w-full bg-transparent text-white focus:outline-none placeholder:text-zinc-600 text-xs"
            />
            <button
              onClick={() => {
                executeCommand(inputVal);
                setInputVal("");
              }}
              className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
