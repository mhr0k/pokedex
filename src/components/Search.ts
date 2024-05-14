import styles from "./Search.module.css";

export default function Search(): HTMLInputElement {
  const search = document.createElement("input");
  search.type = "text";
  search.classList.add(styles.search);
  return search;
}
