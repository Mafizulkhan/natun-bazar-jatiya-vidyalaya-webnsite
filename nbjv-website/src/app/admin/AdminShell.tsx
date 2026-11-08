"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCHOOL, AGENCY } from "@/lib/data";

export const NAV_MODULES = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Student Management", href: "/admin/students", icon: "👨‍🎓" },
  { label: "Admission Enquiries", href: "/admin/enquiries", icon: "📋" },
  { label: "Attendance", href: "/admin/attendance", icon: "✅" },
  { label: "Fee Management", href: "/admin/fees", icon: "💰" },
  { label: "Examination & Results", href: "/admin/exams", icon: "📝" },
  { label: "Teachers & Staff", href: "/admin/staff", icon: "👩‍🏫" },
  { label: "Notices", href: "/admin/notices", icon: "📢" },
  { label: "Gallery Management", href: "/admin/gallery", icon: "🖼️" },
  { label: "Website Content", href: "/admin/content", icon: "⚙️" },
  { label: "Downloads", href: "/admin/downloads", icon: "📥" },
  { label: "Contact Messages", href: "/admin/messages", icon: "✉️" },
  { label: "Settings", href: "/admin/settings", icon: "🔧" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Normalize path matching for aliases
  const isMatch = (href: string) => {
    if (pathname === href) return true;
    if (href === "/admin/notices" && pathname === "/admin/notices-mgmt") return true;
    if (href === "/admin/gallery" && pathname === "/admin/gallery-mgmt") return true;
    return false;
  };

  const currentModule = NAV_MODULES.find((m) => isMatch(m.href));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "Inter, sans-serif" }}>
      {/* ── SIDEBAR (Desktop) ── */}
      <aside
        style={{
          width: "260px",
          background: "#091530",
          color: "#cbd5e1",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          borderRight: "1px solid #1e293b",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 40,
        }}
        className="admin-sidebar"
      >
        {/* Brand header */}
        <div style={{ padding: "1.25rem 1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "0.5rem",
                background: "linear-gradient(135deg, var(--gold), #fef08a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--navy)",
                fontWeight: 800,
                fontSize: "1rem",
              }}
            >
              NB
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.2 }}>
                {SCHOOL.name}
              </div>
              <div style={{ color: "var(--gold-light)", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                Admin Demonstration
              </div>
            </div>
          </div>

          {/* Demo Mode Badge */}
          <div
            style={{
              background: "rgba(201, 168, 76, 0.15)",
              border: "1px solid rgba(201, 168, 76, 0.3)",
              color: "#fde047",
              padding: "0.3rem 0.6rem",
              borderRadius: "0.35rem",
              fontSize: "0.68rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            ⚠️ DEMO ENVIRONMENT • LOCAL STATE
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: "0.75rem 0.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <div style={{ padding: "0.4rem 0.75rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>
            Management Modules
          </div>

          {NAV_MODULES.map((item) => {
            const active = isMatch(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-item ${active ? "active" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.55rem 0.75rem",
                  borderRadius: "0.4rem",
                  fontSize: "0.825rem",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#93c5fd" : "#94a3b8",
                  background: active ? "rgba(30, 79, 194, 0.25)" : "transparent",
                  borderLeft: active ? "3px solid #60a5fa" : "3px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Back Link & Handshake Co Attribution */}
        <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", background: "#060d1f" }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#38bdf8",
              fontSize: "0.8rem",
              textDecoration: "none",
              fontWeight: 600,
              marginBottom: "0.75rem",
            }}
          >
            <span>🌐</span> Return to Public Website
          </Link>

          <p style={{ fontSize: "0.68rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>
            Engineered by <strong style={{ color: "#94a3b8" }}>{AGENCY.name}</strong> as an administrative preview concept.
          </p>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflowX: "hidden" }}>
        {/* Top Header */}
        <header
          style={{
            background: "white",
            borderBottom: "1px solid #e2e8f0",
            padding: "0.85rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            position: "sticky",
            top: 0,
            zIndex: 30,
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="admin-mobile-toggle"
              style={{
                background: "none",
                border: "1px solid #cbd5e1",
                padding: "0.35rem 0.55rem",
                borderRadius: "0.35rem",
                cursor: "pointer",
                display: "none",
                fontSize: "1rem",
              }}
              aria-label="Toggle Navigation"
            >
              ☰
            </button>

            <div>
              <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                Administration Portal
              </span>
              <h2 style={{ fontSize: "1.1rem", color: "#0f172a", margin: 0, fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                {currentModule?.label || "Dashboard"}
              </h2>
            </div>
          </div>

          {/* User profile & demo pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                background: "#fef3c7",
                color: "#92400e",
                border: "1px solid #fde68a",
                padding: "0.25rem 0.65rem",
                borderRadius: "2rem",
                fontSize: "0.72rem",
                fontWeight: 600,
                display: "none",
              }}
              className="demo-header-pill"
            >
              Interactive Demo
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#1e4fc2",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                A
              </div>
              <div style={{ fontSize: "0.825rem", lineHeight: 1.2 }}>
                <div style={{ fontWeight: 600, color: "#0f172a" }}>School Admin</div>
                <div style={{ fontSize: "0.7rem", color: "#64748b" }}>Demo Account</div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Demo Banner in Admin Content */}
        <div style={{ background: "#eff6ff", borderBottom: "1px solid #bfdbfe", padding: "0.6rem 1.5rem", fontSize: "0.78rem", color: "#1e40af", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>
            ℹ️ <strong>Demonstration Mode:</strong> All additions, edits, and deletions operate on simulated local data for visual and procedural evaluation.
          </span>
          <span style={{ fontSize: "0.72rem", color: "#3b82f6" }}>Handshake Co. Management System Concept</span>
        </div>

        {/* Page children container */}
        <main style={{ padding: "1.75rem", flex: 1, minHeight: "calc(100vh - 120px)" }}>{children}</main>
      </div>

      {/* ── MOBILE OVERLAY DRAWER ── */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            style={{
              position: "relative",
              width: "260px",
              background: "#091530",
              height: "100%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>Admin Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "none", border: "none", color: "white", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <nav style={{ padding: "0.75rem 0.5rem", flex: 1 }}>
              {NAV_MODULES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "0.4rem",
                    fontSize: "0.85rem",
                    color: isMatch(item.href) ? "#93c5fd" : "#94a3b8",
                    background: isMatch(item.href) ? "rgba(30,79,194,0.3)" : "transparent",
                    textDecoration: "none",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .admin-sidebar { display: none !important; }
          .admin-mobile-toggle { display: block !important; }
        }
        @media (min-width: 640px) {
          .demo-header-pill { display: inline-block !important; }
        }
      `}</style>
    </div>
  );
}

