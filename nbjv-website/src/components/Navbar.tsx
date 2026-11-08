"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SCHOOL, AGENCY, NAV_ITEMS } from "@/lib/data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Main header */}
      <header
        style={{
          background: scrolled
            ? "rgba(9,21,48,0.97)"
            : "var(--navy)",
          borderBottom: "3px solid var(--gold)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.5rem",
            height: "72px",
          }}
        >
          {/* Logo + School name */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Logo placeholder */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--navy)", fontFamily: "serif" }}>
                NB
              </span>
            </div>
            <div>
              <div
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  fontFamily: "Georgia, serif",
                  lineHeight: 1.2,
                }}
              >
                {SCHOOL.name}
              </div>
              <div style={{ color: "var(--gold-light)", fontSize: "0.72rem", letterSpacing: "0.08em", marginTop: 2 }}>
                Lanka, Hojai, Assam
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: "0.15rem" }} className="desktop-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link-hover"
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.4rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="nav-admin-btn"
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "0.4rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                marginLeft: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              Admin Demo
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              display: "none",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "min(300px, 85vw)",
              height: "100%",
              background: "var(--navy-dark)",
              padding: "1.5rem 1rem",
              overflowY: "auto",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <span style={{ color: "var(--gold)", fontWeight: 700, fontFamily: "serif" }}>Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "0.25rem" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.88)",
                  padding: "0.85rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  transition: "background 0.15s",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                marginTop: "1rem",
                background: "var(--gold)",
                color: "var(--navy)",
                padding: "0.85rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Admin Demo
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

