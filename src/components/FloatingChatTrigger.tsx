import { MessageSquare, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { soundManager } from "../utils/audio";

interface FloatingChatTriggerProps {
  onClick: () => void;
}

export function FloatingChatTrigger({ onClick }: FloatingChatTriggerProps) {
  const { theme } = useTheme();
  const isDark = theme !== "light";

  return (
    <button
      onClick={() => {
        soundManager.playClick();
        onClick();
      }}
      onMouseEnter={() => soundManager.playHover()}
      className={`fixed bottom-14 right-4 sm:right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 group ${
        theme === "light"
          ? "bg-white/95 border-gray-200 text-gray-900 shadow-gray-400/20"
          : theme === "anime"
          ? "bg-[#182840]/90 border-pink-500/30 text-zinc-100 shadow-pink-500/20"
          : "bg-[#0f1322]/90 border-indigo-500/40 text-zinc-100 shadow-indigo-500/20"
      }`}
      title="Open Interactive Assistant Console (Ctrl + K)"
      aria-label="Open Interactive Assistant"
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
          theme === "light"
            ? "bg-blue-600 text-white"
            : theme === "anime"
            ? "bg-gradient-to-tr from-pink-500 to-rose-400 text-white"
            : "bg-gradient-to-tr from-indigo-600 to-blue-500 text-white"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div className="flex flex-col text-left font-mono-code leading-none">
        <span className="text-xs font-bold font-sans flex items-center gap-1">
          Let's Chat
        </span>
        <span className="text-[9px] opacity-70">
          Ask anything
        </span>
      </div>
    </button>
  );
}
