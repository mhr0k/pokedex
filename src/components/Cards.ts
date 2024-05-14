import styles from "./Cards.module.css";
import { Pokemon } from "../types/Pokemon";
import getPokemon from "../utils/getPokemon";
import { renderMoreCardsCheck, showDetails } from "./Main";
import { loading } from "./Loader";
import { POKEMON } from "../utils/getPokemon";
import getSprite from "../utils/getSprite";

function Card(p: Pokemon): HTMLElement {
  const card = document.createElement("article");
  card.classList.add(styles.card);
  card.classList.add(p.types[0].type.name);
  card.id = "card-" + p.id.toString();
  card.setAttribute("tabindex", "10");
  // HEADING
  const heading = document.createElement("h2");
  heading.classList.add(styles.heading);
  heading.innerText = p?.name.split("-")[0];
  card.appendChild(heading);
  // IMAGE
  const img = document.createElement("img");
  img.classList.add(styles.img);
  img.src = getSprite(p);
  img.alt = p.name;
  card.appendChild(img);
  // CLICK
  const clickHandler = () => showDetails(p.id);
  card.addEventListener("click", clickHandler);
  return card;
}

export async function injectCards(
  container = document.querySelector("#cards") as HTMLElement
) {
  loading.state = true;
  if (!POKEMON.index) POKEMON.index = 0;
  let cardsToRender: number = Math.round(
    (window.innerHeight * window.innerWidth) / 62500
  );
  while (cardsToRender) {
    if (POKEMON.index >= POKEMON.crop.length) {
      loading.state = false;
      return;
    }
    const pokemon: Pokemon = await getPokemon({
      url: POKEMON.crop[POKEMON.index].url,
    });
    if (
      pokemon.sprites.other.dream_world.front_default &&
      loading.state === true
    ) {
      container.appendChild(Card(pokemon));
      cardsToRender--;
    }
    POKEMON.index++;
  }
  loading.state = false;
  setTimeout(() => renderMoreCardsCheck(), 0);
}

export function resetCards() {
  loading.state === false;
  const cards = document.querySelector("#cards") as HTMLElement;
  POKEMON.index = 0;
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
