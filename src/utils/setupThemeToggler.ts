import setTheme, { Theme, getCurrentTheme } from "./setTheme";

export default function setupThemeToggler(): void {
  const checkbox = document.querySelector("#themeToggler") as HTMLInputElement;
  function updateCheckbox() {
    getCurrentTheme() === "dark"
      ? (checkbox.checked = true)
      : (checkbox.checked = false);
  }
  updateCheckbox();
  checkbox.addEventListener("click", () => {
    setTheme("toggle");
    updateCheckbox();
  });
}
