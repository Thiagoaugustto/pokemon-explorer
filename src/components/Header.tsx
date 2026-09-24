'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { useCollectionStore } from '@/store/useCollectionStore';

export function Header() {
  const { collection } = useCollectionStore();

  return (
    <NavHeader>
      <NavContainer>
        <LogoLink href="/">
          <Title>Pokémon Explorer</Title>
        </LogoLink>

        <NavLinks>
          <NavLink href="/collection">
            Pokédex <Badge>{collection.length}</Badge>
          </NavLink>
        </NavLinks>
      </NavContainer>
    </NavHeader>
  );
}

const NavHeader = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #e5e5e7;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  color: #1d1d1f;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #1d1d1f;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;

  &:hover {
    color: #0071e3;
  }
`;

const Badge = styled.span`
  background: #ff3b30;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
`;