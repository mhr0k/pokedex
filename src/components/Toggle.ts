import styles from "./Toggle.module.css";

export default function Toggle(): string {
  return `<input type="checkbox" id="themeToggler" class="${styles.toggler}"></input>`;
}
