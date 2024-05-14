import styles from "./Details.module.css";
import { Pokemon } from "../types/Pokemon";

export default function Details(p: Pokemon) {
  const primaryType = p.types[0].type.name;
  const name = p.name.split("-")[0];
  const subname = p.name.split("-").slice(1)?.join(" ");
  const imgSrc =
    p.sprites.other.dream_world.front_default ||
    p.sprites.other["official-artwork"].front_default ||
    p.sprites.front_default;
  const types = p.types.map((t) => t.type.name);
  // const stats = p.stats.

  const details = document.createElement("article");
  details.classList.add(primaryType);
  details.classList.add(styles.details);
  details.id = "details";
  details.innerHTML = /*html*/ `
    <section class=${styles.art}>
      <img src=${imgSrc} class=${styles.img}>
    </section>
    <section class=${styles.header}>
      <h3 class=${styles.name}>${name}</h3>
      <h4 class=${styles.subname}>${subname}</h3>
    </header>
    <section ${styles.info}>
      <section id="types" class=${styles.types}></section>
      <section class=${styles.stats}></section>
      <section class=${styles.evolution}></section>
    </section>
  `;

  const typesContainer = details.querySelector("#types") as HTMLElement;
  types.map((t) => {
    const typeSpan = document.createElement("span");
    typeSpan.innerText = t;
    typeSpan.classList.add(t);
    typesContainer.appendChild(typeSpan);
  });

  return details;
}
