'use client';
import { useState } from 'react';
import type { Announcement } from '@/lib/content';

const BADGE: Record<string, string> = {
  NEW:    'bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5',
  URGENT: 'bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5',
  UPDATE: 'bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5',
  INFO:   'bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.5',
};

function resolveHref(item: Announcement): string | null {
  if (item.link_type === 'pdf' && item.pdf) {
    const raw = item.pdf;
    if (raw.startsWith('http')) return raw;
    const cleaned = raw.replace(/^\/+/, '').replace(/^public\//, '');
    return '/' + cleaned.split('/').map(encodeURIComponent).join('/');
  }
  if (item.link_type === 'url' && item.link) return item.link;
  return null;
}

export default function AnnouncementBar({ announcements }: { announcements: Announcement[] }) {
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  if (dismissed || !announcements.length) return null;

  // All items in one ticker — pinned items get a 📌 prefix
  const allItems = announcements;

  const renderLink = (item: Announcement, children: React.ReactNode) => {
    const href = resolveHref(item);
    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {children}
        </a>
      );
    }
    return <span>{children}</span>;
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60]"
      data-announcement-bar="true"
    >
      {/* Single scrolling bar — all announcements */}
      <div
        className="bg-brand-red flex items-stretch overflow-hidden border-b border-red-800"
        style={{ height: '30px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Label */}
        <div className="shrink-0 bg-red-900 flex items-center px-3 gap-1.5">
          <span className="text-white text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
            📢 ANNOUNCEMENTS
          </span>
        </div>

        {/* Scrolling content */}
        <div className="relative flex-1 overflow-hidden flex items-center">
          <div
            className="flex items-center whitespace-nowrap"
            style={{
              animation: 'ticker 60s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...allItems, ...allItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6 text-white/95">
                {/* Pinned indicator */}
                {item.pinned && (
                  <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 font-bold shrink-0">
                    📌
                  </span>
                )}
                <span className={BADGE[item.badge] || BADGE.INFO}>{item.badge}</span>
                {renderLink(item,
                  <span className="text-[11px] font-body text-white hover:text-white/80 transition-colors">
                    {item.title}
                    {item.link_type === 'pdf' && <span className="ml-1 text-white/60 text-[10px]">📄</span>}
                    {item.link_type === 'url' && item.link && <span className="ml-1 text-white/60 text-[10px]">↗</span>}
                  </span>
                )}
                <span className="text-white/30 text-xs ml-2">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 px-3 text-white/50 hover:text-white text-xs border-l border-red-800 transition-colors"
          aria-label="Close announcements"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
