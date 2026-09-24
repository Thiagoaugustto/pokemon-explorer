'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useCollectionStore } from '@/store/useCollectionStore';
import { PokemonCard } from '@/components/PokemonCard';

export default function CollectionPage() {
  const { collection } = useCollectionStore();

  if (collection.length === 0) {
    return (
      <EmptyContainer>
        <EmptyTitle>Your collection is empty</EmptyTitle>
        <EmptySubtitle>
          You haven&apos;t caught any Pokémon yet. Explore the Pokédex to start building your team!
        </EmptySubtitle>
        <ExploreButton href="/">Explore List</ExploreButton>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <BackButton href="/">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>Back to List</span>
      </BackButton>

      <Grid>
        {collection.map((item) => (
          <CardItem key={item.name}>
            <PokemonCard name={item.name} />
            <CaughtInfo>
              <CaughtLabel>Caught on</CaughtLabel>
              <CaughtDate>
                {new Date(item.caughtAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </CaughtDate>
            </CaughtInfo>
          </CardItem>
        ))}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
  color: #1d1d1f;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CaughtInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
`;

const CaughtLabel = styled.span`
  color: #86868b;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.5px;
`;

const CaughtDate = styled.span`
  color: #1d1d1f;
  font-weight: 600;
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 8px;
`;

const EmptySubtitle = styled.p`
  font-size: 16px;
  color: #86868b;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  background: #0071e3;
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;