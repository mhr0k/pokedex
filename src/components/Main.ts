import styles from "./Main.module.css";
import Cards from "./Cards";
import debounce from "../utils/debounce";
import { injectCards } from "./Cards";

function clearCards() {
  (document.querySelector("#cards") as HTMLElement).innerHTML = "";
}

function infiniteScroll(e: Event) {
  const t = e.target as HTMLElement;
  const y = t.scrollHeight - t.offsetHeight - 1;
  const c = document.querySelector("#cards") as HTMLElement;
  if (t.scrollTop >= y) {
    injectCards(c);
  }
}
function debouncedInfiniteScroll(e: Event) {
  return debounce(infiniteScroll(e), 100);
}

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  const cards = Cards();
  main.classList.add(styles.main);
  main.appendChild(cards);
  main.addEventListener("scroll", debouncedInfiniteScroll);
  return main;
}
