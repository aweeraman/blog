export const SITE_URL = 'https://weeraman.com';
export const PERSON_ID = `${SITE_URL}/#person`;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Anuradha Weeraman',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/anuradha-weeraman.jpg`,
  jobTitle: ['Technologist', 'Software Architect', 'Founder'],
  description: 'Technologist, software architect, and founder helping companies design and build intelligent software systems that scale.',
  sameAs: [
    'https://github.com/aweeraman',
    'https://www.linkedin.com/in/anuradha-weeraman',
    'https://twitter.com/anuradha',
    'https://www.youtube.com/channel/UCCJaXCP9hRNbJ5az1PHOhtw',
    'https://keybase.io/aweeraman',
  ],
};

export const personReference = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: personJsonLd.name,
  url: personJsonLd.url,
};
