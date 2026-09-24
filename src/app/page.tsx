import PokemonList from '@/components/PokemonList';

export default function Home() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
      <PokemonList />
    </main>
  );
}