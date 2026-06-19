import {
  Atom,
  Beaker,
  Microscope,
  Monitor,
  BookOpen,
  Home,
  Building2,
  type LucideIcon,
} from 'lucide-react';

// School Information
export const SCHOOL_INFO = {
  name: 'Guru Nanak Academy',
  shortName: 'GNA',
  tagline: 'One of the finest co-educational boarding and day-boarding School in Dehradun',
  founded: 1972,
  foundedOn: '500th birth anniversary of Shri Guru Nanak Dev Ji',
  campusSize: '13 acres',
  grades: 'Nursery to Class XII',
  affiliation: 'CISCE, New Delhi',
  address: {
    street: 'Raipur Road',
    city: 'Dehradun',
    state: 'Uttarakhand',
    country: 'India',
    pincode: '248001',
    full: 'Raipur Road, Dehradun, Uttarakhand, India',
  },
  coordinates: {
    lat: 30.32357128206072,
    lng: 78.06699650792665,
  },
  phones: [
    { label: 'Office', number: '0135-2787235' },
    { label: 'Office', number: '0135-2787345' },
    { label: 'Mobile', number: '+91-9411550014' },
    { label: 'Mobile', number: '7500111248' },
    { label: 'Mobile', number: '9412347250' },
  ],
  emails: [
    { label: 'Principal', email: 'principalgna@gmail.com' },
    { label: 'Admission', email: 'gnaquerry@gmail.com' },
  ],
  socialMedia: {
    instagram: '@gurunanak_academy',
    facebook: 'gurunakacademy',
  },
  houses: ['Ajit', 'Jujhar', 'Zorawar', 'Fateh'],
} as const;

// Leadership Team
export const LEADERSHIP = [
  {
    name: 'Mr. Harcharan Singh Pasricha',
    role: 'Chairman',
    image: '/images/chairmanimage.png',
    message:
      'Leading this institution is a challenge, which I relish. We have a talented, dedicated and caring teaching faculty.',
  },
  {
    name: 'Mr. DPS Gupta',
    role: 'Principal',
    image: '/images/principalsimage.png',
    message:
      'We aim at character building, social service and empathy besides academic excellence thereby providing a holistic and inclusive education.',
  },
  {
    name: 'Mrs. Annie Singh',
    role: 'School Consultant',
    image: '/images/consultantannieimage.png',
    message:
      'We wish to empower our students with life skills, scholastic knowledge and values both social and cultural.',
  },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Admission Procedure', href: '/admission' },
  { label: 'Boarding', href: '/boarding' },
  { label: 'Events', href: '/events' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Co-Curricular', href: '/co-curricular' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
] as const;

// Labs Data
export interface Lab {
  id: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  fullDescription: string;
  features: string[];
  equipment: string[];
  safetyNotes?: string[];
  image: string;
}

export const LABS: Lab[] = [
  {
    id: 'physics',
    title: 'Physics Laboratory',
    shortTitle: 'Physics Lab',
    icon: Atom,
    description:
      'State-of-the-art facility designed to inspire and ignite a passion for Physics.',
    fullDescription:
      'Our school is proud to present a state-of-the-art Physics laboratory designed to inspire and ignite a passion for Physics in every student. Spanning an expansive area, the laboratory is thoughtfully designed with ample space for experiments, demonstrations, and collaborative learning.',
    features: [
      'Ergonomic layout for easy movement and accessibility',
      'Latest instruments and technologies',
      'Hands-on experience with tools',
      'Advanced electronic sensors and data logging equipment',
    ],
    equipment: [
      'Basic mechanics apparatus',
      'Electronic sensors',
      'Data logging equipment',
      'Optical instruments',
      'Electrical measurement tools',
    ],
    safetyNotes: [
      'Safety goggles required during experiments',
      'Proper handling of electrical equipment',
      'Follow all lab protocols',
    ],
    image: '/images/physicslab.png',
  },
  {
    id: 'chemistry',
    title: 'Chemistry Laboratory',
    shortTitle: 'Chemistry Lab',
    icon: Beaker,
    description:
      'Modern facilities with comprehensive equipment for hands-on chemical experiments.',
    fullDescription:
      'Our laboratory is equipped with modern facilities and a wide range of equipment that caters to the diverse needs of our Chemistry curriculum. From classic glassware to advanced spectroscopy instruments, our laboratory provides students with the tools necessary for a comprehensive learning experience.',
    features: [
      'Wide range of equipment for diverse curriculum needs',
      'Learning by doing approach',
      'Interactive experiments and group projects',
      'Innovative teaching methods',
    ],
    equipment: [
      'Classic glassware',
      'Spectroscopy instruments',
      'Fume hoods',
      'Chemical reagents',
      'Safety equipment',
    ],
    safetyNotes: [
      'Always wear lab coats and safety goggles',
      'Handle chemicals with care',
      'Know the location of safety equipment',
    ],
    image: '/images/chemistrylab.png',
  },
  {
    id: 'biology',
    title: 'Biology Laboratory',
    shortTitle: 'Biology Lab',
    icon: Microscope,
    description:
      'A vibrant environment to explore the complexities of living organisms.',
    fullDescription:
      'We have a state-of-the-art Biology laboratory, a vibrant and dynamic environment where students embark on a journey to explore the complexities of living organisms. Our laboratory is equipped with advanced facilities and a wide array of equipment that cater to all branches of biology.',
    features: [
      'Advanced facilities for all biology branches',
      'High-quality microscopes',
      'Strict safety protocols',
      'Ethical guidelines adherence',
    ],
    equipment: [
      'High-quality microscopes',
      'Incubators',
      'Anatomical models',
      'Specimen collection',
      'Dissection tools',
    ],
    safetyNotes: [
      'Proper disposal of biological materials',
      'Ethical handling of specimens',
      'Maintain cleanliness and hygiene',
    ],
    image: '/images/biolab.png',
  },
  {
    id: 'computer',
    title: 'Computer Laboratory',
    shortTitle: 'Computer Lab',
    icon: Monitor,
    description:
      'A hub of technological learning with latest computers and software programs.',
    fullDescription:
      'Our Computer laboratory is a hub of technological learning where students are equipped with the skills and knowledge for the digital world. Our laboratory is outfitted with the latest computers, high-speed internet access, and a variety of software programs.',
    features: [
      'Latest computers and high-speed internet',
      'Secure, filtered internet access',
      'Hands-on learning emphasis',
      'Curriculum integration',
    ],
    equipment: [
      'Latest desktop computers',
      'High-speed internet',
      'Programming software',
      'Graphic design tools',
      'Multimedia equipment',
    ],
    image: '/images/physicslab.png',
  },
];

// Facilities Data
export interface Facility {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  highlights: string[];
  image: string;
  href: string;
}

export const FACILITIES: Facility[] = [
  {
    id: 'boarding',
    title: 'Boarding',
    icon: Home,
    description:
      'Our school hostel provides a safe environment for students to live and learn with modern amenities.',
    highlights: [
      'Residential facilities for boys (Classes IV-VIII)',
      'Well-equipped hostel rooms',
      'Trained staff including housemistress and housemaster',
      'Wellness Centre on campus',
      'School counsellor available 7 days a week',
    ],
    image: '/images/about.png',
    href: '/boarding',
  },
  {
    id: 'dayboarding',
    title: 'Day-Boarding',
    icon: Building2,
    description:
      'Extended school day with meals, academic support, and extracurricular activities.',
    highlights: [
      'Open to boys and girls (Classes IV-XII)',
      'Hours: 7:40 AM to 5 PM',
      'Mid-morning fruit break',
      'Nutritious lunch',
      'Tutorial and activity time',
    ],
    image: '/images/about.png',
    href: '/boarding#dayboarding',
  },
  {
    id: 'library',
    title: 'Library',
    icon: BookOpen,
    description:
      'A sanctuary of knowledge with diverse collection of books and digital resources.',
    highlights: [
      'Diverse collection of books and e-books',
      'Periodicals and academic journals',
      'Multimedia content',
      'Comfortable reading areas',
      'Collaborative workspaces',
    ],
    image: '/images/library1.png',
    href: '/facilities#library',
  },
];

// Campus Stats
export const CAMPUS_STATS = [
  { label: 'Campus Area', value: '13', unit: 'Acres' },
  { label: 'Founded', value: '1972', unit: '' },
  { label: 'Grades', value: 'N-XII', unit: '' },
  { label: 'Houses', value: '4', unit: '' },
];

// Co-curricular Activities
export const ACTIVITIES = [
  'Quiz Contests',
  'Elocution',
  'Debates',
  'Essay Writing',
  'Dramatics',
  'Soccer',
  'Hockey',
  'Cricket',
  'Indoor Cricket',
  'Basketball',
  'Table Tennis',
  'Volleyball',
  'Badminton',
  'Chess',
  'Athletics',
  'Gymnastics',
];

// Quick Links for Footer
export const QUICK_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Admission', href: '/admission' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

// Admission Steps
export const ADMISSION_STEPS = [
  {
    step: 1,
    title: 'Check Eligibility',
    description:
      'Verify age requirements: 3+ years for Play Group, 4+ for Kindergarten, 5+ for Class 1.',
  },
  {
    step: 2,
    title: 'Submit Application',
    description:
      'Fill out the admission form with required documents including birth certificate and photographs.',
  },
  {
    step: 3,
    title: 'Entrance Test',
    description:
      'All students seeking admission must clear a Pre-admission/Entrance Test.',
  },
  {
    step: 4,
    title: 'Document Verification',
    description:
      'Submit original report card, bonafide certificate, and transfer certificate.',
  },
  {
    step: 5,
    title: 'Fee Payment',
    description:
      'Complete the admission formalities and fee payment at the Administrative Office.',
  },
];

// Class Options for Admission Form
export const CLASS_OPTIONS = [
  'Play Group',
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

// Events Categories
export const EVENT_CATEGORIES = [
  'Academic',
  'Sports',
  'Cultural',
  'Competition',
  'Celebration',
  'Ceremony',
  'Other',
];

// Sample Events Data
export const SAMPLE_EVENTS = [
  {
    id: 'interhouse-quiz-2025',
    title: 'Interhouse Quiz Competition',
    slug: 'interhouse-quiz-competition-2025',
    date: '2025-09-27',
    category: 'Competition',
    excerpt:
      'Our school hosted an Inter-house Quiz Competition in which all four house students participated: Ajit, Jujhar, Zorawar & Fateh.',
    content:
      'Our school hosted an Inter-house Quiz Competition on 27, September 2025 in which all four house students participated: Ajit, Jujhar, Zorawar & Fateh. The event was a grand success with enthusiastic participation from students across middle and senior categories.',
    image: '/images/library2.png',
    featured: true,
  },
  {
    id: 'football-match-2025',
    title: 'Students vs Teachers Football Match',
    slug: 'students-vs-teachers-football-match-2025',
    date: '2025-09-27',
    category: 'Sports',
    excerpt:
      'An exciting football match was held between GNA students and Staff/Alumni to foster comradeship and promote sportsmanship.',
    content:
      'An exciting football match was held on 27, September 2025 between GNA students V/S Staff/ Alumni to foster comradeship and to promote sportsmanship. It was a thrilling game that brought together the school community.',
    image: '/images/basketball.png',
    featured: true,
  },
  {
    id: 'dussehra-celebration-2025',
    title: 'Dussehra Celebration',
    slug: 'dussehra-celebration-2025',
    date: '2025-10-12',
    category: 'Celebration',
    excerpt:
      'The school celebrated Dussehra with great enthusiasm and cultural programs.',
    content:
      'The school celebrated Dussehra with great enthusiasm and cultural programs showcasing the victory of good over evil.',
    image: '/images/about.png',
    featured: true,
  },
  {
    id: 'hindi-diwas-2025',
    title: 'Celebration of Hindi Diwas',
    slug: 'hindi-diwas-celebration-2025',
    date: '2025-09-14',
    category: 'Cultural',
    excerpt:
      'Hindi Diwas was celebrated with various activities promoting the importance of Hindi language.',
    content:
      'Hindi Diwas was celebrated on September 14th with various activities including poetry recitation, essay writing, and cultural programs promoting the importance of Hindi language.',
    image: '/images/library1.png',
    featured: false,
  },
  {
    id: 'parent-orientation-2025',
    title: 'Parent Orientation Meeting',
    slug: 'parent-orientation-meeting-2025',
    date: '2025-07-15',
    category: 'Academic',
    excerpt:
      'An orientation meeting was conducted for parents to familiarize them with the academic year plans.',
    content:
      'An orientation meeting was conducted for parents to familiarize them with the academic year plans, curriculum changes, and school policies.',
    image: '/images/about.png',
    featured: false,
  },
  {
    id: 'independence-day-2025',
    title: 'Independence Day Celebration',
    slug: 'independence-day-celebration-2025',
    date: '2025-08-15',
    category: 'Celebration',
    excerpt:
      'The 79th Independence Day was celebrated with flag hoisting and patriotic performances.',
    content:
      'The 79th Independence Day was celebrated with flag hoisting ceremony followed by patriotic songs, speeches, and cultural performances by students.',
    image: '/images/about.png',
    featured: false,
  },
  {
    id: 'investiture-ceremony-2025',
    title: 'Investiture Ceremony 2025-26',
    slug: 'investiture-ceremony-2025-26',
    date: '2025-07-26',
    category: 'Ceremony',
    excerpt:
      'Guru Nanak Academy held its investiture ceremony for the academic year 2025-26.',
    content:
      'Guru Nanak Academy held its investiture ceremony for the academic year 2025-26 on 26 July 2025. The ceremony was graced by our chairman Mr Harcharan Singh Pasricha. Student leaders were bestowed with their badges and responsibilities.',
    image: '/images/about.png',
    featured: false,
  },
  {
    id: 'sahej-path-2025',
    title: 'Sahej Path Ceremony',
    slug: 'sahej-path-ceremony-2025',
    date: '2025-11-15',
    category: 'Ceremony',
    excerpt:
      'Bhog Sahej Path of Shri Guru Granth Sahib Ji was held as per tradition.',
    content:
      'As per tradition, Bhog Sahej Path of Shri Guru Granth Sahib Ji was held and new sahej path started keeping Guru Nanak Dev Ji Gurpurab into reverence.',
    image: '/images/about.png',
    featured: false,
  },
];
