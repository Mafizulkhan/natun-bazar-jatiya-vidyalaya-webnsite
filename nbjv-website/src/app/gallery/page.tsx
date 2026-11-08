"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GALLERY_IMAGES, GalleryImage } from "@/lib/data";

type Category = "All" | "Campus" | "Classroom" | "Activities" | "Events" | "Celebrations";

const CATEGORIES: Category[] = ["All", "Campus", "Classroom", "Activities", "Events", "Celebrations"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  useEffect(() => {
    // 1. Fetch latest gallery photos from server
    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
          return;
        }
        throw new Error("Invalid API response");
      })
      .catch(() => {
        // Fallback to localStorage
        try {
          const stored = localStorage.getItem("nbjv_admin_gallery_images");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setImages(parsed);
            }
          }
        } catch (e) {}
      });
  }, []);

  const filtered: GalleryImage[] =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const countFor = (cat: Category) =>
    cat === "All" ? images.length : images.filter((img) => img.category === cat).length;

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 60%, var(--navy-light) 100%)",
          padding: "5rem 0 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background element */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Our School in Pictures
          </p>
          <h1
            style={{
              color: "var(--white)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontFamily: "Georgia, serif",
              marginBottom: "1rem",
            }}
          >
            Gallery
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            A glimpse into school life at Natun Bazar Jatiya Vidyalaya — campus,
            classrooms, activities, and celebrations.
          </p>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <div
        style={{
          background: "#fefce8",
          borderBottom: "1px solid #fde68a",
          borderTop: "1px solid #fde68a",
          padding: "0.85rem 1.5rem",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#78350f",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <strong>Illustrative Images Only:</strong> Images shown are illustrative only. School-approved
            photographs will replace these once provided. All images are sourced from{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "#92400e" }}
            >
              Unsplash
            </a>{" "}
            and are used solely for demonstration purposes.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="section" style={{ background: "var(--grey-50)" }}>
        <div className="container">

          {/* Category Filter Tabs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              marginBottom: "2.5rem",
              justifyContent: "center",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: "2rem",
                    border: isActive
                      ? "2px solid var(--navy)"
                      : "2px solid var(--grey-200)",
                    background: isActive ? "var(--navy)" : "var(--white)",
                    color: isActive ? "var(--white)" : "var(--grey-600)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                  aria-pressed={isActive}
                >
                  {cat}
                  <span
                    style={{
                      background: isActive ? "rgba(201,168,76,0.3)" : "var(--grey-100)",
                      color: isActive ? "var(--gold-light)" : "var(--grey-600)",
                      borderRadius: "1rem",
                      padding: "0.1rem 0.5rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      minWidth: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    {countFor(cat)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Image Grid */}
          {filtered.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtered.map((img) => (
                <div
                  key={img.id}
                  className="card-hover"
                  style={{
                    background: "var(--white)",
                    borderRadius: "0.875rem",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(15,32,68,0.08)",
                    position: "relative",
                  }}
                >
                  {/* Image Container */}
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="gallery-img"
                      style={{ display: "block" }}
                      onError={(e) => {
                        if (img.fallbackSrc && (e.currentTarget as HTMLImageElement).src !== img.fallbackSrc) {
                          (e.currentTarget as HTMLImageElement).src = img.fallbackSrc;
                        }
                      }}
                    />
                    {/* Illustrative overlay badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        left: "0.6rem",
                        background: "rgba(15,32,68,0.80)",
                        color: "var(--gold-light)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "0.3rem",
                        letterSpacing: "0.04em",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      [Illustrative]
                    </span>
                    {/* Category tag */}
                    <span
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        right: "0.6rem",
                        background: "var(--navy)",
                        color: "var(--white)",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "0.3rem",
                        letterSpacing: "0.03em",
                        opacity: 0.92,
                      }}
                    >
                      {img.category}
                    </span>
                  </div>

                  {/* Caption */}
                  <div style={{ padding: "0.85rem 1rem 1rem" }}>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        fontStyle: "italic",
                        color: "var(--text-muted)",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              style={{
                textAlign: "center",
                padding: "5rem 1rem",
                color: "var(--grey-400)",
              }}
            >
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🖼️</div>
              <h3
                style={{
                  color: "var(--grey-600)",
                  marginBottom: "0.5rem",
                  fontFamily: "Georgia, serif",
                }}
              >
                No images in this category
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--grey-400)" }}>
                Check back later or select a different category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="btn-primary"
                style={{ marginTop: "1.5rem" }}
              >
                View All Images
              </button>
            </div>
          )}

          {/* Bottom note */}
          <p
            style={{
              textAlign: "center",
              marginTop: "2.5rem",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
            }}
          >
            All images above are illustrative placeholders sourced from Unsplash. Actual school
            photographs will be published upon review and approval by school administration.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
