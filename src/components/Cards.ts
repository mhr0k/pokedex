import styles from "./Cards.module.css";
import getPokemon from "../utils/getPokemon";

type PokemonShort = {
  name: string;
  url: string;
};
type Pokemon = {
  name: string;
  sprites: { other: { dream_world: { front_default: string } } };
};

export default function Cards(list: PokemonShort[]): string {
  const arr = list.map((pokemon) => {
    // function get
    // const data = getPokemon(new URL(pokemon.url));
    // const sprite = data.sprites.other["dream_world"]["front_default"]
    return `
        <article class="${styles.card}">
          <p class="${styles.title}">${pokemon.name}</p>
        </article>
    `;
  });
  return arr.join("");
}
