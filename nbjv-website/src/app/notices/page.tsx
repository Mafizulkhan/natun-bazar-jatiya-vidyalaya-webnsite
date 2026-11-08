"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEMO_NOTICES, Notice, NoticeCategory } from "@/lib/data";

const CATEGORIES: ("All" | NoticeCategory)[] = [
  "All",
  "Important",
  "Academic",
  "Admission",
  "General",
  "Event",
];

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | NoticeCategory>("All");
  const [notices] = useState<Notice[]>(DEMO_NOTICES);

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesCategory =
        selectedCategory === "All"
          ? true
          : selectedCategory === "Important"
          ? notice.isImportant
          : notice.category === selectedCategory;

      const matchesSearch =
        searchTerm.trim() === "" ||
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [notices, searchTerm, selectedCategory]);

  const getBadgeClass = (category: NoticeCategory, isImportant: boolean) => {
    if (isImportant) return "badge-important";
    switch (category) {
      case "Academic":
        return "badge-academic";
      case "Admission":
        return "badge-admission";
      case "Event":
        return "badge-event";
      case "General":
      default:
        return "badge-general";
    }
  };

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", background: "var(--white)" }}>
        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #091530 0%, #0f2044 65%, #1a3a6e 100%)",
            color: "white",
            padding: "4rem 1.5rem 3.5rem",
            position: "relative",
            borderBottom: "4px solid var(--gold)",
          }}
        >
          <div className="container">
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.825rem",
                color: "var(--gold-light)",
                marginBottom: "1rem",
              }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
                Home
              </Link>
              <span>›</span>
              <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>Notices & Announcements</span>
            </nav>

            <span
              style={{
                display: "inline-block",
                background: "rgba(201, 168, 76, 0.15)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                color: "var(--gold-light)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.3rem 0.85rem",
                borderRadius: "2rem",
                marginBottom: "1rem",
              }}
            >
              School Bulletin Board
            </span>

            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              Notices & Announcements
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "rgba(255, 255, 255, 0.85)",
                maxWidth: "760px",
                lineHeight: 1.7,
                marginBottom: "0.5rem",
              }}
            >
              Stay updated with academic schedules, admission alerts, holiday declarations, events, and institutional circulars.
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
              [All notices displayed are demonstrative samples representing typical school communications]
            </p>
          </div>
        </section>

        {/* Notices Section */}
        <section className="section" style={{ background: "var(--grey-50)" }}>
          <div className="container">
            {/* Filter and Search Bar */}
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                boxShadow: "0 2px 12px rgba(15,32,68,0.06)",
                border: "1px solid var(--grey-200)",
                marginBottom: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Search input */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search notices by keyword or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: "2.75rem",
                    fontSize: "0.95rem",
                    borderColor: "var(--grey-200)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    fontSize: "1.1rem",
                  }}
                >
                  🔍
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginRight: "0.5rem", fontWeight: 600 }}>
                  Category Filter:
                </span>
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: "2rem",
                        fontSize: "0.825rem",
                        fontWeight: 600,
                        border: isActive ? "1px solid var(--navy)" : "1px solid var(--grey-200)",
                        background: isActive ? "var(--navy)" : "white",
                        color: isActive ? "white" : "var(--text-secondary)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {cat === "Important" ? "⚠️ Important" : cat}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid var(--grey-100)", paddingTop: "0.75rem" }}>
                <span>
                  Showing <strong>{filteredNotices.length}</strong> of <strong>{notices.length}</strong> notice{notices.length !== 1 ? "s" : ""}
                </span>
                {(searchTerm || selectedCategory !== "All") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--blue)",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>

            {/* Notice Cards List */}
            {filteredNotices.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {filteredNotices.map((notice) => (
                  <article
                    key={notice.id}
                    className="card-hover"
                    style={{
                      background: "white",
                      borderRadius: "0.875rem",
                      padding: "1.75rem",
                      border: notice.isImportant ? "2px solid #f59e0b" : "1px solid var(--grey-200)",
                      boxShadow: "0 2px 8px rgba(15,32,68,0.05)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {notice.isImportant && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: "#f59e0b",
                        }}
                      />
                    )}

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                        <span
                          className={getBadgeClass(notice.category, notice.isImportant)}
                          style={{
                            padding: "0.25rem 0.65rem",
                            borderRadius: "0.35rem",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {notice.isImportant ? "⚠️ Important Notice" : notice.category}
                        </span>

                        {notice.hasAttachment && (
                          <span
                            style={{
                              background: "#f1f5f9",
                              color: "#475569",
                              padding: "0.25rem 0.6rem",
                              borderRadius: "0.35rem",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            📎 Attachment Included
                          </span>
                        )}

                        <span
                          style={{
                            background: "#e0f2fe",
                            color: "#0369a1",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "0.3rem",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                          }}
                        >
                          DEMO RECORD
                        </span>
                      </div>

                      <time
                        dateTime={notice.date}
                        style={{
                          fontSize: "0.825rem",
                          color: "var(--text-muted)",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        📅 {new Date(notice.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    <h2 style={{ fontSize: "1.25rem", color: "var(--navy)", marginBottom: "0.6rem" }}>
                      <Link
                        href={`/notices/${notice.id}`}
                        className="notice-title-hover"
                        style={{ color: "var(--navy)", textDecoration: "none" }}
                      >
                        {notice.title}
                      </Link>
                    </h2>

                    <p style={{ color: "var(--text-secondary)", fontSize: "0.925rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                      {notice.excerpt}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--grey-100)", paddingTop: "1rem" }}>
                      <Link
                        href={`/notices/${notice.id}`}
                        style={{
                          color: "var(--blue)",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        Read Full Notice <span>→</span>
                      </Link>

                      {notice.hasAttachment && (
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                          PDF Document available in detail view
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "4rem 2rem",
                  textAlign: "center",
                  border: "1px dashed var(--grey-200)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
                  No Notices Found
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  We could not find any notices matching your current search &quot;{searchTerm}&quot; in the &quot;{selectedCategory}&quot; category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

