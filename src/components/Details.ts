import styles from "./Details.module.css";
import {
  Ability,
  EvolutionChain,
  EvolutionStep,
  Pokemon,
  PokemonTypePage,
  Species,
} from "../types/Pokemon";
import { hideDetails, showDetails } from "./Main";
import getPokemon from "../utils/getPokemon";
import getSprite from "../utils/getSprite";

async function populateAdditionalData(p: Pokemon) {
  const s: Species = await getPokemon({ url: p.species.url });
  const e: EvolutionChain = await getPokemon({ url: s.evolution_chain.url });
  // AUDIO
  const audio = document.querySelector("audio") as HTMLAudioElement;
  const savedVolume = Number(window.localStorage.getItem("volume"));
  if (audio) audio.volume = savedVolume || 0.1;
  audio.addEventListener("volumechange", (e: Event) => {
    const { volume } = e.target as HTMLAudioElement;
    window.localStorage.setItem("volume", `${volume}`);
  });
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
    if (ftElement) ftElement.innerText = flavorText;
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
  // ABILITIES
  const abilitiesElement = document.querySelector("#abilities") as HTMLElement;
  const abilityPromises = p.abilities.map((a) => {
    return getPokemon({ url: a.ability.url });
  });
  const abilities: Ability[] = await Promise.all(abilityPromises);
  abilities.forEach((a) => {
    const article = document.createElement("article") as HTMLElement;
    article.innerHTML = /*html*/ `
      <h4>${a.name.split("-").join(" ")}</h4>
      <p>${a.effect_entries.find((e) => e.language.name === "en")?.effect}</p>
    `;
    if (abilitiesElement) abilitiesElement.appendChild(article);
  });

  // DAMAGE RELATIONS
  const dmgMods: { [key: string]: number } = {};
  const defMods: { [key: string]: number } = {};
  const typePromises: Promise<PokemonTypePage>[] = p.types.map((t) =>
    getPokemon({ url: t.type.url })
  );
  const types = await Promise.all(typePromises);
  for (const type of types) {
    const dr = type.damage_relations;
    dr.double_damage_to.forEach((mod) => {
      dmgMods[mod.name] = dmgMods[mod.name] * 2 || 2;
    });
    dr.half_damage_to.forEach((mod) => {
      dmgMods[mod.name] = dmgMods[mod.name] * 0.5 || 0.5;
    });
    dr.no_damage_to.forEach((mod) => {
      dmgMods[mod.name] ? dmgMods[mod.name] : 0;
    });
    dr.double_damage_from.forEach((mod) => {
      defMods[mod.name] = defMods[mod.name] * 2 || 2;
    });
    dr.half_damage_from.forEach((mod) => {
      defMods[mod.name] = defMods[mod.name] * 0.5 || 0.5;
    });
    dr.no_damage_from.forEach((mod) => {
      defMods[mod.name] = 0;
    });
  }
  let extraDmgTo: [string, number][] = [];
  let lessDmgTo: [string, number][] = [];
  let extraDmgFrom: [string, number][] = [];
  let lessDmgFrom: [string, number][] = [];
  for (const [key, value] of Object.entries(dmgMods)) {
    if (value > 1) {
      extraDmgTo.push([key, value]);
    }
    if (value < 1) {
      lessDmgTo.push([key, value]);
    }
  }
  for (const [key, value] of Object.entries(defMods)) {
    if (value > 1) {
      extraDmgFrom.push([key, value]);
    }
    if (value < 1 && value > 0) {
      lessDmgFrom.push([key, value]);
    }
  }
  extraDmgTo.sort((a, b) => b[1] - a[1]);
  lessDmgTo.sort((a, b) => b[1] - a[1]);
  extraDmgFrom.sort((a, b) => b[1] - a[1]);
  lessDmgFrom.sort((a, b) => b[1] - a[1]);

  // RENDER DAMAGE MODIFIERS
  const stringifyMod = (d: [string, number][]) => {
    return d
      .map((t) => {
        return /*html*/ `<span class="mod ${t[0]}">${t[0]} ×${t[1]}</span>`;
      })
      .join(" ");
  };
  const injectModElement = (d: [string, number][], title: string) => {
    const container = document.querySelector("#modifiers");
    const section = document.createElement("section");
    if (section)
      section.innerHTML = /*html*/ `
    <h4>${title}</h4>
    <div>${stringifyMod(d)}</div>`;
    container?.appendChild(section);
  };

  extraDmgTo[0] && injectModElement(extraDmgTo, "Increased Attack To");
  lessDmgTo[0] && injectModElement(lessDmgTo, "Reduced Attack To");
  extraDmgFrom[0] && injectModElement(extraDmgFrom, "Increased Defense From");
  lessDmgFrom[0] && injectModElement(lessDmgFrom, "Reduced Defense From");
  // EVOLUTION DATA - RENDER
  const evoElement = document.querySelector("#evolution");
  const handleImageClick = (e: Event) => {
    const { id } = e.target as HTMLElement;
    showDetails(Number(id.split("-")[1]));
  };

  if (evolutionData.variants) {
    const promises: Promise<Pokemon>[] = evolutionData.variants[0].map((el) =>
      getPokemon({ tail: `pokemon/${el}` })
    );
    const variantPokemon = await Promise.all(promises);
    const variantsElement = document.createElement("div");
    variantsElement.classList.add(styles.evolutionFlex);
    variantsElement.innerHTML = /*html*/ `
      <h4>Variants</h4>
      ${variantPokemon
        .map((vp) => {
          return /*html*/ `
          <figure>
            <img 
              tabindex="0"
              src="${getSprite(vp)}"
              alt="${vp.name}" 
              id="variant-${vp.id}"
              class="${vp.types[0].type.name}">
            <figcaption>${vp.name}</figcaption>
          </figure>
        `;
        })
        .join("")}
    `;
    const images = variantsElement.querySelectorAll("img");
    images?.forEach((img) => img.addEventListener("click", handleImageClick));
    evoElement?.appendChild(variantsElement);
  }
  if (evolutionData.origin) {
    const p: Pokemon = await getPokemon({
      tail: `pokemon/${evolutionData.origin[0]}`,
    });
    const sprite = getSprite(p);
    const originElement = document.createElement("div");
    originElement.classList.add(styles.evolutionFlex);
    originElement.innerHTML = /*html*/ `
        <h4>Previous</h4>
        <figure >
          <img 
            tabindex="0"
            src="${sprite}" 
            alt="${evolutionData.origin[0]}"
            id ="origin-${p.id}"
            class="${p.types[0].type.name}">
          <figcaption>${evolutionData.origin[0]}</figcaption>
        </figure>
    `;
    const images = originElement.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("click", handleImageClick));
    evoElement?.appendChild(originElement);
  }
  if (evolutionData.next) {
    const promises: Promise<Pokemon>[] = evolutionData.next[0].map((el) =>
      getPokemon({ tail: `pokemon/${el}` })
    );
    const nextPokemon = await Promise.all(promises);
    const nextElement = document.createElement("div");
    nextElement.classList.add(styles.evolutionFlex);
    nextElement.innerHTML = /*html*/ `
        <h4>Next</h4>
        ${nextPokemon
          .map((np) => {
            return /*html*/ `
          <figure >
            <img 
              tabindex="0"
              src="${getSprite(np)}" 
              alt="${np.name}" 
              id="next-${np.id}" 
              class="${np.types[0].type.name}">
            <figcaption>${np.name}</figcaption>
          </figure>
          `;
          })
          .join("")}
    `;
    const images = nextElement.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("click", handleImageClick));
    evoElement?.appendChild(nextElement);
  }
  if (!evolutionData.variants && !evolutionData.origin && !evolutionData.next) {
    const noEvolution = document.createElement("p");
    noEvolution.innerText = "No known evolutions.";
    evoElement?.appendChild(noEvolution);
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
      <div class="${styles.closeWrapper}">
        <button id="close" class="${
          styles.close
        }" aria-label="close details"><div></div></button>
      </div>
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
        ${
          p.cries.latest
            ? /*html*/ `<audio controls src="${p.cries.latest}" aria-label="pokemon cry sound"></audio>`
            : null
        }
        <section id="stats" class="${styles.stats}">
            <h3>Base Stats</h3>
            ${stats
              .map((s) => {
                totalStats += Math.round(s.base_stat / 6);
                if (totalStats > 255) totalStats = 255;
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

        <section id="abilities" class="${styles.abilities}">
          <h3>Abilities</h3>
        </section>

        <section id="modifiers" class="${styles.modifiers}">
        </section>

        <section id="evolution" class="${styles.evolution}">
          <h3>Evolution<h3>
        </section>
        
        </section>
      </article>
    </div>
  `;
  const closeButton = details.querySelector("#close") as HTMLButtonElement;
  closeButton.onclick = () => hideDetails();
  populateAdditionalData(p);
  return details;
}
