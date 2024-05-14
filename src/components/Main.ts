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
    const details = Details(pokemon);
    const scroll = main.scrollTop;
    cards?.remove();
    main.appendChild(details);
    if (!p) {
      history.pushState({ scroll: scroll, id: pokemon.id }, "", pokemon.name);
      console.log("triggered !p", history.state.scroll);
    }
    if (p === "replace") {
      console.log("triggered replace", history.state.scroll);
      history.replaceState({ id: pokemon.id }, "", pokemon.name);
    }
  }
}

export function hideDetails(p?: "pop") {
  const main = document.querySelector("main") as HTMLElement;
  const details = document.querySelector("#details") as HTMLElement;
  const scroll = history.state.scroll;
  if (details) {
    details.remove();
    main.appendChild(cards);
    if (scroll) main.scrollTop = scroll;
    if (!p) {
      history.pushState({}, "", "/");
    }
  }
  renderMoreCardsCheck();
}

export function loadingIndicator(a: "show" | "hide") {
  const main = document.querySelector("main") as HTMLElement;
  if (a === "show") {
    const loading = document.createElement("div");
    loading.id = "loadingIndicator";
    loading.classList.add(styles.loadingIndicator);
    main?.appendChild(loading);
  } else if (a === "hide") {
    const loading = main?.querySelector("#loadingIndicator");
    if (loading) {
      main?.removeChild(loading);
    }
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
  });
  return main;
}
