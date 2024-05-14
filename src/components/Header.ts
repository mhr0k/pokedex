import styles from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search";
import Toggle from "./Toggle";
import Sort from "./Sort";
import Filter from "./Filter";

export default function Header(): HTMLElement {
  const header = document.createElement("header");
  header.classList.add(styles.header);
  header.appendChild(Logo());
  header.appendChild(Search());
  const controls = document.createElement("div");
  controls.classList.add(styles.controls);
  header.appendChild(controls);
  controls.appendChild(Filter());
  controls.appendChild(Sort());
  controls.appendChild(Toggle());
  return header;
}
