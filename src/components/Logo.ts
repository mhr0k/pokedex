import styles from "./Logo.module.css";
import logo from "../assets/logo.png";

export default function Logo(): HTMLAnchorElement {
  const a = document.createElement("a");
  a.classList.add(styles.logo);
  a.href = "/";
  const img = document.createElement("img");
  img.src = logo;
  img.classList.add(styles.img);
  a.appendChild(img);
  return a;
}
