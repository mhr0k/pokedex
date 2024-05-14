import styles from "./Main.module.css";
import Cards from "./Cards";
import Details from "./Details";
import debounce from "../utils/debounce";
import getPokemon from "../utils/getPokemon";
import { injectCards } from "./Cards";
import { Pokemon } from "../types/Pokemon";

const infiniteScroll = debounce((e: Event) => {
  const t = e.target as HTMLElement;
  const y = t.scrollHeight - t.offsetHeight - 1;
  if (t.scrollTop * 1.1 >= y) {
    if (!window.isLoadingCards) injectCards();
  }
}, 250);
const resizeInjectCards = debounce((e: Event) => {
  const t = document.querySelector("main") as HTMLElement;
  const y = t.scrollHeight - t.offsetHeight - 1;
  if (t.scrollTop * 1.3 >= y) {
    if (!window.isLoadingCards) injectCards();
  }
}, 250);

export async function showDetails(id: number) {
  const main = document.querySelector("main") as HTMLElement;
  const cards = document.querySelector("#cards") as HTMLElement;
  const pokemon = (await getPokemon({ tail: `pokemon/${id}` })) as Pokemon;
  const details = Details(pokemon);
  main.removeChild(cards);
  main.appendChild(details);
}

const cards = Cards();

export function hideDetails() {
  const main = document.querySelector("main") as HTMLElement;
  const details = document.querySelector("#details") as HTMLElement;
  if (details) {
    details.remove();
    main.appendChild(cards);
  }
}

export function loadingIndicator(a: "show" | "hide") {
  const main = document.querySelector("main") as HTMLElement;
  if (a === "show") {
    const loading = document.createElement("div");
    loading.id = "loadingIndicator";
    loading.classList.add(styles.loadingIndicator);
    main?.appendChild(loading);
  } else if (a === "hide") {
    const loading = main.querySelector("#loadingIndicator");
    if (loading) {
      main?.removeChild(loading);
    }
  }
}

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  main.appendChild(cards);
  main.addEventListener("scroll", infiniteScroll);
  addEventListener("resize", resizeInjectCards);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideDetails();
    if (e.key === "x") main.removeChild(cards);
    if (e.key === "z") main.appendChild(cards);
  });
  return main;
}
