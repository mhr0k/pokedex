import styles from "./Logo.module.css";
import logo from "../assets/logo.png";

export default function Logo(): HTMLImageElement {
  const logoElement = document.createElement("img");
  logoElement.src = logo;
  logoElement.classList.add(styles.logo);
  return logoElement;
}
