import styles from "./Logo.module.css";

export default function Logo(): string {
  return `
    <a href="" class="${styles.text}" id="logo">Pokédex</a>
  `;
}
