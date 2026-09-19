import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const PIPELINE_NODES = [
  { num: "01", label: "Data", sub: "Collect & Clean" },
  { num: "02", label: "Transform", sub: "Analyze & Model" },
  { num: "03", label: "Intelligence", sub: "Generate Insights", active: true },
  { num: "04", label: "Engineering", sub: "Build & Deploy" },
  { num: "05", label: "Impact", sub: "Real World Value" },
];

export function TelemetryPipeline() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Formats current time in Asia/Kolkata (Mumbai) timezone
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setTimeStr(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  const borderClass = isDark ? "border-white/10" : "border-gray-200";
  const bgClass =
    theme === "light"
      ? "bg-white/90"
      : theme === "anime"
      ? "bg-[#101c30]/90"
      : "bg-[#090c16]/90";
  const textColor = isDark ? "text-zinc-100" : "text-gray-900";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-500";
  const activeColor =
    theme === "anime"
      ? "text-pink-400"
      : theme === "light"
      ? "text-blue-600"
      : "text-cyan-400";
  const activeDotBg =
    theme === "anime"
      ? "bg-pink-500 shadow-pink-500/50"
      : theme === "light"
      ? "bg-blue-600 shadow-blue-500/50"
      : "bg-cyan-400 shadow-cyan-400/80";

  return (
    <div
      className={`w-full border-t backdrop-blur-2xl transition-all duration-300 py-3.5 px-4 sm:px-8 ${borderClass} ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono-code text-xs">
        {/* Left: Quote & Mumbai Location/Time */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className={`italic font-serif-display text-sm ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
            "Turning Data into Opportunities"
          </span>
          <span className="opacity-30 hidden sm:inline">|</span>
          <div className={`flex items-center gap-1.5 text-[11px] ${mutedColor}`}>
            <span className="text-indigo-400">📍</span>
            <span>Mumbai, India</span>
            <span className="font-semibold">{timeStr || "05:47 PM"}</span>
          </div>
        </div>

        {/* Center: Connected Pipeline with Glowing Active Node */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1 max-w-full">
          {PIPELINE_NODES.map((node, i) => (
            <div key={node.num} className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {node.active ? (
                  <div
                    className={`w-3 h-3 rounded-full ${activeDotBg} shadow-lg animate-pulse flex items-center justify-center`}
                  >
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                ) : (
                  <span className={`text-[10px] font-bold ${mutedColor}`}>{node.num}</span>
                )}
                <div className="flex flex-col leading-none">
                  <span
                    className={`text-[11px] font-bold ${
                      node.active ? activeColor : textColor
                    }`}
                  >
                    {node.label}
                  </span>
                  <span className={`text-[9px] ${mutedColor}`}>{node.sub}</span>
                </div>
              </div>

              {i < PIPELINE_NODES.length - 1 && (
                <div
                  className={`w-4 sm:w-8 h-px ${
                    isDark ? "bg-white/15" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Right: Closing Stamp */}
        <div className={`text-[11px] shrink-0 ${mutedColor}`}>
          Built with curiosity ✦ and a lot of coffee ☕
        </div>
      </div>
    </div>
  );
}
