'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // 🔥 Force open CMS HTML (not Next.js route)
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      Redirecting to CMS...
    </div>
  );
}
