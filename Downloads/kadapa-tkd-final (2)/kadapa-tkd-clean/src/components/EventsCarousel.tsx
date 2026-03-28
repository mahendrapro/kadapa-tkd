'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Event } from '@/lib/content';
import Link from 'next/link';

const FALLBACK_EVENTS = [
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
  'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=600&q=80',
  'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=600&q=80',
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day:   d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
    year:  d.getFullYear(),
  };
}

export default function EventsCarousel({ events }: { events: Event[] }) {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      slidesPerView={1.2}
      spaceBetween={24}
      centeredSlides={false}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation
      breakpoints={{
        640:  { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
        1280: { slidesPerView: 3.5 },
      }}
      className="!overflow-visible"
    >
      {events.map((event, i) => {
        const { day, month, year } = formatDate(event.date);
        return (
          <SwiperSlide key={i}>
            <div className="group relative bg-brand-gray border border-white/5 overflow-hidden hover:border-brand-red/30 transition-all duration-500">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image || FALLBACK_EVENTS[i % FALLBACK_EVENTS.length]}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_EVENTS[i % FALLBACK_EVENTS.length];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray via-transparent to-transparent" />
                {/* Date badge */}
                <div className="absolute top-3 left-3 bg-brand-red text-white text-center px-3 py-2 min-w-[52px]">
                  <div className="font-display font-black text-2xl leading-none">{day}</div>
                  <div className="font-body text-[10px] uppercase tracking-widest mt-0.5">{month}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-white/30 text-xs font-body uppercase tracking-widest mb-2">{year}</div>
                <h3 className="font-display font-bold text-white text-lg leading-tight mb-2 group-hover:text-brand-red transition-colors">
                  {event.title}
                </h3>
                <p className="text-white/50 text-sm font-body leading-relaxed line-clamp-2">
                  {event.description}
                </p>
                <div className="mt-4 h-px bg-white/5 group-hover:bg-brand-red/30 transition-colors" />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
