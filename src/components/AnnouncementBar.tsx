'use client';
import { useState } from 'react';
import type { Announcement } from '@/lib/content';

const BADGE: Record<string, string> = {
  NEW:    'bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.5',
  URGENT: 'bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5',
  UPDATE: 'bg-brand-blue text-white text-[10px] font-bold px-1.5 py-0.5',
  INFO:   'bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.5',
};

function resolveHref(item: Announcement): string | null {
  if (item.link_type === 'pdf' && item.pdf) {
    // Normalize PDF path — handle all possible formats CMS might save
    const raw = item.pdf;
    if (raw.startsWith('http')) return raw;
    // Strip leading slash or 'public/' prefix if present
    const cleaned = raw
      .replace(/^\/+/, '')          // remove leading slashes
      .replace(/^public\//, '');    // remove 'public/' prefix
    return '/' + cleaned;           // ensure single leading slash
  }
  if (item.link_type === 'url' && item.link) {
    return item.link;
  }
  return null;
}

export default function AnnouncementBar({ announcements }: { announcements: Announcement[] }) {
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);

  if (dismissed || !announcements.length) return null;

  const pinned = announcements.filter((a) => a.pinned);
  const rolling = announcements;

  const renderLink = (item: Announcement, children: React.ReactNode) => {
    const href = resolveHref(item);
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {children}
        </a>
      );
    }
    return <span>{children}</span>;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {pinned.map((item, i) => (
        <div key={i} className="bg-brand-red border-b border-red-700 px-3 md:px-4 py-1 md:py-1.5 flex items-center gap-2 md:gap-3">
          <span className="text-[9px] md:text-[10px] bg-white text-brand-red font-bold uppercase px-1.5 py-0.5 shrink-0">
            📌 PINNED
          </span>
          {renderLink(item,
            <span className="text-white text-[11px] md:text-xs font-body truncate">
              {item.title}
              {item.link_type === 'pdf' && <span className="ml-1 text-white/70 text-[10px]">📄</span>}
              {item.link_type === 'url' && item.link && <span className="ml-1 text-white/60 text-[10px]">↗</span>}
            </span>
          )}
        </div>
      ))}
      <div
        className="bg-brand-blue flex items-stretch overflow-hidden border-b border-blue-900"
        style={{ height: '28px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="shrink-0 bg-brand-red flex items-center px-2 md:px-4">
          <span className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
            📢 NEWS
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden flex items-center">
          <div
            className="flex items-center whitespace-nowrap"
            style={{
              animation: 'ticker 40s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...rolling, ...rolling].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-4 md:px-8 text-white/90">
                <span className={BADGE[item.badge] || BADGE.INFO}>{item.badge}</span>
                {renderLink(item,
                  <span className="text-[11px] md:text-xs font-body text-white/85 hover:text-white">
                    {item.title}
                    {item.link_type === 'pdf' && <span className="ml-1 text-white/50 text-[10px]">📄</span>}
                  </span>
                )}
                <span className="text-white/25 text-xs ml-1">◆</span>
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 px-2 md:px-3 text-white/50 hover:text-white text-xs border-l border-blue-700 transition-colors"
        >✕</button>
      </div>
    </div>
  );
}
