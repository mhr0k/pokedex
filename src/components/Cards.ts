import styles from "./Cards.module.css";
import { Pokemon } from "../types/Pokemon";
import getCardData from "../utils/getCardData";

function Card(p: Pokemon): HTMLElement {
  const card = document.createElement("article");
  card.classList.add(styles.card);
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

async function injectCards(container: HTMLElement) {
  getCardData().then((p: Pokemon[]) => {
    p.forEach((p: Pokemon) => {
      container.appendChild(Card(p));
    });
  });
}

export default function Cards(): HTMLElement {
  const cards = document.createElement("section");
  cards.classList.add(styles.container);
  cards.id = "cards";
  injectCards(cards);
  addEventListener("keypress", (e) => {
    if (e.key === "x") {
      injectCards(cards);
    }
  });
  return cards;
}
