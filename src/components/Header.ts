import styles from './Header.module.css';
import Logo from './Logo.ts';
import Search from './Search.ts';
import Toggle from './Toggle.ts';
import Sort from './Sort.ts';
import Filter from './Filter.ts';

export default function Header(): HTMLElement {
  const header = document.createElement('header');
  header.classList.add(styles.header);
  header.appendChild(Logo());
  header.appendChild(Search());
  const controls = document.createElement('div');
  controls.classList.add(styles.controls);
  header.appendChild(controls);
  controls.appendChild(Filter());
  controls.appendChild(Sort());
  controls.appendChild(Toggle());
  return header;
}
