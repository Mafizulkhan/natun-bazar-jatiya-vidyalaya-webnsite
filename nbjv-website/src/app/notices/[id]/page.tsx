import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoticeDownloadButton from "@/components/NoticeDownloadButton";
import { DEMO_NOTICES, Notice, NoticeCategory } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = DEMO_NOTICES.find((n) => n.id === id);

  if (!notice) {
    return {
      title: "Notice Not Found",
    };
  }

  return {
    title: `${notice.title} | Notices`,
    description: notice.excerpt,
  };
}

export function generateStaticParams() {
  return DEMO_NOTICES.map((notice) => ({
    id: notice.id,
  }));
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = DEMO_NOTICES.find((n) => n.id === id);

  if (!notice) {
    notFound();
  }

  const getBadgeStyle = (category: NoticeCategory, isImportant: boolean) => {
    if (isImportant) return { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" };
    switch (category) {
      case "Academic":
        return { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" };
      case "Admission":
        return { bg: "#fef3c7", text: "#92400e", border: "#fde68a" };
      case "Event":
        return { bg: "#ede9fe", text: "#4c1d95", border: "#c4b5fd" };
      case "General":
      default:
        return { bg: "#dbeafe", text: "#1e3a8a", border: "#93c5fd" };
    }
  };

  const badgeStyle = getBadgeStyle(notice.category, notice.isImportant);

  return (
    <>
      <Navbar />

      <main style={{ minHeight: "100vh", background: "var(--grey-50)", paddingBottom: "5rem" }}>
        {/* Header Bar */}
        <section
          style={{
            background: "linear-gradient(135deg, #091530 0%, #0f2044 100%)",
            color: "white",
            padding: "2.5rem 1.5rem 2rem",
            borderBottom: "3px solid var(--gold)",
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
                marginBottom: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
                Home
              </Link>
              <span>›</span>
              <Link href="/notices" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
                Notices
              </Link>
              <span>›</span>
              <span style={{ color: "var(--gold-light)", fontWeight: 600, maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {notice.title}
              </span>
            </nav>

            <Link
              href="/notices"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.85rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              ← Back to all notices
            </Link>
          </div>
        </section>

        {/* Notice Content Card */}
        <div className="container" style={{ marginTop: "2.5rem" }}>
          <article
            style={{
              background: "white",
              borderRadius: "1rem",
              padding: "clamp(1.5rem, 4vw, 3rem)",
              boxShadow: "0 4px 20px rgba(15,32,68,0.08)",
              border: notice.isImportant ? "2px solid #f59e0b" : "1px solid var(--grey-200)",
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            {/* Top metadata */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                borderBottom: "1px solid var(--grey-200)",
                paddingBottom: "1.25rem",
                marginBottom: "1.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: badgeStyle.bg,
                    color: badgeStyle.text,
                    border: `1px solid ${badgeStyle.border}`,
                    padding: "0.3rem 0.8rem",
                    borderRadius: "0.4rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {notice.isImportant ? "⚠️ Important Notice" : notice.category}
                </span>

                <span
                  style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}
                >
                  DEMO NOTICE
                </span>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>
                📅 Published:{" "}
                <strong>
                  {new Date(notice.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--navy)",
                marginBottom: "1.5rem",
                lineHeight: 1.3,
                fontFamily: "Georgia, serif",
              }}
            >
              {notice.title}
            </h1>

            {/* Excerpt box */}
            <div
              style={{
                background: "#f8fafc",
                borderLeft: "4px solid var(--blue)",
                padding: "1rem 1.25rem",
                borderRadius: "0 0.5rem 0.5rem 0",
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                fontStyle: "italic",
                marginBottom: "2rem",
              }}
            >
              {notice.excerpt}
            </div>

            {/* Main Content */}
            <div
              style={{
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "var(--text-primary)",
                whiteSpace: "pre-line",
                marginBottom: "2.5rem",
              }}
            >
              {notice.content}
            </div>

            {/* Attachment interface if exists */}
            {notice.hasAttachment && (
              <div
                style={{
                  background: "#f8fafc",
                  border: "1.5px dashed #cbd5e1",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  marginBottom: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "2.2rem" }}>📄</span>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "var(--navy)", margin: 0, fontWeight: 700 }}>
                      Official Notice Document (Demo PDF)
                    </h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                      Document reference: {notice.id.toUpperCase()} • Format: PDF • Sample Attachment
                    </p>
                  </div>
                </div>

                <NoticeDownloadButton />
              </div>
            )}

            {/* Official Disclaimer Box */}
            <div
              style={{
                background: "#fef9c3",
                border: "1px solid #fde047",
                borderRadius: "0.5rem",
                padding: "1rem",
                fontSize: "0.78rem",
                color: "#713f12",
                lineHeight: 1.6,
              }}
            >
              <strong>Notice Verification Note:</strong> This is an illustrative sample notice created for the Handshake Co. website demonstration concept. In an official deployment, all circulars are entered by the school administration and authorized under the authority of the Principal.
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--grey-200)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Link href="/notices" className="btn-outline" style={{ fontSize: "0.875rem" }}>
                ← Back to All Notices
              </Link>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Link href="/admissions" className="btn-gold" style={{ fontSize: "0.875rem" }}>
                  Admission Enquiries
                </Link>
                <Link href="/contact" className="btn-primary" style={{ fontSize: "0.875rem" }}>
                  Contact School
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

