import './globals.css';

export const metadata = {
  title: 'SnapVisual | Soluções Visuais Ágeis',
  description: 'Visual comercial para negócios que querem parecer mais fortes no digital.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}