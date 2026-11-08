"use client";

import { useState } from "react";
import { DEMO_CONTACT_MESSAGES } from "@/lib/data";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(DEMO_CONTACT_MESSAGES);
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelectMessage = (msg: ContactMessage) => {
    setActiveMessage(msg);
    if (!msg.read) {
      setMessages(
        messages.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("[DEMO] Delete this inquiry message?")) {
      setMessages(messages.filter((m) => m.id !== id));
      if (activeMessage?.id === id) setActiveMessage(null);
      showToast("Message deleted.");
    }
  };

  const handleReply = (email: string) => {
    showToast(`[Demo] Opening email draft to ${email}. In production, this integrates with your official mailbox.`);
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read;
    if (filter === "read") return m.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

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
            Website Contact Inquiries
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Review feedback, general questions, and prospective parent queries submitted via the contact form.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "0.35rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: filter === "all" ? "1px solid #0f172a" : "1px solid #cbd5e1",
              background: filter === "all" ? "#0f172a" : "white",
              color: filter === "all" ? "white" : "#475569",
              cursor: "pointer",
            }}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "0.35rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: filter === "unread" ? "1px solid #0f172a" : "1px solid #cbd5e1",
              background: filter === "unread" ? "#0f172a" : "white",
              color: filter === "unread" ? "white" : "#475569",
              cursor: "pointer",
            }}
          >
            Unread ({unreadCount})
          </button>
        </div>
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
        ⚠️ <strong>Message Hub:</strong> Submissions sent from the public website contact form flow directly into this administrative inbox for school office response.
      </div>

      {/* Split Inbox Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {/* Messages List Column */}
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "0.85rem 1.25rem", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
            Inbox Messages
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.length > 0 ? (
              filtered.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  style={{
                    padding: "1rem 1.25rem",
                    borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                    background: activeMessage?.id === msg.id ? "#eff6ff" : msg.read ? "white" : "#f0fdf4",
                    borderLeft: activeMessage?.id === msg.id ? "3px solid #1e4fc2" : !msg.read ? "3px solid #16a34a" : "3px solid transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: msg.read ? 600 : 800, color: "#0f172a", fontSize: "0.875rem" }}>
                      {msg.name} {!msg.read && <span style={{ color: "#16a34a", fontSize: "0.75rem" }}>●</span>}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{msg.date}</span>
                  </div>
                  <div style={{ fontSize: "0.825rem", color: "#1e4fc2", fontWeight: 600, marginBottom: "0.25rem" }}>
                    {msg.subject}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {msg.message}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ padding: "3rem 1rem", textAlign: "center", color: "#64748b", fontSize: "0.875rem" }}>
                No messages found.
              </div>
            )}
          </div>
        </div>

        {/* Message Detail Panel Column */}
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {activeMessage ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: "0 0 0.35rem" }}>
                    {activeMessage.subject}
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "#475569" }}>
                    From: <strong>{activeMessage.name}</strong> &lt;{activeMessage.email}&gt;
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.2rem" }}>
                    Timestamp: {activeMessage.date} • Ref ID: {activeMessage.id}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(activeMessage.id)}
                  style={{
                    background: "#fee2e2",
                    border: "none",
                    color: "#b91c1c",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#1e293b", background: "#f8fafc", padding: "1.25rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", whiteSpace: "pre-line", marginBottom: "1.5rem" }}>
                {activeMessage.message}
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => handleReply(activeMessage.email)}
                  className="btn-primary"
                  style={{ fontSize: "0.85rem" }}
                >
                  ✉️ Compose Reply
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 1rem", color: "#94a3b8" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📬</div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "#64748b" }}>Select an inquiry to read</div>
              <div style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
                Click any message on the left panel to inspect its full text.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

