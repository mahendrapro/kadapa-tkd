'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import type { HeroSlide } from '@/lib/content';

const FALLBACKS = [
  'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1600&q=80',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
];

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full flex items-center">
              <div
                className="absolute inset-0"
                style={{ backgroundColor: '#000' }}
              >
                <img
                  src={slide.image || FALLBACKS[i % FALLBACKS.length]}
                  alt={slide.title}
                  className="w-full h-full"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    const isPortrait = img.naturalHeight > img.naturalWidth * 1.1;
                    if (isPortrait) {
                      img.style.objectFit = 'contain';
                      img.style.objectPosition = 'center center';
                    } else {
                      img.style.objectFit = 'cover';
                      img.style.objectPosition = 'center 25%';
                    }
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACKS[i % FALLBACKS.length];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-red" />
              <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pt-20">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-0.5 bg-brand-red" />
                    <span className="text-brand-red text-xs font-body font-semibold uppercase tracking-[0.3em]">
                      Kadapa Tae Kwon Do Club
                    </span>
                  </div>
                  <h1
                    className="font-display font-black text-white leading-[1.05] mb-5"
                    style={{
                      fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
                      textShadow: '0 2px 20px rgba(0,0,0,0.7)',
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p className="text-white/80 font-body text-base md:text-lg leading-relaxed mb-8 max-w-xl whitespace-pre-line">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={slide.button_link}
                      target={slide.button_link?.startsWith('http') ? '_blank' : undefined}
                      rel={slide.button_link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-700 text-white font-body font-semibold uppercase tracking-widest text-sm px-8 py-4 transition-all group"
                    >
                      {slide.button_text}
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <a
                      href="tel:+918522833600"
                      className="inline-flex items-center gap-3 border border-white/40 hover:border-white text-white/80 hover:text-white font-body font-medium uppercase tracking-widest text-sm px-8 py-4 transition-all"
                    >
                      📞 +91 85228 33600
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-14 left-0 right-0 z-10 px-8 md:px-16 max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-6 text-white/50 text-xs font-body uppercase tracking-widest">
                  <span>🏆 District Taekwondo Association</span>
                  <span>⬛ 4th Dan Black Belt Master</span>
                  <span>📅 Training Since 2010</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-bounce">
        <div className="w-px h-6 bg-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </section>
  );
}
