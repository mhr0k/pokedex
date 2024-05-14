import styles from "./Cards.module.css";
import { Pokemon, PokemonShort } from "../types/Pokemon";
import getPokemon, { POKEMON_DATA } from "../utils/getPokemon";
import { showDetails } from "./Main";

function Card(p: Pokemon): HTMLElement {
  const card = document.createElement("article");
  card.classList.add(styles.card);
  card.classList.add(p.types[0].type.name);
  card.id = p.id.toString();
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

async function getCardData() {
  const container = document.querySelector("#cards") as HTMLElement;
  const renderedCards = container?.children.length || 0;
  const cardsToRender: number = Math.round(
    (window.innerHeight * window.innerWidth) / 62500 + renderedCards
  );
  const workingArr: PokemonShort[] = POKEMON_DATA.slice(
    renderedCards,
    cardsToRender
  );
  return await Promise.all(
    workingArr.map((p: PokemonShort) => {
      return getPokemon({ url: p.url });
    })
  );
}

export async function injectCards(
  container = document.querySelector("#cards") as HTMLElement
) {
  getCardData().then((p: Pokemon[]) => {
    p.forEach((p: Pokemon) => {
      container?.appendChild(Card(p));
    });
  });
}

export function resetCards() {
  const cards = document.querySelector("#cards") as HTMLElement;
  cards.innerHTML = "";
  return cards;
}

export default function Cards(): HTMLElement {
  const container = document.createElement("section");
  container.classList.add(styles.container);
  container.id = "cards";
  injectCards(container);
  return container;
}
