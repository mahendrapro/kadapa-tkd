export default function AdminPage() {
  // This page is a passthrough — actual CMS is served from /public/admin/index.html
  // The redirect happens via the static HTML file at public/admin/index.html
  return null;
}

// Tell Next.js this route exists but the real page is the static HTML
export const dynamic = 'force-static';
