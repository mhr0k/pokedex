import styles from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search";
import Toggle from "./Toggle";

export default function Header(): string {
  return `
  <header class="${styles.header}"}>
    ${Logo()}
    ${Search()}
    ${Toggle()}
  </header>
  `;
}
