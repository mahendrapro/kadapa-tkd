'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  images: string[];
  isUpcoming: boolean;
}

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export default function EventCard({ title, date, description, images, isUpcoming }: EventCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const cover = images[0] || '';
  const slides = images.map((src) => ({ src }));

  const openPhoto = (i: number) => { setLightboxIndex(i); setLightboxOpen(true); };

  return (
    <>
      {/* ── Card ── */}
      <article
        className="card-pro overflow-hidden rounded-sm group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        {/* Cover photo */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          {cover && (
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {/* Date badge */}
          <div className="absolute top-3 left-3 z-10 bg-brand-red text-white text-center px-3 py-2 min-w-[52px]">
            <div className="font-display font-black text-2xl leading-none">{day}</div>
            <div className="text-[10px] uppercase tracking-widest mt-0.5 font-body">{month}</div>
          </div>
          {/* Status badge */}
          <div className={`absolute top-3 right-3 z-10 px-2 py-1 text-[10px] font-body font-semibold uppercase tracking-wider ${
            isUpcoming ? 'bg-green-600/90 text-white' : 'bg-gray-800/70 text-white/70'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </div>
          {/* Photo count */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 z-10 bg-black/50 text-white text-[10px] font-body px-2 py-0.5 flex items-center gap-1">
              📷 {images.length}
            </div>
          )}
          {/* Click hint */}
          <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-body px-3 py-1.5 rounded-sm">
              View Full Event →
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-bold text-brand-dark text-lg leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-brand-muted text-sm font-body leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 text-brand-muted text-xs font-body">
              <span>📅</span>
              <span>{day} {month[0] + month.slice(1).toLowerCase()} {year}</span>
            </div>
            <span className="text-brand-red text-xs font-body font-semibold">View All →</span>
          </div>
        </div>
      </article>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', overflowY: 'auto', padding: '20px 16px' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div
            className="relative w-full bg-white rounded-sm shadow-2xl"
            style={{ maxWidth: '900px', marginTop: 'auto', marginBottom: 'auto' }}
          >
            {/* Modal header */}
            <div className="bg-brand-dark px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    {isUpcoming ? 'Upcoming' : 'Completed'}
                  </span>
                  <span className="text-white/40 text-xs font-body">
                    📅 {day} {month[0] + month.slice(1).toLowerCase()} {year}
                  </span>
                </div>
                <h2 className="font-display font-black text-white text-xl md:text-2xl leading-tight">
                  {title}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="shrink-0 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-sm transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div className="px-6 py-5 border-b border-gray-100 bg-brand-light">
              <p className="text-brand-dark font-body text-sm leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Photo grid — like gallery */}
            {images.length > 0 && (
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-brand-dark font-display font-bold text-sm uppercase tracking-wider">
                    Photos
                  </span>
                  <span className="text-brand-muted text-xs font-body">({images.length})</span>
                  <span className="text-brand-muted text-xs font-body ml-1">· Click to view full size</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => openPhoto(i)}
                      className="relative aspect-square overflow-hidden rounded-sm group/photo hover:ring-2 hover:ring-brand-red transition-all"
                    >
                      <img
                        src={src}
                        alt={`${title} photo ${i + 1}`}
                        className="w-full h-full object-cover group-hover/photo:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-all flex items-center justify-center">
                        <svg className="w-6 h-6 text-white opacity-0 group-hover/photo:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <span className="text-brand-muted text-xs font-body">
                Kadapa Tae Kwon Do Club
              </span>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-brand-red text-white text-xs font-body font-semibold uppercase tracking-widest px-5 py-2 hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox for full-size photos ── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.97)' } }}
      />
    </>
  );
}
