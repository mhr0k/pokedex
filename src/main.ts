import './theme/main.css';
import './theme/typography.css';
import './theme/colors.css';
import Modal from './components/Modal.ts';
import Header from './components/Header.ts';
import Footer from './components/Footer.ts';
import Main from './components/Main.ts';
import Loader from './components/Loader.ts';
import setTheme from './utils/setTheme.ts';
import './utils/historyPop.ts';
setTheme();

const app = document.querySelector('#app') as HTMLDivElement;
app.appendChild(Modal());
app.appendChild(Header());
app.appendChild(Main());
app.appendChild(Loader());
app.appendChild(Footer());
