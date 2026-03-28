import { getEvents, getEventPhotos } from '@/lib/content';
import EventCard from '@/components/EventCard';

export const metadata = {
  title: 'Events | Kadapa Tae Kwon Do Club',
  description: 'Upcoming championships, belt gradings, and Taekwondo events at Kadapa Tae Kwon Do Club.',
};

export default function EventsPage() {
  const events = getEvents();

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-24 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-end pr-16">
          <span className="font-korean font-bold text-[50vw] text-white leading-none">권</span>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-red" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-red" />
            <span className="text-brand-red font-body text-xs uppercase tracking-[0.3em]">Calendar</span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-[1.05] mb-4">
            Events &amp; <span className="text-brand-red">Championships</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl">
            Tournaments, belt gradings, and demonstrations — each event card shows a mini photo slideshow.
          </p>
        </div>
      </section>
      <div className="belt-stripe w-full" />

      {/* Events Grid */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {events.length === 0 ? (
            <div className="text-center py-20 text-white/30 font-body">
              <div className="text-5xl mb-4">📅</div>
              <p>No events yet. Add events via the Admin panel.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <EventCard
                  key={i}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  images={getEventPhotos(event)}
                  isUpcoming={new Date(event.date) >= new Date()}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-black text-center">
        <h2 className="font-display font-bold text-3xl text-white mb-4">Want to Participate?</h2>
        <p className="text-white/50 font-body mb-8 max-w-md mx-auto">
          Contact Master Vijay Bhaskar Reddy to register for upcoming events.
        </p>
        <a
          href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-body font-semibold uppercase tracking-widest text-sm px-10 py-5 transition-colors"
        >
          WhatsApp to Register
        </a>
      </section>
    </>
  );
}
