import styles from "./Cards.module.css";
import { PokemonShort } from "../types/Pokemon";

export default function Cards(l: PokemonShort[]): string {
  const arr = l.map((p: PokemonShort) => {
    return `
        <article class="${styles.card}">
          <p class="${styles.title}">${p.name}</p>
        </article>
    `;
  });
  return arr.join("");
}
