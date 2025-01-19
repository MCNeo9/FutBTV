import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'FutBTV - Fútbol en Vivo',
  description: 'Mira tus partidos de fútbol favoritos en vivo',
  openGraph: {
    type: 'website',
    title: 'FutBTV - Fútbol en Vivo y Deportes',
    description: 'Descubre cómo ver tus partidos de fútbol favoritos en vivo con FutBTV.',
    url: baseUrl,
    siteName: 'FutBTV',
    images: [
      {
        url: `${baseUrl}/LogoFutBTV.svg`, 
        width: 1200,
        height: 630,
        alt: 'FutBTV - Fútbol en Vivo y Deportes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@futbtv', 
    title: 'FutBTV - Fútbol en Vivo',
    description: 'Mira fútbol y deportes en vivo con FutBTV. Partidos de todas las ligas, canales y horarios.',
    images: [
      `${baseUrl}/LogoFutBTV.svg`, 
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/LogoFutBTV.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
