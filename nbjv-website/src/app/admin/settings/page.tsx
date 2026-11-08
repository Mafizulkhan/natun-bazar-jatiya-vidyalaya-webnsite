"use client";

import { useState } from "react";
import { AGENCY } from "@/lib/data";

export default function AdminSettingsPage() {
  const [toggles, setToggles] = useState({
    admissionsOpen: true,
    contactFormActive: true,
    galleryPublic: true,
    maintenanceBanner: false,
    autoEmailAcknowledgment: true,
  });

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
    showToast(`Setting "${key}" updated.`);
  };

  const handleResetData = () => {
    if (confirm("[DEMO] Reset all simulated data in browser memory back to starting values?")) {
      showToast("Simulated data refreshed to factory defaults.");
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            background: "#065f46",
            color: "white",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            zIndex: 9999,
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          ✅ {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
          System & Website Configuration
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
          Control public website interaction toggles, administrative defaults, and deployment specifications.
        </p>
      </div>

      {/* Demo Notice */}
      <div
        style={{
          background: "#fef9c3",
          border: "1px solid #fbbf24",
          borderRadius: "0.5rem",
          padding: "0.75rem 1rem",
          marginBottom: "1.5rem",
          fontSize: "0.825rem",
          color: "#92400e",
        }}
      >
        ⚠️ <strong>Prototype Settings:</strong> Toggle controls illustrate how the school head or website administrator can control online admissions or enable seasonal notices without modifying website code.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
        {/* Module Toggles */}
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", color: "#0f172a", margin: "0 0 1rem" }}>
            Public Portal Feature Controls
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                key: "admissionsOpen",
                label: "Accept Online Admission Enquiries",
                desc: "Allows visitors to submit the admission inquiry form on the public website.",
              },
              {
                key: "contactFormActive",
                label: "Public Contact Form Active",
                desc: "Accepts messages from parents and community members directly into the admin inbox.",
              },
              {
                key: "galleryPublic",
                label: "Enable Photo Gallery Album",
                desc: "Displays the public campus and activity gallery pages to visitors.",
              },
              {
                key: "autoEmailAcknowledgment",
                label: "Automated Inquiry Acknowledgment",
                desc: "Sends automated acknowledgment receipt on prospective lead submission (Planned).",
              },
              {
                key: "maintenanceBanner",
                label: "Maintenance Notice Mode",
                desc: "Displays an administrative announcement bar at the top of all public pages.",
              },
            ].map((item) => {
              const checked = toggles[item.key as keyof typeof toggles];
              return (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    borderBottom: "1px solid #f1f5f9",
                    paddingBottom: "1rem",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.875rem" }}>{item.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.2rem" }}>{item.desc}</div>
                  </div>

                  <button
                    onClick={() => handleToggle(item.key as keyof typeof toggles)}
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "12px",
                      background: checked ? "#1e4fc2" : "#cbd5e1",
                      border: "none",
                      position: "relative",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                    aria-label={`Toggle ${item.label}`}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "white",
                        position: "absolute",
                        top: "3px",
                        left: checked ? "23px" : "3px",
                        transition: "left 0.2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Development & Architecture Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#0f172a", margin: "0 0 0.75rem" }}>
              Technical Stack & Specifications
            </h3>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
              <li><strong>Framework:</strong> Next.js 16 (App Router architecture)</li>
              <li><strong>Language:</strong> TypeScript with full type safety</li>
              <li><strong>Rendering:</strong> React 19 Client & Server Components</li>
              <li><strong>Styling:</strong> Tailwind CSS 4 & Custom Accessible Design System</li>
              <li><strong>SEO & Standards:</strong> Semantic HTML5, Metadata API, Dynamic Sitemap & Robots</li>
            </ul>

            <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                Developed by {AGENCY.name}
              </div>
              <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "0 0 0.5rem" }}>
                Specialized in tailored software engineering, educational web solutions, and institutional portals.
              </p>
              <a
                href={AGENCY.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--blue)", fontSize: "0.8rem", fontWeight: 600, textDecoration: "none" }}
              >
                Visit agency website: {AGENCY.website} ↗
              </a>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#0f172a", margin: "0 0 0.5rem" }}>
              Reset Demonstration State
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 1rem" }}>
              Restore all mock student records, sample notices, and fee receipts to their factory defaults.
            </p>
            <button
              onClick={handleResetData}
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🔄 Refresh Mock Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

