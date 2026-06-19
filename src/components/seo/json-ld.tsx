import { SCHOOL_INFO } from '@/lib/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gurunanakacademydehradun.org';

export function JsonLd() {
  const unifiedGraphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#organization`,
        name: `${SCHOOL_INFO.name} Dehradun`,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo.png`,
          width: '112',
          height: '112',
        },
        image: `${SITE_URL}/images/about.png`,
        description: `${SCHOOL_INFO.name} is one of the finest co-educational boarding and day-boarding schools in Dehradun, Uttarakhand. Founded in ${SCHOOL_INFO.founded}, offering quality education from Nursery to Class XII.`,
        foundingDate: String(SCHOOL_INFO.founded),
        sameAs: [
          `https://www.instagram.com/${SCHOOL_INFO.socialMedia.instagram.replace('@', '')}`,
          `https://www.facebook.com/${SCHOOL_INFO.socialMedia.facebook}`,
        ],
        memberOf: {
          '@type': 'Organization',
          name: 'Council for the Indian School Certificate Examinations',
          alternateName: 'CISCE',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHOOL_INFO.address.street,
          addressLocality: SCHOOL_INFO.address.city,
          addressRegion: SCHOOL_INFO.address.state,
          postalCode: SCHOOL_INFO.address.pincode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: String(SCHOOL_INFO.coordinates.lat),
          longitude: String(SCHOOL_INFO.coordinates.lng),
        },
        telephone: SCHOOL_INFO.phones[0].number,
      },
      {
        '@type': 'School',
        '@id': `${SITE_URL}/#school`,
        name: SCHOOL_INFO.name,
        description: 'One of the best schools in Dehradun offering CISCE curriculum with boarding and day-boarding facilities.',
        url: SITE_URL,
        telephone: SCHOOL_INFO.phones[0].number,
        parentOrganization: {
          '@id': `${SITE_URL}/#organization`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHOOL_INFO.address.street,
          addressLocality: SCHOOL_INFO.address.city,
          addressRegion: SCHOOL_INFO.address.state,
          postalCode: SCHOOL_INFO.address.pincode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: String(SCHOOL_INFO.coordinates.lat),
          longitude: String(SCHOOL_INFO.coordinates.lng),
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Academic Streams Catalog',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'EducationalOccupationalProgram',
                name: 'Science Stream (PCM/PCB)',
                programDuration: 'P2Y',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'EducationalOccupationalProgram',
                name: 'Commerce Stream',
                programDuration: 'P2Y',
              },
            },
          ],
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: SCHOOL_INFO.name,
        image: `${SITE_URL}/images/about.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHOOL_INFO.address.street,
          addressLocality: SCHOOL_INFO.address.city,
          addressRegion: SCHOOL_INFO.address.state,
          postalCode: SCHOOL_INFO.address.pincode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: String(SCHOOL_INFO.coordinates.lat),
          longitude: String(SCHOOL_INFO.coordinates.lng),
        },
        url: SITE_URL,
        telephone: SCHOOL_INFO.phones[0].number,
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '07:30',
          closes: '17:00',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SCHOOL_INFO.name,
        description: 'Official website of Guru Nanak Academy, Dehradun - One of the best schools in Dehradun',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Event',
        name: 'Interhouse Quiz Competition 2025',
        startDate: '2025-09-27T10:00:00+05:30',
        endDate: '2025-09-27T13:00:00+05:30',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Guru Nanak Academy Auditorium',
          address: {
            '@type': 'PostalAddress',
            streetAddress: SCHOOL_INFO.address.street,
            addressLocality: SCHOOL_INFO.address.city,
            addressRegion: SCHOOL_INFO.address.state,
            postalCode: SCHOOL_INFO.address.pincode,
            addressCountry: 'IN',
          },
        },
        organizer: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedGraphSchema) }}
    />
  );
}
