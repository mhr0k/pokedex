import "./theme/main.css";
import "./theme/typography.css";
import "./theme/colors.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import setTheme from "./utils/setTheme";
setTheme();

const app = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `
${Header()}
<main>
${Cards([{ name: "Pikachu" }])}
</main>
${Footer()}
`;

import setupThemeToggler from "./utils/setupThemeToggler";
setupThemeToggler();
