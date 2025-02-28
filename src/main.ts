import './theme/main.css';
import './theme/typography.css';
import './theme/colors.css';
import Modal from './components/Modal';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Loader from './components/Loader';
import setTheme from './utils/setTheme';
import './utils/historyPop.ts';
setTheme();

const app = document.querySelector('#app') as HTMLDivElement;
app.appendChild(Modal());
app.appendChild(Header());
app.appendChild(Main());
app.appendChild(Loader());
app.appendChild(Footer());
