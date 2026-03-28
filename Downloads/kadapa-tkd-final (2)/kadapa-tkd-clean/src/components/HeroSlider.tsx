'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import type { HeroSlide } from '@/lib/content';

interface Props { slides: HeroSlide[]; }

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1600&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
];

export default function HeroSlider({ slides }: Props) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full flex items-center">

              {/* ── Real student/event photo fills the screen ── */}
              <div className="absolute inset-0">
                <img
                  src={slide.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
                  }}
                />

                {/* Dark gradient so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Parchment texture overlay — gives the ink-wash feel */}
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px',
                  }}
                />
              </div>

              {/* ── Korean calligraphy watermark ── */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
                <div
                  className="font-korean font-bold text-white leading-none pr-8"
                  style={{
                    fontSize: 'clamp(120px, 20vw, 260px)',
                    opacity: 0.07,
                    letterSpacing: '-0.05em',
                  }}
                >
                  태권도
                </div>
              </div>

              {/* ── Vertical red accent bar ── */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-red" />

              {/* ── Ink brush stroke top decoration ── */}
              <div className="absolute top-24 left-6 right-6 h-px opacity-20"
                style={{ background: 'linear-gradient(90deg, #C8102E, transparent)' }} />

              {/* ── Content ── */}
              <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pt-20">
                <div className="max-w-2xl">

                  {/* Eyebrow */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-0.5 bg-brand-red" />
                    <span className="text-brand-red font-body text-xs uppercase tracking-[0.35em] font-semibold">
                      Kadapa Tae Kwon Do Club
                    </span>
                  </div>

                  {/* Main headline */}
                  <h1
                    className="font-display font-black text-white leading-[1.05] mb-5"
                    style={{
                      fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                      textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="font-body text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={slide.button_link}
                      target={slide.button_link.startsWith('http') ? '_blank' : undefined}
                      rel={slide.button_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-700 text-white font-body font-semibold uppercase tracking-widest text-sm px-8 py-4 transition-all duration-300 group"
                    >
                      {slide.button_text}
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <a
                      href="tel:+918522833600"
                      className="inline-flex items-center gap-3 border border-white/40 hover:border-white text-white/80 hover:text-white font-body font-medium uppercase tracking-widest text-sm px-8 py-4 transition-all duration-300"
                    >
                      📞 +91 85228 33600
                    </a>
                  </div>
                </div>
              </div>

              {/* ── Bottom badge bar ── */}
              <div className="absolute bottom-14 left-0 right-0 z-10 px-8 md:px-16">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-6">
                  {[
                    { icon: '🏆', text: 'District Taekwondo Association' },
                    { icon: '⬛', text: '4th Dan Black Belt Master' },
                    { icon: '📅', text: 'Training Since 2010' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-white/40 text-xs font-body uppercase tracking-widest">
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-bounce">
        <div className="w-px h-6 bg-white/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
      </div>
    </section>
  );
}
