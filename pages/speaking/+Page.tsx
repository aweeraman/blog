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

const nsbmAiAssociationImages = [
  {
    src: '/images/speaking/nsbm-ai-association-2026/nsbm-ai-association-2026.jpeg',
    alt: 'Anuradha Weeraman with students and organizers at the inaugural NSBM Artificial Intelligence Association session',
  },
  {
    src: '/images/speaking/nsbm-ai-association-2026/anuradha-speaking-nsbm-ai-association-2026.jpeg',
    alt: 'Anuradha Weeraman speaking about the changing path into software engineering at NSBM Green University',
  },
];

const awsStudentCommunityDayImages = [
  {
    src: '/images/speaking/aws-student-community-day-2026/panel-stage.jpeg',
    alt: 'Panel discussion on stage at AWS Student Community Day Sri Lanka at the University of Kelaniya',
  },
  {
    src: '/images/speaking/aws-student-community-day-2026/panel-discussion.jpeg',
    alt: 'Anuradha Weeraman and fellow panelists at AWS Student Community Day Sri Lanka',
  },
];

const openSourceSummit2024Images = [
  {
    src: '/images/speaking/open-source-summit-2024/contributing-to-foss.jpeg',
    alt: 'Anuradha Weeraman speaking about contributing to free and open source software at Open-Source Summit 2024',
  },
];

const velarisPanelImages = [
  {
    src: '/images/speaking/velaris-panel-2025/panel-discussion-wide.jpg',
    alt: 'Anuradha Weeraman speaking during a panel discussion at Velaris',
  },
  {
    src: '/images/speaking/velaris-panel-2025/anuradha-weeraman-speaking.jpg',
    alt: 'Anuradha Weeraman sharing his perspective during the Velaris panel discussion',
  },
];

interface SpeakingEvent {
  title: string;
  type: string;
  organization: string;
  host?: string;
  venue?: string;
  location: string;
  date: string;
  dateTime: string;
  description: string;
  images?: { src: string; alt: string }[];
  link?: { href: string; label: string };
}

const speakingEvents: SpeakingEvent[] = [
  {
    title: 'Moving up the stack',
    type: 'Guest Speaker',
    organization: 'NSBM Artificial Intelligence Association',
    venue: 'NSBM Green University',
    location: 'Sri Lanka',
    date: 'August 18, 2026',
    dateTime: '2026-08-18',
    description: 'Spoke at the association\'s inaugural session about reframing anxiety over AI and the future of software into a forward-looking plan for building strong foundations, contributing to open source, working effectively with agents, and shipping useful software for real users.',
    images: nsbmAiAssociationImages,
    link: {
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7496509838336610304/',
      label: 'Read the LinkedIn post',
    },
  },
  {
    title: 'AI on the Cloud: Opportunities and Challenges for Early Developers',
    type: 'Panelist',
    organization: 'AWS Student Community Day',
    venue: 'University of Kelaniya',
    location: 'Sri Lanka',
    date: 'April 25, 2026',
    dateTime: '2026-04-25',
    description: 'Joined a panel discussion exploring the opportunities cloud-based AI creates for early-career developers, along with the technical and professional challenges they need to navigate.',
    images: awsStudentCommunityDayImages,
  },
  {
    title: 'Building Resilient AI: Architecture Strategies for Mission-Critical Deployments',
    type: 'Keynote',
    organization: 'AWS Community Day',
    location: 'Sri Lanka',
    date: 'September 19, 2025',
    dateTime: '2025-09-19',
    description: 'Explored architecture strategies for mission-critical deployments of foundation models on the AWS cloud with a focus on resilience at the AWS Community Day 2025 in Colombo, Sri Lanka.',
    images: awsCommunityDayImages,
  },
  {
    title: 'Re-writing the Rules: Influence of AI on Engineering & Scrum',
    type: 'Presenter',
    organization: 'Regional Scrum Gathering',
    host: 'Scrum Alliance',
    location: 'Sri Lanka',
    date: 'April 06, 2025',
    dateTime: '2025-04-06',
    description: "Presented on the transformation of development teams through AI adoption, exploring the concept of 'AI-Augmented Teams' and how AI reshapes traditional Scrum roles. Discussed strategies for redefining value and adapting key metrics in AI-enhanced workflows.",
  },
  {
    title: 'Future of AI and Applications in Customer Operations',
    type: 'Panelist',
    organization: 'Velaris',
    location: 'Sri Lanka',
    date: 'March 26, 2025',
    dateTime: '2025-03-26',
    description: 'Participated in an expert panel discussion exploring the evolution of AI, reinforcement learning, and emerging quantum computing applications and use cases for customer operations. Shared insights alongside Tim Budden, with moderation by Dilanka Kalutota.',
    images: velarisPanelImages,
  },
  {
    title: 'Contributing to Free and Open Source Software',
    type: 'Presenter',
    organization: 'Open Source Summit ’24',
    venue: 'University of Kelaniya',
    location: 'Sri Lanka',
    date: 'April 27, 2024',
    dateTime: '2024-04-27',
    description: 'Explored both the practical path into free and open source software and the deeper reasons to take part. Encouraged aspiring contributors to start now, and how to get started.',
    images: openSourceSummit2024Images,
  },
  {
    title: 'IEEE Sri Lanka Robotics Meetup',
    type: 'Moderator',
    organization: 'IEEE Robotics and Automation Society',
    location: 'Sri Lanka',
    date: 'September 2017',
    dateTime: '2017-09',
    description: 'Led expert discussions on robotics and the future of work featuring distinguished academics and industry leaders, including Prof. Chandimal Jayawardena, Mr. Indika Kulatunga, and Dr. Buddika Jayasekara.',
  },
  {
    title: 'Artificial Intelligence for a Smart World',
    type: 'Panelist',
    organization: 'Sri Lanka Association for Artificial Intelligence',
    location: 'Sri Lanka',
    date: 'September 2017',
    dateTime: '2017-09',
    description: 'Delivered expert perspectives at a specialized industry forum exploring AI applications and their societal impacts.',
  },
  {
    title: 'Inaugural IEEE Sri Lanka Robotics Meetup',
    type: 'Panelist',
    organization: 'IEEE Robotics and Automation Society',
    location: 'Sri Lanka',
    date: 'June 2016',
    dateTime: '2016-06',
    description: "Participated in Sri Lanka's inaugural IEEE Robotics Meetup, as part of a panel discussion on underwater and aerial robotics, IoT integration, and automation technologies alongside distinguished panelists including faculty from the University of Moratuwa. The event established a platform for knowledge exchange between industry professionals and academic researchers, exploring commercial applications of robotics for economic advancement in Sri Lanka.",
  },
  {
    title: 'Mobile Technology Trends, Opportunities & Challenges',
    type: 'Presenter',
    organization: 'SLASSCOM Mobile CoE',
    location: 'Sri Lanka',
    date: 'February 2014',
    dateTime: '2014-02',
    description: 'Delivered insights on the transformative impact of mobile technology adoption, exploring emerging user experience paradigms and future innovation opportunities in the smartphone era.',
  },
  {
    title: 'GUI Programming with Perl / GTK',
    type: 'Technical Presenter',
    organization: 'FOSS Community',
    location: 'Sri Lanka',
    date: 'May 2006',
    dateTime: '2006-05',
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

      <main className="page-enter mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:px-8 sm:py-12">
        <a
          href="/"
          className="text-base text-theme-text-tertiary hover:text-theme-accent-primary transition-colors mb-10 inline-flex items-center gap-2 group"
          aria-label="Back to homepage"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Home</span>
        </a>

        <header className="mb-10 sm:mb-12">
          <h1 className="font-display text-4xl font-normal leading-tight tracking-tight text-theme-text-primary sm:text-5xl lg:text-6xl">
            Speaking
          </h1>
        </header>

        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-8">Keynotes & Presentations</h2>

          <div className="space-y-12">
            {speakingEvents.map((event, index) => (
              <article key={index} className="border-b border-theme-border-secondary/50 pb-10 last:border-0">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-theme-text-primary mb-2">
                  {event.title}
                </h3>
                <div className="mb-4 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="inline-flex rounded-full bg-theme-accent-primary px-3 py-1.5 text-xs font-bold leading-none text-theme-bg-primary shadow-sm shadow-theme-accent-primary/20">
                      {event.type}
                    </span>
                    <time dateTime={event.dateTime} className="text-sm text-theme-text-tertiary">
                      {event.date}
                    </time>
                  </div>
                  <p className="!m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm font-medium text-theme-text-secondary">
                    {[event.organization, event.host, event.venue, event.location]
                      .filter((detail): detail is string => Boolean(detail))
                      .map((detail, detailIndex) => (
                        <span key={detail} className="inline-flex min-w-0 items-baseline gap-2">
                          {detailIndex > 0 && <span aria-hidden="true">·</span>}
                          <span>{detail}</span>
                        </span>
                      ))}
                  </p>
                </div>
                <p className="text-theme-text-secondary leading-relaxed">
                  {event.description}
                </p>
                {event.link && (
                  <p className="mt-4">
                    <a
                      href={event.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-theme-accent-primary hover:text-theme-accent-hover transition-colors"
                    >
                      {event.link.label} <span aria-hidden="true">→</span>
                    </a>
                  </p>
                )}
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
