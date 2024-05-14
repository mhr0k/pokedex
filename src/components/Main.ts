import styles from "./Main.module.css";
import Cards from "./Cards";
import Details from "./Details";
import debounce from "../utils/debounce";
import getPokemon from "../utils/getPokemon";
import { injectCards } from "./Cards";
import { Pokemon, PokemonShort } from "../types/Pokemon";
import { loading } from "./Loader";
import { POKEMON } from "../utils/getPokemon";

export const renderMoreCardsCheck = () => {
  if (!document.querySelector("#cards")) return;
  const t = document.querySelector("main") as HTMLElement;
  const y = t.scrollHeight - t.offsetHeight - 1;
  if (t.scrollTop * 1.15 >= y) {
    if (loading.state === false) {
      injectCards();
    }
  }
};
const debouncedRenderMoreCardsCheck = debounce(renderMoreCardsCheck, 250);

const cards = Cards();

export async function showDetails(
  id: number | string,
  p?: "pop" | "replace",
  m?: HTMLElement
) {
  const main = m || (document.querySelector("main") as HTMLElement);
  main.querySelector("#details")?.remove();
  let pokemon = null;
  if (typeof id === "number") {
    pokemon = (await getPokemon({ tail: `pokemon/${id}` })) as Pokemon;
  }
  if (typeof id === "string") {
    const ps = POKEMON.crop.find((ps: PokemonShort) => ps.name === id);
    pokemon = (await getPokemon({ url: ps.url })) as Pokemon;
  }
  if (pokemon) {
    const scroll = main.scrollTop;
    const details = Details(pokemon);
    cards?.remove();
    main.appendChild(details);
    if (!p) {
      history.pushState({ scroll, id: pokemon.id }, "", pokemon.name);
    } else if (p === "replace") {
      history.replaceState({ scroll, id: pokemon.id }, "", pokemon.name);
    }
  }
  if (loading.state === true) {
    document.querySelector("#loader")?.classList.add("hidden");
  }
}

export function hideDetails(p?: "pop") {
  const main = document.querySelector("main") as HTMLElement;
  const details = document.querySelector("#details") as HTMLElement;
  const scroll: number = history.state.scroll;
  if (details) {
    details.remove();
    main.appendChild(cards);
    if (!p) {
      // Triggers when hitting the close button
      history.pushState({ scroll: scroll }, "", "/");
    }
  }
  main.scrollTop = scroll;
  renderMoreCardsCheck();
  if (loading.state === true) {
    document.querySelector("#loader")?.classList.remove("hidden");
  }
}

export default function Main(): HTMLElement {
  const main = document.createElement("main");
  main.classList.add(styles.main);
  const { pathname } = new URL(location.href);
  if (pathname !== "/") {
    showDetails(pathname.split("/")[1], "replace", main);
  } else {
    main.appendChild(cards);
    history.replaceState({}, "", "/");
  }
  main.addEventListener("scroll", debouncedRenderMoreCardsCheck);
  addEventListener("resize", debouncedRenderMoreCardsCheck);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideDetails();
    }
    if (e.key === "Enter") {
      const activeElement = document.activeElement;
      if (activeElement) {
        const [key, id] = activeElement.id.split("-");
        if (
          key === "card" ||
          key === "next" ||
          key === "origin" ||
          key === "variant"
        ) {
          showDetails(Number(id));
        }
      }
    }
  });
  return main;
}
