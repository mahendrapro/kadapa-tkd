'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { href: '/events',  label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-red-900/10' : 'bg-transparent'
      }`}
    >
      {/* Top belt stripe */}
      <div className="belt-stripe w-full" />

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-display font-black text-lg group-hover:scale-110 transition-transform">
              태
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-gold" />
          </div>
          <div>
            <div className="font-display font-bold text-sm leading-tight tracking-wide text-white">
              KADAPA TAE KWON DO
            </div>
            <div className="text-[10px] text-brand-gold tracking-widest uppercase font-body">
              Club · Est. 2010
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-body font-500 tracking-widest text-xs uppercase transition-all relative group ${
                  pathname === href ? 'text-brand-red' : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-brand-red transition-all ${
                  pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-red text-white px-5 py-2 text-xs font-body font-600 uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              Join Now
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-black/98 backdrop-blur px-6 pb-6 flex flex-col gap-5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-body text-sm uppercase tracking-widest transition-colors ${
                pathname === href ? 'text-brand-red' : 'text-white/80'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red text-white text-center py-3 text-xs font-body font-600 uppercase tracking-widest"
          >
            Join Now
          </a>
        </div>
      </div>
    </header>
  );
}
