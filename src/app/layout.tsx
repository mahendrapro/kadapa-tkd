import type { Metadata } from 'next';
import { Playfair_Display, Barlow } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AnnouncementBar from '@/components/AnnouncementBar';
import { getAnnouncements } from '@/lib/content';

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-display', 
  weight: ['400','700','900'] 
});

const barlow = Barlow({ 
  subsets: ['latin'], 
  variable: '--font-body', 
  weight: ['300','400','500','600','700'] 
});

export const metadata: Metadata = {
  title: 'Kadapa Tae Kwon Do Club | YSR Kadapa District',
  description: 'Kadapa Tae Kwon Do Club — Affiliated to District Taekwondo Association, YSR Kadapa District. Training since 2010 under Master Vijay Bhaskar Reddy, 4th Dan Black Belt.',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const announcements = getAnnouncements();
  const hasAnnouncements = announcements.length > 0;

  return (
    <html lang="en" className={`${playfair.variable} ${barlow.variable}`}>
      <head>
        {/* ✅ Netlify Identity Script (REQUIRED FOR CMS LOGIN) */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className="bg-brand-light text-brand-dark font-body antialiased logo-watermark">
        <AnnouncementBar announcements={announcements} />
        <Navbar hasAnnouncements={hasAnnouncements} />
        
        <main className="relative z-10">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
