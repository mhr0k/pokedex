import getPokemon from "./getPokemon";
import { Pokemon, PokemonShort, PokemonPage } from "../types/Pokemon";

export default async function getCardData() {
  const container = document.querySelector("#cards") as HTMLElement;
  const renderedCards = container?.children.length || 0;
  const offset = renderedCards;
  const limit = 20;
  const page: PokemonPage = await getPokemon({
    offset: offset,
    limit: limit,
    tail: "pokemon",
  });
  const pokemonArr: Pokemon[] = await Promise.all(
    page.results.map((p: PokemonShort) => {
      return getPokemon({ url: p.url });
    })
  );
  return pokemonArr;
}
