import { PokemonDetails } from '@/types/pokemon';

export const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  normal: { bg: '#A8A77A', text: '#FFFFFF' },
  fire: { bg: '#EE8130', text: '#FFFFFF' },
  water: { bg: '#6390F0', text: '#FFFFFF' },
  electric: { bg: '#F7D02C', text: '#000000' },
  grass: { bg: '#7AC74C', text: '#FFFFFF' },
  ice: { bg: '#96D9D6', text: '#000000' },
  fighting: { bg: '#C22E28', text: '#FFFFFF' },
  poison: { bg: '#A33EA1', text: '#FFFFFF' },
  ground: { bg: '#E2BF65', text: '#000000' },
  flying: { bg: '#A98FF3', text: '#FFFFFF' },
  psychic: { bg: '#F95587', text: '#FFFFFF' },
  bug: { bg: '#A6B91A', text: '#FFFFFF' },
  rock: { bg: '#B6A136', text: '#FFFFFF' },
  ghost: { bg: '#735797', text: '#FFFFFF' },
  dragon: { bg: '#6F35FC', text: '#FFFFFF' },
  steel: { bg: '#B7B7CE', text: '#000000' },
  fairy: { bg: '#D685AD', text: '#FFFFFF' },
};

export function getTypeColors(type: string) {
  const normalizedType = type.toLowerCase();
  
  return TYPE_COLORS[normalizedType] || { bg: '#8A8A8A', text: '#FFFFFF' };
}

export function getPokemonSprite(pokemon: PokemonDetails): string {
  const isGrass = pokemon.types.some(
    (t) => t.type.name.toLowerCase() === 'grass'
  );

  const variant = isGrass ? 'front_shiny' : 'front_default';

  return (
    pokemon.sprites.other?.['official-artwork']?.[variant] ??
    pokemon.sprites[variant] ??
    pokemon.sprites.front_default
  );
}

export function isGrassType(pokemon: PokemonDetails): boolean {
  return pokemon.types.some((t) => t.type.name.toLowerCase() === 'grass');
}