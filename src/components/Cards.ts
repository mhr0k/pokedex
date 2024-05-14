import styles from "./Cards.module.css";
import { Pokemon } from "../types/Pokemon";

export default function Cards(arr: Pokemon[]): HTMLElement {
  const cards = document.createElement("section");
  cards.classList.add(styles.container);
  arr.forEach((p: Pokemon) => {
    // CARD
    const card = document.createElement("article");
    card.classList.add(styles.card);
    // HEADING
    const heading = document.createElement("h2");
    heading.classList.add(styles.heading);
    heading.innerText = p?.name;
    // IMAGE
    const img = document.createElement("img");
    img.classList.add(styles.img);
    img.src = p.sprites.other.dream_world.front_default;
    img.alt = p.name;
    card.appendChild(img);
    card.appendChild(heading);
    cards.appendChild(card);
  });
  return cards;
}
