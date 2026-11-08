import Link from "next/link";
import { SCHOOL, AGENCY, NAV_ITEMS } from "@/lib/data";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer style={{ background: "var(--navy-dark)", color: "rgba(255,255,255,0.75)", borderTop: "3px solid var(--gold)" }}>
      {/* Lower School Info Strip */}
      <div
        style={{
          background: "rgba(0,0,0,0.25)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0.65rem 1.5rem",
          fontSize: "0.82rem",
          color: "rgba(255,255,255,0.75)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span><strong>UDISE:</strong> {SCHOOL.udise}</span>
          <span style={{ opacity: 0.35 }}>|</span>
          <span>{SCHOOL.location.full} <span style={{ opacity: 0.6, fontSize: "0.76rem" }}>(Directory-listed)</span></span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container" style={{ padding: "3rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
          {/* School info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--navy)", fontFamily: "serif" }}>NB</span>
              </div>
              <div style={{ color: "white", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.95rem" }}>
                {SCHOOL.name}
              </div>
            </div>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem" }}>
              {SCHOOL.location.full}
            </p>
            <div style={{ marginTop: "0.75rem" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--gold-light)" }}>
                📞 {SCHOOL.phone.number}
              </p>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>
                ✉ {SCHOOL.email}
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: "var(--gold)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="footer-nav-link"
                  >
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School info */}
          <div>
            <h4 style={{ color: "var(--gold)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              School Information
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "UDISE Code", value: SCHOOL.udise },
                { label: "School Type", value: SCHOOL.type },
                { label: "Sections", value: SCHOOL.sections },
                { label: "Location", value: `${SCHOOL.location.city}, ${SCHOOL.location.district}` },
                { label: "Principal", value: SCHOOL.principal.name + " *" },
              ].map((row) => (
                <li key={row.label} style={{ fontSize: "0.82rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.45)", display: "block", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.label}</span>
                  <span style={{ color: "rgba(255,255,255,0.75)" }}>{row.value}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "0.75rem", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
              * Based on recruitment poster — requires confirmation
            </p>
          </div>

          {/* Important links */}
          <div>
            <h4 style={{ color: "var(--gold)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Important Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Admission Enquiry", href: "/admissions" },
                { label: "Latest Notices", href: "/notices" },
                { label: "School Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Admin Dashboard", href: "/admin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-nav-link"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ background: "rgba(0,0,0,0.3)", padding: "1.25rem 1.5rem" }}>
        <div className="container">
          <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "0.5rem", padding: "1rem 1.25rem", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--gold-light)" }}>⚠ DEMO DISCLAIMER:</strong> {SCHOOL.disclaimer}
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
              © {currentYear} Concept by{" "}
              <a
                href={AGENCY.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--gold-light)", fontWeight: 600 }}
              >
                {AGENCY.name}
              </a>
              . All rights reserved.
            </p>
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>
              {AGENCY.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

