import styles from "./Details.module.css";
import { Pokemon } from "../types/Pokemon";

export default function Details(p: Pokemon) {
  const overlay = document.createElement("div");
  overlay.classList.add(styles.overlays);
  const container = document.createElement("article");
  container.classList.add(styles.container);
  container.id = "details";
  return overlay;
}
