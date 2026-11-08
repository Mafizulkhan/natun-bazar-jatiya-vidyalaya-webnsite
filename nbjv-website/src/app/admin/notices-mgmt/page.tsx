"use client";

import { useState } from "react";
import { DEMO_NOTICES, Notice, NoticeCategory } from "@/lib/data";

export default function AdminNoticesMgmtPage() {
  const [notices, setNotices] = useState<Notice[]>(DEMO_NOTICES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    category: "General" as NoticeCategory,
    excerpt: "",
    content: "",
    isImportant: false,
    hasAttachment: false,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "General",
      excerpt: "",
      content: "",
      isImportant: false,
      hasAttachment: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: Notice) => {
    setEditingId(n.id);
    setFormData({
      title: n.title,
      date: n.date,
      category: n.category,
      excerpt: n.excerpt,
      content: n.content,
      isImportant: n.isImportant,
      hasAttachment: n.hasAttachment,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`[DEMO] Remove notice "${title}"?`)) {
      setNotices(notices.filter((n) => n.id !== id));
      showToast(`Notice "${title}" deleted.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter notice title");
      return;
    }

    if (editingId) {
      setNotices(
        notices.map((n) =>
          n.id === editingId
            ? { ...n, ...formData }
            : n
        )
      );
      showToast(`Notice "${formData.title}" updated.`);
    } else {
      const newNotice: Notice = {
        id: `notice-${String(notices.length + 1).padStart(3, "0")}`,
        ...formData,
      };
      setNotices([newNotice, ...notices]);
      showToast(`Notice "${formData.title}" published (Demo).`);
    }

    setIsModalOpen(false);
  };

  const filtered = notices.filter((n) => {
    const matchesCat = categoryFilter === "All" || n.category === categoryFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
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
            Notice Board Management
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Publish circulars, holiday announcements, exam alerts, and recruitment notices to the public portal.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary" style={{ fontSize: "0.85rem" }}>
          + Draft New Notice
        </button>
      </div>

      {/* Demo Box */}
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
        ⚠️ <strong>Notice Publishing Workflow:</strong> In this demo, publishing or editing a notice updates the live client memory. In full production, this syncs to a database and can trigger automated parent notification channels.
      </div>

      {/* Filter bar */}
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
        <div style={{ flex: 1, minWidth: "220px" }}>
          <input
            type="text"
            placeholder="Search circulars by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ fontSize: "0.85rem" }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["All", "General", "Academic", "Admission", "Important", "Event"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "0.35rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                border: categoryFilter === cat ? "1px solid #0f172a" : "1px solid #cbd5e1",
                background: categoryFilter === cat ? "#0f172a" : "white",
                color: categoryFilter === cat ? "white" : "#475569",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Table */}
      <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Notice Ref</th>
              <th>Title & Excerpt</th>
              <th>Category</th>
              <th>Date Issued</th>
              <th>Attachment</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((n) => (
                <tr key={n.id}>
                  <td style={{ fontWeight: 600, color: "var(--blue)", fontSize: "0.8rem" }}>{n.id}</td>
                  <td style={{ maxWidth: "340px" }}>
                    <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem" }}>{n.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {n.excerpt}
                    </div>
                  </td>
                  <td>
                    <span style={{ background: "#f1f5f9", padding: "0.2rem 0.55rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 600 }}>
                      {n.category}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "#475569" }}>{n.date}</td>
                  <td>{n.hasAttachment ? "📎 Yes" : "—"}</td>
                  <td>
                    {n.isImportant ? (
                      <span style={{ background: "#fee2e2", color: "#991b1b", padding: "0.15rem 0.5rem", borderRadius: "0.3rem", fontSize: "0.72rem", fontWeight: 700 }}>
                        High
                      </span>
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: "0.75rem" }}>Normal</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        onClick={() => handleOpenEdit(n)}
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
                      <button
                        onClick={() => handleDelete(n.id, n.title)}
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  No notices matched current filter.
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
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "560px", padding: "1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: "0 0 1.25rem" }}>
              {editingId ? "Edit Notice" : "Draft New Public Notice"}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Winter Break"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as NoticeCategory })}
                    className="form-input"
                  >
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Admission">Admission</option>
                    <option value="Important">Important</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Publication Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Short Summary (Excerpt) *</label>
                <input
                  type="text"
                  required
                  placeholder="Brief 1-sentence synopsis for the overview list"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Full Circular Text *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed notice content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.isImportant}
                    onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                  />
                  <strong>Highlight as High Priority (Banner Alert)</strong>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.hasAttachment}
                    onChange={(e) => setFormData({ ...formData, hasAttachment: e.target.checked })}
                  />
                  <span>Attach PDF Download Link</span>
                </label>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">
                  {editingId ? "Save Changes" : "Publish to Portal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

