import styles from "./Main.module.css";
import Cards from "./Cards";
import debounce from "../utils/debounce";
import { injectCards } from "./Cards";

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  main.appendChild(Cards());
  main.addEventListener(
    "scroll",
    debounce(() => {
      const cards = document.querySelector("#cards") as HTMLElement;
      if (cards) {
        const y = main.scrollHeight - main.offsetHeight - 1;
        if (main.scrollTop >= y) {
          injectCards(cards);
        }
      }
    }, 100)
  );

  return main;
}
