import { SearchOptions } from "../types/Pokemon";
import { PokemonShort } from "../types/Pokemon";

export default async function getPokemon(options: SearchOptions) {
  let url: URL;
  if (options?.url) {
    url = new URL(options.url);
  } else {
    const head = "https://pokeapi.co/api/v2/";
    const tail = options.tail || "pokemon";
    url = new URL(head + tail);
  }
  if (options?.offset) {
    url.searchParams.set("offset", `${options.offset}`);
  }
  if (options?.limit) {
    url.searchParams.set("limit", `${options.limit}`);
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
}

const __POKEMON_DATA: PokemonShort[] = (await getPokemon({ limit: 649 }))
  .results;
export let POKEMON_DATA_SORT: PokemonShort[] = [...__POKEMON_DATA];
export let POKEMON_DATA_FILTER: PokemonShort[] = [...__POKEMON_DATA];
export function setPokemonData(cb: Function) {
  POKEMON_DATA_FILTER = cb();
}
export function resetPokemonData() {
  POKEMON_DATA_FILTER = [...POKEMON_DATA_SORT];
}
export function sortPokemonData(d: "AZ" | "ZA" | "ID") {
  if (d === "AZ") {
    POKEMON_DATA_SORT.sort((a: { name: string }, b: { name: string }) => {
      return a.name.localeCompare(b.name);
    });
  } else if (d === "ZA") {
    POKEMON_DATA_SORT.sort((a: { name: string }, b: { name: string }) => {
      return b.name.localeCompare(a.name);
    });
  } else if (d === "ID") {
    POKEMON_DATA_SORT = [...__POKEMON_DATA];
  }
  resetPokemonData();
}
