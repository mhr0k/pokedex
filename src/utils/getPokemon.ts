import { SearchOptions } from "../types/Pokemon";

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
    return data;
  } catch (e) {
    console.error(e);
  }
}

const _POKEMON = (await getPokemon({ limit: 10000 })).results;

export const POKEMON = {
  index: 0,
  filter: [..._POKEMON],
  resetFilter() {
    this.filter = [..._POKEMON];
  },
  setFilter(cb: Function) {
    this.filter = [...cb(this.filter)];
  },
  crop: _POKEMON,
  resetCrop() {
    this.crop = [...this.filter];
  },
  setCrop(cb: Function) {
    this.crop = [...cb(this.filter)];
  },
  sort(d: "AZ" | "ZA") {
    if (d === "ZA") {
      this.filter.sort((a: { name: string }, b: { name: string }) => {
        return b.name.localeCompare(a.name);
      });
    } else {
      this.filter.sort((a: { name: string }, b: { name: string }) => {
        return a.name.localeCompare(b.name);
      });
    }
    this.resetCrop();
  },
};
POKEMON.sort("AZ");
