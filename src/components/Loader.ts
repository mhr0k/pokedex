import styles from "./Loader.module.css";

export default function Loader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.classList.add(styles.loader);
  loader.classList.add("hidden");
  return loader;
}
