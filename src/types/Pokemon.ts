export type Pokemon = {
  name: string;
  id: number;
  sprites: { other: { dream_world: { front_default: string } } };
};
export type PokemonShort = { name: string; url: string };
export type PokemonPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
};
export type SearchOptions = {
  url?: string;
  tail?: string;
  offset?: number;
  limit?: number;
};
