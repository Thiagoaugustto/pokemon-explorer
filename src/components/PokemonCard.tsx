'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { usePokemonDetails } from '@/hooks/usePokemon';
import { useCollectionStore } from '@/store/useCollectionStore';
import { PokemonCardSkeleton } from './PokemonCardSkeleton';
import { getPokemonSprite, isGrassType, getTypeColors } from '@/utils/pokemon';

interface PokemonCardProps {
  name: string;
}

export function PokemonCard({ name }: PokemonCardProps) {
  const { data, isLoading } = usePokemonDetails(name);
  const { catchPokemon, releasePokemon, isCaught } = useCollectionStore();

  if (isLoading) return <PokemonCardSkeleton />;
  if (!data) return null;

  const isGrass = isGrassType(data);
  const imageUrl = getPokemonSprite(data);
  const caught = isCaught(name);

  const handleCatchClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (caught) {
      releasePokemon(name);
    } else {
      catchPokemon(name);
    }
  };

  return (
    <CardLink href={`/pokemon/${name}`}>
      <Card>
        <ImageContainer>
          {isGrass && (
            <ShinyBadge title="Shiny Form" aria-label="Shiny Form">✨</ShinyBadge>
          )}
          <PokemonImage src={imageUrl} alt={name} />
        </ImageContainer>

        <ContentSection>
          <Name>{name}</Name>

          <TypesContainer>
            {data.types.map((t) => {
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
          </TypesContainer>

          <CatchButton $caught={caught} onClick={handleCatchClick}>
            {caught ? 'Release' : 'Catch'}
          </CatchButton>
        </ContentSection>
      </Card>
    </CardLink>
  );
}

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ShinyBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  font-size: 20px;
  cursor: help;
`;

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 12px;
`;

const Name = styled.h3`
  text-transform: capitalize;
  margin: 0 0 10px 0;
  color: #1d1d1f;
  font-size: 20px;
  font-weight: 800;
  text-align: left;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const TypeTag = styled.span<{ $bg: string; $color: string }>`
  background-color: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 6px;
  text-transform: capitalize;
`;

const CatchButton = styled.button<{ $caught?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  border: 1.5px solid ${(props) => (props.$caught ? '#ff3b30' : '#2a75bb')};
  color: ${(props) => (props.$caught ? '#ff3b30' : '#2a75bb')};
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$caught ? 'rgba(255, 59, 48, 0.08)' : 'rgba(42, 117, 187, 0.08)'};
  }
`;