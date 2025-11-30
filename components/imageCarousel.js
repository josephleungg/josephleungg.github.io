'use client';
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel({
  slides = [],
  autoSlide = true,
  autoSlideInterval = 3500,
  showControls = true,
}) {
  const normalizedSlides = useMemo(
    () =>
      slides.map((slide, index) =>
        typeof slide === "string"
          ? { src: slide, alt: `Slide ${index + 1}` }
          : slide
      ),
    [slides]
  );

  const slideCount = normalizedSlides.length;
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((currIndex) =>
      slideCount === 0
        ? 0
        : currIndex === 0
        ? slideCount - 1
        : currIndex - 1
    );

  const next = () =>
    setCurr((currIndex) =>
      slideCount === 0
        ? 0
        : currIndex === slideCount - 1
        ? 0
        : currIndex + 1
    );

  useEffect(() => {
    if (!autoSlide || slideCount <= 1) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slideCount]);

  useEffect(() => {
    if (curr > slideCount - 1) {
      setCurr(0);
    }
  }, [curr, slideCount]);

  if (!slideCount) return null;

  return (
    <div className="relative overflow-hidden rounded-[32px]">
      <div
        className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {normalizedSlides.map((slide, index) => (
          <div key={index} className="relative min-w-full">
            <img
              src={slide.src}
              alt={slide.alt ?? `Carousel image ${index + 1}`}
              className="h-[420px] w-full rounded-[24px] object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

  {showControls && slideCount > 1 && (
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-4 md:flex">
        <button
          onClick={prev}
          className="pointer-events-auto rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto rounded-full border border-white/10 bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20"
        >
          <ChevronRight size={20} />
        </button>
      </div>
  )}

      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {normalizedSlides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                curr === i ? "w-6 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
