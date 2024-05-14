import { Theme } from "../types/Theme";

export function getThemePreference(): Theme {
  const saved = window.localStorage.getItem("theme");
  if (saved) return saved as Theme;
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    return "darkT";
  else return "lightT";
}
export function saveThemePreference(t: Theme) {
  window.localStorage.setItem("theme", t);
}
export function getCurrentTheme(): Theme | undefined {
  if (document.documentElement.classList.contains("darkT")) return "darkT";
  if (document.documentElement.classList.contains("lightT")) return "lightT";
  else return undefined;
}
export function addNewTheme(t: Theme) {
  document.documentElement.classList.add(t);
}
export function removeOtherThemes(t: Theme) {
  let del: Theme;
  t === "darkT" ? (del = "lightT") : (del = "darkT");
  document.documentElement.classList.remove(del);
}
export function setupTheme(t: Theme) {
  removeOtherThemes(t);
  addNewTheme(t);
  saveThemePreference(t);
}
export default function setTheme(newTheme?: Theme | "toggle"): void {
  switch (newTheme) {
    case "darkT": {
      setupTheme("darkT");
      break;
    }
    case "lightT": {
      setupTheme("lightT");
      break;
    }
    case "toggle": {
      if (getCurrentTheme() === "lightT") {
        setupTheme("darkT");
      } else {
        setupTheme("lightT");
      }
      break;
    }
    case undefined: {
      setupTheme(getThemePreference());
      break;
    }
    default: {
      throw new Error(
        `Argument must be either "dark", "light", undefined or "toggle" current value ${newTheme}`
      );
    }
  }
}
