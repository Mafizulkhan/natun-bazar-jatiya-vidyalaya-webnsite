import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHOOL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore the primary and upper primary academic programs at Natun Bazar Jatiya Vidyalaya, Lanka, Hojai, Assam.",
};

export default function AcademicsPage() {
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
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
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
              <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>Academics</span>
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
              Curriculum & Programs
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
              Academic Excellence & Foundation
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
              A structured educational journey through Primary and Upper Primary schooling designed to build curiosity, discipline, moral values, and academic competence.
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
              [Proposed demo curriculum structure — specific syllabus, board affiliation, and class divisions to be confirmed by school]
            </p>
          </div>
        </section>

        {/* Board & Curriculum Notice Banner */}
        <section style={{ background: "#fef9c3", borderBottom: "1px solid #fde047", padding: "1rem 1.5rem" }}>
          <div className="container" style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>📌</span>
            <div>
              <strong style={{ color: "#854d0e", fontSize: "0.875rem" }}>
                Official Affiliation & Curriculum Notice:
              </strong>
              <p style={{ color: "#713f12", fontSize: "0.825rem", margin: "0.2rem 0 0" }}>
                Directory records indicate Natun Bazar Jatiya Vidyalaya operates Primary and Upper Primary sections. Exact board affiliation (such as SEBA or state board curriculum), recognized medium of instruction, and official class rosters will be updated upon confirmation by the school administration.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Overview */}
        <section className="section" style={{ background: "var(--white)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
              <p
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Educational Philosophy
              </p>
              <h2
                className="gold-underline gold-underline-center"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                  color: "var(--navy)",
                  paddingBottom: "1rem",
                  marginBottom: "1rem",
                }}
              >
                Two Distinct Stages of Growth
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.8 }}>
                Our educational framework provides continuous progression from foundational literacy and numeracy in the primary years to structured subject expertise and analytical thinking in the upper primary classes.
              </p>
            </div>

            {/* Stages Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
              {/* Primary Education Card */}
              <div
                className="card-hover"
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderTop: "5px solid #1e4fc2",
                  borderRadius: "1rem",
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2.5rem" }}>🌱</span>
                    <span
                      style={{
                        background: "#dbeafe",
                        color: "#1e40af",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "1rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Foundational Stage
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.3rem" }}>
                    Primary Education
                  </h3>
                  <p style={{ color: "var(--blue)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                    Classes I – V <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>(To be confirmed by school)</span>
                  </p>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    The primary program focuses on cultivating joy in learning, reading fluency, mathematical foundations, observational habits, and creative expression in a safe, caring school environment.
                  </p>

                  <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--navy)", marginBottom: "0.6rem" }}>
                    Core Subject Areas
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { name: "Language & Literature", desc: "Mother tongue/regional language literacy, phonetics, and storytelling" },
                      { name: "English Communication", desc: "Basic vocabulary, functional reading, and conversational confidence" },
                      { name: "Elementary Mathematics", desc: "Numbers, basic arithmetic, geometric shapes, and practical problem solving" },
                      { name: "Environmental Studies (EVS)", desc: "Nature observation, health and hygiene, local community understanding" },
                      { name: "Art, Craft & Value Education", desc: "Creative expression, empathy, civic responsibility, and physical play" },
                    ].map((subj) => (
                      <li key={subj.name} style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                        <strong style={{ color: "var(--navy)" }}>• {subj.name}:</strong>{" "}
                        <span style={{ color: "var(--text-secondary)" }}>{subj.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "0.5rem", border: "1px dashed #cbd5e1" }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                    * Syllabus pacing and textbook selection subject to official confirmation by school administration.
                  </p>
                </div>
              </div>

              {/* Upper Primary Education Card */}
              <div
                className="card-hover"
                style={{
                  background: "#f8fafc",
                  border: "1.5px solid #e2e8f0",
                  borderTop: "5px solid var(--gold)",
                  borderRadius: "1rem",
                  padding: "2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2.5rem" }}>🔬</span>
                    <span
                      style={{
                        background: "#fef3c7",
                        color: "#92400e",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "1rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      Preparatory Stage
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.5rem", color: "var(--navy)", marginBottom: "0.3rem" }}>
                    Upper Primary Education
                  </h3>
                  <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                    Classes VI – VIII <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>(To be confirmed by school)</span>
                  </p>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    Designed to bridge basic primary learning with secondary academic rigour. Students transition to dedicated subject specialists, experimental inquiry, and self-directed study habits.
                  </p>

                  <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--navy)", marginBottom: "0.6rem" }}>
                    Core Subject Areas
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                      { name: "General Science", desc: "Physics, Chemistry, and Biology basics with observational experiments" },
                      { name: "Advanced Mathematics", desc: "Algebraic foundations, geometry, commercial math, and data analysis" },
                      { name: "Social Sciences", desc: "History of Assam & India, geography, democratic civics, and culture" },
                      { name: "Language & Literature", desc: "Regional literature, English grammar & composition, Hindi introduction" },
                      { name: "Digital Literacy & Co-curricular", desc: "Elementary computer concepts, physical sports, and cultural arts" },
                    ].map((subj) => (
                      <li key={subj.name} style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                        <strong style={{ color: "var(--navy)" }}>• {subj.name}:</strong>{" "}
                        <span style={{ color: "var(--text-secondary)" }}>{subj.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "#ffffff", padding: "1rem", borderRadius: "0.5rem", border: "1px dashed #cbd5e1" }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                    * Upper primary curriculum aligned with state educational guidelines pending confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Calendar (Sample Structure) */}
        <section className="section" style={{ background: "var(--grey-50)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Annual Roadmap
              </p>
              <h2
                className="gold-underline gold-underline-center"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--navy)",
                  paddingBottom: "1rem",
                }}
              >
                Sample Academic Calendar Structure
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Typical Indian academic session framework (April – March). The official school calendar will be published each term.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                {
                  term: "Term 1 (April – September)",
                  accent: "#1e4fc2",
                  events: [
                    "New Academic Session Commences",
                    "Baseline Student Assessments",
                    "Unit Test 1 Examinations",
                    "Independence Day & Cultural Celebration",
                    "Half-Yearly / Mid-Term Examinations (September)",
                  ],
                },
                {
                  term: "Term 2 (October – March)",
                  accent: "#c9a84c",
                  events: [
                    "Autumn Term Resumes",
                    "Annual Sports Meet & Athletics",
                    "Unit Test 2 / Pre-Annual Evaluations",
                    "Republic Day & Saraswati Puja Activities",
                    "Annual Final Examinations & Result Declaration (March)",
                  ],
                },
                {
                  term: "Examinations & Grading",
                  accent: "#10b981",
                  events: [
                    "Continuous & Comprehensive Assessment (CCE)",
                    "Internal marks for classroom engagement & attendance",
                    "Parent-Teacher Consultation Meetings (PTMs)",
                    "Academic Remediation Support for struggling students",
                    "Formal Progress Card issued at conclusion of each term",
                  ],
                },
              ].map((cal) => (
                <div
                  key={cal.term}
                  style={{
                    background: "white",
                    borderRadius: "0.75rem",
                    padding: "1.75rem",
                    border: "1px solid var(--grey-200)",
                    borderTop: `4px solid ${cal.accent}`,
                    boxShadow: "0 2px 12px rgba(15,32,68,0.05)",
                  }}
                >
                  <h3 style={{ fontSize: "1.1rem", color: "var(--navy)", marginBottom: "1.25rem" }}>{cal.term}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {cal.events.map((ev, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        <span style={{ color: cal.accent, fontWeight: 700 }}>✓</span>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  background: "#e2e8f0",
                  padding: "0.4rem 1rem",
                  borderRadius: "2rem",
                  fontStyle: "italic",
                }}
              >
                [Demonstration schedule only — actual dates and holidays will be designated by school circular]
              </span>
            </div>
          </div>
        </section>

        {/* Learning Resources & Co-Curricular */}
        <section className="section" style={{ background: "white" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Enrichment
              </p>
              <h2
                className="gold-underline gold-underline-center"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--navy)",
                  paddingBottom: "1rem",
                }}
              >
                Holistic Learning & Development
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "📚", title: "Classroom Libraries", desc: "Age-appropriate reading materials encouraging habitual reading in regional and English languages." },
                { icon: "⚽", title: "Sports & Fitness", desc: "Structured physical education classes, track events, and team games building sportsmanship." },
                { icon: "🎭", title: "Cultural Arts", desc: "Celebrations of national festivals, Bihu, recitation, drawing, and music performances." },
                { icon: "🤝", title: "Moral Values & Ethics", desc: "Daily morning assemblies, moral storytelling, and civic awareness nurturing good citizenship." },
              ].map((res) => (
                <div
                  key={res.title}
                  className="card-hover"
                  style={{
                    padding: "1.75rem",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--grey-200)",
                    background: "var(--grey-50)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{res.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", color: "var(--navy)", marginBottom: "0.5rem" }}>{res.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{res.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div
              style={{
                marginTop: "3.5rem",
                background: "linear-gradient(135deg, var(--navy) 0%, #1e4fc2 100%)",
                borderRadius: "1rem",
                padding: "2.5rem",
                color: "white",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3 style={{ color: "white", fontSize: "1.35rem", marginBottom: "0.5rem" }}>
                  Admissions for Next Academic Session
                </h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", maxWidth: "600px", margin: 0 }}>
                  Begin your child&apos;s educational journey at Natun Bazar Jatiya Vidyalaya. Contact the administration or submit an enquiry online.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/admissions" className="btn-gold">
                  Admission Enquiry →
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline"
                  style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
                >
                  Contact School
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

