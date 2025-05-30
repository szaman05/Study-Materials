import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import Headers from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookit App | Book a Room',
  description: 'Book a meeting or conference room for your team',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <Headers />
          {children}
        </main>
      </body>
    </html>
  );
}
