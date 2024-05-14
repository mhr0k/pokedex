import "./main.css";
import Logo from "./components/Logo";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Search from "./components/Search";
import ThemeSwitcher from "./components/ThemeSwitcher";
import setTheme from "./utils/setTheme";
setTheme();

const app = document.querySelector("#app") as HTMLDivElement;
app.innerHTML = `
  <div class="navbar">
    ${Logo()}
    ${ThemeSwitcher()}
    ${Search()}
  </div>
  <main>
    ${Cards([{ name: "Pikachu" }])}
  </main>
  ${Footer()}
`;
