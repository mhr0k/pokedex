import getPokemon from "./getPokemon";
import { Pokemon, PokemonShort, PokemonPage } from "../types/Pokemon";

export default async function getCardData() {
  const container = document.querySelector("#cards") as HTMLElement;
  const renderedCards = container?.children.length || 0;
  const limit = (window.innerHeight * window.innerWidth) / 62500;
  const offset = renderedCards;
  const page: PokemonPage = await getPokemon({
    offset: offset,
    limit: limit,
  });
  const pokemonArr: Pokemon[] = await Promise.all(
    page.results.map((p: PokemonShort) => {
      return getPokemon({ url: p.url });
    })
  );
  return pokemonArr;
}
