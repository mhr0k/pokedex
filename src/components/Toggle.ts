import styles from "./Toggle.module.css";
import setTheme, { getCurrentTheme } from "../utils/setTheme";

export default function Toggle(): HTMLInputElement {
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.classList.add(styles.toggler);
  function updateCheckbox() {
    getCurrentTheme() === "darkT"
      ? (toggle.checked = true)
      : (toggle.checked = false);
  }
  updateCheckbox();
  toggle.addEventListener("click", () => {
    setTheme("toggle");
    updateCheckbox();
  });
  return toggle;
}
