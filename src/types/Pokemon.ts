export type Pokemon = {
  abilities: {}[];
  base_experience: number;
  name: string;
  id: number;
  types: { slot: number; type: { name: string; utl: string } }[];
  sprites: {
    front_default: string;
    other: {
      dream_world: { front_default: string };
      "official-artwork": { front_default: string };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
};
export type PokemonShort = { name: string; url: string };
export type PokemonPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonShort[];
};
export type PokemonTypePage = { pokemon: { pokemon: Pokemon }[] };
export type SearchOptions = {
  url?: string;
  tail?: string;
  offset?: number;
  limit?: number;
};
