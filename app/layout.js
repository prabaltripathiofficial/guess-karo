import { Baloo_2, Inter } from 'next/font/google';
import './globals.css';

const display = Baloo_2({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Guess Karo · How many can you get in 90 seconds?',
  description: 'Guess the character from funny clues. Fewer hints, more points. 90 seconds on the clock.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#170d2e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <header className="topbar">
          <a className="logo" href="/">
            Guess<span>Karo</span>
          </a>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          Made for learning open source ·{' '}
          <a href="https://github.com/prabaltripathiofficial/guess-karo" target="_blank" rel="noopener noreferrer">
            Contribute on GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}
