import { useQuery } from '@tanstack/react-query';
import { PokemonDetails, PokemonListResponse } from '@/types/pokemon';

export function usePokemonList(limit = 20, offset = 0) {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemons', limit, offset],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

      if (!res.ok) {
        throw new Error('Failed to load Pokémon list');
      }

      return res.json();
    },
  });
}

export function usePokemonDetails(name: string) {
  return useQuery<PokemonDetails>({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

      if (!res.ok) {
        throw new Error('Failed to load Pokémon details');
      }

      return res.json();
    },
    enabled: !!name,
  });
}