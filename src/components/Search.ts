import styles from "./Search.module.css";
import debounce from "../utils/debounce";
import { Pokemon } from "../types/Pokemon";
import { resetCards, injectCards } from "./Cards";
import { hideDetails } from "./Main";
import { POKEMON } from "../utils/getPokemon";

export function resetSearch(
  input = document.querySelector("#search") as HTMLInputElement
) {
  input.value = "";
}

const searchEventHandler = debounce((e: Event) => {
  const { value } = e.target as HTMLInputElement;
  const resetIcon = document.querySelector("#resetSearch");
  if (resetIcon?.classList.contains("hidden")) {
    resetIcon?.classList.remove("hidden");
  }
  if (!value && !resetIcon?.classList.contains("hidden")) {
    resetIcon?.classList.add("hidden");
  }
  hideDetails();
  POKEMON.setCrop((d: Pokemon[]) => {
    const result = d.filter((p) => p.name.startsWith(value));
    return result;
  });
  resetCards();
  injectCards();
}, 250);

const handleSearchReset = () => {
  const resetIcon = document.querySelector("#resetSearch");
  resetIcon?.classList.add("hidden");
  resetSearch();
  hideDetails();
  POKEMON.resetCrop();
  resetCards();
  injectCards();
};

export default function Search(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add(styles.container);
  const input = document.createElement("input");
  input.type = "text";
  input.id = "search";
  input.autocomplete = "off";
  input.classList.add(styles.input);
  input.addEventListener("input", searchEventHandler);
  const searchIcon = document.createElement("i");
  searchIcon.classList.add(styles.searchIcon);
  searchIcon.innerHTML = /*html*/ `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
  `;
  const reset = document.createElement("a");
  reset.id = "resetSearch";
  reset.classList.add(styles.resetIcon);
  reset.classList.add("hidden");
  reset.innerHTML = /*html*/ `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M212.3 224.3H12c-6.6 0-12-5.4-12-12V12C0 5.4 5.4 0 12 0h48c6.6 0 12 5.4 12 12v78.1C117.8 39.3 184.3 7.5 258.2 8c136.9 1 246.4 111.6 246.2 248.5C504 393.3 393.1 504 256.3 504c-64.1 0-122.5-24.3-166.5-64.2-5.1-4.6-5.3-12.6-.5-17.4l34-34c4.5-4.5 11.7-4.7 16.4-.5C170.8 415.3 211.6 432 256.3 432c97.3 0 176-78.7 176-176 0-97.3-78.7-176-176-176-58.5 0-110.3 28.5-142.3 72.3h98.3c6.6 0 12 5.4 12 12v48c0 6.6-5.4 12-12 12z"/></svg>  `;
  reset.addEventListener("click", handleSearchReset);
  container.appendChild(input);
  container.appendChild(searchIcon);
  container.appendChild(reset);
  return container;
}
