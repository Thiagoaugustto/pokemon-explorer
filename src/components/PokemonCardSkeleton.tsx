'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-color: #f2f2f2;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f2f2f2;
  }
`;

const SkeletonCard = styled.div`
  min-height: 335px;
  border-radius: 12px;
  padding: 15px;
  box-sizing: border-box;
  animation: ${pulse} 1.5s infinite ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
`;

export function PokemonCardSkeleton() {
  return <SkeletonCard />;
}