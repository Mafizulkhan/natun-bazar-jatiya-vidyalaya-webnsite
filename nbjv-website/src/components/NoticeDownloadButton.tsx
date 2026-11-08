"use client";

export default function NoticeDownloadButton() {
  return (
    <button
      type="button"
      onClick={() => {
        alert(
          "[DEMO ATTACHMENT]\nIn production, this would securely download the official PDF signed by the Principal/Headmaster."
        );
      }}
      className="btn-primary"
      style={{ fontSize: "0.85rem", padding: "0.5rem 1.1rem", border: "none", cursor: "pointer" }}
    >
      ⬇ Download PDF (Demo)
    </button>
  );
}

