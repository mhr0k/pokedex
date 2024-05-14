import { SearchOptions } from "../types/Pokemon";

export default async function fetchPokemon(options: SearchOptions) {
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
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
}
