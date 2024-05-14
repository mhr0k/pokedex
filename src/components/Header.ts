import styles from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search";
import Toggle from "./Toggle";

export default function Header(): HTMLElement {
  const header = document.createElement("header");
  header.classList.add(styles.header);
  header.appendChild(Logo());
  header.appendChild(Search());
  header.appendChild(Toggle());
  return header;
}
