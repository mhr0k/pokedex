import { resetCards, injectCards } from './Cards.ts';
import { resetSearch } from './Search.ts';
import { hideDetails } from './Main.ts';
import { POKEMON } from '../utils/getPokemon.ts';

function changeSorting(e: Event) {
  const target = e.target as HTMLSelectElement;
  const value = target.value as 'ZA' | 'AZ';
  resetSearch();
  hideDetails();
  resetCards();
  POKEMON.sort(value);
  injectCards();
}

export default function Sort() {
  const sort = document.createElement('select');
  sort.id = 'sort';
  sort.innerHTML = `
  <option value="AZ">A-Z</option>
  <option value="ZA">Z-A</option>
  `;
  sort.setAttribute('aria-label', 'sort');
  const label = document.createElement('label');
  label.appendChild(sort);
  sort.addEventListener('change', changeSorting);
  return label;
}
