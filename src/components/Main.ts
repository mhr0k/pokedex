import styles from "./Main.module.css";
import Cards from "./Cards";

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  main.appendChild(Cards());
  return main;
}
