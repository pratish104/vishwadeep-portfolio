import { Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { soundManager } from "../utils/audio";

interface FloatingChatTriggerProps {
  onClick: () => void;
}

export function FloatingChatTrigger({ onClick }: FloatingChatTriggerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";

  const triggerBg =
    isDark
      ? "bg-[#0b1224]/95 border-white/10 text-white shadow-2xl shadow-cyan-950/40"
      : isAnime
      ? "bg-[#fff2f6]/95 border-pink-200 text-[#2d1822] shadow-xl"
      : "bg-white/95 border-gray-200/90 text-gray-900 shadow-xl";

  const iconBg =
    isDark
      ? "bg-gradient-to-tr from-cyan-600 to-blue-600 text-white"
      : isAnime
      ? "bg-gradient-to-tr from-pink-500 to-rose-400 text-white"
      : "bg-blue-600 text-white";

  return (
    <button
      onClick={() => {
        soundManager.playClick();
        onClick();
      }}
      onMouseEnter={() => soundManager.playHover()}
      className={`fixed bottom-14 right-4 sm:right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 group ${triggerBg}`}
      title="Open Interactive Assistant Console (Ctrl + K)"
      aria-label="Open Interactive Assistant"
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-sm ${iconBg}`}>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div className="flex flex-col text-left font-mono-code leading-none">
        <span className="text-xs font-bold font-sans">
          Let's Chat
        </span>
        <span className="text-[9px] opacity-60 mt-0.5">
          Ask anything
        </span>
      </div>
    </button>
  );
}
