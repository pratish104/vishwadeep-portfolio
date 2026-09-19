import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const PIPELINE_NODES = [
  { num: "01", label: "Data", sub: "Collect & Clean", icon: "📊" },
  { num: "02", label: "Transform", sub: "Analyze & Model", icon: "📈" },
  { num: "03", label: "Intelligence", sub: "Generate Insights", icon: "💡", active: true },
  { num: "04", label: "Engineering", sub: "Build & Deploy", icon: "⚙️" },
  { num: "05", label: "Impact", sub: "Real World Value", icon: "🌱" },
];

export function TelemetryPipeline() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isAnime = theme === "anime";
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
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

  const barBg =
    isDark
      ? "bg-[#070b16]/95 border-white/10 text-white"
      : isAnime
      ? "bg-[#fff2f6]/95 border-pink-200/80 text-[#2d1822]"
      : "bg-white/95 border-gray-200/80 text-gray-800";

  const activeColor =
    isDark
      ? "text-cyan-400 font-extrabold"
      : isAnime
      ? "text-pink-600 font-extrabold"
      : "text-blue-600 font-extrabold";

  return (
    <div className={`w-full border-t backdrop-blur-2xl py-3 px-4 sm:px-8 shadow-xs ${barBg}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono-code text-xs">
        {/* Left: Quote & Mumbai Location/Time */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className="italic font-serif-display text-sm">
            "Turning Data into Opportunities"
          </span>
          <span className="opacity-20 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-[11px] opacity-70">
            <span className={isDark ? "text-cyan-400" : isAnime ? "text-pink-500" : "text-blue-600"}>
              📍
            </span>
            <span>Mumbai, India</span>
            <span className="font-semibold">{timeStr || "10:24 AM"}</span>
          </div>
        </div>

        {/* Center: Connected Pipeline with Icons */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1 max-w-full">
          {PIPELINE_NODES.map((node, i) => (
            <div key={node.num} className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm">{node.icon}</span>
                <div className="flex flex-col leading-none">
                  <span
                    className={`text-[11px] font-bold ${
                      node.active ? activeColor : ""
                    }`}
                  >
                    <span className="text-[9px] font-mono-code opacity-40 mr-1">{node.num}</span>
                    {node.label}
                  </span>
                  <span className="text-[9px] opacity-60">{node.sub}</span>
                </div>
              </div>

              {i < PIPELINE_NODES.length - 1 && (
                <div className="w-4 sm:w-6 h-px bg-black/10 dark:bg-white/15" />
              )}
            </div>
          ))}
        </div>

        {/* Right: Closing Stamp */}
        <div className="text-[11px] shrink-0 opacity-70 font-serif-display italic">
          "A curious mind builds a better tomorrow."
        </div>
      </div>
    </div>
  );
}
