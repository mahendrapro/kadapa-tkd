import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="belt-stripe w-full" />
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-display font-black text-lg">태</div>
            <div>
              <div className="font-display font-bold text-sm text-white tracking-wide">KADAPA TAE KWON DO</div>
              <div className="text-[10px] text-brand-gold tracking-widest uppercase">Club · Est. 2010</div>
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed font-body">
            Affiliated to District Taekwondo Association, YSR Kadapa District. Building champions since 2010.
          </p>
          <div className="mt-4 text-white/30 text-xs font-body tracking-widest uppercase">
            태권도 — The Way of the Foot and Fist
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-white mb-4 tracking-wide">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About & Master' },
              { href: '/events', label: 'Events' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/admin', label: 'CMS Admin' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-white/50 hover:text-brand-red text-sm font-body transition-colors tracking-wide">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-white mb-4 tracking-wide">Contact & Training</h4>
          <div className="space-y-3 text-sm font-body">
            <div className="flex gap-3">
              <span className="text-brand-red mt-0.5">📍</span>
              <span className="text-white/60">DSA Municipal Stadium, Kadapa, YSR Kadapa District, Andhra Pradesh</span>
            </div>
            <div className="flex gap-3">
              <span className="text-brand-red">🕐</span>
              <span className="text-white/60">5:00 AM – 7:00 AM · Every Day</span>
            </div>
            <div className="flex gap-3">
              <span className="text-brand-red">📞</span>
              <a href="tel:+918522833600" className="text-white/60 hover:text-brand-red transition-colors">+91 85228 33600</a>
            </div>
            <a
              href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 text-xs uppercase tracking-widest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-white/20 text-xs font-body tracking-widest">
        © {new Date().getFullYear()} Kadapa Tae Kwon Do Club. All rights reserved.
      </div>
    </footer>
  );
}
