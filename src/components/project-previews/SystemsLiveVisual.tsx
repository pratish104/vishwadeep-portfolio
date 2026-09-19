import { ShieldAlert, Radar } from "lucide-react";

export function ForensiqLiveVisual({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className={`rounded-2xl border p-2.5 h-36 sm:h-40 flex flex-col justify-between ${
      isDark ? "bg-[#080b14]/90 border-white/10" : "bg-white border-sky-100 shadow-sm"
    }`}>
      <div className="flex items-center justify-between text-[10px] font-mono-code">
        <span className={isDark ? "text-sky-300" : "text-sky-700"}>RAM TRIAGE // volatility</span>
        <ShieldAlert className={`w-3.5 h-3.5 ${isDark ? "text-sky-400" : "text-sky-600"}`} />
      </div>
      <div className="space-y-1.5">
        {[
          { pid: "1840", name: "lsass.exe", flag: "HANDLE" },
          { pid: "412", name: "svchost.exe", flag: "OK" },
          { pid: "9901", name: "unknown.dll", flag: "INJECT" },
        ].map((row) => (
          <div
            key={row.pid}
            className={`flex items-center justify-between px-2 py-1 rounded-lg text-[10px] font-mono-code ${
              isDark ? "bg-white/5 text-zinc-300" : "bg-sky-50 text-slate-700"
            }`}
          >
            <span>{row.pid} {row.name}</span>
            <span className={row.flag === "OK" ? "text-emerald-500" : "text-amber-500"}>{row.flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShadowNetLiveVisual({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className={`rounded-2xl border p-2.5 h-36 sm:h-40 flex flex-col justify-between ${
      isDark ? "bg-[#080b14]/90 border-white/10" : "bg-white border-cyan-100 shadow-sm"
    }`}>
      <div className="flex items-center justify-between text-[10px] font-mono-code">
        <span className={isDark ? "text-cyan-300" : "text-cyan-700"}>PACKET STREAM // live</span>
        <Radar className={`w-3.5 h-3.5 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
      </div>
      <svg viewBox="0 0 180 48" className="w-full h-12">
        <path
          d="M2 30 L18 22 L34 28 L50 12 L66 18 L82 8 L98 20 L114 6 L130 16 L146 10 L162 18 L178 14"
          fill="none"
          stroke={isDark ? "#22d3ee" : "#0891b2"}
          strokeWidth="2"
        />
      </svg>
      <div className="grid grid-cols-3 gap-1 text-center text-[9px] font-mono-code">
        <div>
          <div className={isDark ? "text-cyan-200 font-bold" : "text-cyan-800 font-bold"}>12.4k</div>
          <div className={isDark ? "text-zinc-500" : "text-gray-500"}>pps</div>
        </div>
        <div>
          <div className={isDark ? "text-amber-300 font-bold" : "text-amber-700 font-bold"}>3</div>
          <div className={isDark ? "text-zinc-500" : "text-gray-500"}>anomalies</div>
        </div>
        <div>
          <div className={isDark ? "text-emerald-300 font-bold" : "text-emerald-700 font-bold"}>TCP</div>
          <div className={isDark ? "text-zinc-500" : "text-gray-500"}>baseline</div>
        </div>
      </div>
    </div>
  );
}
