import styles from "./Toggle.module.css";
import setTheme from "../utils/setTheme";

function handleClick() {
  console.log("clicked");
}

export default function Toggle(): string {
  return `<input type="checkbox" class=${
    styles.hidden
  }></input><button onclick="${handleClick()}">Theme</button>`;
}
