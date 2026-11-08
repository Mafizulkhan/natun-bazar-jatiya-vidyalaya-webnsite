"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { GALLERY_IMAGES, GalleryImage } from "@/lib/data";

export default function HomeGalleryPreview() {
  const [images, setImages] = useState<GalleryImage[]>(GALLERY_IMAGES.slice(0, 6));

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images.slice(0, 6));
          return;
        }
        throw new Error("No API gallery");
      })
      .catch(() => {
        try {
          const stored = localStorage.getItem("nbjv_admin_gallery_images");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setImages(parsed.slice(0, 6));
            }
          }
        } catch {}
      });
  }, []);

  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              color: "var(--gold)",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Gallery
          </p>
          <h2
            className="gold-underline gold-underline-center"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              paddingBottom: "1rem",
              color: "var(--navy)",
              marginTop: "0.5rem",
            }}
          >
            School Gallery Preview
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.82rem",
              fontStyle: "italic",
              marginTop: "0.5rem",
            }}
          >
            School photo highlights &amp; campus activities
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "0.75rem",
                aspectRatio: "4/3",
                background: "#f1f5f9",
              }}
            >
              <SmartImage
                src={img.src}
                fallbackSrc={img.fallbackSrc || img.src}
                alt={img.alt || img.caption}
                className="img-zoom-hover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "0.4rem",
                  left: "0.4rem",
                  background: "rgba(15,32,68,0.85)",
                  color: "white",
                  padding: "0.15rem 0.45rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
              >
                {img.category}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/gallery" className="btn-primary">
            View Full Gallery ({images.length}+ Photos) →
          </Link>
        </div>
      </div>
    </section>
  );
}

