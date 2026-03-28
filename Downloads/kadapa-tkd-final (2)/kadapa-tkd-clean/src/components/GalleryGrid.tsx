'use client';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import type { GalleryItem } from '@/lib/content';

const FALLBACK_GALLERY = Array.from({ length: 8 }, (_, i) => ({
  image: `https://images.unsplash.com/photo-${['1555597673-b21d5c935865','1544367567-0f2fcb009e0b','1571902943202-507ec2618e8f','1517649763962-0c623066013b','1546519638-68e109498ffc','1569517282132-25d22f4573e6','1595078475328-1ab05d0a6a0e','1571019613454-1cb2f99b2d8b'][i]}?w=800&q=80`,
  caption: `Training Session ${i + 1}`,
}));

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen]   = useState(false);
  const [index, setIndex] = useState(0);

  const gallery = items.length ? items : FALLBACK_GALLERY;

  const slides = gallery.map((item) => ({ src: item.image, alt: item.caption }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
        {gallery.map((item, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="group relative aspect-square overflow-hidden cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.caption || `Gallery ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_GALLERY[i % FALLBACK_GALLERY.length].image;
              }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-all duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
            {/* Caption */}
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-body truncate">{item.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.97)' },
        }}
      />
    </>
  );
}
