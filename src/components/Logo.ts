import styles from "./Logo.module.css";
import logo from "../assets/logo.png";

export default function Logo(): HTMLElement {
  const container = document.createElement("div");
  container.classList.add(styles.container);
  const a = document.createElement("a");
  a.classList.add(styles.logo);
  a.href = "/";
  const img = document.createElement("img");
  img.src = logo;
  a.appendChild(img);
  container.appendChild(a);
  return container;
}
