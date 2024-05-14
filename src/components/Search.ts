import styles from "./Search.module.css";
import debounce from "../utils/debounce";
import { POKEMON_DATA_SORT, setPokemonData } from "../utils/getPokemon";
import { resetCards, injectCards } from "./Cards";

export function resetSearch(
  input = document.querySelector("#search") as HTMLInputElement
) {
  input.value = "";
}

const searchEvent = debounce((e: Event) => {
  const { value } = e.target as HTMLInputElement;
  setPokemonData(() =>
    POKEMON_DATA_SORT.filter((p) => p.name.startsWith(value))
  );
  resetCards();
  injectCards();
}, 250);

export default function Search(): HTMLInputElement {
  const search = document.createElement("input");
  search.type = "text";
  search.id = "search";
  search.classList.add(styles.search);
  search.addEventListener("input", searchEvent);
  return search;
}
