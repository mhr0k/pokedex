import styles from "./Logo.module.css";
import logo from "../assets/logo.png";

export default function Logo(): string {
  return `<img src="${logo}" class="${styles.logo}"/>`;
}
