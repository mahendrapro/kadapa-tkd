'use client';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const cover = images[0] || '';
  const slides = images.map((src) => ({ src }));

  return (
    <>
      {/* ── Card ── */}
      <article
        className="card-pro overflow-hidden rounded-sm group cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative h-52 overflow-hidden bg-gray-100">
          {cover && (
            <img src={cover} alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          )}
          <div className="absolute top-3 left-3 z-10 bg-brand-red text-white text-center px-3 py-2 min-w-[52px]">
            <div className="font-display font-black text-2xl leading-none">{day}</div>
            <div className="text-[10px] uppercase tracking-widest mt-0.5 font-body">{month}</div>
          </div>
          <div className={`absolute top-3 right-3 z-10 px-2 py-1 text-[10px] font-body font-semibold uppercase tracking-wider ${
            isUpcoming ? 'bg-green-600/90 text-white' : 'bg-gray-800/70 text-white/70'
          }`}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 z-10 bg-black/50 text-white text-[10px] font-body px-2 py-0.5">
              📷 {images.length}
            </div>
          )}
          <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/10 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-body px-3 py-1.5 rounded-sm">
              View Full Event →
            </span>
          </div>
        </div>
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
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          {/* Modal box — fixed height with internal scroll */}
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',         /* never taller than 90% of screen */
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',  /* header fixed, body scrolls, footer fixed */
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* ── Fixed Header ── */}
            <div style={{ backgroundColor: '#0f172a', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexShrink: 0 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {isUpcoming ? 'Upcoming' : 'Completed'}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>
                    📅 {day} {month[0] + month.slice(1).toLowerCase()} {year}
                  </span>
                </div>
                <h2 style={{ color: 'white', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: '900', margin: 0, lineHeight: 1.3 }}>
                  {title}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ flexShrink: 0, width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', borderRadius: '2px', fontSize: '16px' }}
              >✕</button>
            </div>

            {/* ── Scrollable Body ── */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>

              {/* Description */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f8f7f4' }}>
                <p style={{ margin: 0, color: '#374151', fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {description}
                </p>
              </div>

              {/* Photos */}
              {images.length > 0 && (
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0f172a' }}>Photos</span>
                    <span style={{ color: '#6b7280', fontSize: '11px' }}>({images.length})</span>
                    <span style={{ color: '#9ca3af', fontSize: '11px' }}>· Click to view full size</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '6px',
                  }}>
                    {images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                        style={{
                          aspectRatio: '1',
                          overflow: 'hidden',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          borderRadius: '2px',
                          backgroundColor: '#e5e7eb',
                        }}
                      >
                        <img
                          src={src}
                          alt={`${title} ${i + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Fixed Footer ── */}
            <div style={{ padding: '10px 20px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ color: '#9ca3af', fontSize: '11px' }}>Kadapa Tae Kwon Do Club</span>
              <button
                onClick={() => setModalOpen(false)}
                style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '7px 18px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', borderRadius: '2px' }}
              >Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
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
