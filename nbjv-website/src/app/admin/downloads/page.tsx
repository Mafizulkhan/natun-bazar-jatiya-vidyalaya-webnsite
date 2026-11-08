"use client";
import { useState } from "react";

export default function AdminDownloadsPage() {
  const [docs] = useState([
    { id: "d1", name: "Admission Enquiry Form (Demo)",     type: "PDF",  size: "—",  uploadedOn: "2026-11-01", category: "Admission" },
    { id: "d2", name: "School Notice Board — November 2026 (Demo)", type: "PDF", size: "—", uploadedOn: "2026-11-05", category: "Notice" },
    { id: "d3", name: "Half-Yearly Exam Schedule (Demo)",  type: "PDF",  size: "—",  uploadedOn: "2026-10-20", category: "Academic" },
    { id: "d4", name: "School Calendar 2026-27 (Demo)",    type: "PDF",  size: "—",  uploadedOn: "2026-04-01", category: "Academic" },
  ]);

  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", background: "#1e4fc2", color: "white", padding: "0.75rem 1.25rem", borderRadius: "0.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 9999, fontSize: "0.875rem" }}>
          {toast}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a" }}>Downloads</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage downloadable documents for the public website</p>
        </div>
        <button className="btn-primary" onClick={() => showToast("Demo — Upload functionality requires backend implementation")}>
          + Upload Document
        </button>
      </div>

      {/* Demo banner */}
      <div style={{ background: "#fef9c3", border: "1px solid #fbbf24", borderRadius: "0.5rem", padding: "0.75rem 1rem", marginBottom: "1.5rem", fontSize: "0.82rem", color: "#92400e" }}>
        ⚠ DEMO MODE: All documents listed are sample entries. No actual files are stored. Download buttons will show a demo message.
      </div>

      {/* Upload area */}
      <div style={{ background: "white", borderRadius: "0.75rem", padding: "2rem", border: "2px dashed #cbd5e1", textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📁</div>
        <p style={{ color: "#64748b", fontWeight: 600, marginBottom: "0.5rem" }}>Drag & Drop Documents Here</p>
        <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "1rem" }}>[Demo — no actual upload in demo mode]</p>
        <button className="btn-outline" style={{ fontSize: "0.875rem" }} onClick={() => showToast("Demo — Upload functionality requires backend implementation in production")}>
          Browse Files
        </button>
      </div>

      {/* Documents table */}
      <div style={{ background: "white", borderRadius: "0.75rem", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a" }}>Available Documents (Demo)</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Uploaded On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td style={{ fontWeight: 500, color: "#0f172a" }}>
                  📄 {doc.name}
                </td>
                <td>
                  <span style={{ background: "#dbeafe", color: "#1e40af", padding: "0.2rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 600 }}>
                    {doc.category}
                  </span>
                </td>
                <td style={{ color: "#64748b" }}>{doc.type}</td>
                <td style={{ color: "#64748b" }}>{doc.uploadedOn}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => showToast("Demo — No actual file stored. In production, this would download the document.")}
                      style={{ background: "#dbeafe", color: "#1e40af", border: "none", padding: "0.3rem 0.7rem", borderRadius: "0.35rem", fontSize: "0.78rem", cursor: "pointer", fontWeight: 500 }}
                    >
                      ⬇ Download
                    </button>
                    <button
                      onClick={() => showToast("Demo — Delete functionality shown only")}
                      style={{ background: "#fee2e2", color: "#991b1b", border: "none", padding: "0.3rem 0.7rem", borderRadius: "0.35rem", fontSize: "0.78rem", cursor: "pointer", fontWeight: 500 }}
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

