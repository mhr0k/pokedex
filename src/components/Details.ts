import styles from "./Details.module.css";
import {
  EvolutionChain,
  EvolutionStep,
  Pokemon,
  Species,
} from "../types/Pokemon";
import { hideDetails, showDetails } from "./Main";
import getPokemon from "../utils/getPokemon";
import getSprite from "../utils/getSprite";

async function populateAdditionalData(p: Pokemon) {
  const s: Species = await getPokemon({ url: p.species.url });
  const e: EvolutionChain = await getPokemon({ url: s.evolution_chain.url });
  // FLAVOR TEXT
  const pokemonNameRegExp = new RegExp(p.name, "gi");
  const pokemonStringRegExp = new RegExp("POKéMON", "g");
  const flavorText = s.flavor_text_entries
    .find((e) => e.language.name === "en")
    ?.flavor_text.replace(/[\n\f]/g, " ")
    .replace(pokemonNameRegExp, p.name[0].toUpperCase() + p.name.slice(1))
    .replace(pokemonStringRegExp, "pokémon");
  if (flavorText) {
    const ftElement = document.querySelector("#flavor") as HTMLElement;
    ftElement.innerText = flavorText;
  }
  // EVOLUTION DATA
  const evolutionData = {
    get origin() {
      function getOrigin(
        step: EvolutionStep,
        depth = 1
      ): [string, number] | null {
        if (!step?.species || step.species.name === p.name) return null;
        const evolutionMatches = step.evolves_to.find(
          (ev) => ev.species.name === p.name
        );
        if (evolutionMatches) {
          return [step.species.name, depth];
        } else {
          for (const ev of step.evolves_to) {
            const result = getOrigin(ev, depth + 1);
            if (result) return result;
          }
          return null;
        }
      }
      return getOrigin(e.chain);
    },
    get next() {
      function getNext(
        step: EvolutionStep,
        depth = 1
      ): [string[], number] | null {
        if (!step?.species) return null;
        if (step.species.name === p.name) {
          const result = step.evolves_to.map((ev) => ev.species.name);
          if (result[0]) return [result, depth + 1];
        }
        for (const ev of step.evolves_to) {
          const result = getNext(ev, depth + 1);
          if (result) return result;
        }
        return null;
      }
      return getNext(e.chain);
    },
    get variants() {
      function getVariants(
        step: EvolutionStep,
        depth = 1
      ): [string[], number] | null {
        if (!step?.species || step.species.name === p.name) {
          return null;
        }
        const evolutionMatches = step.evolves_to.find(
          (ev) => ev.species.name === p.name
        );
        if (evolutionMatches) {
          let result = step.evolves_to.map((ev) => ev.species.name);
          result = result.filter((ev) => ev !== p.name);
          if (result[0]) return [result, depth + 1];
        } else {
          for (const ev of step.evolves_to) {
            const result = getVariants(ev, depth + 1);
            if (result) return result;
          }
        }
        return null;
      }
      return getVariants(e.chain);
    },
  };
  // EVOLUTION DATA - RENDER
  console.log(evolutionData.origin);
  console.log(evolutionData.variants);
  console.log(evolutionData.next);

  const evoElement = document.querySelector("#evolution");
  if (evolutionData.origin) {
    const p: Pokemon = await getPokemon({
      tail: `pokemon/${evolutionData.origin[0]}`,
    });
    const sprite = getSprite(p);
    const originElement = document.createElement("div");
    const clickHandler = () => {
      showDetails(p.id);
    };
    originElement.addEventListener("click", clickHandler);
    originElement.innerHTML = /*html*/ `
      <h4>Evolved From:</h4>
      <figure>
        <img src="${sprite}" alt="${evolutionData.origin[0]}">
        <figcaption>${evolutionData.origin[0]}</figcaption>
      </figure>
    `;
    evoElement?.appendChild(originElement);
  }
}

export default function Details(p: Pokemon) {
  const primaryType = p.types[0].type.name;
  const name = p.name.split("-")[0];
  const subname = p.name.split("-").slice(1)?.join(" ");
  const imgSrc = getSprite(p);
  const types = p.types.map((t) => t.type.name);
  const stats = p.stats;
  const height = p.height / 10;
  const weight = p.weight / 10;
  let totalStats = 0;
  const statsMap: { [s: string]: string } = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    speed: "Speed",
  };

  const details = document.createElement("article");
  details.classList.add(primaryType);
  details.classList.add(styles.details);
  details.id = "details";
  details.innerHTML = /*html*/ `
    <div class="${styles.wrapper}">
      <button id="close" class="${styles.close}"><div></div></button>
      <section class="${styles.art}">
        <img src=${imgSrc}>
      </section>
      <article class="${styles.article}">
        <section class="${styles.header}">
          <h1 class="${styles.name}">
            ${name}
          ${
            subname
              ? /*html*/ `<span class="${styles.subname}">${subname}</span>`
              : ""
          }
          </h1>
          <section id="types" class="${styles.types}">
              ${types
                .map((t) => {
                  return /*html*/ `
                  <span class="${t}">${t}</span>
                  `;
                })
                .join("")}
          </section>
          <section id="info" class="${styles.info}">
            <p>
              <span>height</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0L17.9 401.9c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 50.7-50.7c18.7-18.7 49.1-18.7 67.9 0l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9L177.9 494.1z"/></svg>            ${height} M
            </p>
            <p>
              <span>weight</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 96a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm122.5 32c3.5-10 5.5-20.8 5.5-32c0-53-43-96-96-96s-96 43-96 96c0 11.2 1.9 22 5.5 32H120c-22 0-41.2 15-46.6 36.4l-72 288c-3.6 14.3-.4 29.5 8.7 41.2S33.2 512 48 512H464c14.8 0 28.7-6.8 37.8-18.5s12.3-26.8 8.7-41.2l-72-288C433.2 143 414 128 392 128H346.5z"/></svg>
              ${weight} KG
            </p>
          </section>
        </section>

        <section class="${styles.flavor}">
          <p id="flavor"></p>
        </section>

        <section id="stats" class="${styles.stats}">
            <h4>Base Stats</h4>
            ${stats
              .map((s) => {
                totalStats += Math.floor(s.base_stat / 6);
                return /*html*/ `
                <div class="${styles.stat}">
                  <label for=${s.stat.name}>
                    ${statsMap[s.stat.name]}
                  </label>
                  <span>${s.base_stat.toString().padStart(3, "0")}</span>
                  <meter max="255" id="${s.stat.name}" value="${
                  s.base_stat
                }"></meter>
                </div>
                `;
              })
              .join("")}
                          <div class="${styles.stat}">
                <label for="total">Power</label>
                <span>${totalStats.toString().padStart(3, "0")}</span>
                <meter max="255" id="total" value="${totalStats}"></meter>
              </div>
        </section>

        <section id="evolution" class="${styles.evolution}"></section>
      </article>
    </div>
  `;

  const statsContainer = details.querySelector("#stats") as HTMLElement;
  const evolutionContainer = details.querySelector("#evolution") as HTMLElement;

  const closeButton = details.querySelector("#close") as HTMLButtonElement;
  closeButton.onclick = () => hideDetails();

  populateAdditionalData(p);
  // console.log(p);
  return details;
}
