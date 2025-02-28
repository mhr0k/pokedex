import styles from './Modal.module.css';

export default function Modal(): HTMLDivElement {
  const backdrop = document.createElement('div');
  backdrop.classList.add(styles.backdrop);

  const modal = document.createElement('div');
  modal.classList.add(styles.modal);
  modal.id = 'modal';

  const info = document.createElement('p');
  info.classList.add(styles.info);
  info.innerHTML =
    '<p>This website was created as a fun experiment with <b>pure Vanilla JS</b>,<wbr> with no framework or external libraries,<wbr> using component architecture and CSS modules.<wbr> Pokemon data is fetched from PokéAPI</p>';
  modal.appendChild(info);

  const button = document.createElement('button');
  button.classList.add(styles.button);
  button.toggleAttribute('autofocus', true);
  button.innerText = 'Wow, amazing!';
  const handleClick = () => {
    backdrop.remove();
  };
  button.addEventListener('click', handleClick);
  modal.appendChild(button);

  backdrop.appendChild(modal);
  return backdrop;
}
