export type Pokemon = {
  name: string;
  sprites: { other: { dream_world: { front_default: string } } };
};
export type PokemonShort = { name: string; url: string };
export type PageResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
};
export type SearchParams = {
  offset?: number;
  limit?: number;
};
