import type { Theme } from "../context/ThemeContext";

export const THEME_OPTIONS: {
  id: Theme;
  label: string;
  hint: string;
}[] = [
  { id: "light", label: "Light", hint: "Default" },
  { id: "dark", label: "Dark", hint: "Space" },
  { id: "anime", label: "Anime", hint: "Nature" },
];

export const THEME_BACKGROUNDS: Record<Theme, string> = {
  light: "/environment/light.jpg",
  dark: "/environment/dark.jpg",
  anime: "/environment/anime.jpg",
};

export const SEARCH_PLACEHOLDER: Record<Theme, string> = {
  light: "Explore my universe...",
  dark: "Explore my universe...",
  anime: "Explore my world...",
};

export function isDarkTheme(theme: Theme) {
  return theme === "dark";
}

export function glassClass(theme: Theme) {
  if (theme === "dark") {
    return "bg-[#0b1528]/78 border-white/12 text-zinc-100 backdrop-blur-xl shadow-lg shadow-black/30";
  }
  if (theme === "anime") {
    return "bg-white/88 border-rose-200/80 text-gray-900 backdrop-blur-xl shadow-lg shadow-rose-900/5";
  }
  return "bg-white/90 border-gray-200/80 text-gray-900 backdrop-blur-xl shadow-sm";
}

export function mutedText(theme: Theme) {
  if (theme === "dark") return "text-zinc-400";
  return "text-gray-500";
}

export function primaryText(theme: Theme) {
  if (theme === "dark") return "text-white";
  return "text-gray-900";
}

export function accentText(theme: Theme) {
  if (theme === "dark") return "text-cyan-300";
  if (theme === "anime") return "text-rose-600";
  return "text-blue-700";
}
