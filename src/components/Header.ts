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
  header.appendChild(Toggle());
  header.appendChild(Sort());
  header.appendChild(Filter());
  return header;
}
