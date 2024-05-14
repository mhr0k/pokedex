import "./theme/main.css";
import "./theme/typography.css";
import "./theme/colors.css";
import Logo from "./components/Logo";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Toggle from "./components/Toggle";
import setTheme from "./utils/setTheme";
setTheme();

const app = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `
    ${Toggle()}
    ${Logo()}
    ${Search()}
  <main>
    ${Cards([{ name: "Pikachu" }])}
  </main>
  ${Footer()}
`;

import setupButtonToggler from "./utils/setupThemeToggler";
setupButtonToggler();
