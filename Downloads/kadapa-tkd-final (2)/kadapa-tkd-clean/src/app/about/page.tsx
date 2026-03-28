import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'About | Kadapa Tae Kwon Do Club',
  description: 'Learn about Kadapa Tae Kwon Do Club, our Master Vijay Bhaskar Reddy, and our training programme.',
};

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ───────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] select-none pointer-events-none flex items-center justify-end pr-16">
          <span className="font-korean font-bold text-[50vw] text-white leading-none">도</span>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-red" />
            <span className="text-brand-red font-body text-xs uppercase tracking-[0.3em]">Our Story</span>
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white leading-[1.05] mb-6">
            About the<br /><span className="text-brand-red">Club</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl leading-relaxed">
            Affiliated to District Taekwondo Association, YSR Kadapa District — shaping champions since 2010.
          </p>
        </div>
      </section>
      <div className="belt-stripe w-full" />

      {/* ── Club History ────────────────────── */}
      <section className="py-24 px-6 bg-brand-dark">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="Established 2010"
              title="A Legacy of Discipline"
              align="left"
            />
            <div className="space-y-5 text-white/60 font-body leading-relaxed">
              <p>
                Kadapa Tae Kwon Do Club was established in <strong className="text-white">2010</strong> with a singular mission: to bring world-class Taekwondo training to the YSR Kadapa District. Today, the club is officially affiliated to the <strong className="text-white">District Taekwondo Association, YSR Kadapa District</strong>.
              </p>
              <p>
                Under the expert guidance of <strong className="text-white">Master Vijay Bhaskar Reddy</strong>, the club has produced district, state, and national-level champions across all age groups and belt categories.
              </p>
              <p>
                Our philosophy is rooted in the five tenets of Taekwondo: <em className="text-brand-gold">courtesy, integrity, perseverance, self-control, and indomitable spirit</em>. We don't just train athletes — we shape character.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 border-l border-white/10">
            {[
              { year: '1992', event: 'Master Vijay begins his Taekwondo journey' },
              { year: '2010', event: 'Kadapa Tae Kwon Do Club officially established' },
              { year: '2012', event: 'First batch of students participates in District Championships' },
              { year: '2015', event: 'Master attains 4th Dan Black Belt certification' },
              { year: '2018', event: 'National Referee licence awarded' },
              { year: '2020', event: 'Club affiliated to District Taekwondo Association' },
              { year: '2024', event: '100+ champions trained, club continues growing' },
            ].map(({ year, event }) => (
              <div key={year} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[41px] w-4 h-4 rounded-full border-2 border-brand-red bg-brand-dark" />
                <div className="text-brand-red font-display font-bold text-sm mb-1">{year}</div>
                <div className="text-white/60 font-body text-sm leading-relaxed">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Master Profile ──────────────────── */}
      <section className="py-24 px-6 bg-black" id="master">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Head Master"
            title="Master Vijay Bhaskar Reddy"
            subtitle="A decorated national athlete and certified instructor who has dedicated over 30 years to the art of Taekwondo."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main card */}
            <div className="md:col-span-1 bg-brand-gray border border-white/5 p-8 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-brand-red/10 border-4 border-brand-red flex items-center justify-center text-6xl mb-6">
                🥋
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-1">Master Vijay Bhaskar Reddy</h3>
              <div className="text-brand-red text-sm font-body mb-2">Chairman</div>
              <div className="text-white/40 text-xs font-body uppercase tracking-widest">
                District Taekwondo Association
              </div>
              <div className="mt-6 w-full h-px bg-white/5" />
              <div className="mt-6 text-white/40 text-xs font-body">
                Experience since <span className="text-brand-gold font-bold text-lg block mt-1">1992</span>
              </div>
            </div>

            {/* Credentials */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              {[
                { icon: '⬛', title: 'Black Belt 4th Dan (WT)', desc: 'World Taekwondo Federation certified — one of the highest ranks in the discipline.' },
                { icon: '📜', title: 'National Master & Instructor', desc: 'Holds the National Master and Instructor Licence, authorised to train and grade students nationally.' },
                { icon: '🚩', title: 'National Referee', desc: 'Certified National Referee, officiating at state and national-level competitions.' },
                { icon: '🥇', title: 'National Gold Medalist', desc: 'Decorated competitor who has achieved national gold — competing and winning at the highest level.' },
                { icon: '⏳', title: '30+ Years Experience', desc: 'Training and teaching Taekwondo continuously since 1992 — a lifetime of dedication.' },
                { icon: '🏆', title: 'District Association Chairman', desc: 'Currently serving as Chairman of the District Taekwondo Association, YSR Kadapa District.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-brand-gray border border-white/5 p-6 hover:border-brand-red/20 transition-all duration-300 group">
                  <div className="text-2xl mb-3">{icon}</div>
                  <h4 className="font-display font-bold text-white text-sm mb-2 group-hover:text-brand-red transition-colors">{title}</h4>
                  <p className="text-white/40 text-xs font-body leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Classes ─────────────────────────── */}
      <section className="py-24 px-6 bg-brand-dark" id="classes">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Training Programme"
            title="Class Schedule & Venue"
            subtitle="Daily morning training sessions designed for students of all ages and experience levels."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📍',
                title: 'Venue',
                lines: ['DSA Municipal Stadium', 'Kadapa, YSR Kadapa District', 'Andhra Pradesh'],
              },
              {
                icon: '🕐',
                title: 'Timing',
                lines: ['5:00 AM – 7:00 AM', 'Every Day (including weekends)', 'Rain or shine — no excuses'],
              },
              {
                icon: '👥',
                title: 'Who Can Join',
                lines: ['Children (6 years and above)', 'Teenagers & Adults', 'All belt levels welcome'],
              },
            ].map(({ icon, title, lines }) => (
              <div key={title} className="bg-brand-gray border border-white/5 p-8 text-center hover:border-brand-red/20 transition-all duration-300">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-white text-lg mb-4">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-white/50 font-body text-sm leading-relaxed">{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-brand-red/10 border border-brand-red/20 p-8 text-center">
            <p className="text-white/70 font-body mb-6">
              Ready to visit? Contact Master Vijay Bhaskar Reddy to get started with your first free session.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://wa.me/918522833600?text=Hello%20Sir,%20I%20want%20to%20join%20Taekwondo%20training"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white font-body font-600 uppercase tracking-widest text-xs px-8 py-4 transition-colors"
              >
                WhatsApp: +91 85228 33600
              </a>
              <a
                href="tel:+918522833600"
                className="bg-brand-red hover:bg-red-700 text-white font-body font-600 uppercase tracking-widest text-xs px-8 py-4 transition-colors"
              >
                Call: +91 85228 33600
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Five Tenets ─────────────────────── */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="The Philosophy" title="Five Tenets of Taekwondo" />
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { korean: '예의', english: 'Courtesy' },
              { korean: '염치', english: 'Integrity' },
              { korean: '인내', english: 'Perseverance' },
              { korean: '극기', english: 'Self-Control' },
              { korean: '백절불굴', english: 'Indomitable Spirit' },
            ].map(({ korean, english }) => (
              <div
                key={english}
                className="group flex flex-col items-center p-8 border border-white/5 hover:border-brand-red/30 bg-brand-gray transition-all duration-500 hover:-translate-y-1 min-w-[160px]"
              >
                <div className="font-korean text-3xl text-brand-red mb-3 group-hover:scale-110 transition-transform">{korean}</div>
                <div className="font-display font-bold text-white text-sm tracking-wide">{english}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
