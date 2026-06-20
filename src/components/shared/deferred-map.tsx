"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { Map, MapProps } from "./map";

export function DeferredMap(props: MapProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px 0px", // Preload map when user is within 300px of scrolling it into view
  });

  return (
    <div ref={ref} className="w-full h-full min-h-[300px] rounded-xl overflow-hidden relative">
      {inView ? (
        <Map {...props} />
      ) : (
        <div className="w-full h-full min-h-[300px] bg-muted/40 animate-pulse flex items-center justify-center border border-border rounded-2xl">
          <span className="text-sm text-muted-foreground">Loading interactive map...</span>
        </div>
      )}
    </div>
  );
}
