import "./theme/main.css";
import "./theme/typography.css";
import "./theme/colors.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Main from "./components/Main";
import setTheme from "./utils/setTheme";
setTheme();

const app = document.querySelector("#app") as HTMLDivElement;
app.appendChild(Header());
app.appendChild(Main());
app.appendChild(Footer());
