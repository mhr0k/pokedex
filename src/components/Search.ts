import styles from "./Search.module.css";

export default function Search(): HTMLInputElement {
  const search = document.createElement("input");
  search.type = "text";
  search.classList.add(styles.search);
  search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.dir(`Search: "${search.value}"`);
    }
  });
  return search;
}
