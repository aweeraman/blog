import { useEffect } from 'react';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { ImageGallery } from '../../src/components/ImageGallery';

const awsCommunityDayImages = [
  { src: '/images/speaking/aws-community-day-2025/1759070771947.jpeg', alt: 'AWS Community Day 2025' },
  { src: '/images/speaking/aws-community-day-2025/1759070772014.jpeg', alt: 'AWS Community Day 2025' },
  { src: '/images/speaking/aws-community-day-2025/1759070773521.jpeg', alt: 'AWS Community Day 2025' },
  { src: '/images/speaking/aws-community-day-2025/1759070776387.jpeg', alt: 'AWS Community Day 2025' },
];

interface SpeakingEvent {
  title: string;
  type: string;
  organization: string;
  date: string;
  description: string;
  images?: { src: string; alt: string }[];
}

const speakingEvents: SpeakingEvent[] = [
  {
    title: 'Building Resilient AI: Architecture Strategies for Mission-Critical Deployments',
    type: 'Keynote',
    organization: 'AWS Community Day, Sri Lanka',
    date: 'September 2025',
    description: 'Explored architecture strategies for mission-critical deployments of foundation models on the AWS cloud with a focus on resilience at the AWS Community Day 2025 in Colombo, Sri Lanka.',
    images: awsCommunityDayImages,
  },
  {
    title: 'Re-writing the Rules: Influence of AI on Engineering & Scrum',
    type: 'Presenter',
    organization: 'Regional Scrum Gathering, Scrum Alliance',
    date: 'April 2025',
    description: "Presented on the transformation of development teams through AI adoption, exploring the concept of 'AI-Augmented Teams' and how AI reshapes traditional Scrum roles. Discussed strategies for redefining value and adapting key metrics in AI-enhanced workflows.",
  },
  {
    title: 'Future of AI and Applications in Customer Operations',
    type: 'Panelist',
    organization: '',
    date: 'March 2025',
    description: 'Participated in an expert panel discussion exploring the evolution of AI, reinforcement learning, and emerging quantum computing applications and use cases for customer operations. Shared insights alongside Tim Budden, with moderation by Dilanka Kalutota.',
  },
  {
    title: 'IEEE Sri Lanka Robotics Meetup',
    type: 'Moderator',
    organization: 'IEEE Robotics and Automation Society',
    date: 'September 2017',
    description: 'Led expert discussions on robotics and the future of work featuring distinguished academics and industry leaders, including Prof. Chandimal Jayawardena, Mr. Indika Kulatunga, and Dr. Buddika Jayasekara.',
  },
  {
    title: 'Artificial Intelligence for a Smart World',
    type: 'Panelist',
    organization: 'Sri Lanka Association for Artificial Intelligence',
    date: 'September 2017',
    description: 'Delivered expert perspectives at a specialized industry forum exploring AI applications and their societal impacts.',
  },
  {
    title: 'Inaugural IEEE Sri Lanka Robotics Meetup',
    type: 'Panelist',
    organization: 'IEEE Robotics and Automation Society',
    date: 'June 2016',
    description: "Participated in Sri Lanka's inaugural IEEE Robotics Meetup, as part of a panel discussion on underwater and aerial robotics, IoT integration, and automation technologies alongside distinguished panelists including faculty from the University of Moratuwa. The event established a platform for knowledge exchange between industry professionals and academic researchers, exploring commercial applications of robotics for economic advancement in Sri Lanka.",
  },
  {
    title: 'Mobile Technology Trends, Opportunities & Challenges',
    type: 'Presenter',
    organization: 'SLASSCOM Mobile CoE',
    date: 'February 2014',
    description: 'Delivered insights on the transformative impact of mobile technology adoption, exploring emerging user experience paradigms and future innovation opportunities in the smartphone era.',
  },
  {
    title: 'GUI Programming with Perl / GTK',
    type: 'Technical Presenter',
    organization: 'FOSS Community, Sri Lanka',
    date: 'May 2006',
    description: 'Conducted an introductory session on developing graphical user interfaces using Perl and GTK at FOSS-ed for Hackers, promoting free and open source software principles.',
  },
];

export default function Page() {
  useEffect(() => {
    document.title = 'Speaking | Anuradha Weeraman';
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
            Speaking
          </h1>
        </header>

        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-8">Keynotes & Presentations</h2>

          <div className="space-y-12">
            {speakingEvents.map((event, index) => (
              <article key={index} className="border-b border-theme-border-secondary/50 pb-10 last:border-0">
                <h3 className="text-lg sm:text-xl font-semibold text-theme-text-primary mb-2">
                  {event.title}
                </h3>
                <p className="text-theme-text-secondary font-medium mb-4">
                  {event.type}
                  {event.organization && ` · ${event.organization}`}
                  {` · ${event.date}`}
                </p>
                <p className="text-theme-text-secondary leading-relaxed">
                  {event.description}
                </p>
                {event.images && <ImageGallery images={event.images} />}
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
