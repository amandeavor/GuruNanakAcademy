import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CookieConsent } from '@/components/shared/cookie-consent';
import { ImageProtection } from '@/components/shared/image-protection';
import { ScrollToTop } from '@/components/shared/scroll-to-top';
import { JsonLd } from '@/components/seo/json-ld';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SCHOOL_INFO } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: `${SCHOOL_INFO.name} | Premier CISCE School in Dehradun`,
    template: `%s | ${SCHOOL_INFO.name}`,
  },
  description: `${SCHOOL_INFO.name} is one of the finest co-educational boarding and day-boarding Schools in Dehradun, Uttarakhand. Founded in ${SCHOOL_INFO.founded}, offering education from Nursery to Class XII. Affiliated to ${SCHOOL_INFO.affiliation}.`,
  keywords: [
    'Guru Nanak Academy',
    'Guru Nanak Academy Dehradun',
    'GNA Dehradun',
    'best school in Dehradun',
    'best schools in Dehradun',
    'top schools in Dehradun',
    'CISCE school Dehradun',
    'ICSE school Dehradun',
    'ISC school Dehradun',
    'boarding school Dehradun',
    'boarding school Uttarakhand',
    'day boarding school Dehradun',
    'co-educational school Dehradun',
    'best boarding school in India',
    'schools near Raipur Road Dehradun',
    'English medium school Dehradun',
  ],
  authors: [{ name: SCHOOL_INFO.name }],
  creator: SCHOOL_INFO.name,
  publisher: SCHOOL_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: SCHOOL_INFO.name,
    title: `${SCHOOL_INFO.name} | Premier CISCE School in Dehradun`,
    description: `One of the finest co-educational boarding and day-boarding Schools in Dehradun, established in ${SCHOOL_INFO.founded}.`,
    images: [
      {
        url: '/images/about.png',
        width: 1200,
        height: 630,
        alt: SCHOOL_INFO.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SCHOOL_INFO.name} | Premier CISCE School in Dehradun`,
    description: `One of the finest co-educational boarding and day-boarding Schools in Dehradun.`,
    images: ['/images/about.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.gurunanakacademydehradun.org',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollToTop />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
          <ImageProtection />
        </ThemeProvider>
      </body>
    </html>
  );
}
