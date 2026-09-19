import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

// Lazy-load heavy world scenes for performance
const EarthScene3D = lazy(() =>
  import("./EarthScene3D").then((m) => ({ default: m.EarthScene3D }))
);
const AnimeWorldScene = lazy(() =>
  import("./AnimeWorldScene").then((m) => ({ default: m.AnimeWorldScene }))
);
const Hero3DWorld = lazy(() =>
  import("./Hero3DWorld").then((m) => ({ default: m.Hero3DWorld }))
);

interface MarkerInfo {
  id: string;
  label: string;
  description: string;
}

interface WorldEnvironmentProps {
  className?: string;
}

export function WorldEnvironment({ className = "" }: WorldEnvironmentProps) {
  const { theme } = useTheme();
  const [markerInfo, setMarkerInfo] = useState<MarkerInfo | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll for subtle parallax in anime scene
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      setScrollProgress(Math.min(scrolled / maxScroll, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close marker tooltip on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (markerInfo && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMarkerInfo(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [markerInfo]);

  const SceneFallback = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin opacity-30" />
    </div>
  );

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<SceneFallback />}>
        {theme === "dark" && (
          <EarthScene3D onMarkerClick={(m) => setMarkerInfo(m)} />
        )}
        {theme === "anime" && (
          <AnimeWorldScene scrollProgress={scrollProgress} onMarkerClick={(m) => setMarkerInfo(m)} />
        )}
        {theme === "light" && (
          <Hero3DWorld onMarkerClick={(m) => setMarkerInfo(m)} />
        )}
      </Suspense>

      {/* Marker info popup (Dark theme) */}
      {markerInfo && theme === "dark" && (
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 px-5 py-4 rounded-2xl max-w-sm w-[90%]"
          style={{
            background: "rgba(9,10,20,0.90)",
            border: "1px solid rgba(99,102,241,0.35)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-mono-code text-indigo-400 uppercase tracking-wider font-semibold mb-1">
                {markerInfo.id}
              </p>
              <h4 className="text-sm font-bold text-white mb-1">{markerInfo.label}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{markerInfo.description}</p>
            </div>
            <button
              onClick={() => setMarkerInfo(null)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors text-lg leading-none shrink-0 mt-0.5"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
