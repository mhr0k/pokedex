import styles from "./Sort.module.css";
import { sortPokemonData } from "../utils/getPokemon";
import { resetCards, injectCards } from "./Cards";
import { resetSearch } from "./Search";
import { hideDetails } from "./Main";

function changeSorting(e: Event) {
  const target = e.target as HTMLSelectElement;
  const value = target.value as "ZA" | "AZ";
  resetSearch();
  hideDetails();
  resetCards();
  sortPokemonData(value);
  injectCards();
}

export default function Sort() {
  const sort = document.createElement("select");
  sort.id = "sort";
  sort.innerHTML = `
  <option value="AZ">A-Z</option>
  <option value="ZA">Z-A</option>
  `;
  const label = document.createElement("label");
  label.appendChild(sort);
  sort.addEventListener("change", changeSorting);
  return label;
}
