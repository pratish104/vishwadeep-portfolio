import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, RefreshCw, Layers, Check } from "lucide-react";
import { useState } from "react";
import { soundManager } from "../../utils/audio";

interface PresetSentence {
  id: string;
  label: string;
  input: string;
  formal: { text: string; note: string; tokens: number };
  concise: { text: string; note: string; tokens: number };
  conversational: { text: string; note: string; tokens: number };
}

const PRESETS: PresetSentence[] = [
  {
    id: "exam",
    label: "Education Domain",
    input: "विद्यार्थ्यांनी परीक्षेची तयारी वेळेवर पूर्ण केली पाहिजे.",
    formal: {
      text: "विद्यार्थ्यांनी परीक्षा पूर्वतयारी वेळेत पूर्ण करणे आवश्यक आहे.",
      note: "Formal academic construction with standardized Devanagari morphology.",
      tokens: 8,
    },
    concise: {
      text: "विद्यार्थ्यांनी परीक्षेची तयारी वेळेत करावी.",
      note: "Concise directive reducing token load by ~35%.",
      tokens: 5,
    },
    conversational: {
      text: "परीक्षेची तयारी मुलांनी वेळेवरच करून घ्यायला हवी.",
      note: "Colloquial Marathi phrasing for dialogue and assistive voice systems.",
      tokens: 9,
    },
  },
  {
    id: "tech",
    label: "Technology Domain",
    input: "नवीन माहिती तंत्रज्ञानाचा वापर करून डेटाचे अचूक विश्लेषण करणे सोपे होते.",
    formal: {
      text: "आधुनिक माहिती तंत्रज्ञानाच्या साहाय्याने विदा विश्लेषण सुलभ होते.",
      note: "Technical register with precise Sanskritized terminology.",
      tokens: 7,
    },
    concise: {
      text: "माहिती तंत्रज्ञानाने डेटा विश्लेषण सुलभ होते.",
      note: "Simplified semantic representation.",
      tokens: 5,
    },
    conversational: {
      text: "नवीन टेक वापरून आपण डेटा पटकन आणि सोप्या पद्धतीने तपासू शकतो.",
      note: "Everyday conversational Marathi formulation.",
      tokens: 10,
    },
  },
];

export function KoshLiveVisual({ isDark = true }: { isDark?: boolean }) {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [tone, setTone] = useState<"formal" | "concise" | "conversational">("formal");
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  const current = PRESETS[selectedPreset] || PRESETS[0];
  const output = current[tone];

  const handleToneChange = (newTone: "formal" | "concise" | "conversational") => {
    soundManager.playHover();
    setIsTransforming(true);
    setTone(newTone);
    setTimeout(() => setIsTransforming(false), 200);
  };

  const handlePresetChange = (idx: number) => {
    soundManager.playClick();
    setIsTransforming(true);
    setSelectedPreset(idx);
    setTimeout(() => setIsTransforming(false), 200);
  };

  return (
    <div
      className={`w-full rounded-2xl border overflow-hidden transition-all duration-300 ${
        isDark ? "bg-[#080b14]/90 border-white/10" : "bg-white border-purple-100 shadow-sm"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <div
        className={`px-3.5 py-2 border-b flex items-center justify-between text-xs font-mono-code ${
          isDark ? "bg-[#0e1322]/80 border-white/10 text-zinc-300" : "bg-purple-50/70 border-purple-100 text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-bold text-[11px]">Marathi Rewrite &amp; NLP Sandbox</span>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/20 dark:bg-black/40 text-[10px]">
          {PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => handlePresetChange(idx)}
              className={`px-2 py-0.5 rounded-md transition-all ${
                selectedPreset === idx
                  ? "bg-purple-600 text-white font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {p.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Interactive Workspace ───────────────────────────────────────────── */}
      <div className="p-3 space-y-2.5">
        {/* Input Sentence Box */}
        <div className={`p-2.5 rounded-xl border ${isDark ? "bg-[#0b0e1b] border-white/5" : "bg-gray-50 border-gray-100"}`}>
          <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-1 font-mono-code">
            <span>INPUT (मराठी वाक्य):</span>
            <span className="text-purple-400">Devanagari UTF-8</span>
          </div>
          <p className={`font-sans text-xs font-medium leading-relaxed ${isDark ? "text-zinc-200" : "text-gray-800"}`}>
            "{current.input}"
          </p>
        </div>

        {/* Tone Transformation Chips */}
        <div className="flex items-center justify-between gap-1.5 font-mono-code text-[10px]">
          <span className="text-zinc-400">Target Register:</span>
          <div className="flex gap-1">
            {(["formal", "concise", "conversational"] as const).map((t) => (
              <button
                key={t}
                onClick={() => handleToneChange(t)}
                className={`px-2.5 py-1 rounded-lg uppercase font-bold transition-all ${
                  tone === t
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                    : isDark ? "bg-black/30 text-zinc-400 hover:text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {t === "formal" ? "Formal" : t === "concise" ? "Concise" : "Colloquial"}
              </button>
            ))}
          </div>
        </div>

        {/* Transformed Output Box */}
        <div
          className={`p-3 rounded-xl border transition-all duration-200 ${
            isDark
              ? "bg-purple-950/30 border-purple-500/40 text-zinc-100"
              : "bg-purple-50 border-purple-200 text-gray-900"
          }`}
        >
          <div className="flex justify-between items-center text-[10px] font-mono-code mb-1">
            <span className="text-purple-400 font-bold uppercase">
              OUTPUT ({tone.toUpperCase()}):
            </span>
            <span className="text-emerald-400 font-semibold">
              {output.tokens} Tokens · Synthesized
            </span>
          </div>

          <motion.p
            key={`${selectedPreset}-${tone}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-sans text-xs font-semibold leading-relaxed"
          >
            "{output.text}"
          </motion.p>

          <p className="text-[10px] font-mono-code text-zinc-400 mt-1.5 pt-1 border-t border-purple-500/20">
            {output.note}
          </p>
        </div>

        {/* Architecture Note */}
        <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-500 px-1">
          <span>Model: Devanagari Seq2Seq (mT5)</span>
          <span>Formerly: SANGRAH</span>
        </div>
      </div>
    </div>
  );
}
