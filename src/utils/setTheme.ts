import dark from "../themes/darkTheme.module.css";
import light from "../themes/lightTheme.module.css";

export default function getTheme(t?: "dark" | "light"): void {
  let darkPreference: boolean;
  if (t === "dark") darkPreference = true;
  if (t === "light") darkPreference = false;
  else {
    darkPreference = window.matchMedia("(prefers-color-scheme: dark").matches;
  }
  const theme: string = darkPreference ? dark.theme : light.theme;
  const otherTheme: string = darkPreference ? light.theme : dark.theme;
  const classList = document.documentElement.classList;
  if (classList.contains(otherTheme)) {
    classList.remove(otherTheme);
  }
  if (!classList.contains(theme)) {
    classList.add(theme);
  }
}
