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
  species: {
    name: string;
    url: string;
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
export type Species = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
};
export type EvolutionChain = {
  chain: EvolutionStep;
};
export type EvolutionStep = {
  evolution_details: [];
  evolves_to: [EvolutionStep];
  is_baby: boolean;
  species: { name: string; url: string };
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
