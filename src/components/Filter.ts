import styles from './Filter.module.css';
import getPokemon from '../utils/getPokemon.ts';
import { PokemonShort, Pokemon, PokemonTypePage } from '../types/Pokemon.ts';
import { resetSearch } from './Search.ts';
import { resetCards, injectCards } from './Cards.ts';
import { hideDetails } from './Main.ts';
import { POKEMON } from '../utils/getPokemon.ts';

const pokemonTypes: PokemonShort[] = (
  await getPokemon({ tail: 'type' })
).results.filter((p: PokemonShort) => p.name !== 'unknown');

function changeFilter(e: Event) {
  const { value } = e.target as HTMLSelectElement;
  const sortSelect = document.querySelector('#sort') as HTMLSelectElement;
  const sortValue = sortSelect.value as 'ZA' | 'AZ';
  if (value === 'all') {
    resetSearch();
    POKEMON.resetFilter();
    POKEMON.sort(sortValue);
    hideDetails();
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
    POKEMON.setFilter(() => pokemonArr);
    POKEMON.sort(sortValue);
    hideDetails();
    resetCards();
    injectCards();
  });
}

export default function Filter() {
  const filter = document.createElement('select');
  filter.classList.add(styles.filter);
  const optionAll = document.createElement('option');
  optionAll.value = 'all';
  optionAll.innerText = 'all';
  filter.appendChild(optionAll);
  filter.id = 'filter';
  filter.setAttribute('aria-label', 'Filter by type');
  pokemonTypes.map((type) => {
    const option = document.createElement('option');
    option.value = type.name;
    option.innerText = type.name;
    filter.appendChild(option);
  });
  filter.addEventListener('change', changeFilter);
  return filter;
}
