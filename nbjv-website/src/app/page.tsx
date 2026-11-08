import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBackgroundSlider from "@/components/HeroBackgroundSlider";
import AdmissionNoticeModal from "@/components/AdmissionNoticeModal";
import HomeGalleryPreview from "@/components/HomeGalleryPreview";
import SmartImage from "@/components/SmartImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

// ---- Sub-components ----
function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--navy)",
      }}
    >
      {/* Sliding background images */}
      <HeroBackgroundSlider />
      {/* Overlay */}
      <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 2 }} />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 3, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "760px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: "2rem",
              padding: "0.35rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            <span style={{ color: "var(--gold-light)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Lanka, Hojai, Assam
            </span>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontFamily: "Georgia, serif",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
              fontWeight: 700,
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Welcome to<br />
            <span style={{ color: "var(--gold-light)" }}>Natun Bazar Jatiya</span>
            <br />Vidyalaya
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.75,
              marginBottom: "0.75rem",
              maxWidth: "580px",
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            A co-educational institution dedicated to nurturing young minds through quality primary and upper-primary education in the heart of Assam.
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "2.5rem" }}>
            [Proposed demo copy — to be approved by school administration]
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/admissions" className="btn-gold">
              Enquire About Admissions
            </Link>
            <Link href="/about" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
              Learn About the School
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
        }}
      >
        <span>SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="1" width="14" height="22" rx="7" />
          <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none" />
        </svg>
      </div>
    </section>
  );
}

function WelcomeSection() {
  return (
    <section className="section" style={{ background: "var(--grey-50)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Welcome Message
            </p>
            <h2 className="gold-underline" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", marginBottom: "2rem", color: "var(--navy)" }}>
              Nurturing Excellence,<br />Building Character
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
              Natun Bazar Jatiya Vidyalaya is committed to providing a nurturing, inclusive, and intellectually stimulating environment for every child. We believe that every student has unique potential that deserves to be discovered and developed.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "0.75rem", fontSize: "0.95rem" }}>
              With dedicated teachers and a holistic approach to learning, our school strives to build strong academic foundations while encouraging curiosity, creativity, and character development in young learners.
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "1.75rem" }}>
              [Proposed demo copy — to be reviewed and approved by school administration]
            </p>
            <Link href="/about" className="btn-primary">
              Read About the School →
            </Link>
          </div>

          {/* Quick info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "🏫", title: "School Type", value: "Private, Co-educational", note: "Directory-listed" },
              { icon: "📚", title: "Sections", value: "Primary & Upper Primary", note: "Directory-listed" },
              { icon: "📍", title: "Location", value: "Lanka, Hojai, Assam", note: "Directory-listed" },
              { icon: "🎓", title: "Principal", value: "Wahida Begum", note: "As per recruitment poster*" },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: "white",
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  boxShadow: "0 2px 12px rgba(15,32,68,0.07)",
                  border: "1px solid var(--grey-200)",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{card.icon}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.3rem" }}>{card.title}</div>
                <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{card.value}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--gold)", fontStyle: "italic" }}>{card.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AcademicsSection() {
  return (
    <section className="section" style={{ background: "white" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Academics</p>
          <h2 className="gold-underline gold-underline-center" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--navy)", paddingBottom: "1rem" }}>
            Our Academic Programme
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
          {[
            {
              title: "Primary Education",
              subtitle: "Classes I – V",
              icon: "📖",
              color: "#dbeafe",
              borderColor: "#3b82f6",
              desc: "A strong foundation in core subjects — language, mathematics, environmental studies, and arts — building literacy, numeracy, and a love for learning in young students.",
              note: "Exact class structure to be confirmed by school",
              tags: ["Language", "Mathematics", "EVS", "Arts", "Value Education"],
            },
            {
              title: "Upper Primary Education",
              subtitle: "Classes VI – VIII",
              icon: "🔬",
              color: "#d1fae5",
              borderColor: "#10b981",
              desc: "An enriched curriculum preparing students for higher education. Subject-based teaching introduces critical thinking, scientific reasoning, and broader academic exploration.",
              note: "Exact class structure to be confirmed by school",
              tags: ["Science", "Mathematics", "Social Studies", "Language", "Computer Basics"],
            },
          ].map((prog) => (
            <div
              key={prog.title}
              className="card-hover"
              style={{
                background: prog.color,
                borderRadius: "1rem",
                padding: "2rem",
                border: `2px solid ${prog.borderColor}22`,
                borderTop: `4px solid ${prog.borderColor}`,
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{prog.icon}</div>
              <h3 style={{ color: "var(--navy)", fontSize: "1.3rem", marginBottom: "0.25rem" }}>{prog.title}</h3>
              <p style={{ color: prog.borderColor, fontWeight: 700, fontSize: "0.85rem", marginBottom: "1rem" }}>{prog.subtitle}</p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1rem" }}>{prog.desc}</p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "1rem" }}>* {prog.note}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {prog.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "white",
                      color: "var(--text-secondary)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "1rem",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/academics" className="btn-primary">View Full Academics →</Link>
        </div>
      </div>
    </section>
  );
}

function QuickNavCards() {
  const cards = [
    { icon: "📋", title: "Admissions",    desc: "Submit an admission enquiry for the upcoming academic session.", href: "/admissions", color: "#0f2044" },
    { icon: "📢", title: "Notices",       desc: "Read the latest school notices and important announcements.", href: "/notices",    color: "#1e4fc2" },
    { icon: "🖼️", title: "Gallery",       desc: "Explore illustrative images of school campus and activities.", href: "/gallery",    color: "#1a3a6e" },
    { icon: "👩‍🏫", title: "Teachers",     desc: "Meet the principal and teaching staff of the school.", href: "/staff",      color: "#c9a84c" },
    { icon: "📞", title: "Contact",       desc: "Get in touch with the school through our contact form.", href: "/contact",    color: "#0f2044" },
    { icon: "🏛️", title: "About School",  desc: "Learn about the school's vision, mission, and overview.", href: "/about",     color: "#1e4fc2" },
  ];

  return (
    <section className="section-sm" style={{ background: "var(--navy)", padding: "4rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ color: "white", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>Explore the School</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "0.5rem", fontSize: "0.9rem" }}>Navigate to key sections of the website</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="feature-card-glow"
              style={{
                borderRadius: "0.875rem",
                padding: "1.75rem 1.25rem",
                display: "block",
                textDecoration: "none",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{card.icon}</div>
              <h3 style={{ color: "white", fontSize: "1rem", marginBottom: "0.5rem" }}>{card.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.6 }}>{card.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNotices() {
  const notices = [
    { id: "notice-002", category: "Admission", title: "Admission Enquiries for Session 2027–28 — Now Open",         date: "Nov 1, 2026",  important: true  },
    { id: "notice-003", category: "Academic",  title: "Half-Yearly Examination Schedule",                           date: "Oct 20, 2026", important: true  },
    { id: "notice-001", category: "Event",     title: "Annual Sports Day — Registration Open",                      date: "Nov 5, 2026",  important: false },
    { id: "notice-004", category: "General",   title: "School Closed — Public Holiday",                             date: "Oct 15, 2026", important: false },
  ];

  const categoryColors: Record<string, string> = {
    Admission: "badge-admission",
    Academic:  "badge-academic",
    Event:     "badge-event",
    General:   "badge-general",
    Important: "badge-important",
  };

  return (
    <section className="section" style={{ background: "var(--grey-50)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Announcements</p>
            <h2 className="gold-underline" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", paddingBottom: "0.75rem", color: "var(--navy)", marginTop: "0.5rem" }}>
              Latest Notices
            </h2>
          </div>
          <Link href="/notices" className="btn-outline" style={{ fontSize: "0.875rem" }}>View All Notices →</Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {notices.map((notice) => (
            <Link
              key={notice.id}
              href={`/notices/${notice.id}`}
              className="notice-row-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                background: "white",
                borderRadius: "0.75rem",
                padding: "1.1rem 1.5rem",
                boxShadow: "0 2px 8px rgba(15,32,68,0.06)",
                border: notice.important ? "2px solid #fbbf24" : "1px solid var(--grey-200)",
                textDecoration: "none",
                flexWrap: "wrap",
              }}
            >
              {notice.important && (
                <span style={{ background: "#fef3c7", color: "#92400e", padding: "0.2rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.7rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                  IMPORTANT
                </span>
              )}
              <span
                className={`badge-${notice.category.toLowerCase()}`}
                style={{ padding: "0.2rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {notice.category}
              </span>
              <span style={{ flex: 1, color: "var(--navy)", fontWeight: 600, fontSize: "0.9rem", minWidth: 200 }}>
                {notice.title}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{notice.date}</span>
              <span style={{ color: "var(--blue)", fontSize: "0.8rem", whiteSpace: "nowrap", fontWeight: 500 }}>Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


function PrincipalSection() {
  return (
    <section className="section" style={{ background: "var(--navy)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Photo placeholder */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 220,
                height: 260,
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.08)",
                border: "2px dashed rgba(201,168,76,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <span style={{ fontSize: "4rem" }}>👩‍💼</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", textAlign: "center", padding: "0 1rem" }}>
                Principal photograph to be provided by school
              </span>
            </div>
          </div>

          {/* Message */}
          <div>
            <p style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              Principal's Message
            </p>
            <h2 style={{ color: "white", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.5rem" }}>
              A Word From Our Principal
            </h2>
            <div
              style={{
                borderLeft: "3px solid var(--gold)",
                paddingLeft: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontStyle: "italic", fontSize: "0.95rem" }}>
                "Education is not the filling of a pail, but the lighting of a fire. At Natun Bazar Jatiya Vidyalaya, we strive to kindle that fire in every child — encouraging them to explore, question, and grow."
              </p>
            </div>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "1.5rem" }}>
              [Proposed demo message — to be replaced with an authentic message from the principal]
            </p>
            <div>
              <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem" }}>Wahida Begum *</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>Principal, Natun Bazar Jatiya Vidyalaya</p>
              <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontStyle: "italic", marginTop: "0.3rem" }}>
                * Name as shown on recruitment poster — confirmation required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdmissionCTA() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, var(--blue) 0%, var(--navy) 100%)",
        padding: "5rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎓</span>
        <h2 style={{ color: "white", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", marginBottom: "1rem" }}>
          Interested in Admission?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: "0.75rem", fontSize: "0.95rem" }}>
          Submit an admission enquiry for Natun Bazar Jatiya Vidyalaya. Our team will get in touch with you with further details about eligibility, documents, and procedure.
        </p>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "2rem" }}>
          [Proposed demo copy — admission details to be confirmed by school administration]
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/admissions" className="btn-gold">Submit Enquiry Form</Link>
          <Link href="/contact" className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}>Contact the School</Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <AdmissionNoticeModal />
      <Navbar />
      <main>
        <HeroSection />
        <WelcomeSection />
        <AcademicsSection />
        <QuickNavCards />
        <LatestNotices />
        <HomeGalleryPreview />
        <PrincipalSection />
        <AdmissionCTA />
      </main>
      <Footer />
    </>
  );
}
