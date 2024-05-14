import styles from "./Toggle.module.css";
import setTheme, { getCurrentTheme } from "../utils/setTheme";

export default function Toggle(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add(styles.container);
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.id = "theme-toggle";
  toggle.setAttribute("aria-label", "toggle dark theme");
  toggle.classList.add(styles.toggler);
  const icon = document.createElement("i");
  icon.classList.add(styles.icon);
  function updateCheckbox() {
    if (getCurrentTheme() === "darkT") {
      toggle.checked = true;
      icon.classList.add(styles.checked);
    } else {
      toggle.checked = false;
      icon.classList.remove(styles.checked);
    }
  }
  updateCheckbox();
  toggle.addEventListener("click", () => {
    setTheme("toggle");
    updateCheckbox();
  });
  container.appendChild(icon);
  container.appendChild(toggle);
  return container;
}
