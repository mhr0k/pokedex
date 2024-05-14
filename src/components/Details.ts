import styles from "./Details.module.css";
import { Pokemon } from "../types/Pokemon";

export default function Details(p: Pokemon) {
  const primaryType = p.types[0].type.name;
  const name = p.name.split("-")[0];
  const subname = p.name.split("-").slice(1)?.join(" ");
  const imgSrc = p.sprites.other.dream_world.front_default;
  const types = p.types.map((t) => t.type.name);

  const details = document.createElement("div");
  details.id = "details";

  details.innerHTML = /*html*/ `
  <article class="article ${primaryType}">
    <section class="art">

    </section>
    <section class="header">
      <h3 class="name"></h3>
      <h4 class="subname"></h3>
    </header>
    <section class="info">
      
    </section>
  </article>
  `;

  details.classList.add(styles.container);
  details.classList.add(primaryType);
  const article = document.createElement("article");
  article.classList.add(styles.article);
  const title = document.createElement("h3");
  title.textContent = name;
  const subtext = document.createElement("h4");
  subtext.textContent = subname;
  const img = document.createElement("img");
  img.src = imgSrc;

  details.appendChild(article);
  article.appendChild(title);
  if (subtext.textContent) article.appendChild(subtext);
  article.appendChild(img);

  return details;
}
