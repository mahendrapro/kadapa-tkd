import { getEvents, getEventPhotos } from '@/lib/content';
import EventCard from '@/components/EventCard';
import SectionHeading from '@/components/SectionHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Championships | Kadapa Tae Kwon Do Club',
  description: 'Upcoming and past events, championships, and belt grading ceremonies at Kadapa Tae Kwon Do Club.',
};

export default function EventsPage() {
  const events = getEvents();
  const upcoming = events.filter((e) => new Date(e.date) >= new Date());
  const past = events.filter((e) => new Date(e.date) < new Date());

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 px-6 bg-brand-dark relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-red" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-brand-red text-xs font-body font-semibold uppercase tracking-[0.3em]">Competitions</span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-tight mb-4">
            Events & <span className="text-brand-red">Championships</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl">
            Click any event card to view full details, photos and video.
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-brand-red to-brand-blue" />

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-16 px-4 md:px-6 bg-brand-light">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="Upcoming Events" title="Coming Soon" align="left" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {upcoming.map((event, i) => (
                <EventCard
                  key={i}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  images={getEventPhotos(event)}
                  isUpcoming={true}
                  youtubeUrl={event.youtube_url}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past */}
      <section className="py-16 px-4 md:px-6 bg-brand-gray">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Past Events" title="Event Archive" align="left" />
          {past.length === 0 ? (
            <p className="text-brand-muted font-body text-center py-10">No past events yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {past.map((event, i) => (
                <EventCard
                  key={i}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  images={getEventPhotos(event)}
                  isUpcoming={false}
                  youtubeUrl={event.youtube_url}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
