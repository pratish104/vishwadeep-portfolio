import { useEffect, useState } from "react";
import { navigation, type SectionId } from "../data/site";

export function useNavigation() {
  const [active, setActive] = useState<SectionId>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);

      let current: SectionId = "home";
      const threshold = Math.min(window.innerHeight * 0.32, 260);

      for (const item of navigation) {
        const element = document.getElementById(item.id);

        if (element && element.getBoundingClientRect().top <= threshold) {
          current = item.id;
        }
      }

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8;

      setActive(atBottom ? "contact" : current);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { active, scrolled };
}

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101413" : "#f5f6f2");

    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme switching still works without persistent storage.
    }
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((current) => (current === "dark" ? "light" : "dark")),
  };
}
