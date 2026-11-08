"use client";

import { useState } from "react";
import { STAFF_MEMBERS, StaffMember } from "@/lib/data";

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(STAFF_MEMBERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "Upper Primary Teacher",
    subject: "General Studies",
    section: "Upper Primary",
    note: "Demo faculty profile — to be verified by school",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "Lower Primary Teacher",
      subject: "Primary Curriculum",
      section: "Lower Primary",
      note: "Demo faculty profile — to be verified by school",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (st: StaffMember) => {
    setEditingId(st.id);
    setFormData({
      name: st.name,
      designation: st.designation,
      subject: st.subject || "",
      section: st.section || "Primary",
      note: st.note,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`[DEMO] Remove ${name} from faculty directory?`)) {
      setStaffList(staffList.filter((s) => s.id !== id));
      showToast(`Staff member "${name}" removed from demo roster.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a staff name");
      return;
    }

    if (editingId) {
      setStaffList(
        staffList.map((s) =>
          s.id === editingId
            ? { ...s, ...formData }
            : s
        )
      );
      showToast(`Updated staff details for "${formData.name}".`);
    } else {
      const newStaff: StaffMember = {
        id: `staff-${String(staffList.length + 1).padStart(3, "0")}`,
        ...formData,
        isDemo: true,
      };
      setStaffList([...staffList, newStaff]);
      showToast(`Staff member "${formData.name}" added.`);
    }

    setIsModalOpen(false);
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
            Teachers & Staff Directory
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Manage faculty profiles, administrative designations, and subject allocations.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ fontSize: "0.85rem" }}>
          + Add Staff Member
        </button>
      </div>

      {/* Accuracy Compliance Box */}
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
        ⚠️ <strong>Verification Notice:</strong> Principal name &quot;Wahida Begum&quot; is derived from a recruitment notice and marked for confirmation. General teacher profiles are designated placeholders until verified employment rosters are supplied by the school administration.
      </div>

      {/* Staff Table */}
      <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name & Designation</th>
              <th>Teaching Domain</th>
              <th>Assigned Section</th>
              <th>Verification Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((st) => {
              const isPrincipal = st.designation.toLowerCase().includes("principal");
              return (
                <tr
                  key={st.id}
                  style={{
                    background: isPrincipal ? "#fefce8" : "inherit",
                  }}
                >
                  <td style={{ width: "48px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: isPrincipal ? "var(--gold)" : "#e2e8f0",
                        color: isPrincipal ? "var(--navy)" : "#475569",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {isPrincipal ? "★" : "👩‍🏫"}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>
                      {st.name} {isPrincipal ? "⭐" : ""}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: isPrincipal ? "#854d0e" : "#64748b", fontWeight: 600 }}>
                      {st.designation}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.85rem", color: "#334155" }}>
                      {st.subject || "Administrative Leadership"}
                    </span>
                  </td>
                  <td>
                    {st.section ? (
                      <span style={{ background: "#f1f5f9", padding: "0.2rem 0.55rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 600 }}>
                        {st.section}
                      </span>
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>General Administration</span>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: isPrincipal ? "#854d0e" : "#64748b",
                        fontStyle: "italic",
                      }}
                    >
                      {st.note}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => handleOpenEdit(st)}
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
                        Edit
                      </button>
                      {!isPrincipal && (
                        <button
                          onClick={() => handleDelete(st.id, st.name)}
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
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setIsModalOpen(false)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "460px", padding: "1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: "0 0 1.25rem" }}>
              {editingId ? "Edit Staff Profile" : "Register Faculty Member"}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pranab Borah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Designation</label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="form-input"
                >
                  <option value="Upper Primary Teacher">Upper Primary Teacher</option>
                  <option value="Lower Primary Teacher">Lower Primary Teacher</option>
                  <option value="Assistant Teacher">Assistant Teacher</option>
                  <option value="Office Assistant">Office Assistant</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Teaching Domain</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="form-input"
                  >
                    <option value="Lower Primary">Lower Primary</option>
                    <option value="Upper Primary">Upper Primary</option>
                    <option value="Whole School">Whole School</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Verification Annotation</label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

