import styles from "./Cards.module.css";
import { Pokemon } from "../types/Pokemon";
import getPokemon, { POKEMON_DATA } from "../utils/getPokemon";
import { showDetails } from "./Main";
import { loadingIndicator } from "./Main";

function Card(p: Pokemon): HTMLElement {
  const card = document.createElement("article");
  card.classList.add(styles.card);
  card.classList.add(p.types[0].type.name);
  card.id = "card-" + p.id.toString();
  // HEADING
  const heading = document.createElement("h2");
  heading.classList.add(styles.heading);
  heading.innerText = p?.name.split("-")[0];
  card.appendChild(heading);
  // IMAGE
  const img = document.createElement("img");
  img.classList.add(styles.img);
  img.src =
    p.sprites.other.dream_world.front_default ||
    p.sprites.other["official-artwork"].front_default ||
    p.sprites.front_default;
  img.alt = p.name;
  card.appendChild(img);
  // CLICK
  const clickHandler = () => showDetails(p.id);
  card.addEventListener("click", clickHandler);
  return card;
}
declare global {
  interface Window {
    isLoadingCards: boolean;
    pokemonDataIndex: number;
  }
}

async function getCardData() {
  if (!window.pokemonDataIndex) window.pokemonDataIndex = 0;
  let cardsToRender: number = Math.round(
    (window.innerHeight * window.innerWidth) / 62500
  );
  let pokemonArr: Pokemon[] = [];
  while (cardsToRender) {
    if (window.pokemonDataIndex >= POKEMON_DATA.length) {
      cardsToRender = 0;
      return pokemonArr;
    }
    try {
      const pokemon: Pokemon = await getPokemon({
        url: POKEMON_DATA[window.pokemonDataIndex].url,
      });
      if (pokemon.sprites.other.dream_world.front_default) {
        pokemonArr.push(pokemon);
        cardsToRender--;
      }
    } catch (e) {
      console.error(e);
    }
    window.pokemonDataIndex++;
  }
  return pokemonArr;
}

let counter = 0;
export async function injectCards(
  container = document.querySelector("#cards") as HTMLElement
) {
  window.isLoadingCards = true;
  document.querySelector("#loader")?.classList.remove("hidden");
  loadingIndicator("show");
  const data = await getCardData();
  counter++;
  data?.forEach((p: Pokemon) => {
    container?.appendChild(Card(p));
  });
  window.isLoadingCards = false;
  document.querySelector("#loader")?.classList.add("hidden");
  loadingIndicator("hide");
}

export function resetCards() {
  const cards = document.querySelector("#cards") as HTMLElement;
  window.pokemonDataIndex = 0;
  if (cards) cards.innerHTML = "";
  return cards;
}

export default function Cards(): HTMLElement {
  const container = document.createElement("section");
  container.classList.add(styles.container);
  container.id = "cards";
  injectCards(container);
  return container;
}
