import styles from "./Logo.module.css";
import logo from "../assets/logo.png";

export default function Logo(): HTMLAnchorElement {
  const a = document.createElement("a");
  const logoElement = document.createElement("img");
  logoElement.src = logo;
  logoElement.classList.add(styles.logo);
  a.appendChild(logoElement);
  return a;
}
