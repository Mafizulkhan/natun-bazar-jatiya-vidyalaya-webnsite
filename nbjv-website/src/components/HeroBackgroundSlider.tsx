"use client";

import { useState, useEffect } from "react";

const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80",
    alt: "School campus & academy building",
  },
  {
    url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1600&q=80",
    alt: "Classroom learning environment",
  },
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80",
    alt: "Academic library & study culture",
  },
  {
    url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=80",
    alt: "Sports and student activities",
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80",
    alt: "Science and classroom education",
  },
];

export default function HeroBackgroundSlider() {
  const [slides, setSlides] = useState(HERO_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nbjv_admin_gallery_images");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const custom = parsed
            .filter((img: any) => img.src)
            .map((img: any) => ({ url: img.src, alt: img.caption || img.alt || "School campus" }));
          if (custom.length > 0) {
            setSlides([...custom.slice(0, 4), ...HERO_SLIDES]);
          }
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={`${slide.url}-${index}`}
          aria-hidden={index !== currentSlide}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${slide.url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentSlide ? 0.95 : 0,
            transform: index === currentSlide ? "scale(1.03)" : "scale(1)",
            transition: "opacity 1.4s ease-in-out, transform 6s ease-out",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Slider Indicator Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          right: "2rem",
          display: "flex",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Switch to background slide ${idx + 1}`}
            style={{
              width: idx === currentSlide ? "26px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: idx === currentSlide ? "var(--gold)" : "rgba(255,255,255,0.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}

