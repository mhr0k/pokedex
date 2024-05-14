import styles from "./Toggle.module.css";

export default function Toggle(): string {
  return `<input type="checkbox" class="${styles.hidden}"></input>
  <button id="themeToggler" class=${styles.toggler}>Theme</button>`;
}
