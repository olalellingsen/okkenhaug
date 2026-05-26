"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SanityImage from "../components/SanityImage";
import { GalleryImage } from "@/app/types";

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, close, next, prev]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      {/* Masonry grid using CSS columns (no JS layout needed) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
        {images.map((item, index) => (
          <figure
            key={item._key}
            className="mb-3 sm:mb-4 break-inside-avoid cursor-zoom-in group"
            onClick={() => open(index)}
          >
            <SanityImage
              image={item.image}
              alt={item.alt ?? item.photographer ?? "Gallery image"}
              width={
                item.image.asset?.metadata?.dimensions?.width
                  ? Math.min(
                      item.image.asset.metadata.dimensions.width,
                      900,
                    )
                  : 900
              }
              height={
                item.image.asset?.metadata?.dimensions?.width &&
                item.image.asset.metadata.dimensions.height
                  ? Math.round(
                      (Math.min(
                        item.image.asset.metadata.dimensions.width,
                        900,
                      ) *
                        item.image.asset.metadata.dimensions.height) /
                        item.image.asset.metadata.dimensions.width,
                    )
                  : 600
              }
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto group-hover:opacity-90 transition-opacity"
            />
            {item.photographer && (
              <figcaption className="text-sm text-foreground/70 mt-1">
                Photo: {item.photographer}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox overlay */}
      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={close}
        >
          {/* Top bar: counter + close */}
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm tabular-nums">
              {(activeIndex ?? 0) + 1} / {images.length}
            </span>
            <button
              type="button"
              aria-label="Close"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center: image (clicking background closes; clicking image does nothing) */}
          <div
            className="flex-1 flex items-center justify-center px-4 pb-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Previous image"
              className="absolute z-10 left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={36} strokeWidth={1.5} />
            </button>

            <figure className="max-w-full max-h-full flex flex-col items-center">
              <div className="relative max-w-full max-h-[calc(100vh-9rem)] flex items-center justify-center">
                <SanityImage
                  image={active.image}
                  alt={active.alt ?? active.photographer ?? "Gallery image"}
                  width={1800}
                  height={
                    active.image.asset?.metadata?.dimensions?.aspectRatio
                      ? Math.round(
                          1800 /
                            active.image.asset.metadata.dimensions.aspectRatio,
                        )
                      : 1200
                  }
                  sizes="100vw"
                  className="max-w-full max-h-[calc(100vh-9rem)] w-auto h-auto object-contain"
                  priority
                />
              </div>
              {active.photographer && (
                <figcaption className="text-white/80 text-sm mt-3 text-center">
                  Photo: {active.photographer}
                </figcaption>
              )}
            </figure>

            <button
              type="button"
              aria-label="Next image"
              className="absolute z-10 right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:bg-white/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={36} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
