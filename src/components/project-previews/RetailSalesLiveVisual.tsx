import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart, MapPin, DollarSign, Activity } from "lucide-react";
import { useState } from "react";
import { soundManager } from "../../utils/audio";

export function RetailSalesLiveVisual({ isDark = true }: { isDark?: boolean }) {
  const [activeTab, setActiveTab] = useState<"margins" | "discounts" | "segments" | "trends">("margins");
  const [selectedRegion, setSelectedRegion] = useState<string>("West");

  // Verified project dataset numbers
  const regionalData = [
    { region: "West", margin: "+28.4%", profit: "$48.2K", color: "#10b981", percent: 78 },
    { region: "East", margin: "+14.2%", profit: "$24.1K", color: "#3b82f6", percent: 52 },
    { region: "South", margin: "+12.1%", profit: "$18.6K", color: "#6366f1", percent: 45 },
    { region: "Central", margin: "-3.2%", profit: "-$4.8K", color: "#f59e0b", percent: 22, warning: "Over-discounted" },
  ];

  const monthlyTrendPoints = [
    { month: "Jan", sales: 30, profit: 12 },
    { month: "Mar", sales: 45, profit: 18 },
    { month: "Jun", sales: 70, profit: 24 },
    { month: "Sep", sales: 85, profit: 32 },
    { month: "Dec", sales: 98, profit: 38 },
  ];

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden transition-all duration-300 ${
        isDark ? "bg-[#080b14]/90 border-white/10" : "bg-white border-blue-100 shadow-sm"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Top Metric Tabs ─────────────────────────────────────────────────── */}
      <div
        className={`px-3.5 py-2 border-b flex items-center justify-between text-xs font-mono-code ${
          isDark ? "bg-[#0e1322]/80 border-white/10 text-zinc-300" : "bg-blue-50/70 border-blue-100 text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-bold text-[11px]">R &amp; Power BI Analytics Engine</span>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/20 dark:bg-black/40 text-[10px]">
          {(["margins", "discounts", "segments", "trends"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundManager.playHover();
                setActiveTab(tab);
              }}
              className={`px-2 py-0.5 rounded-md capitalize transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Visual Display ──────────────────────────────────────────────────── */}
      <div className="p-3 space-y-2.5">
        {/* TAB 1: REGIONAL MARGINS */}
        {activeTab === "margins" && (
          <div className="space-y-2 text-xs font-mono-code">
            <div className="flex justify-between items-center text-[10px] text-zinc-400 px-1">
              <span>Regional Profit Margin Distribution (R Analysis)</span>
              <span className="text-emerald-400 font-bold">11.6% Avg Margin</span>
            </div>

            <div className="space-y-1.5">
              {regionalData.map((r) => (
                <div
                  key={r.region}
                  onClick={() => setSelectedRegion(r.region)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    selectedRegion === r.region
                      ? isDark
                        ? "bg-blue-950/30 border-blue-500/40 text-zinc-100"
                        : "bg-blue-50 border-blue-200 text-gray-900"
                      : isDark
                      ? "bg-[#0b0e1b] border-white/5 text-zinc-300"
                      : "bg-gray-50 border-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="font-bold">{r.region} Region</span>
                    <div className="flex items-center gap-2">
                      {r.warning && (
                        <span className="text-[9px] text-amber-400 font-normal">
                          ⚠️ {r.warning}
                        </span>
                      )}
                      <span className="font-bold font-mono-code" style={{ color: r.color }}>
                        {r.margin} ({r.profit})
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${r.percent}%`, backgroundColor: r.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DISCOUNT SENSITIVITY */}
        {activeTab === "discounts" && (
          <div className="space-y-2 text-xs font-mono-code">
            <div className={`p-2.5 rounded-xl border space-y-1.5 ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
              <div className="flex items-center justify-between text-blue-400 font-bold text-[11px]">
                <span>Statistical Sensitivity Finding (R):</span>
                <span>p &lt; 0.001</span>
              </div>
              <p className={`text-[11px] leading-relaxed font-sans ${isDark ? "text-zinc-300" : "text-gray-700"}`}>
                Promotional discounts exceeding 20% boosted sales volume by +34%, but caused severe margin erosion of -42% in Central Region.
              </p>
            </div>

            {/* Discount impact scale */}
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className={`p-2 rounded-xl border ${isDark ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300" : "bg-emerald-50 border-emerald-200"}`}>
                <span className="block font-bold">0% – 10% Disc</span>
                <span className="text-xs font-bold">+24.2% Margin</span>
              </div>
              <div className={`p-2 rounded-xl border ${isDark ? "bg-blue-950/20 border-blue-500/30 text-blue-300" : "bg-blue-50 border-blue-200"}`}>
                <span className="block font-bold">10% – 20% Disc</span>
                <span className="text-xs font-bold">+11.8% Margin</span>
              </div>
              <div className={`p-2 rounded-xl border ${isDark ? "bg-amber-950/20 border-amber-500/30 text-amber-300" : "bg-amber-50 border-amber-200"}`}>
                <span className="block font-bold">&gt; 20% Disc</span>
                <span className="text-xs font-bold">-4.5% Deficit</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER SEGMENTS */}
        {activeTab === "segments" && (
          <div className="space-y-2 text-xs font-mono-code">
            <div className="text-[10px] text-zinc-400 px-1">Customer Segment Breakdown (Power BI Model)</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className={`p-2.5 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
                <span className="text-[10px] text-zinc-400 block">Consumer</span>
                <span className="text-sm font-bold text-blue-400 block mt-0.5">51.9%</span>
                <span className="text-[9px] text-emerald-400 block">+14.2% Margin</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
                <span className="text-[10px] text-zinc-400 block">Corporate</span>
                <span className="text-sm font-bold text-indigo-400 block mt-0.5">30.2%</span>
                <span className="text-[9px] text-emerald-400 block">+12.8% Margin</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
                <span className="text-[10px] text-zinc-400 block">Home Office</span>
                <span className="text-sm font-bold text-purple-400 block mt-0.5">17.9%</span>
                <span className="text-[9px] text-emerald-400 block">+10.5% Margin</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TRENDS (SVG Chart) */}
        {activeTab === "trends" && (
          <div className="space-y-1.5 text-xs font-mono-code">
            <div className="flex justify-between items-center text-[10px] text-zinc-400 px-1">
              <span>Sales vs Net Profit Growth (Annual)</span>
              <span className="text-blue-400 font-bold">51,290 Rows Audited</span>
            </div>

            {/* SVG Live Trend Visualization */}
            <div className={`p-2 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
              <svg viewBox="0 0 300 70" className="w-full h-16">
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />

                {/* Sales Line (Blue) */}
                <path
                  d="M10 55 Q70 45 140 32 T290 12"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Profit Line (Emerald) */}
                <path
                  d="M10 60 Q70 54 140 46 T290 28"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="140" cy="32" r="3.5" fill="#3b82f6" />
                <circle cx="290" cy="12" r="4" fill="#3b82f6" />
                <circle cx="290" cy="28" r="3.5" fill="#10b981" />
              </svg>

              <div className="flex justify-between text-[9px] text-zinc-500 px-1 pt-0.5">
                <span>Q1</span>
                <span>Q2</span>
                <span>Q3</span>
                <span>Q4 (Peak)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
