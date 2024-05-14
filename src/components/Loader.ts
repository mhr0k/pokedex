import styles from "./Loader.module.css";

export const loading = new Proxy(
  { state: false },
  {
    set(_target, key, value) {
      if (key === "state" && value === true) {
        document.querySelector("#loader")?.classList.remove("hidden");
      } else {
        document.querySelector("#loader")?.classList.add("hidden");
      }
      Reflect.set(_target, key, value);
      return true;
    },
  }
);

export default function Loader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.classList.add(styles.loader);
  return loader;
}
