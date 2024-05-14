import styles from "./Main.module.css";
import Cards from "./Cards";

import getPokemon from "../utils/getPokemon";
const list = await getPokemon({ tail: "pokemon", limit: 3 });
const data = await Promise.all(
  list.results.map((l) => {
    return getPokemon({ url: l.url });
  })
);

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  main.appendChild(Cards(data));
  return main;
}
