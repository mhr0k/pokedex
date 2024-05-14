import styles from "./Details.module.css";
import { Pokemon } from "../types/Pokemon";
import { hideDetails } from "./Main";

export default function Details(p: Pokemon) {
  console.log(p);
  const primaryType = p.types[0].type.name;
  const name = p.name.split("-")[0];
  const subname = p.name.split("-").slice(1)?.join(" ");
  const imgSrc =
    p.sprites.other.dream_world.front_default ||
    p.sprites.other["official-artwork"].front_default ||
    p.sprites.front_default;
  const types = p.types.map((t) => t.type.name);
  const stats = p.stats;
  const statsMap: { [s: string]: string } = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SATK",
    "special-defense": "SDEF",
    speed: "SPD",
  };

  const details = document.createElement("article");
  details.classList.add(primaryType);
  details.classList.add(styles.details);
  details.id = "details";
  details.innerHTML = /*html*/ `
    <button id="close" class="${styles.close}"><div></div></button>
    <section class=${styles.art}>
      <img src=${imgSrc}>
    </section>
    <div class="${styles.wrapper}">
    <section class=${styles.header}>
      <h3 class=${styles.name}>${name}</h3>
      <span class=${styles.subname}>${subname}</span>
    </header>
    <section ${styles.info}>
      <section id="types" class=${styles.types}>
        ${types
          .map((t) => {
            return /*html*/ `
            <span class="${t}">${t}</span>
            `;
          })
          .join("")}
      </section>
      <section id="stats" class=${styles.stats}>
        ${stats
          .map((s) => {
            return /*html*/ `
            <label>${statsMap[s.stat.name]} ${s.base_stat}
            <meter max="255" value="${s.base_stat}"></meter>
            </label>
            `;
          })
          .join("")}
      </section>
      <section id="evolution" class=${styles.evolution}></section>
    </section>
    </div>
  `;

  const statsContainer = details.querySelector("#stats") as HTMLElement;
  const evolutionContainer = details.querySelector("#evolution") as HTMLElement;

  const closeButton = details.querySelector("#close") as HTMLButtonElement;
  closeButton.onclick = () => hideDetails();
  return details;
}
