import styles from "./Cards.module.css";
import { Pokemon } from "../types/Pokemon";

export default function Cards(arr: Pokemon[]): HTMLElement {
  const cards = document.createElement("section");
  cards.classList.add(styles.container);
  arr.forEach((p: Pokemon) => {
    const card = document.createElement("article");
    card.classList.add(styles.card);
    const heading = document.createElement("h2");
    heading.classList.add(styles.heading);
    heading.innerText = p?.name;
    const img = document.createElement("img");
    // img src
    card.appendChild(img);
    card.appendChild(heading);
    cards.appendChild(card);
  });
  return cards;
}
