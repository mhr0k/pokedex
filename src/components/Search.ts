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
    const result = d.filter((p) => p.name.startsWith(value));
    return result;
  });
  resetCards();
  injectCards();
}, 250);

export default function Search(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add(styles.container);
  const input = document.createElement("input");
  input.type = "text";
  input.id = "search";
  input.classList.add(styles.input);
  input.addEventListener("input", searchEventHandler);
  const searchButton = document.createElement("button");
  searchButton.classList.add(styles.btn);
  searchButton.innerHTML = /*html*/ `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
  `;
  const closeButton = document.createElement("button");
  closeButton.classList.add(styles.btn);
  closeButton.innerHTML = /*html*/ `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
  `;
  container.appendChild(searchButton);
  container.appendChild(input);
  container.appendChild(closeButton);
  return container;
}
