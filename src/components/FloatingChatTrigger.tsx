import { Sparkles } from "lucide-react";
import { soundManager } from "../utils/audio";

interface FloatingChatTriggerProps {
  onClick: () => void;
}

export function FloatingChatTrigger({ onClick }: FloatingChatTriggerProps) {
  return (
    <button
      onClick={() => {
        soundManager.playClick();
        onClick();
      }}
      onMouseEnter={() => soundManager.playHover()}
      className="fixed bottom-14 right-4 sm:right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gray-200/90 bg-white/95 text-gray-900 shadow-xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      title="Open Interactive Assistant Console (Ctrl + K)"
      aria-label="Open Interactive Assistant"
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs bg-blue-600 text-white shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div className="flex flex-col text-left font-mono-code leading-none">
        <span className="text-xs font-bold font-sans text-gray-900 group-hover:text-blue-600 transition-colors">
          Let's Chat
        </span>
        <span className="text-[9px] text-gray-500 mt-0.5">
          Ask anything
        </span>
      </div>
    </button>
  );
}
