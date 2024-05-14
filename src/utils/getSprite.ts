import { Pokemon } from "../types/Pokemon";

export default function getSprite(p: Pokemon) {
  return (
    p.sprites.other.dream_world.front_default ||
    p.sprites.other["official-artwork"].front_default ||
    p.sprites.front_default
  );
}
