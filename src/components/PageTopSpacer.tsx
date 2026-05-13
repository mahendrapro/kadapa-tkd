'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTopSpacer() {
  const [height, setHeight] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const measure = () => {
      const bar = document.querySelector('[data-announcement-bar="true"]') as HTMLElement | null;
      const nav = document.querySelector('header') as HTMLElement | null;
      setHeight((bar?.offsetHeight ?? 0) + (nav?.offsetHeight ?? 0));
    };
    measure();
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 500);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener('resize', measure); };
  }, [pathname]);

  if (isHome) return null;
  return <div style={{ height: `${height}px`, flexShrink: 0 }} aria-hidden="true" />;
}
