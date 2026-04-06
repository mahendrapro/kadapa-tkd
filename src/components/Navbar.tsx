'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Navbar({ hasAnnouncements = false }: { hasAnnouncements?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Offset for announcement bars: ticker(32px) + up to 2 pinned bars(~36px each)
  const topStyle = hasAnnouncements ? { top: '64px' } : { top: '0px' };

  return (
    <header
      style={topStyle}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-sm shadow-md shadow-black/10'
          : 'bg-white/90 backdrop-blur-sm shadow-sm shadow-black/5'
      }`}
    >
      <div className="belt-stripe w-full" />
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Kadapa TKD"
            className="w-12 h-12 object-contain rounded-full border-2 border-brand-red group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="font-display font-bold text-sm leading-tight text-brand-dark">
              KADAPA TAE KWON DO
            </div>
            <div className="text-[10px] text-brand-red tracking-widest uppercase font-body font-semibold">
              Club · Est. 2010 · YSR Kadapa
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-body text-xs uppercase tracking-widest font-semibold transition-all relative group ${
                  pathname === href
                    ? 'text-brand-red'
                    : 'text-brand-dark/70 hover:text-brand-red'
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-red transition-all ${
                  pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
              target="_blank" rel="noopener noreferrer"
              className="bg-brand-red text-white px-5 py-2 text-xs font-body font-semibold uppercase tracking-widest hover:bg-red-700 transition-colors rounded-sm"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 flex flex-col gap-1.5" aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-brand-dark transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-dark transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-dark transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 px-6 pb-6 flex flex-col gap-4 pt-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`text-sm uppercase tracking-widest font-semibold font-body transition-colors ${
                pathname === href ? 'text-brand-red' : 'text-brand-dark/70'
              }`}>
              {label}
            </Link>
          ))}
          <a href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
            target="_blank" rel="noopener noreferrer"
            className="bg-brand-red text-white text-center py-3 text-xs font-semibold uppercase tracking-widest rounded-sm">
            Join Now
          </a>
        </div>
      </div>
    </header>
  );
}
