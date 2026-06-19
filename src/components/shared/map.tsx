'use client';

import { useEffect, useRef, useState } from 'react';
import { SCHOOL_INFO } from '@/lib/constants';

// Default coordinates from school info
const DEFAULT_CENTER: [number, number] = [
  SCHOOL_INFO.coordinates.lat,
  SCHOOL_INFO.coordinates.lng,
];

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  markerTitle?: string;
  className?: string;
}

export function Map({
  center = DEFAULT_CENTER,
  zoom = 15,
  markerPosition = DEFAULT_CENTER,
  markerTitle = SCHOOL_INFO.name,
  className,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet only on client side
    const initMap = async () => {
      // Inject leaflet CSS from CDN (avoids broken asset paths in npm package)
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }

      const L = (await import('leaflet')).default;

      // Fix for default marker icon in Next.js
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative">
            <div class="absolute -left-4 -top-10 h-10 w-8">
              <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="currentColor" class="text-primary"/>
                <circle cx="12" cy="12" r="5" fill="white"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      });

      // Initialize map
      const map = L.map(mapRef.current!, {
        center,
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add marker if position provided
      if (markerPosition) {
        const marker = L.marker(markerPosition, { icon: customIcon }).addTo(map);
        marker.bindPopup(
          `<div class="p-2">
            <strong class="text-foreground">${markerTitle}</strong>
          </div>`
        );
      }

      mapInstanceRef.current = map;
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, center, zoom, markerPosition, markerTitle]);

  if (!isClient) {
    return (
      <div
        className={`${className} relative z-0`}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
        role="application"
        aria-label={`Map showing location of ${markerTitle}`}
      >
        <div className="flex h-full w-full items-center justify-center bg-muted rounded-2xl">
          <span className="text-muted-foreground">Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className={`${className} relative z-0`}
      style={{ height: '100%', width: '100%', minHeight: '300px' }}
      role="application"
      aria-label={`Map showing location of ${markerTitle}`}
    />
  );
}

// Static fallback map image component
export function StaticMapFallback({
  lat,
  lng,
  zoom = 15,
  width = 600,
  height = 400,
  className,
}: {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
  className?: string;
}) {
  // Using OpenStreetMap static map service
  const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=${lat},${lng},lightblue`;

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mapUrl}
        alt="Map showing school location"
        className="h-full w-full rounded-2xl object-cover"
        loading="lazy"
      />
    </div>
  );
}
