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
  if (t.scrollTop * 1.3 >= y) {
    injectCards();
  }
}, 250);
const resizeInjectCards = debounce((e: Event) => {
  const t = document.querySelector("main") as HTMLElement;
  console.log("resized window");
  const y = t.scrollHeight - t.offsetHeight - 1;
  if (t.scrollTop * 1.3 >= y) {
    injectCards();
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

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  const cards = Cards();
  main.appendChild(cards);
  main.addEventListener("scroll", infiniteScroll);
  addEventListener("resize", resizeInjectCards);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const details = document.querySelector("#details");
      if (details) details.remove();
      main.appendChild(cards);
    }
    if (e.key === "x") main.removeChild(cards);
    if (e.key === "z") main.appendChild(cards);
  });
  return main;
}
