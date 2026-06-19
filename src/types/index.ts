import type { LucideIcon } from 'lucide-react';

// Generic types
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Event types
export interface Event extends BaseEntity {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  image?: string;
  featured?: boolean;
  location?: string;
  time?: string;
}

export interface EventFilter {
  year?: string;
  category?: string;
  search?: string;
}

// Blog types
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  readingTime?: number;
}

// Facility types
export interface Facility extends BaseEntity {
  title: string;
  shortTitle?: string;
  icon: LucideIcon;
  description: string;
  fullDescription?: string;
  features?: string[];
  equipment?: string[];
  safetyNotes?: string[];
  hours?: string;
  image?: string;
  href?: string;
}

// Leadership types
export interface LeadershipMember {
  name: string;
  role: string;
  image: string;
  message?: string;
  bio?: string;
}

// Contact types
export interface ContactInfo {
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode?: string;
    full: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phones: Array<{
    label: string;
    number: string;
  }>;
  emails: Array<{
    label: string;
    email: string;
  }>;
}

// Navigation types
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// Form submission response
export interface FormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

// SEO types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

// Image placeholder types
export interface PlaceholderImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}
