"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdmissionNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const hasSeen = sessionStorage.getItem("nbjv_admission_popup_seen");
    if (!hasSeen) {
      // Small delay for smooth entry after initial page render
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("nbjv_admission_popup_seen", "true");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(9, 21, 48, 0.75)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.25s ease forwards",
      }}
    >
      {/* Backdrop click to dismiss */}
      <div
        style={{ position: "absolute", inset: 0 }}
        onClick={handleClose}
      />

      {/* Modal Dialog Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(15, 32, 68, 0.35)",
          border: "2px solid #c9a84c",
          animation: "fadeInUp 0.35s ease forwards",
          zIndex: 10,
        }}
      >
        {/* Header Strip */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f2044 0%, #1a3a6e 100%)",
            color: "white",
            padding: "1.25rem 1.5rem",
            position: "relative",
            borderBottom: "3px solid #c9a84c",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(201, 168, 76, 0.2)",
              border: "1px solid rgba(201, 168, 76, 0.5)",
              color: "#e2c47a",
              padding: "0.2rem 0.65rem",
              borderRadius: "1rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            📢 IMPORTANT NOTICE
          </div>

          <h2
            id="modal-headline"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.35rem",
              margin: 0,
              color: "#ffffff",
              lineHeight: 1.3,
            }}
          >
            Admissions Open (Session 2027–28)
          </h2>
          <p
            style={{
              fontSize: "0.82rem",
              color: "rgba(255, 255, 255, 0.8)",
              margin: "0.3rem 0 0",
            }}
          >
            Natun Bazar Jatiya Vidyalaya • Lanka, Hojai, Assam
          </p>

          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close popup window"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "white",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.3)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)")}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "1.5rem" }}>
          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.6,
              color: "#3d4f6e",
              marginBottom: "1.25rem",
            }}
          >
            We are pleased to announce that admission enquiries for the upcoming academic session are now open. Seats are available across Primary and Upper Primary sections:
          </p>

          <div
            style={{
              background: "#f8f9fc",
              border: "1px solid #e2e6ef",
              borderRadius: "0.65rem",
              padding: "0.9rem 1.1rem",
              marginBottom: "1.4rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              fontSize: "0.85rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f2044", fontWeight: 600 }}>
              <span>🎓</span>
              <span>Available Classes: Class I to Class VIII</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f2044" }}>
              <span>📝</span>
              <span>Online Enquiry &amp; Registration available</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f2044" }}>
              <span>📍</span>
              <span>Campus: 1 No. Khring Khring, Lanka</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              style={{
                background: "transparent",
                border: "1px solid #e2e6ef",
                color: "#6b7a99",
                padding: "0.6rem 1.1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Continue to Website
            </button>

            <Link
              href="/admissions"
              onClick={handleClose}
              className="btn-gold"
              style={{
                padding: "0.6rem 1.25rem",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              Apply / Enquiry Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

