import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

/**
 * HeroFrameOverlay — replaces the old JapaneseBalconyOverlay.
 *
 * Light theme : Illustrated editorial botanical frame
 *   - Top-right: delicate ink-sketch botanical branches with soft leaves
 *   - Bottom-left: subtle watercolor wash / gradient corner accent
 *   - Right side: faint vertical rule + floating data tags
 *
 * Dark theme  : Space / Nebula corner treatment
 *   - Top-right: constellation cluster dots & connecting lines
 *   - No balcony, no lantern, no table
 *
 * Anime theme : Pastel watercolor brush strokes + soft petal drift
 *
 * Nothing with cat, mug, books, lantern, wooden table, or islands.
 */
export function JapaneseBalconyOverlay() {
  const { theme } = useTheme();
  const isAnime = theme === "anime";
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* ── TOP-RIGHT CORNER DECORATION ────────────────────────────────────── */}
      <div className="absolute -top-6 -right-6 w-72 sm:w-96 md:w-[480px] h-72 sm:h-80 opacity-80 transition-opacity duration-500">
        <svg viewBox="0 0 480 320" className="w-full h-full" fill="none">
          {!isDark && !isAnime && (
            /* Light: Elegant botanical ink-sketch branches */
            <g opacity="0.75">
              {/* Main sweeping branch */}
              <path
                d="M480 0 C400 25 320 18 255 65 C220 90 188 108 155 128"
                stroke="#6b7280"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.45"
              />
              {/* Secondary branch */}
              <path
                d="M340 22 C308 52 282 88 258 125"
                stroke="#6b7280"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.35"
              />
              {/* Tertiary small branch */}
              <path
                d="M390 38 C368 58 350 80 335 105"
                stroke="#9ca3af"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.3"
              />

              {/* Detailed botanical leaves — almond/oval shapes along branch */}
              {[
                { x: 258, y: 68, r: 18, a: -30 },
                { x: 220, y: 92, r: 14, a: 20 },
                { x: 308, y: 50, r: 20, a: -15 },
                { x: 352, y: 35, r: 22, a: -40 },
                { x: 395, y: 62, r: 16, a: 10 },
                { x: 270, y: 110, r: 12, a: 35 },
                { x: 340, y: 90, r: 18, a: -22 },
              ].map((l, i) => (
                <ellipse
                  key={i}
                  cx={l.x}
                  cy={l.y}
                  rx={l.r}
                  ry={l.r * 0.52}
                  fill="#86efac"
                  fillOpacity={0.55 - i * 0.03}
                  stroke="#4ade80"
                  strokeWidth="0.8"
                  strokeOpacity={0.4}
                  transform={`rotate(${l.a}, ${l.x}, ${l.y})`}
                />
              ))}

              {/* Small flower dots */}
              {[
                { cx: 242, cy: 75, r: 5, col: "#fde68a" },
                { cx: 298, cy: 55, r: 4, col: "#fca5a5" },
                { cx: 368, cy: 42, r: 6, col: "#fde68a" },
                { cx: 196, cy: 115, r: 4, col: "#c4b5fd" },
              ].map((f, i) => (
                <g key={i}>
                  <circle cx={f.cx} cy={f.cy} r={f.r} fill={f.col} opacity="0.85" />
                  <circle cx={f.cx} cy={f.cy} r={f.r * 0.45} fill="#fffbeb" opacity="0.9" />
                </g>
              ))}
            </g>
          )}

          {isAnime && (
            /* Anime: Soft watercolor brush strokes + cherry blossoms */
            <g opacity="0.8">
              {/* Organic watercolor sweep */}
              <path
                d="M480 0 C390 35 295 25 225 78 C192 102 162 122 128 145"
                stroke="#f9a8d4"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.25"
              />
              <path
                d="M480 0 C400 30 315 22 248 72"
                stroke="#c084fc"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.2"
              />

              {/* Cherry blossom petals scattered */}
              {[
                { cx: 245, cy: 72, col: "#fda4af" },
                { cx: 290, cy: 50, col: "#f9a8d4" },
                { cx: 340, cy: 38, col: "#fecdd3" },
                { cx: 205, cy: 108, col: "#fbcfe8" },
                { cx: 370, cy: 65, col: "#fda4af" },
                { cx: 180, cy: 128, col: "#f9a8d4" },
                { cx: 315, cy: 80, col: "#fecdd3" },
              ].map((p, i) => (
                <g key={i} transform={`translate(${p.cx}, ${p.cy})`}>
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <ellipse
                      key={angle}
                      cx={0}
                      cy={-8}
                      rx={4.5}
                      ry={8}
                      fill={p.col}
                      opacity={0.75}
                      transform={`rotate(${angle})`}
                    />
                  ))}
                  <circle cx={0} cy={0} r={2.5} fill="#fef9c3" opacity="0.9" />
                </g>
              ))}
            </g>
          )}

          {isDark && (
            /* Dark: Constellation cluster — dots & connecting lines */
            <g opacity="0.65">
              {/* Constellation lines */}
              {[
                [360, 30, 310, 65],
                [310, 65, 265, 50],
                [265, 50, 240, 90],
                [240, 90, 195, 75],
                [310, 65, 335, 100],
                [335, 100, 290, 125],
                [400, 55, 360, 30],
              ].map(([x1, y1, x2, y2], i) => (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(148, 163, 184, 0.25)"
                  strokeWidth="1"
                />
              ))}
              {/* Star dots */}
              {[
                { cx: 360, cy: 30, r: 3.5 },
                { cx: 310, cy: 65, r: 2.8 },
                { cx: 265, cy: 50, r: 2.2 },
                { cx: 240, cy: 90, r: 3 },
                { cx: 195, cy: 75, r: 2 },
                { cx: 335, cy: 100, r: 2.5 },
                { cx: 290, cy: 125, r: 1.8 },
                { cx: 400, cy: 55, r: 2 },
                { cx: 430, cy: 22, r: 1.5 },
                { cx: 460, cy: 45, r: 1.2 },
              ].map((s, i) => (
                <circle key={i} cx={s.cx} cy={s.cy} r={s.r}
                  fill="rgba(186, 230, 253, 0.8)" />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* ── BOTTOM-LEFT SOFT ACCENT (Light theme only) ─────────────────────── */}
      {!isDark && !isAnime && (
        <div className="absolute -bottom-8 -left-8 w-56 sm:w-72 h-40 sm:h-52 opacity-40 pointer-events-none">
          <svg viewBox="0 0 300 220" className="w-full h-full" fill="none">
            {/* Soft botanical corner — upward curving stems */}
            <path
              d="M0 220 C40 190 60 155 90 130"
              stroke="#6ee7b7"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M0 220 C55 185 80 150 115 118"
              stroke="#86efac"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.35"
            />
            {[
              { cx: 95, cy: 128, r: 12 },
              { cx: 68, cy: 158, r: 10 },
              { cx: 42, cy: 188, r: 8 },
              { cx: 118, cy: 114, r: 9 },
            ].map((l, i) => (
              <ellipse
                key={i}
                cx={l.cx}
                cy={l.cy}
                rx={l.r}
                ry={l.r * 0.5}
                fill="#86efac"
                fillOpacity={0.5}
                transform={`rotate(-35, ${l.cx}, ${l.cy})`}
              />
            ))}
          </svg>
        </div>
      )}

      {/* ── FLOATING HANDWRITTEN QUOTE (light / anime) ─────────────────────── */}
      {!isDark && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="absolute right-6 sm:right-16 top-48 sm:top-56 text-right z-10"
        >
          <div
            className="font-serif-display text-base sm:text-xl italic tracking-wide leading-snug"
            style={{
              color: isAnime
                ? "rgba(168, 85, 247, 0.6)"
                : "rgba(100, 116, 139, 0.6)",
            }}
          >
            Small steps,
            <br />
            big impact.
          </div>
          <div
            className="text-[10px] font-mono-code mt-0.5 font-semibold"
            style={{ color: isAnime ? "rgba(167, 139, 250, 0.5)" : "rgba(148, 163, 184, 0.6)" }}
          >
            — Vishwadeep
          </div>
        </motion.div>
      )}
    </div>
  );
}
