import StyledComponentsRegistry from '@/lib/registry';
import Providers from '@/lib/providers';
import { Header } from '@/components/Header';

export const metadata = {
  title: 'Pokémon Explorer',
  description: 'Aplicação de referência Pokémon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#f4f4f9' }}>
        <StyledComponentsRegistry>
          <Providers>
            <Header />
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
              {children}
            </main>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}