import type { Metadata } from 'next';
import { Playfair_Display, Barlow, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
});

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
});

const notoKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-korean',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Kadapa Tae Kwon Do Club | Affiliated to District Taekwondo Association',
  description:
    'Kadapa Tae Kwon Do Club — Affiliated to District Taekwondo Association, YSR Kadapa District. 30+ Years of Expertise. Training since 2010 under Master Vijay Bhaskar Reddy, 4th Dan Black Belt.',
  keywords: ['Taekwondo', 'Kadapa', 'YSR District', 'Martial Arts', 'Vijay Bhaskar Reddy'],
  openGraph: {
    title: 'Kadapa Tae Kwon Do Club',
    description: '30+ Years of Elite Taekwondo Training in Kadapa',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${barlow.variable} ${notoKr.variable}`}>
      <body className="bg-brand-dark text-brand-white font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
