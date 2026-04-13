import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

function getContentFiles(folder: string) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

function parseFile(folder: string, filename: string) {
  const raw = fs.readFileSync(path.join(contentDir, folder, filename), 'utf-8');
  return matter(raw).data;
}

function getAll(folder: string) {
  return getContentFiles(folder).map((f) => parseFile(folder, f));
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  button_text: string;
  button_link: string;
  order?: number;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  image?: string;
  photos?: string[];
}

export interface GalleryItem {
  image: string;
  caption?: string;
  show_in_hero?: boolean;
  order?: number;
}

export interface Announcement {
  title: string;
  date: string;
  pinned: boolean;
  badge: 'NEW' | 'URGENT' | 'UPDATE' | 'INFO';
  link?: string;
  link_type: 'url' | 'pdf' | 'none';
  pdf?: string;
  active: boolean;
}

export interface VideoItem {
  title: string;
  url: string;
  active: boolean;
  order?: number;
}

export interface SiteSettings {
  map_embed_url?: string;
}

export function getHeroSlides(): HeroSlide[] {
  const manual = (getAll('hero') as HeroSlide[])
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const fromGallery = (getAll('gallery') as GalleryItem[])
    .filter((g) => g.show_in_hero)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((g) => ({
      title: 'Kadapa Tae Kwon Do Club',
      subtitle: g.caption || 'Training champions since 2010',
      image: g.image,
      button_text: 'Join Training',
      button_link: 'https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training',
    }));

  return [...manual, ...fromGallery];
}

export function getEvents(): Event[] {
  return (getAll('events') as Event[])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventPhotos(event: Event): string[] {
  const photos: string[] = [];
  if (event.image) photos.push(event.image);
  if (event.photos) event.photos.forEach((p) => { if (p && !photos.includes(p)) photos.push(p); });
  return photos;
}

export function getGallery(): GalleryItem[] {
  return (getAll('gallery') as GalleryItem[])
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getAnnouncements(): Announcement[] {
  return (getAll('announcements') as Announcement[])
    .filter((a) => a.active !== false)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getVideos(): VideoItem[] {
  return (getAll('videos') as VideoItem[])
    .filter((v) => v.active !== false && v.url)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getSiteSettings(): SiteSettings {
  const settingsPath = path.join(contentDir, 'settings', 'site.md');
  if (!fs.existsSync(settingsPath)) return {};
  const raw = fs.readFileSync(settingsPath, 'utf-8');
  return matter(raw).data as SiteSettings;
}
