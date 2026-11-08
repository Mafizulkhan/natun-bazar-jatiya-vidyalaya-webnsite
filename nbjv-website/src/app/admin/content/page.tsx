"use client";

import { useState } from "react";
import { SCHOOL } from "@/lib/data";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "contact" | "institutional">("home");
  const [toast, setToast] = useState<string | null>(null);

  // Editable fields state
  const [content, setContent] = useState({
    heroTitle: "Welcome to Natun Bazar Jatiya Vidyalaya",
    heroSubtitle: "A co-educational institution dedicated to nurturing young minds through quality primary and upper-primary education in the heart of Assam.",
    welcomeHeading: "Nurturing Excellence, Building Character",
    welcomeText: "Natun Bazar Jatiya Vidyalaya is committed to providing a nurturing, inclusive, and intellectually stimulating environment for every child. We believe that every student has unique potential that deserves to be discovered and developed.",
    principalMessage: "Education is not the filling of a pail, but the lighting of a fire. At Natun Bazar Jatiya Vidyalaya, we strive to kindle that fire in every child — encouraging them to explore, question, and grow.",
    phone: SCHOOL.phone.number,
    address: SCHOOL.location.full,
    email: SCHOOL.email,
    udise: SCHOOL.udise,
    schoolType: SCHOOL.type,
    sections: SCHOOL.sections,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Content changes saved to simulated CMS store! (Demo mode)");
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Website Content Management (CMS)
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Update hero headlines, introductory narratives, principal messages, and institutional details without code modifications.
          </p>
        </div>

        <button onClick={handleSave} className="btn-primary" style={{ fontSize: "0.85rem" }}>
          💾 Save Changes
        </button>
      </div>

      {/* Demo Warning */}
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
        ⚠️ <strong>CMS Concept Demonstration:</strong> This interface empowers school administrators to update website text, welcome remarks, and telephone numbers immediately without needing web developer intervention.
      </div>

      {/* Tab navigation */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "2px solid #e2e8f0", marginBottom: "1.75rem", flexWrap: "wrap" }}>
        {[
          { key: "home", label: "🏠 Homepage Copy" },
          { key: "about", label: "🏛️ About & Principal Quote" },
          { key: "contact", label: "📞 Contact Channels" },
          { key: "institutional", label: "📜 Institutional Registrations" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            style={{
              padding: "0.6rem 1.25rem",
              border: "none",
              background: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: activeTab === t.key ? "#1e4fc2" : "#64748b",
              borderBottom: activeTab === t.key ? "3px solid #1e4fc2" : "3px solid transparent",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} style={{ background: "white", padding: "2rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        {activeTab === "home" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="form-label">Hero Main Headline</label>
              <input
                type="text"
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="form-input"
              />
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Appears above the main banner on the homepage.</span>
            </div>

            <div>
              <label className="form-label">Hero Supporting Subtitle</label>
              <textarea
                rows={3}
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Welcome Section Title</label>
              <input
                type="text"
                value={content.welcomeHeading}
                onChange={(e) => setContent({ ...content, welcomeHeading: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Welcome Body Paragraph</label>
              <textarea
                rows={4}
                value={content.welcomeText}
                onChange={(e) => setContent({ ...content, welcomeText: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="form-label">Principal&apos;s Featured Message / Quote</label>
              <textarea
                rows={4}
                value={content.principalMessage}
                onChange={(e) => setContent({ ...content, principalMessage: e.target.value })}
                className="form-input"
              />
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Current placeholder will be replaced with an authentic signed message from Wahida Begum (Principal).
              </span>
            </div>

            <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <h4 style={{ fontSize: "0.9rem", color: "#0f172a", margin: "0 0 0.5rem" }}>Future CMS Expansions:</h4>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.825rem", color: "#64748b" }}>
                <li>School Vision & Mission statements editor</li>
                <li>School Foundation History narrative editor</li>
                <li>Annual Sports Achievements showcase</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="form-label">Official Phone Number *</label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => setContent({ ...content, phone: e.target.value })}
                className="form-input"
              />
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Current: 9365232226 (as listed on recruitment poster — confirmation required).
              </span>
            </div>

            <div>
              <label className="form-label">Physical School Address *</label>
              <input
                type="text"
                value={content.address}
                onChange={(e) => setContent({ ...content, address: e.target.value })}
                className="form-input"
              />
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Current: 1 No. Khring Khring, Lanka, Hojai, Assam (Directory-listed).
              </span>
            </div>

            <div>
              <label className="form-label">Official Email Address</label>
              <input
                type="text"
                value={content.email}
                onChange={(e) => setContent({ ...content, email: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        )}

        {activeTab === "institutional" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label className="form-label">UDISE Code (Government Directory Reference)</label>
              <input
                type="text"
                readOnly
                value={content.udise}
                className="form-input"
                style={{ background: "#f1f5f9", cursor: "not-allowed" }}
              />
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                Verified directory reference: 18300817116 (Read-only for integrity).
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="form-label">School Structure Type</label>
                <input
                  type="text"
                  value={content.schoolType}
                  onChange={(e) => setContent({ ...content, schoolType: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Recognized Educational Sections</label>
                <input
                  type="text"
                  value={content.sections}
                  onChange={(e) => setContent({ ...content, sections: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem", borderTop: "1px solid #e2e8f0", paddingTop: "1.25rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button type="submit" className="btn-primary">
            Save & Publish Copy
          </button>
        </div>
      </form>
    </div>
  );
}

