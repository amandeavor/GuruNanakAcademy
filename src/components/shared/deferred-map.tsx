"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import type { MapProps } from "./map";

// Dynamically import the real Leaflet Map on client-side only
const DynamicMap = dynamic(
  () => import("./map").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full min-h-[300px] items-center justify-center rounded-2xl bg-muted animate-pulse">
        <span className="text-sm text-muted-foreground">Initializing map...</span>
      </div>
    ),
  }
);

export function DeferredMap(props: MapProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px", // Preloads components as the user scrolls within range
  });

  return (
    <div ref={ref} className="w-full h-full min-h-[300px] rounded-xl overflow-hidden relative">
      {inView ? (
        <DynamicMap {...props} />
      ) : (
        <div className="w-full h-full min-h-[300px] bg-muted flex items-center justify-center border border-border rounded-2xl">
          <span className="text-sm text-muted-foreground">Scroll to load interactive map...</span>
        </div>
      )}
    </div>
  );
}
