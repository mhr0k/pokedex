import { Pokemon } from "../types/Pokemon";

export default function Cards(data: Pokemon[]) {
  const arr = data.map((p) => `<p>${p.name}</p>`);
  return arr.join("");
}
