"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DEMO_STUDENTS,
  DEMO_ENQUIRIES,
  DEMO_FEE_RECORDS,
  DEMO_NOTICES,
  DEMO_CONTACT_MESSAGES,
} from "@/lib/data";

export default function AdminOverviewPage() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);

  const pendingFeesCount = DEMO_FEE_RECORDS.filter((f) => f.status === "Pending").length;
  const newEnquiriesCount = DEMO_ENQUIRIES.filter((e) => e.status === "New").length;
  const unreadMessagesCount = DEMO_CONTACT_MESSAGES.filter((m) => !m.read).length;

  return (
    <div>
      {/* Welcome banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #091530 0%, #1e4fc2 100%)",
          borderRadius: "0.875rem",
          padding: "1.75rem 2rem",
          color: "white",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          boxShadow: "0 4px 16px rgba(15,32,68,0.12)",
        }}
      >
        <div>
          <span
            style={{
              background: "rgba(201,168,76,0.2)",
              color: "var(--gold-light)",
              padding: "0.25rem 0.65rem",
              borderRadius: "1rem",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Management Suite Concept
          </span>
          <h1 style={{ fontSize: "1.75rem", color: "white", margin: "0.5rem 0 0.35rem", fontFamily: "Inter, sans-serif" }}>
            Welcome to School Administration
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", margin: 0, maxWidth: "600px" }}>
            This administrative dashboard concept showcases real-time student tracking, enquiry management, fee administration, exam scheduling, and website content controls.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href="/admin/enquiries"
            style={{
              background: "var(--gold)",
              color: "var(--navy)",
              fontWeight: 700,
              padding: "0.6rem 1.25rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            Review Enquiries ({newEnquiriesCount})
          </Link>
          <Link
            href="/admin/notices"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "white",
              fontWeight: 600,
              padding: "0.6rem 1.25rem",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontSize: "0.85rem",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            + Publish Notice
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        {[
          {
            title: "Simulated Students",
            value: DEMO_STUDENTS.length,
            subtitle: "Sample enrolled records",
            icon: "👨‍🎓",
            accent: "#3b82f6",
            href: "/admin/students",
          },
          {
            title: "Admission Enquiries",
            value: DEMO_ENQUIRIES.length,
            badge: `${newEnquiriesCount} New`,
            subtitle: "Prospective student leads",
            icon: "📋",
            accent: "#f59e0b",
            href: "/admin/enquiries",
          },
          {
            title: "Pending Fee Records",
            value: pendingFeesCount,
            badge: "Requires Follow-up",
            subtitle: "Placeholder fee tracker",
            icon: "💰",
            accent: "#ef4444",
            href: "/admin/fees",
          },
          {
            title: "Website Messages",
            value: DEMO_CONTACT_MESSAGES.length,
            badge: `${unreadMessagesCount} Unread`,
            subtitle: "Public contact inquiries",
            icon: "✉️",
            accent: "#8b5cf6",
            href: "/admin/messages",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="admin-card-hover"
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {card.title}
                </span>
                <span style={{ fontSize: "1.5rem" }}>{card.icon}</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                {card.value}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem", marginTop: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{card.subtitle}</span>
              {card.badge && (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: card.accent, background: "#f8fafc", padding: "0.15rem 0.5rem", borderRadius: "1rem" }}>
                  {card.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout: Recent Enquiries & Active Notices */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        {/* Recent Enquiries */}
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ padding: "1.1rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1rem", color: "#0f172a", margin: 0, fontWeight: 700 }}>Recent Admission Enquiries</h3>
              <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Fictional demonstration submissions</span>
            </div>
            <Link href="/admin/enquiries" style={{ fontSize: "0.8rem", color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>
              View All ({DEMO_ENQUIRIES.length}) →
            </Link>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Parent / Student</th>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_ENQUIRIES.slice(0, 3).map((enq) => (
                  <tr key={enq.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a" }}>{enq.parentName}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Child: {enq.studentName}</div>
                    </td>
                    <td>
                      <span style={{ background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 600 }}>
                        {enq.class}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#64748b" }}>{enq.date}</td>
                    <td>
                      <span
                        style={{
                          background: enq.status === "New" ? "#fef3c7" : "#d1fae5",
                          color: enq.status === "New" ? "#92400e" : "#065f46",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "0.3rem",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                        }}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        style={{
                          background: "#eff6ff",
                          border: "1px solid #bfdbfe",
                          color: "#1d4ed8",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "0.3rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Notices */}
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          <div style={{ padding: "1.1rem 1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1rem", color: "#0f172a", margin: 0, fontWeight: 700 }}>Published Notices & Circulars</h3>
              <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Public bulletin board live state</span>
            </div>
            <Link href="/admin/notices" style={{ fontSize: "0.8rem", color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>
              Manage Notices →
            </Link>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Notice Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_NOTICES.slice(0, 4).map((not) => (
                  <tr key={not.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.85rem" }}>{not.title}</div>
                      <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Ref: {not.id}</div>
                    </td>
                    <td>
                      <span style={{ background: "#e2e8f0", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 600 }}>
                        {not.category}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#64748b" }}>{not.date}</td>
                    <td>
                      {not.isImportant ? (
                        <span style={{ color: "#b45309", background: "#fef3c7", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.7rem", fontWeight: 700 }}>
                          High
                        </span>
                      ) : (
                        <span style={{ color: "#64748b", fontSize: "0.75rem" }}>Regular</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 13 Administrative Modules Overview Grid */}
      <div style={{ background: "white", borderRadius: "0.875rem", padding: "1.75rem", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.15rem", color: "#0f172a", margin: "0 0 0.25rem" }}>
            Complete School Management Suite Blueprint
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", margin: 0 }}>
            Handshake Co. offers tailored development for all 13 core functional modules required to run modern educational institutions in Assam.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            { name: "Student Management", icon: "👨‍🎓", desc: "Digital student records, class allotment, parent contacts.", href: "/admin/students" },
            { name: "Admission Enquiries", icon: "📋", desc: "Automated inquiry tracking, lead status, follow-up notes.", href: "/admin/enquiries" },
            { name: "Attendance Marking", icon: "✅", desc: "Daily student & staff attendance with summary metrics.", href: "/admin/attendance" },
            { name: "Fee Management", icon: "💰", desc: "Challan generation, payment tracking, pending fee ledgers.", href: "/admin/fees" },
            { name: "Examination & Results", icon: "📝", desc: "Exam timetables, mark compilation, student progress cards.", href: "/admin/exams" },
            { name: "Teachers & Staff", icon: "👩‍🏫", desc: "Staff directory, qualifications, subject assignments.", href: "/admin/staff" },
            { name: "Notices Management", icon: "📢", desc: "Create, publish, category-tag, and archive announcements.", href: "/admin/notices" },
            { name: "Gallery Management", icon: "🖼️", desc: "Upload and organize photos by event, campus, or sports.", href: "/admin/gallery" },
            { name: "Website CMS", icon: "⚙️", desc: "Edit hero text, school intro, principal quote without code.", href: "/admin/content" },
            { name: "Downloads & Circulars", icon: "📥", desc: "Upload syllabus PDFs, admission forms, holiday lists.", href: "/admin/downloads" },
            { name: "Contact Messages", icon: "✉️", desc: "Review inquiries submitted via the public contact form.", href: "/admin/messages" },
            { name: "System Settings", icon: "🔧", desc: "Academic session rules, contact details, site toggles.", href: "/admin/settings" },
          ].map((mod) => (
            <Link
              key={mod.name}
              href={mod.href}
              className="admin-module-card"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "0.6rem",
                padding: "1rem",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{mod.icon}</span>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0f172a" }}>{mod.name}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#64748b", margin: 0, lineHeight: 1.45 }}>{mod.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Enquiry Inspect Modal (Demo interaction) */}
      {selectedEnquiry && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setSelectedEnquiry(null)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "500px", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: 0 }}>Enquiry Details ({selectedEnquiry.id})</h3>
              <button onClick={() => setSelectedEnquiry(null)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
              <div><strong>Parent Name:</strong> {selectedEnquiry.parentName}</div>
              <div><strong>Student Name:</strong> {selectedEnquiry.studentName}</div>
              <div><strong>Date of Birth (DOB):</strong> {(selectedEnquiry as any).dob || "2020-04-12"}</div>
              <div><strong>Class Requested:</strong> {selectedEnquiry.class}</div>
              <div><strong>Contact Number:</strong> {selectedEnquiry.phone}</div>
              <div><strong>Email:</strong> {selectedEnquiry.email}</div>
              <div><strong>Date:</strong> {selectedEnquiry.date}</div>
              <div><strong>Status:</strong> {selectedEnquiry.status}</div>
              <div><strong>Message:</strong> &quot;{selectedEnquiry.message}&quot;</div>
            </div>

            <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setSelectedEnquiry(null)} className="btn-primary" style={{ fontSize: "0.85rem" }}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

