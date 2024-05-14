import styles from "./Details.module.css";
import { Pokemon } from "../types/Pokemon";

export default function Details(p: Pokemon) {
  const details = document.createElement("div");
  details.classList.add(styles.container);
  const article = document.createElement("article");
  article.classList.add(styles.article);
  return details;
}
