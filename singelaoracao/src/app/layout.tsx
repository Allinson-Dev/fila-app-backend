import './globals.css'; // <-- Esta linha é obrigatória!
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Singela Oração | Terços Artesanais',
  description: 'Terços artesanais confeccionados com devoção e carinho.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-brand-pearl text-brand-coffee antialiased selection:bg-brand-rose/30">
        {children}
      </body>
    </html>
  );
}