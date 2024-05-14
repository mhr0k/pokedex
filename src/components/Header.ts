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
  const settings = document.createElement("div");
  settings.classList.add(styles.settings);
  header.appendChild(settings);
  settings.appendChild(Toggle());
  settings.appendChild(Sort());
  settings.appendChild(Filter());
  return header;
}
