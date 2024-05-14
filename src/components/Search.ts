import styles from "./Search.module.css";
import debounce from "../utils/debounce";
import { setPokemonData } from "../utils/getPokemon";
import { Pokemon } from "../types/Pokemon";
import { resetCards, injectCards } from "./Cards";
import { hideDetails } from "./Main";

export function resetSearch(
  input = document.querySelector("#search") as HTMLInputElement
) {
  input.value = "";
}

const searchEventHandler = debounce((e: Event) => {
  const { value } = e.target as HTMLInputElement;
  hideDetails();
  setPokemonData((d: Pokemon[]) => {
    console.log(d);
    return d.filter((p) => p.name.startsWith(value));
  });
  resetCards();
  injectCards();
}, 250);

export default function Search(): HTMLInputElement {
  const search = document.createElement("input");
  search.type = "text";
  search.id = "search";
  search.classList.add(styles.search);
  search.addEventListener("input", searchEventHandler);
  return search;
}
