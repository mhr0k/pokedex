import styles from "./Cards.module.css";

type Pokemon = { name: string };

export default function Cards(data: Pokemon[]): string {
  const arr = data.map(
    (pokemon) => `
      <section class="${styles.container}">
        <article class="${styles.card}">
          <p class="${styles.title}">${pokemon.name}</p>    
        </article>
      </section>
    `
  );
  return arr.join("");
}
