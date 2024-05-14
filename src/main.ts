import "./styles/main.css";
import Cards from "./components/Cards";

const sampleCards = [{ name: "Pikachu" }, { name: "Ditto" }];

const app = document.querySelector("#app") as HTMLDivElement;

app.innerHTML = `${Cards(sampleCards)}`;
