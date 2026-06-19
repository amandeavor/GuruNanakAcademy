"use client";

import React, { useEffect, useRef, useState } from "react";

interface CanvasSequenceProps {
  frameCount: number;
  imagePrefix: string;
  imageExtension: string;
  aspectRatio: number;
}

export const CanvasSequence: React.FC<CanvasSequenceProps> = ({
  frameCount,
  imagePrefix,
  imageExtension,
  aspectRatio,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const getFramePath = (index: number) => {
    const frameString = String(index).padStart(4, "0");
    return `${imagePrefix}${frameString}.${imageExtension}`;
  };

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload image sequence to prevent rendering gaps
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsPreloaded(true);
        }
      };
      img.onerror = () => {
        // Handle image loading error gracefully so we don't block UI
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsPreloaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [frameCount, imagePrefix, imageExtension]);

  useEffect(() => {
    if (!isPreloaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const drawImageCover = (img: HTMLImageElement) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageWidth = img.width;
      const imageHeight = img.height;

      const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
      const x = (canvasWidth - imageWidth * scale) / 2;
      const y = (canvasHeight - imageHeight * scale) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, imageWidth * scale, imageHeight * scale);
    };

    if (imagesRef.current[0]) {
      // Draw first frame once loaded
      const firstImg = imagesRef.current[0];
      if (firstImg.complete) {
        drawImageCover(firstImg);
      } else {
        firstImg.onload = () => drawImageCover(firstImg);
      }
    }

    let animationId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = container.scrollHeight - window.innerHeight;
      const relativeScrollTop = -rect.top;
      const rawFraction = relativeScrollTop / scrollHeight;
      const scrollFraction = Math.max(0, Math.min(0.999, rawFraction));

      // Calculate the active frame index using standard interpolation
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      const renderFrame = () => {
        const activeImage = imagesRef.current[frameIndex];
        if (activeImage && activeImage.complete && activeImage.naturalWidth > 0) {
          drawImageCover(activeImage);
        }
      };

      // Defer rendering to requestAnimationFrame for smooth execution
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(renderFrame);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isPreloaded, frameCount]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!isPreloaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
            <span className="text-sm font-semibold tracking-widest uppercase text-gold">
              Initializing Digital Experience
            </span>
            <div className="mt-4 h-[2px] w-48 bg-zinc-800">
              <div
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover"
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
};
