import styles from "./Cards.module.css";
import { Pokemon, PokemonShort, PokemonPage } from "../types/Pokemon";
import getPokemon, { ALL_POKEMON } from "../utils/getPokemon";

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
  img.src = p.sprites.other.dream_world.front_default;
  img.alt = p.name;
  card.appendChild(img);
  // ON_CLICK
  card.addEventListener("click", () => {
    console.log(card);
  });
  return card;
}

async function getCardData() {
  const container = document.querySelector("#cards") as HTMLElement;
  const renderedCards = container?.children.length || 0;
  const cardsToRender =
    Math.round((window.innerHeight * window.innerWidth) / 62500) +
    renderedCards;
  const workingArr: PokemonShort[] = ALL_POKEMON.slice(
    renderedCards,
    cardsToRender
  );
  return await Promise.all(
    workingArr.map((p: PokemonShort) => {
      return getPokemon({ url: p.url });
    })
  );
}

export async function injectCards(container: HTMLElement) {
  getCardData().then((p: Pokemon[]) => {
    p.forEach((p: Pokemon) => {
      container.appendChild(Card(p));
    });
  });
}

export default function Cards(): HTMLElement {
  const container = document.createElement("section");
  container.classList.add(styles.container);
  container.id = "cards";
  injectCards(container);
  return container;
}
