import { useEffect } from 'react';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import testimonialData from '../../data/testimonials.json';

interface Testimonial {
  name: string;
  title: string;
  linkedin_url: string;
  date: string;
  relationship: string;
  testimonial: string;
}

const testimonials: Testimonial[] = testimonialData.testimonials;

const featuredTestimonialKeys = new Set([
  'Kartik Iyengar|August 13, 2022',
  'Curt Younker|January 3, 2019',
  'Eric Martinez|March 8, 2018',
  'Adam Gabrault|August 25, 2017',
  "Brian O'Neill|May 21, 2013",
]);

function testimonialKey(testimonial: Testimonial) {
  return `${testimonial.name}|${testimonial.date}`;
}

const featuredTestimonials = testimonials.filter((testimonial) => featuredTestimonialKeys.has(testimonialKey(testimonial)));
const archivedTestimonials = testimonials.filter((testimonial) => !featuredTestimonialKeys.has(testimonialKey(testimonial)));
const sortedArchivedTestimonials = [...archivedTestimonials].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

function LinkedInMark() {
  return (
    <svg className="h-4 w-4 flex-shrink-0 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function Attribution({ testimonial, compact = false }: { testimonial: Testimonial; compact?: boolean }) {
  return (
    <div className="min-w-0">
      <a href={testimonial.linkedin_url} target="_blank" rel="noopener noreferrer" className="group inline-flex max-w-full items-center gap-2">
        <span className={`${compact ? 'text-base' : 'text-lg'} min-w-0 break-words font-semibold text-theme-text-primary transition-colors group-hover:text-theme-accent-hover`}>
          {testimonial.name}
        </span>
        <LinkedInMark />
      </a>
      <p className={`${compact ? 'text-xs' : 'text-sm'} mt-1 break-words leading-relaxed text-theme-text-tertiary [overflow-wrap:anywhere]`}>
        {testimonial.title}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-theme-text-tertiary/80">{testimonial.relationship}</p>
      <time className="mt-2 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-theme-text-tertiary">
        {testimonial.date}
      </time>
    </div>
  );
}

function ArchiveTestimonial({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="min-w-0 rounded-2xl border border-theme-border-secondary bg-theme-bg-secondary/30 p-6 sm:p-7">
      <span className="font-display block h-8 select-none text-5xl leading-none text-theme-accent-primary/25" aria-hidden="true">“</span>
      <blockquote className="font-editorial mt-3 break-words text-base leading-[1.75] text-theme-text-secondary [overflow-wrap:anywhere] sm:text-lg">
        {testimonial.testimonial}
      </blockquote>
      <div className="mt-6 border-t border-theme-border-secondary/70 pt-5">
        <Attribution testimonial={testimonial} compact />
      </div>
    </article>
  );
}

export default function Page() {
  useEffect(() => {
    document.title = 'Testimonials | Anuradha Weeraman';
  }, []);

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip bg-theme-bg-primary">
      <Header />

      <main className="page-enter mx-auto min-w-0 w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <a href="/" className="group mb-10 inline-flex items-center gap-2 text-base text-theme-text-tertiary transition-colors hover:text-theme-accent-primary" aria-label="Back to homepage">
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Home</span>
        </a>

        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent-hover">Clients · colleagues · leaders</p>
          <h1 className="font-display text-4xl font-normal leading-tight tracking-tight text-theme-text-primary sm:text-5xl lg:text-6xl">In their words</h1>
          <p className="font-editorial mt-5 max-w-2xl text-lg leading-relaxed text-theme-text-secondary">
            Recommendations from clients, founders, engineering leaders, and colleagues who have worked with me across products, platforms, and teams.
          </p>
        </header>

        <section aria-labelledby="selected-testimonials">
          <div className="mb-7 flex items-end justify-between gap-4 border-b border-theme-border-secondary pb-5">
            <h2 id="selected-testimonials" className="font-display text-3xl font-normal text-theme-text-primary sm:text-4xl">Selected perspectives</h2>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-theme-text-tertiary lg:block">Leadership · Architecture · Delivery</span>
          </div>

          <div className="space-y-5">
            {featuredTestimonials.map((testimonial) => (
              <article key={testimonialKey(testimonial)} className="relative min-w-0 overflow-hidden rounded-2xl border border-theme-border-primary bg-theme-bg-secondary/55 p-6 sm:p-8 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
                <div className="mb-6 min-w-0 border-b border-theme-border-secondary pb-6 lg:mb-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                  <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-theme-accent-hover">Selected perspective</p>
                  <Attribution testimonial={testimonial} />
                </div>
                <div className="relative min-w-0 lg:pl-2">
                  <span className="font-display absolute -left-1 -top-5 select-none text-7xl leading-none text-theme-accent-primary/20" aria-hidden="true">“</span>
                  <blockquote className="font-editorial relative break-words pt-6 text-lg leading-[1.75] text-theme-text-secondary [overflow-wrap:anywhere] sm:text-xl lg:pt-3">
                    {testimonial.testimonial}
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-theme-border-primary/70 pt-10 sm:mt-20 sm:pt-12" aria-labelledby="recommendation-archive">
          <div className="mb-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-accent-hover">The full record</p>
              <h2 id="recommendation-archive" className="font-display text-3xl font-normal text-theme-text-primary sm:text-4xl">More recommendations</h2>
            </div>
          </div>

          <div className="grid min-w-0 items-start gap-5 lg:grid-cols-2">
            {sortedArchivedTestimonials.map((testimonial) => (
              <ArchiveTestimonial key={testimonialKey(testimonial)} testimonial={testimonial} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
