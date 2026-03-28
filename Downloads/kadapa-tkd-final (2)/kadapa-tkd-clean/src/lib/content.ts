import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

function getContentFiles(folder: string) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

function parseMarkdownFile(folder: string, filename: string) {
  const filePath = path.join(contentDir, folder, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(raw);
  return data;
}

function getAllContent(folder: string) {
  const files = getContentFiles(folder);
  return files.map((file) => parseMarkdownFile(folder, file));
}

// ── Types ────────────────────────────────────────────────

export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  button_text: string;
  button_link: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  // Single cover image OR multiple photos
  image?: string;
  photos?: string[];  // array of event photos for mini slideshow
}

export interface GalleryItem {
  image: string;
  caption?: string;
  show_in_hero?: boolean; // admin can tick this to add to hero slideshow
}

// ── Getters ──────────────────────────────────────────────

export function getHeroSlides(): HeroSlide[] {
  // Get manually authored hero slides
  const manual = getAllContent('hero') as HeroSlide[];

  // Also pull gallery items marked show_in_hero: true
  const galleryHero = (getAllContent('gallery') as GalleryItem[])
    .filter((g) => g.show_in_hero)
    .map((g) => ({
      title: 'Kadapa Tae Kwon Do Club',
      subtitle: g.caption || 'Training champions since 2010 — DSA Stadium, Kadapa',
      image: g.image,
      button_text: 'Join Training',
      button_link: 'https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training',
    }));

  return [...manual, ...galleryHero];
}

export function getEvents(): Event[] {
  const events = getAllContent('events') as Event[];
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get all photos for a specific event (supports both single image + photos array)
export function getEventPhotos(event: Event): string[] {
  const photos: string[] = [];
  if (event.image) photos.push(event.image);
  if (event.photos && Array.isArray(event.photos)) {
    event.photos.forEach((p) => { if (p && !photos.includes(p)) photos.push(p); });
  }
  return photos;
}

export function getGallery(): GalleryItem[] {
  return getAllContent('gallery') as GalleryItem[];
}
