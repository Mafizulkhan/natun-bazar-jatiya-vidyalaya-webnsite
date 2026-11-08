"use client";

import { useState } from "react";
import { DEMO_ENQUIRIES } from "@/lib/data";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState(DEMO_ENQUIRIES);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [activeModalEnquiry, setActiveModalEnquiry] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setEnquiries(
      enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    showToast(`Enquiry ${id} status changed to "${newStatus}".`);
  };

  const handleDelete = (id: string) => {
    if (confirm(`[DEMO] Delete enquiry record ${id}?`)) {
      setEnquiries(enquiries.filter((e) => e.id !== id));
      showToast(`Enquiry ${id} deleted.`);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesStatus = filterStatus === "All" || e.status === filterStatus;
    const matchesSearch =
      e.parentName.toLowerCase().includes(search.toLowerCase()) ||
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            background: "#1e4fc2",
            color: "white",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            zIndex: 9999,
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          ℹ️ {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Admission Enquiries
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Review, track, and update prospective admission requests submitted via the public enquiry form.
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting Enquiry CSV (Demo — In production this downloads a verified spreadsheet)")}
          className="btn-outline"
          style={{ fontSize: "0.85rem" }}
        >
          📥 Export Leads (CSV)
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
        ⚠️ <strong>Demonstration Leads:</strong> Inquiries listed here are simulated submissions to demonstrate how the school office can follow up with interested parents via phone or scheduled campus visits.
      </div>

      {/* Controls */}
      <div
        style={{
          background: "white",
          padding: "1.25rem",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
          <input
            type="text"
            placeholder="Search parent, child name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ fontSize: "0.875rem", paddingLeft: "2.25rem" }}
          />
          <span style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
            🔍
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.825rem", color: "#64748b", fontWeight: 600 }}>Status:</span>
          {["All", "New", "Contacted", "Enrolled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "0.35rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: filterStatus === st ? "1px solid #0f172a" : "1px solid #cbd5e1",
                background: filterStatus === st ? "#0f172a" : "white",
                color: filterStatus === st ? "white" : "#475569",
                cursor: "pointer",
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Parent Details</th>
              <th>Child / Class</th>
              <th>Submission Date</th>
              <th>Lead Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((enq) => (
                <tr key={enq.id}>
                  <td style={{ fontWeight: 700, color: "var(--blue)", fontSize: "0.825rem" }}>{enq.id}</td>
                  <td>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{enq.parentName}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      📞 {enq.phone} • ✉ {enq.email}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, color: "#0f172a" }}>{enq.studentName}</div>
                    <span style={{ background: "#f1f5f9", padding: "0.15rem 0.45rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 600 }}>
                      {enq.class}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#64748b" }}>{enq.date}</td>
                  <td>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.3rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: "1px solid #cbd5e1",
                        background: enq.status === "New" ? "#fef3c7" : "#d1fae5",
                        color: enq.status === "New" ? "#92400e" : "#065f46",
                        cursor: "pointer",
                      }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Enrolled">Enrolled</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => setActiveModalEnquiry(enq)}
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
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        style={{
                          background: "#fee2e2",
                          border: "1px solid #fca5a5",
                          color: "#b91c1c",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "0.3rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  No enquiry records matching current criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {activeModalEnquiry && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setActiveModalEnquiry(null)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "520px", padding: "2rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: 0 }}>
                Enquiry Lead #{activeModalEnquiry.id}
              </h3>
              <button onClick={() => setActiveModalEnquiry(null)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.875rem" }}>
              <div><strong>Parent / Guardian:</strong> {activeModalEnquiry.parentName}</div>
              <div><strong>Prospective Student:</strong> {activeModalEnquiry.studentName}</div>
              <div><strong>Date of Birth (DOB):</strong> {(activeModalEnquiry as any).dob || "2020-04-12"}</div>
              <div><strong>Class Interested:</strong> {activeModalEnquiry.class}</div>
              <div><strong>Phone Number:</strong> {activeModalEnquiry.phone}</div>
              <div><strong>Email Address:</strong> {activeModalEnquiry.email}</div>
              <div><strong>Submission Timestamp:</strong> {activeModalEnquiry.date}</div>
              <div>
                <strong>Current Status:</strong>{" "}
                <span style={{ fontWeight: 700, color: activeModalEnquiry.status === "New" ? "#92400e" : "#065f46" }}>
                  {activeModalEnquiry.status}
                </span>
              </div>
              <div style={{ background: "#f8fafc", padding: "0.85rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                <strong>Parent Notes / Query:</strong>
                <p style={{ margin: "0.35rem 0 0", color: "#334155", fontStyle: "italic" }}>
                  &quot;{activeModalEnquiry.message}&quot;
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => {
                    handleStatusChange(activeModalEnquiry.id, "Contacted");
                    setActiveModalEnquiry({ ...activeModalEnquiry, status: "Contacted" });
                  }}
                  className="btn-outline"
                  style={{ fontSize: "0.78rem", padding: "0.4rem 0.8rem" }}
                >
                  Mark Contacted
                </button>
              </div>
              <button onClick={() => setActiveModalEnquiry(null)} className="btn-primary" style={{ fontSize: "0.85rem" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

