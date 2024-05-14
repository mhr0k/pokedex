import styles from "./Search.module.css";
import debounce from "../utils/debounce";
import { _POKEMON_DATA, setPokemonData } from "../utils/getPokemon";
import { resetCards, injectCards } from "./Cards";

const searchEvent = debounce((e: Event) => {
  const { value } = e.target as HTMLInputElement;
  const cards = resetCards();
  setPokemonData(() => _POKEMON_DATA.filter((p) => p.name.startsWith(value)));
  injectCards();
}, 500);

export default function Search(): HTMLInputElement {
  const search = document.createElement("input");
  search.type = "text";
  search.classList.add(styles.search);
  search.addEventListener("input", searchEvent);
  return search;
}
