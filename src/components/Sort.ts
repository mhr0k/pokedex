import styles from "./Sort.module.css";
import { sortPokemonData } from "../utils/getPokemon";
import { resetCards, injectCards } from "./Cards";
import { resetSearch } from "./Search";

function changeSorting(e: Event) {
  const target = e.target as HTMLSelectElement;
  const value = target.value as "ZA" | "AZ" | "ID";
  resetSearch();
  resetCards();
  sortPokemonData(value);
  injectCards();
}

export default function Sort() {
  const filter = document.createElement("select");
  filter.innerHTML = `
  <option value="ID">ID</option>
  <option value="AZ">A-Z</option>
  <option value="ZA">Z-A</option>
  `;
  const label = document.createElement("label");
  label.appendChild(filter);
  filter.addEventListener("change", changeSorting);
  return label;
}
