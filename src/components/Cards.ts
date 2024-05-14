import styles from "./Cards.module.css";
import { Pokemon } from "../types/Pokemon";
import getCardData from "../utils/getCardData";

function Card(p: Pokemon): HTMLElement {
  const card = document.createElement("article");
  card.classList.add(styles.card);
  card.classList.add(p.types[0].type.name);
  card.id = p.id.toString();
  // HEADING
  const heading = document.createElement("h2");
  heading.classList.add(styles.heading);
  heading.innerText = p?.name;
  card.appendChild(heading);
  // IMAGE
  const img = document.createElement("img");
  img.classList.add(styles.img);
  img.src = p.sprites.other.dream_world.front_default;
  img.alt = p.name;
  card.appendChild(img);
  // ON_CLICK
  card.addEventListener("click", () => {
    console.log(card.id);
  });
  return card;
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
