import "./theme/main.css";
import "./theme/typography.css";
import "./theme/colors.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import getPokemon from "./utils/getPokemon";
import setTheme from "./utils/setTheme";
setTheme();

const data = await getPokemon(new URL("https://pokeapi.co/api/v2/pokemon"));

const app = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `
${Header()}
<main>
${Cards(data.results)}
</main>
${Footer()}
`;

import setupThemeToggler from "./utils/setupThemeToggler";
setupThemeToggler();
