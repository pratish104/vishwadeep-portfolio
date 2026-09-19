import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "anime";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem("portfolio_theme") as Theme | null;
    if (saved && ["dark", "light", "anime"].includes(saved)) return saved;
  } catch {
    // ignore
  }
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("portfolio_theme", t);
    } catch {}
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    // Update color-scheme so native controls match
    if (theme === "light") {
      root.style.colorScheme = "light";
    } else {
      root.style.colorScheme = "dark";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
