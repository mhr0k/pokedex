import styles from "./Main.module.css";
import Cards from "./Cards";
import { Pokemon, PokemonShort } from "../types/Pokemon";

import getPokemon from "../utils/getPokemon";
const list = await getPokemon({ tail: "pokemon", limit: 3 });
const data: Pokemon[] = await Promise.all(
  list.results.map((p: PokemonShort) => {
    return getPokemon({ url: p.url });
  })
);

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  main.appendChild(Cards(data));
  return main;
}
