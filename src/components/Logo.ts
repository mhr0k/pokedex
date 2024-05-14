import styles from "./Logo.module.css";
import logo from "../../public/logo.png";

export default function Logo(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add(styles.container);
  const a = document.createElement("a");
  a.classList.add(styles.logo);
  a.href = "/";
  a.setAttribute("tabindex", "0");
  const img = document.createElement("img");
  img.src = logo;
  img.alt = "Pokedex";
  a.appendChild(img);
  container.appendChild(a);
  return container;
}
