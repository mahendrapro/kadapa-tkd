'use client';
import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    window.location.replace('/admin/index.html');
  }, []);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', fontFamily: 'sans-serif', color: '#666'
    }}>
      Loading CMS...
    </div>
  );
}
