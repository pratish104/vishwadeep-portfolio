import { THEME_BACKGROUNDS } from "../theme/appearance";
import { useTheme } from "../context/ThemeContext";

export function ThemeAtmosphere() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {(Object.keys(THEME_BACKGROUNDS) as Array<keyof typeof THEME_BACKGROUNDS>).map((key) => (
        <img
          key={key}
          src={THEME_BACKGROUNDS[key]}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-[68%_42%] transition-opacity duration-700 ${
            theme === key ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 theme-atmosphere-veil" />
      <div className="absolute inset-x-0 bottom-0 h-48 theme-atmosphere-fade" />
    </div>
  );
}
