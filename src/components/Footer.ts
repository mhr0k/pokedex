import styles from "./Footer.module.css";

export default function Footer(): HTMLElement {
  const footer = document.createElement("footer");
  footer.innerHTML = `<p class="${styles.text}">Pokédex — by Maciej Polski</p>`;
  return footer;
}
