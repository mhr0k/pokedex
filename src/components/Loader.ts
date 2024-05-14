import styles from "./Loader.module.css";

const _loading = { state: false };
export const loading = new Proxy(_loading, {
  set(_target, prop, value) {
    if (prop === "state" && value === true) {
      document.querySelector("#loader")?.classList.remove("hidden");
      return Reflect.set(_target, prop, value);
    } else {
      document.querySelector("#loader")?.classList.add("hidden");
      return Reflect.set(_target, prop, value);
    }
  },
});

export default function Loader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.classList.add(styles.loader);
  loader.classList.add("hidden");
  return loader;
}
