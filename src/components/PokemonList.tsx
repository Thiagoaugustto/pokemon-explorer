'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { usePokemonList } from '@/hooks/usePokemon';
import { PokemonCard } from './PokemonCard';
import { PokemonCardSkeleton } from './PokemonCardSkeleton';
import { Pagination } from './Pagination';

export default function PokemonList() {
  const [offset, setOffset] = useState<number>(0);

  const CARDS_PER_PAGE = 16;

  const { data, isLoading } = usePokemonList(CARDS_PER_PAGE, offset);

  const currentPage = Math.floor(offset / CARDS_PER_PAGE) + 1;
  const totalPages = data ? Math.ceil(data.count / CARDS_PER_PAGE) : 1;

  const handlePageChange = (page: number) => {
    setOffset((page - 1) * CARDS_PER_PAGE);
  };

  const renderGridContent = () => {
    if (isLoading) {
      return Array.from({ length: CARDS_PER_PAGE }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ));
    }

    return data?.results.map((pokemon) => (
      <PokemonCard key={pokemon.name} name={pokemon.name} />
    ));
  };

  return (
    <div>
      <Grid>{renderGridContent()}</Grid>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;