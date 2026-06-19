'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 240;

function getFramePath(index: number): string {
  const num = String(index + 1).padStart(3, '0');
  return `/video-frames/ezgif-frame-${num}.jpg`;
}

interface VideoFrameSequenceProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}

export function VideoFrameSequence({ scrollContainerRef }: VideoFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
    layoutEffect: false,
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const getClosestLoadedFrame = useCallback((targetIndex: number) => {
    let closestIndex = targetIndex;
    if (!imagesRef.current[targetIndex]?.complete) {
      let radius = 1;
      let found = false;
      while (radius < TOTAL_FRAMES) {
        const down = targetIndex - radius;
        const up = targetIndex + radius;
        
        if (down >= 0 && imagesRef.current[down]?.complete) {
          closestIndex = down;
          found = true;
          break;
        }
        if (up < TOTAL_FRAMES && imagesRef.current[up]?.complete) {
          closestIndex = up;
          found = true;
          break;
        }
        radius++;
      }
      if (!found) return null;
    }
    return closestIndex;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const renderIndex = getClosestLoadedFrame(index);
    if (renderIndex === null) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[renderIndex];
    
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [getClosestLoadedFrame]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    let cancelled = false;

    const loadStridedFrames = async () => {
      // 1. Immediately load the first 5 frames
      for (let i = 0; i < 5; i++) {
        if (cancelled) return;
        const img = new Image();
        img.src = getFramePath(i);
        await new Promise((resolve) => {
          img.onload = () => {
            if (!cancelled) {
              imagesRef.current[i] = img;
              if (i === 0 || i === currentFrameRef.current) drawFrame(i);
            }
            resolve(null);
          };
          img.onerror = () => resolve(null);
        });
      }

      const loadedSet = new Set<number>();
      for(let i=0; i<5; i++) loadedSet.add(i);

      if (cancelled) return;

      // 2. Strided loading
      const indicesToLoad: number[] = [];
      const strides = [24, 12, 6, 3, 1];

      for (const stride of strides) {
        for (let i = 0; i < TOTAL_FRAMES; i += stride) {
          if (!loadedSet.has(i)) {
            indicesToLoad.push(i);
            loadedSet.add(i);
          }
        }
      }

      // Load in batches of 6 to prevent network & main thread congestion
      const BATCH_SIZE = 6;
      let currentIndex = 0;

      const loadNextBatch = async () => {
        if (cancelled || currentIndex >= indicesToLoad.length) return;

        const batch = indicesToLoad.slice(currentIndex, currentIndex + BATCH_SIZE);
        currentIndex += BATCH_SIZE;

        await Promise.all(
          batch.map((i) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.src = getFramePath(i);
              img.onload = () => {
                if (!cancelled) {
                  imagesRef.current[i] = img;
                  // Only draw if the loaded frame is close to what's currently viewed
                  if (Math.abs(i - currentFrameRef.current) < 5) {
                    drawFrame(currentFrameRef.current);
                  }
                }
                resolve();
              };
              img.onerror = () => resolve();
            });
          })
        );

        if (!cancelled && currentIndex < indicesToLoad.length) {
          setTimeout(loadNextBatch, 50);
        }
      };

      loadNextBatch();
    };

    loadStridedFrames();
    return () => { cancelled = true; };
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useMotionValueEvent(frameIndex, 'change', (latest: number) => {
    const index = Math.round(latest);
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      drawFrame(index);
    });
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}


