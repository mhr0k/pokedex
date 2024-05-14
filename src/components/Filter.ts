import getPokemon from "../utils/getPokemon";
import { PokemonShort, Pokemon, PokemonTypePage } from "../types/Pokemon";
import { setPokemonDataBase } from "../utils/getPokemon";
import { resetSearch } from "./Search";
import { resetCards, injectCards } from "./Cards";

const pokemonTypes: PokemonShort[] = (await getPokemon({ tail: "type" }))
  .results;

function changeFilter(e: Event) {
  const { value } = e.target as HTMLSelectElement;
  const typeURL: string = pokemonTypes.find((t) => {
    return t.name === value;
  })!.url;
  getPokemon({ url: typeURL }).then((data: PokemonTypePage) => {
    resetSearch();
    const pokemonArr: Pokemon[] = data.pokemon.map((p) => p.pokemon);
    setPokemonDataBase(() => pokemonArr);
    resetCards();
    injectCards();
  });
}

export default function Filter() {
  const filter = document.createElement("select");
  pokemonTypes.map((type) => {
    const option = document.createElement("option");
    option.value = type.name;
    option.innerText = type.name;
    filter.appendChild(option);
  });
  filter.addEventListener("change", changeFilter);
  return filter;
}
