import { getHeroSlides, getEvents, getGallery, getEventPhotos } from '@/lib/content';
import HeroSlider from '@/components/HeroSlider';
import EventCard from '@/components/EventCard';
import GalleryGrid from '@/components/GalleryGrid';
import SectionHeading from '@/components/SectionHeading';
import Link from 'next/link';

export default function HomePage() {
  const slides  = getHeroSlides();
  const events  = getEvents();
  const gallery = getGallery();

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <HeroSlider slides={slides} />

      {/* ── Stats Bar ────────────────────────────── */}
      <div className="bg-brand-red">
        <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '30+',  label: 'Years of Excellence' },
            { num: '2010', label: 'Founded' },
            { num: '4th',  label: 'Dan Black Belt Master' },
            { num: '100+', label: 'Champions Trained' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-black text-2xl md:text-3xl text-white">{num}</div>
              <div className="font-body text-white/70 text-xs uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── About Teaser ─────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="About the Club"
              title={"Discipline.\nHonour.\nChampionship."}
              subtitle="Kadapa Tae Kwon Do Club has been building champions for over three decades. Affiliated to the District Taekwondo Association, YSR Kadapa District."
              align="left"
            />
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🥋', text: 'All age groups welcome' },
                { icon: '🏟️', text: 'DSA Municipal Stadium' },
                { icon: '🌅', text: '5 AM – 7 AM daily' },
                { icon: '🏅', text: 'National-level coaches' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/60 text-sm font-body">
                  <span className="text-xl">{icon}</span> {text}
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-3 border border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-body font-semibold uppercase tracking-widest text-xs px-8 py-4 transition-all duration-300">
              Learn More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Master card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-red/5 border border-brand-red/10" />
            <div className="relative bg-[#1A1A1A] border border-white/5 p-8">
              <div className="w-20 h-20 rounded-full bg-brand-red/10 border-2 border-brand-red flex items-center justify-center mb-6 text-3xl">🥋</div>
              <div className="text-brand-gold text-xs font-body uppercase tracking-[0.3em] mb-2">Head Master</div>
              <h3 className="font-display font-bold text-2xl text-white mb-1">Master Vijay Bhaskar Reddy</h3>
              <div className="text-brand-red text-sm font-body mb-6">Chairman – District Taekwondo Association</div>
              <div className="space-y-2">
                {[
                  'Black Belt 4th Dan (WT)',
                  'National Master & Instructor License',
                  'National Referee',
                  'National Gold Medalist',
                  'Experience since 1992 (30+ years)',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-white/60 text-sm font-body">
                    <span className="text-brand-red mt-0.5">▸</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Events — grid with mini slideshows ───── */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <SectionHeading eyebrow="Upcoming Events" title="Championships & Gradings" align="left" />
            <Link href="/events" className="text-brand-red hover:text-red-400 font-body text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="text-white/30 font-body text-center py-10">No events yet — add them via the Admin panel.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 3).map((event, i) => (
                <EventCard
                  key={i}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  images={getEventPhotos(event)}
                  isUpcoming={new Date(event.date) >= new Date()}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Belt Philosophy ──────────────────────── */}
      <section className="py-24 px-6 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="font-korean font-bold text-[40vw] text-white leading-none">태</span>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <SectionHeading eyebrow="The Journey" title="White Belt to Black Belt" subtitle="Each belt colour represents a milestone. Your path to excellence starts here." />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { color: '#FFFFFF', label: 'White', border: true },
              { color: '#FFFF00', label: 'Yellow' },
              { color: '#FFA500', label: 'Orange' },
              { color: '#008000', label: 'Green' },
              { color: '#0000FF', label: 'Blue' },
              { color: '#800080', label: 'Purple' },
              { color: '#8B4513', label: 'Brown' },
              { color: '#FF0000', label: 'Red' },
              { color: '#000000', label: 'Black', border: true },
            ].map(({ color, label, border }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-4 ${border ? 'border border-white/20' : ''}`} style={{ backgroundColor: color }} />
                <span className="text-white/40 text-[10px] font-body uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-700 text-white font-body font-semibold uppercase tracking-widest text-sm px-10 py-5 transition-all duration-300">
              Start Your Journey Today
            </a>
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ──────────────────────── */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <SectionHeading eyebrow="Gallery" title="Moments of Glory" align="left" />
            <Link href="/gallery" className="text-brand-red hover:text-red-400 font-body text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
              View Full Gallery
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <GalleryGrid items={gallery.slice(0, 8)} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-brand-red relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            Ready to Begin Your Taekwondo Journey?
          </h2>
          <p className="text-white/70 font-body text-lg mb-10">
            Join Kadapa's most respected Taekwondo club. Train under a National Master and build a champion's mindset.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training" target="_blank" rel="noopener noreferrer"
              className="bg-white text-brand-red font-body font-bold uppercase tracking-widest text-sm px-10 py-5 hover:bg-brand-gold hover:text-white transition-all duration-300">
              WhatsApp to Enroll
            </a>
            <a href="tel:+918522833600" className="border-2 border-white text-white font-body font-semibold uppercase tracking-widest text-sm px-10 py-5 hover:bg-white hover:text-brand-red transition-all duration-300">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
