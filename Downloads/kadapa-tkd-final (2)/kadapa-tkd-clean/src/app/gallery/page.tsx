import { getGallery } from '@/lib/content';
import GalleryGrid from '@/components/GalleryGrid';
import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Gallery | Kadapa Tae Kwon Do Club',
  description: 'Photo gallery of training sessions, championships, and events at Kadapa Tae Kwon Do Club.',
};

export default function GalleryPage() {
  const gallery = getGallery();

  return (
    <>
      <section className="relative pt-40 pb-24 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-end pr-16">
          <span className="font-korean font-bold text-[50vw] text-white leading-none">도</span>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-red" />
            <span className="text-brand-red font-body text-xs uppercase tracking-[0.3em]">Moments</span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-[1.05] mb-6">
            Photo<br /><span className="text-brand-red">Gallery</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl leading-relaxed">
            Training sessions, championships, belt ceremonies — the journey captured in moments.
          </p>
        </div>
      </section>
      <div className="belt-stripe w-full" />

      <section className="py-16 px-4 md:px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          {gallery.length === 0 ? (
            <div className="text-center py-20 text-white/30 font-body">
              <div className="text-5xl mb-4">📸</div>
              <p>Gallery is being updated. Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <span className="text-white/30 font-body text-sm">
                  {gallery.length} photos · Click to view full size
                </span>
              </div>
              <GalleryGrid items={gallery} />
            </>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-black text-center">
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-4">📸</div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Have Training Photos?</h2>
          <p className="text-white/40 font-body text-sm mb-6 leading-relaxed">
            Share your Taekwondo moments with us. Send photos via WhatsApp and we will add them to our gallery.
          </p>
          <a href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20share%20photos%20for%20the%20gallery" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-body font-600 uppercase tracking-widest text-xs px-8 py-4 transition-colors">
            Send via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
