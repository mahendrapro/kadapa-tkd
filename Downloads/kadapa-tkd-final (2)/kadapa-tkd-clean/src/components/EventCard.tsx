'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  title: string;
  date: string;
  description: string;
  images: string[];   // array of photos for this event
  isUpcoming: boolean;
}

const FALLBACKS = [
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
  'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&q=80',
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    full:  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    day:   d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
  };
}

export default function EventCard({ title, date, description, images, isUpcoming }: Props) {
  const { full, day, month } = formatDate(date);
  const photos = images.length > 0 ? images : [FALLBACKS[0]];

  return (
    <article className="group bg-[#111] border border-white/5 overflow-hidden hover:border-brand-red/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-red/10">

      {/* ── Mini photo slideshow ── */}
      <div className="relative h-56 overflow-hidden">
        {photos.length === 1 ? (
          // Single photo — no need for swiper
          <img
            src={photos[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACKS[0]; }}
          />
        ) : (
          // Multiple photos — mini autoplay slideshow
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="h-full w-full event-mini-swiper"
          >
            {photos.map((photo, i) => (
              <SwiperSlide key={i}>
                <img
                  src={photo}
                  alt={`${title} photo ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACKS[i % FALLBACKS.length]; }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-brand-red text-white text-center px-3 py-2 min-w-[52px] z-10">
          <div className="font-display font-black text-2xl leading-none">{day}</div>
          <div className="font-body text-[10px] uppercase tracking-widest mt-0.5">{month}</div>
        </div>

        {/* Status badge */}
        <div className={`absolute top-3 right-3 z-10 px-2 py-1 text-[10px] font-body uppercase tracking-widest font-semibold ${
          isUpcoming ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'
        }`}>
          {isUpcoming ? '● Upcoming' : 'Past'}
        </div>

        {/* Photo count badge */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white/70 text-[10px] font-body px-2 py-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            {photos.length} photos
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        <h3 className="font-display font-bold text-white text-lg leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-white/45 text-sm font-body leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/30 text-xs font-body">
            <span>📅</span><span>{full}</span>
          </div>
          {isUpcoming && (
            <a
              href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20register%20for%20the%20event"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:text-red-400 text-xs font-body uppercase tracking-wider transition-colors"
            >
              Register ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
