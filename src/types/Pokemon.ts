export type Pokemon = {
  abilities: { ability: { name: string; url: string } }[];
  base_experience: number;
  cries: { latest: string; legacy: string };
  name: string;
  id: number;
  types: { slot: number; type: { name: string; url: string } }[];
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
export type SearchOptions = {
  url?: string;
  tail?: string;
  offset?: number;
  limit?: number;
};
export type Ability = {
  effect_entries: {
    effect: string;
    language: { name: string };
    short_effect: string;
  }[];
  name: string;
};
export type PokemonTypePage = {
  damage_relations: {
    double_damage_from: Damage[];
    double_damage_to: Damage[];
    half_damage_from: Damage[];
    half_damage_to: Damage[];
    no_damage_from: Damage[];
    no_damage_to: Damage[];
  };
  name: string;
  pokemon: { pokemon: Pokemon }[];
};
export type Damage = {
  name: string;
  url: string;
};
