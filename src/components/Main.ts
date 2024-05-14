import styles from "./Main.module.css";
import Cards from "./Cards";
import debounce from "../utils/debounce";
import { injectCards } from "./Cards";

const infiniteScroll = debounce((e: Event) => {
  const t = e.target as HTMLElement;
  const y = t.scrollHeight - t.offsetHeight - 1;
  if (t.scrollTop * 1.3 >= y) {
    console.log("loading more cards");
    injectCards();
  }
}, 500);

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  const cards = Cards();
  main.classList.add(styles.main);
  main.appendChild(cards);
  main.addEventListener("scroll", infiniteScroll);
  document.addEventListener("keypress", (e) => {
    if (e.key === "x") main.removeChild(cards);
    if (e.key === "z") main.appendChild(cards);
  });
  return main;
}
