'use client';

import { use } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePokemonDetails } from '@/hooks/usePokemon';
import { useCollectionStore } from '@/store/useCollectionStore';
import { getPokemonSprite, isGrassType, getTypeColors } from '@/utils/pokemon';

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function PokemonDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pokemonName = resolvedParams.name;

  const { data: pokemon, isLoading, error } = usePokemonDetails(pokemonName);
  const { isCaught, catchPokemon, releasePokemon, collection } = useCollectionStore();

  if (isLoading) {
    return <LoadingState>Loading Pokémon details...</LoadingState>;
  }

  if (error || !pokemon) {
    return <ErrorState>Pokémon not found.</ErrorState>;
  }

  const caught = isCaught(pokemon.name);
  const caughtData = collection.find((p) => p.name === pokemon.name);

  const isGrass = isGrassType(pokemon);
  const spriteUrl = getPokemonSprite(pokemon);

  const handleToggleCatch = () => {
    if (caught) {
      releasePokemon(pokemon.name);
    } else {
      catchPokemon(pokemon.name);
    }
  };

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

      <Card>
        <ImageSection>
          {isGrass && (
            <ShinyBadge title="Shiny Form" aria-label="Shiny Form">
              ✨
            </ShinyBadge>
          )}
          <PokemonImage src={spriteUrl} alt={pokemon.name} />
        </ImageSection>

        <InfoSection>
          <Header>
            <PokemonName>{pokemon.name}</PokemonName>
          </Header>

          <DetailGrid>
            <DetailItem>
              <Label>Height</Label>
              <Value>{pokemon.height / 10} m</Value>
            </DetailItem>

            <DetailItem>
              <Label>Types</Label>
              <TagsContainer>
                {pokemon.types.map((t) => {
                  const colors = getTypeColors(t.type.name);
                  return (
                    <TypeTag
                      key={t.type.name}
                      $bg={colors.bg}$color={colors.text}
                    >
                      {t.type.name}
                    </TypeTag>
                  );
                })}
              </TagsContainer>
            </DetailItem>

            <DetailItem>
              <Label>Abilities</Label>
              <TagsContainer>
                {pokemon.abilities.map((a) => (
                  <AbilityTag key={a.ability.name}>
                    {a.ability.name.replace('-', ' ')}
                  </AbilityTag>
                ))}
              </TagsContainer>
            </DetailItem>

            {caught && caughtData && (
              <DetailItem>
                <Label>Caught on</Label>
                <Text>
                  {new Date(caughtData.caughtAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </DetailItem>
            )}
          </DetailGrid>

          <CatchButton $isCaught={caught} onClick={handleToggleCatch}>
            {caught ? 'Release Pokémon' : 'Catch Pokémon'}
          </CatchButton>
        </InfoSection>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
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

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
`;

const PokemonImage = styled.img`
  width: 220px;
  height: 220px;
  object-fit: contain;
`;

const ShinyBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  backdrop-filter: blur(4px);
  font-size: 30px;
  cursor: help;
`;

const InfoSection = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PokemonName = styled.h1`
  font-size: 32px;
  font-weight: 800;
  text-transform: capitalize;
  margin: 0;
  color: #1d1d1f;
`;

const CatchButton = styled.button<{ $isCaught: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border: 1.5px solid ${(props) => (props.$isCaught ? '#ff3b30' : '#2a75bb')};
  color: ${(props) => (props.$isCaught ? '#ff3b30' : '#2a75bb')};
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isCaught ? 'rgba(255, 59, 48, 0.08)' : 'rgba(42, 117, 187, 0.08)'};
  }
`;

const DetailGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1d1d1f;
`;

const Text = styled.span`
  font-size: 14px;
  color: #1d1d1f;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TypeTag = styled.span<{ $bg: string; $color: string }>`
  background-color: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 14px;
  text-transform: capitalize;
  font-weight: 600;
`;

const AbilityTag = styled.span`
  background: #f2f2f7;
  color: #48484a;
  border: 1px solid #e5e5ea;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 13px;
  text-transform: capitalize;
  font-weight: 500;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
  color: #86868b;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
  color: #ff3b30;
`;