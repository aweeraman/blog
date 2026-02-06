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

export default function Page() {
  useEffect(() => {
    document.title = 'Testimonials | Anuradha Weeraman';
  }, []);

  return (
    <div className="min-h-screen bg-theme-bg-primary flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-5 sm:px-8 flex-1 py-8 sm:py-12">
        <a
          href="/"
          className="text-base text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-10 inline-flex items-center gap-2 group"
          aria-label="Back to homepage"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Home</span>
        </a>

        <header className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-text-primary leading-tight tracking-tight">
            Testimonials
          </h1>
          <p className="mt-4 text-base text-theme-text-secondary">
            LinkedIn recommendations from colleagues, clients, and industry leaders.
          </p>
        </header>

        <section className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="bg-theme-bg-secondary border border-theme-border-primary rounded-xl p-6 sm:p-8 hover:border-theme-border-primary/80 transition-all duration-300"
            >
              {/* Quote */}
              <div className="relative">
                <span className="absolute -top-2 -left-2 text-5xl text-theme-accent-primary/20 font-serif leading-none select-none">
                  "
                </span>
                <blockquote className="text-theme-text-secondary leading-relaxed pl-4 sm:pl-6">
                  {testimonial.testimonial}
                </blockquote>
              </div>

              {/* Author info */}
              <div className="mt-6 pt-6 border-t border-theme-border-secondary/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <a
                    href={testimonial.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 group"
                  >
                    <span className="text-lg font-semibold text-theme-text-primary group-hover:text-theme-accent-primary transition-colors">
                      {testimonial.name}
                    </span>
                    <svg
                      className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <p className="text-sm text-theme-text-tertiary mt-1">
                    {testimonial.title}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-sm">
                  <span className="inline-flex items-center px-3 py-1 bg-theme-bg-tertiary text-theme-text-tertiary rounded-full text-xs">
                    {testimonial.relationship}
                  </span>
                  <span className="text-theme-text-tertiary">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
