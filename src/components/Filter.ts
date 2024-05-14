import getPokemon, { __POKEMON_DATA } from "../utils/getPokemon";
import { PokemonShort, Pokemon, PokemonTypePage } from "../types/Pokemon";
import { setPokemonDataBase } from "../utils/getPokemon";
import { resetSearch } from "./Search";
import { resetCards, injectCards } from "./Cards";
import { sortPokemonData } from "../utils/getPokemon";

const pokemonTypes: PokemonShort[] = (
  await getPokemon({ tail: "type" })
).results.filter((p: PokemonShort) => p.name !== "unknown");

function changeFilter(e: Event) {
  const { value } = e.target as HTMLSelectElement;
  const sortSelect = document.querySelector("#sort") as HTMLSelectElement;
  const sortValue = sortSelect.value as "ZA" | "AZ";
  if (value === "all") {
    resetSearch();
    setPokemonDataBase(() => __POKEMON_DATA);
    sortPokemonData(sortValue);
    resetCards();
    injectCards();
    return;
  }
  const typeURL: string = pokemonTypes.find((t) => {
    return t.name === value;
  })!.url;
  getPokemon({ url: typeURL }).then((data: PokemonTypePage) => {
    resetSearch();
    const pokemonArr: Pokemon[] = data.pokemon.map((p) => p.pokemon);
    setPokemonDataBase(() => pokemonArr);
    sortPokemonData(sortValue);
    resetCards();
    injectCards();
  });
}
console.log(pokemonTypes);

export default function Filter() {
  const filter = document.createElement("select");
  const optionAll = document.createElement("option");
  optionAll.value = "all";
  optionAll.innerText = "all";
  filter.appendChild(optionAll);
  filter.id = "filter";
  pokemonTypes.map((type) => {
    const option = document.createElement("option");
    option.value = type.name;
    option.innerText = type.name;
    filter.appendChild(option);
  });
  filter.addEventListener("change", changeFilter);
  return filter;
}
