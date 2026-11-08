"use client";

import { useState } from "react";
import { DEMO_FEE_RECORDS } from "@/lib/data";

interface FeeRecord {
  id: string;
  studentName: string;
  class: string;
  month: string;
  amount: string;
  status: string;
  paidOn: string;
}

export default function AdminFeesPage() {
  const [records, setRecords] = useState<FeeRecord[]>(DEMO_FEE_RECORDS);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    class: "Class I",
    month: "November 2026",
    amount: "₹[Standard Tuition Fee]",
    status: "Paid",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleTogglePaid = (id: string) => {
    setRecords(
      records.map((r) => {
        if (r.id === id) {
          const newStatus = r.status === "Paid" ? "Pending" : "Paid";
          const paidOn = newStatus === "Paid" ? new Date().toISOString().split("T")[0] : "—";
          return { ...r, status: newStatus, paidOn };
        }
        return r;
      })
    );
    showToast(`Payment status updated.`);
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      alert("Please enter student name");
      return;
    }

    const newRecord: FeeRecord = {
      id: `FEE${String(records.length + 1).padStart(3, "0")}`,
      studentName: formData.studentName,
      class: formData.class,
      month: formData.month,
      amount: formData.amount,
      status: formData.status,
      paidOn: formData.status === "Paid" ? new Date().toISOString().split("T")[0] : "—",
    };

    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
    showToast(`Challan record created for ${formData.studentName} (Demo).`);
  };

  const filtered = records.filter((r) => {
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    const matchesSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.class.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const paidCount = records.filter((r) => r.status === "Paid").length;
  const pendingCount = records.filter((r) => r.status === "Pending").length;

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
            Fee Administration & Ledgers
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Track monthly tuition challans, receipt generation, and clearance states.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ fontSize: "0.85rem" }}>
            + Create Fee Record
          </button>
          <button
            onClick={() => showToast("Exporting fee reconciliation ledger (Demo)")}
            className="btn-outline"
            style={{ fontSize: "0.85rem" }}
          >
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Demo notice regarding official fee amounts */}
      <div
        style={{
          background: "#fef9c3",
          border: "1px solid #fbbf24",
          borderRadius: "0.5rem",
          padding: "0.85rem 1rem",
          marginBottom: "1.5rem",
          fontSize: "0.825rem",
          color: "#92400e",
          lineHeight: 1.5,
        }}
      >
        ⚠️ <strong>Fee Transparency Policy:</strong> Actual fee structures, admission charges, and monthly dues are not published as factual figures. Placeholders such as &quot;₹[Amount]&quot; are used until official fee schedules are authorized by the school managing committee.
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ background: "white", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Total Ledgers Logged</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a" }}>{records.length}</div>
          <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Simulated student records</div>
        </div>

        <div style={{ background: "white", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "0.75rem", color: "#166534", fontWeight: 600, textTransform: "uppercase" }}>Cleared Records</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#16a34a" }}>{paidCount}</div>
          <div style={{ fontSize: "0.7rem", color: "#16a34a" }}>Status: Paid (Receipt Issued)</div>
        </div>

        <div style={{ background: "white", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "0.75rem", color: "#991b1b", fontWeight: 600, textTransform: "uppercase" }}>Pending Follow-ups</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#dc2626" }}>{pendingCount}</div>
          <div style={{ fontSize: "0.7rem", color: "#dc2626" }}>Notice pending to parent</div>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          background: "white",
          padding: "1rem 1.25rem",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <input
            type="text"
            placeholder="Search student or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ fontSize: "0.85rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {["All", "Paid", "Pending"].map((st) => (
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
              <th>Receipt Ref</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Billing Month</th>
              <th>Due Amount</th>
              <th>Payment Status</th>
              <th>Date Settled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600, color: "var(--blue)", fontSize: "0.825rem" }}>{r.id}</td>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>{r.studentName}</td>
                  <td>
                    <span style={{ background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 600 }}>
                      {r.class}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#475569" }}>{r.month}</td>
                  <td style={{ color: "#0f172a", fontWeight: 600, fontStyle: "italic" }}>{r.amount}</td>
                  <td>
                    <span
                      style={{
                        background: r.status === "Paid" ? "#dcfce7" : "#fee2e2",
                        color: r.status === "Paid" ? "#15803d" : "#b91c1c",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "1rem",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#64748b" }}>{r.paidOn}</td>
                  <td>
                    <button
                      onClick={() => handleTogglePaid(r.id)}
                      style={{
                        background: r.status === "Paid" ? "#fee2e2" : "#dcfce7",
                        color: r.status === "Paid" ? "#991b1b" : "#166534",
                        border: "1px solid transparent",
                        padding: "0.3rem 0.65rem",
                        borderRadius: "0.35rem",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {r.status === "Paid" ? "Mark Pending" : "Mark Paid ✓"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  No fee records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setIsModalOpen(false)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "460px", padding: "1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: "0 0 1.25rem" }}>
              Generate Demo Fee Challan
            </h3>

            <form onSubmit={handleAddRecord} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Das"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="form-input"
                  >
                    <option value="Class I">Class I</option>
                    <option value="Class II">Class II</option>
                    <option value="Class III">Class III</option>
                    <option value="Class IV">Class IV</option>
                    <option value="Class V">Class V</option>
                    <option value="Class VI">Class VI</option>
                    <option value="Class VII">Class VII</option>
                    <option value="Class VIII">Class VIII</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Month</label>
                  <input
                    type="text"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Amount Placeholder</label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Initial Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-input"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline" style={{ fontSize: "0.85rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: "0.85rem" }}>
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

