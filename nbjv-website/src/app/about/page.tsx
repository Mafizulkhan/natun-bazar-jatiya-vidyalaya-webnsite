import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHOOL, AGENCY } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ── PAGE HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f2044 0%, #0a1628 60%, #071020 100%)",
          borderBottom: "4px solid #c9a84c",
          padding: "3.5rem 1.5rem 2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background ring */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            border: "2px solid rgba(201,168,76,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            border: "2px solid rgba(201,168,76,0.08)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ maxWidth: "1140px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1rem" }}>
            <ol
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.55)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <li>
                <a href="/" style={{ color: "#c9a84c", textDecoration: "none" }}>
                  Home
                </a>
              </li>
              <li aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
                /
              </li>
              <li style={{ color: "rgba(255,255,255,0.75)" }}>About Us</li>
            </ol>
          </nav>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            About Us
          </h1>
          <div
            style={{
              width: "64px",
              height: "4px",
              background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
              borderRadius: "2px",
              marginTop: "1rem",
            }}
          />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.7)",
              marginTop: "1rem",
              fontSize: "1.05rem",
              maxWidth: "560px",
            }}
          >
            Learn about {SCHOOL.name} — our school, our people, and our commitment to
            quality education in Hojai, Assam.
          </p>
        </div>
      </section>

      {/* ── SCHOOL OVERVIEW ────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: "#f9f8f5",
          padding: "4rem 1.5rem",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left — Intro text */}
          <div>
            <h2
              className="gold-underline"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#0f2044",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              School Overview
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#374151",
                lineHeight: 1.75,
                marginTop: "1.5rem",
                fontSize: "0.98rem",
              }}
            >
              <strong>{SCHOOL.name}</strong> (also listed as{" "}
              <em>{SCHOOL.nameAlt}</em>) is a private co-educational institution
              located in Lanka, Hojai district, Assam, offering Primary and Upper
              Primary education from Class I through Class VIII.
            </p>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#374151",
                lineHeight: 1.75,
                marginTop: "1rem",
                fontSize: "0.98rem",
              }}
            >
              The school is committed to providing a nurturing academic environment
              that supports the holistic development of every student. Set in the
              Lanka area of Hojai district, it serves the local community by
              offering accessible quality education in both primary and upper primary
              levels.
            </p>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#374151",
                lineHeight: 1.75,
                marginTop: "1rem",
                fontSize: "0.98rem",
              }}
            >
              The school curriculum follows the standard framework prescribed for
              Assam schools, with emphasis on language, mathematics, science, and
              social studies across all classes.
            </p>

            {/* Source note */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1rem",
                background: "rgba(201,168,76,0.1)",
                borderLeft: "3px solid #c9a84c",
                borderRadius: "0 6px 6px 0",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem",
                color: "#6b5a2a",
              }}
            >
              <strong>ℹ️ Data note:</strong> School information below is sourced from
              third-party directories and a recruitment poster. All details require
              confirmation from the school administration.
            </div>
          </div>

          {/* Right — Info table */}
          <div>
            <div
              className="card-hover"
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(15,32,68,0.10)",
                overflow: "hidden",
                border: "1px solid rgba(15,32,68,0.08)",
              }}
            >
              {/* Table header */}
              <div
                style={{
                  background: "linear-gradient(135deg, #0f2044, #1a3060)",
                  padding: "1rem 1.5rem",
                  borderBottom: "3px solid #c9a84c",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    margin: 0,
                    fontWeight: 700,
                  }}
                >
                  Institutional Details
                </h3>
              </div>

              {/* Rows */}
              {[
                {
                  label: "UDISE Code",
                  value: SCHOOL.udise,
                  source: "Ministry of Education / UDISE+ directory",
                },
                {
                  label: "Institution Type",
                  value: SCHOOL.type,
                  source: "Directory listing",
                },
                {
                  label: "Sections Offered",
                  value: SCHOOL.sections,
                  source: "Directory listing",
                },
                {
                  label: "Location",
                  value: `${SCHOOL.location.full}`,
                  source: SCHOOL.location.source,
                },
                {
                  label: "Contact Number",
                  value: SCHOOL.phone.number,
                  source: SCHOOL.phone.source,
                },
                {
                  label: "Principal",
                  value: `${SCHOOL.principal.name} *`,
                  source: SCHOOL.principal.source,
                },
                {
                  label: "PIN Code",
                  value: SCHOOL.location.pin,
                  source: "To be confirmed",
                },
                {
                  label: "Official Email",
                  value: SCHOOL.email,
                  source: "To be provided by school",
                },
              ].map((row, idx) => (
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    gap: "0.5rem",
                    padding: "0.85rem 1.5rem",
                    background: idx % 2 === 0 ? "#fafaf8" : "#ffffff",
                    borderBottom: "1px solid rgba(15,32,68,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "#0f2044",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      paddingTop: "2px",
                    }}
                  >
                    {row.label}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        color: "#1a1a2e",
                        fontWeight: 500,
                      }}
                    >
                      {row.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.72rem",
                        color: "#9ca3af",
                        marginTop: "2px",
                      }}
                    >
                      Source: {row.source}
                    </div>
                  </div>
                </div>
              ))}

              {/* Asterisk note */}
              <div
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "rgba(201,168,76,0.07)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  color: "#7a6530",
                }}
              >
                * Principal name as shown on recruitment poster — confirmation
                required from school administration.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-overview-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── PRINCIPAL'S MESSAGE ────────────────────────────────────── */}
      <section
        style={{
          background: "#ffffff",
          padding: "4rem 1.5rem",
          borderTop: "1px solid rgba(15,32,68,0.07)",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1140px", margin: "0 auto" }}
        >
          <h2
            className="gold-underline"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#0f2044",
              marginBottom: "2rem",
              fontWeight: 700,
            }}
          >
            Principal&rsquo;s Message
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Photo placeholder */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "180px",
                  height: "220px",
                  border: "2px dashed #c9a84c",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(201,168,76,0.05)",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "0.5rem",
                    opacity: 0.5,
                  }}
                >
                  👤
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    textAlign: "center",
                    padding: "0 0.75rem",
                    margin: 0,
                  }}
                >
                  [Photo placeholder — to be provided by school]
                </p>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0f2044",
                    margin: 0,
                  }}
                >
                  {SCHOOL.principal.name} *
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.82rem",
                    color: "#6b7280",
                    margin: "0.25rem 0 0",
                  }}
                >
                  Principal
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                    color: "#c9a84c",
                    margin: "0.2rem 0 0",
                    fontStyle: "italic",
                  }}
                >
                  {SCHOOL.name}
                </p>
              </div>

              {/* Asterisk note */}
              <div
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  background: "rgba(201,168,76,0.08)",
                  borderRadius: "6px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  color: "#7a6530",
                  textAlign: "left",
                }}
              >
                * Name sourced from recruitment poster; requires confirmation from
                school administration.
              </div>
            </div>

            {/* Message block */}
            <div>
              {/* Demo label */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#fef3c7",
                  border: "1px solid #f59e0b",
                  borderRadius: "20px",
                  padding: "0.3rem 0.9rem",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.75rem",
                  color: "#92400e",
                  marginBottom: "1.25rem",
                }}
              >
                ⚠️ Demo placeholder — to be replaced with authentic principal&apos;s
                message
              </div>

              <blockquote
                style={{
                  margin: 0,
                  padding: "1.75rem 2rem",
                  background: "#f9f8f5",
                  borderLeft: "5px solid #c9a84c",
                  borderRadius: "0 12px 12px 0",
                  position: "relative",
                }}
              >
                {/* Opening quote mark */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "1rem",
                    fontSize: "5rem",
                    color: "rgba(201,168,76,0.18)",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  &ldquo;
                </span>

                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.05rem",
                    color: "#1f2937",
                    lineHeight: 1.8,
                    marginTop: 0,
                    marginBottom: "1rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  At {SCHOOL.name}, we believe that every child deserves an
                  environment where curiosity is celebrated, discipline is nurtured,
                  and character is built alongside knowledge. Our teachers are
                  dedicated to guiding each student towards their fullest potential —
                  academically, socially, and personally.
                </p>

                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.05rem",
                    color: "#1f2937",
                    lineHeight: 1.8,
                    marginBottom: "1rem",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  We welcome students and families who share our vision of a
                  brighter, more educated community in Hojai, Assam. Together, we
                  strive to make learning a joyful and meaningful journey.
                </p>

                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.05rem",
                    color: "#1f2937",
                    lineHeight: 1.8,
                    marginBottom: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  I look forward to partnering with parents and guardians in this
                  shared mission of education.&rdquo;
                </p>

                <footer
                  style={{
                    marginTop: "1.25rem",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.88rem",
                    color: "#6b7280",
                  }}
                >
                  — <strong style={{ color: "#0f2044" }}>{SCHOOL.principal.name}</strong>,
                  Principal
                </footer>
              </blockquote>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.78rem",
                  color: "#9ca3af",
                  marginTop: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                [Demo placeholder — to be replaced with authentic principal&apos;s message
                provided by the school]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION, MISSION, VALUES ───────────────────────────────── */}
      <section
        style={{
          background: "#f4f1ea",
          padding: "4rem 1.5rem",
          borderTop: "1px solid rgba(15,32,68,0.07)",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1140px", margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#0f2044",
                marginBottom: "0.5rem",
                fontWeight: 700,
              }}
            >
              Vision, Mission &amp; Values
            </h2>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
                margin: "0 auto 1rem",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#fef3c7",
                border: "1px solid #f59e0b",
                borderRadius: "20px",
                padding: "0.3rem 0.9rem",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                color: "#92400e",
              }}
            >
              ⚠️ Proposed demo content — to be confirmed and updated by the school
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.75rem",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Our Vision",
                body:
                  "To be a leading centre of holistic primary education in Hojai, Assam — one that empowers every student with knowledge, values, and the confidence to thrive in a rapidly changing world.",
              },
              {
                icon: "🌟",
                title: "Our Mission",
                body:
                  "To deliver quality, inclusive education through dedicated teaching, a nurturing environment, and strong partnerships with families — developing well-rounded individuals who contribute positively to society.",
              },
              {
                icon: "💡",
                title: "Our Values",
                body:
                  "Integrity, Respect, Curiosity, Discipline, and Community. These core values guide everything we do — from our classrooms to our interactions with parents and the broader community.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="card-hover"
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "2rem 1.5rem",
                  boxShadow: "0 4px 20px rgba(15,32,68,0.09)",
                  border: "1px solid rgba(15,32,68,0.07)",
                  textAlign: "center",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "2.75rem",
                    marginBottom: "1rem",
                    lineHeight: 1,
                  }}
                >
                  {card.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.2rem",
                    color: "#0f2044",
                    marginBottom: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9rem",
                    color: "#374151",
                    lineHeight: 1.72,
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.72rem",
                    color: "#b45309",
                    marginTop: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  [Proposed demo content]
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOOL HISTORY PLACEHOLDER ────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #0f2044 0%, #0a1628 100%)",
          padding: "4rem 1.5rem",
          borderTop: "4px solid #c9a84c",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#ffffff",
              marginBottom: "0.5rem",
              fontWeight: 700,
            }}
          >
            School History
          </h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
              margin: "0 auto 2rem",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "16px",
              padding: "2.5rem 2rem",
              backdropFilter: "blur(4px)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏛️</div>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.78,
                marginBottom: "1.25rem",
              }}
            >
              School history information will be provided by the school administration.
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
                margin: "0 0 1rem",
              }}
            >
              A detailed history of {SCHOOL.name} — including its founding year,
              milestones, and development over the years — will be added here once
              provided by the school administration. This section is a placeholder in
              this demonstration concept.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.4)",
                borderRadius: "20px",
                padding: "0.4rem 1rem",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem",
                color: "#fcd34d",
              }}
            >
              📋 Awaiting school-provided historical information
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONAL INFORMATION TABLE ───────────────────────── */}
      <section
        style={{
          background: "#ffffff",
          padding: "4rem 1.5rem",
          borderTop: "1px solid rgba(15,32,68,0.07)",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1140px", margin: "0 auto" }}
        >
          <h2
            className="gold-underline"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#0f2044",
              marginBottom: "2rem",
              fontWeight: 700,
            }}
          >
            Institutional Information
          </h2>

          <div
            style={{
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid rgba(15,32,68,0.1)",
              boxShadow: "0 4px 16px rgba(15,32,68,0.07)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "linear-gradient(135deg, #0f2044, #1a3060)",
                  }}
                >
                  {["Detail", "Information", "Source / Note"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.9rem 1.25rem",
                        textAlign: "left",
                        color: "#c9a84c",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        borderBottom: "2px solid #c9a84c",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    detail: "Full School Name",
                    info: SCHOOL.name,
                    note: "As listed in UDISE directory",
                  },
                  {
                    detail: "Alternate Name Listing",
                    info: SCHOOL.nameAlt,
                    note: "Third-party listing variant",
                  },
                  {
                    detail: "UDISE Code",
                    info: SCHOOL.udise,
                    note: "Ministry of Education / UDISE+ portal",
                  },
                  {
                    detail: "School Category",
                    info: SCHOOL.type,
                    note: "Directory listing",
                  },
                  {
                    detail: "Education Sections",
                    info: SCHOOL.sections,
                    note: "Directory listing (Class I–VIII)",
                  },
                  {
                    detail: "District",
                    info: "Hojai, Assam",
                    note: "Directory listing",
                  },
                  {
                    detail: "Full Address",
                    info: SCHOOL.location.full,
                    note: SCHOOL.location.source,
                  },
                  {
                    detail: "PIN Code",
                    info: SCHOOL.location.pin,
                    note: "Confirmation required",
                  },
                  {
                    detail: "Contact Number",
                    info: SCHOOL.phone.number,
                    note: `${SCHOOL.phone.source} — confirmation required`,
                  },
                  {
                    detail: "Principal",
                    info: `${SCHOOL.principal.name} *`,
                    note: `${SCHOOL.principal.source} — confirmation required`,
                  },
                  {
                    detail: "Official Email",
                    info: SCHOOL.email,
                    note: "To be provided by school",
                  },
                ].map((row, idx) => (
                  <tr
                    key={row.detail}
                    className="table-row-hover"
                    style={{
                      background: idx % 2 === 0 ? "#fafaf8" : "#ffffff",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.85rem 1.25rem",
                        fontWeight: 600,
                        color: "#0f2044",
                        borderBottom: "1px solid rgba(15,32,68,0.06)",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.detail}
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1.25rem",
                        color: "#1f2937",
                        borderBottom: "1px solid rgba(15,32,68,0.06)",
                        verticalAlign: "top",
                      }}
                    >
                      {row.info}
                    </td>
                    <td
                      style={{
                        padding: "0.85rem 1.25rem",
                        color: "#6b7280",
                        fontSize: "0.82rem",
                        borderBottom: "1px solid rgba(15,32,68,0.06)",
                        verticalAlign: "top",
                        fontStyle: "italic",
                      }}
                    >
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.78rem",
              color: "#9ca3af",
              marginTop: "0.75rem",
              fontStyle: "italic",
            }}
          >
            * Principal name as listed on recruitment poster — requires confirmation
            from school administration.
          </p>
        </div>
      </section>

      {/* ── AGENCY NOTE ───────────────────────────────────────────── */}
      <section
        style={{
          background: "#f4f1ea",
          padding: "2.5rem 1.5rem",
          borderTop: "1px solid rgba(15,32,68,0.1)",
        }}
      >
        <div
          className="container"
          style={{ maxWidth: "1140px", margin: "0 auto" }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(201,168,76,0.3)",
              borderLeft: "5px solid #c9a84c",
              borderRadius: "0 10px 10px 0",
              padding: "1.5rem 2rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "1.75rem", flexShrink: 0, marginTop: "2px" }}>
              🤝
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1rem",
                  color: "#0f2044",
                  margin: "0 0 0.4rem",
                  fontWeight: 700,
                }}
              >
                About This Website
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "#374151",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                {AGENCY.tagline}.{" "}
                <a
                  href={AGENCY.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#c9a84c", fontWeight: 600 }}
                >
                  {AGENCY.website}
                </a>
                . {AGENCY.note}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.78rem",
                  color: "#9ca3af",
                  margin: "0.5rem 0 0",
                  lineHeight: 1.6,
                }}
              >
                {SCHOOL.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
