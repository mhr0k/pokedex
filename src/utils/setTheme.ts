import { Theme } from "../types/Theme";

export function getThemePreference(): Theme {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  else return "light";
}
export function getCurrentTheme(): Theme | undefined {
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  else return undefined;
}
export function addNewTheme(t: Theme) {
  document.documentElement.classList.add(t);
}
export function removeOtherThemes(t: Theme) {
  let del: Theme;
  t === "dark" ? (del = "light") : (del = "dark");
  document.documentElement.classList.remove(del);
}
export function setupTheme(t: Theme) {
  removeOtherThemes(t);
  addNewTheme(t);
}
export default function setTheme(newTheme?: Theme | "toggle"): void {
  switch (newTheme) {
    case "dark": {
      setupTheme("dark");
      break;
    }
    case "light": {
      setupTheme("light");
      break;
    }
    case "toggle": {
      if (getCurrentTheme() === "light") {
        setupTheme("dark");
      } else {
        setupTheme("light");
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
