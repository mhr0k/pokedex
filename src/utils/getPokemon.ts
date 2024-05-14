import { SearchParams } from "../types/Pokemon";

export default async function fetchPokemon(tail: string, params: SearchParams) {
  const head = "https://pokeapi.co/api/v2/";
  const url = new URL(head + tail);
  if (params?.offset) {
    url.searchParams.set("offset", `${params.offset}`);
  }
  if (params?.limit) {
    url.searchParams.set("limit", `${params.limit}`);
  }

  const response = await fetch(url);
  const data: { count: number } = await response.json();
  console.log(data);
  return data;
}
