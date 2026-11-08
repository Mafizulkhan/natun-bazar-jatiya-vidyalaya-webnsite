"use client";

import { useState, useEffect, useRef } from "react";
import { GALLERY_IMAGES, GalleryImage } from "@/lib/data";

interface StagedImage {
  id: string;
  file?: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
  category: GalleryImage["category"];
  caption: string;
}

const CATEGORIES: GalleryImage["category"][] = [
  "Campus",
  "Classroom",
  "Activities",
  "Events",
  "Celebrations",
];

const STORAGE_KEY = "nbjv_admin_gallery_images";

export default function AdminGalleryMgmtPage() {
  const [images, setImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [stagedImages, setStagedImages] = useState<StagedImage[]>([]);
  const [batchCategory, setBatchCategory] = useState<GalleryImage["category"]>("Campus");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"file" | "url">("file");
  const [modalFile, setModalFile] = useState<File | null>(null);
  const [modalFilePreview, setModalFilePreview] = useState<string | null>(null);
  const [modalFileDetails, setModalFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [modalIsDragging, setModalIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=75",
    caption: "Morning campus assembly",
    category: "Campus" as GalleryImage["category"],
    alt: "School photo",
  });

  // Lightbox preview
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Load latest photos from server (with localStorage fallback)
  const fetchGalleryData = async () => {
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
          } catch {}
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch /api/gallery, falling back to localStorage", err);
    }

    // Fallback: check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setImages(parsed);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Helper: Format bytes
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Helper: Generate clean caption
  const filenameToCaption = (filename: string): string => {
    const withoutExt = filename.replace(/\.[^/.]+$/, "");
    const clean = withoutExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
    if (!clean) return "School Photograph";
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  };

  // Process files dropped or picked
  const processFiles = (files: FileList | File[]) => {
    const fileList = Array.from(files);
    const validImageFiles = fileList.filter((f) => f.type.startsWith("image/"));

    if (validImageFiles.length === 0) {
      showToast("Please drop or select valid image files (JPG, PNG, WEBP, GIF)", "error");
      return;
    }

    const newStaged: StagedImage[] = [];
    let processed = 0;

    validImageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          newStaged.push({
            id: `staged-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            file,
            previewUrl: result,
            name: file.name,
            sizeFormatted: formatFileSize(file.size),
            category: "Campus",
            caption: filenameToCaption(file.name),
          });
        }
        processed++;
        if (processed === validImageFiles.length) {
          setStagedImages((prev) => [...prev, ...newStaged]);
          showToast(`📥 ${newStaged.length} photo(s) ready in upload queue! Review & confirm below.`);
        }
      };
      reader.onerror = () => {
        processed++;
        if (processed === validImageFiles.length && newStaged.length > 0) {
          setStagedImages((prev) => [...prev, ...newStaged]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Main Dropzone Drag Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Modal Drag Handlers
  const handleModalDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalIsDragging(true);
  };

  const handleModalDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalIsDragging(true);
  };

  const handleModalDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setModalIsDragging(false);
  };

  const handleModalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModalIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        setModalFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          if (res) {
            setModalFilePreview(res);
            setModalFileDetails({ name: file.name, size: formatFileSize(file.size) });
            setFormData((prev) => ({ ...prev, caption: filenameToCaption(file.name) }));
          }
        };
        reader.readAsDataURL(file);
      } else {
        showToast("Please drop an image file (JPG, PNG, WEBP)", "error");
      }
    }
  };

  const handleModalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setModalFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          if (res) {
            setModalFilePreview(res);
            setModalFileDetails({ name: file.name, size: formatFileSize(file.size) });
            setFormData((prev) => ({ ...prev, caption: filenameToCaption(file.name) }));
          }
        };
        reader.readAsDataURL(file);
      }
      e.target.value = "";
    }
  };

  // Confirm and upload all staged photos to the server
  const handleConfirmUploadAll = async () => {
    if (stagedImages.length === 0) return;
    setIsUploading(true);

    try {
      const formDataUpload = new FormData();
      stagedImages.forEach((item) => {
        if (item.file) {
          formDataUpload.append("file", item.file);
          formDataUpload.append("caption", item.caption);
          formDataUpload.append("category", item.category);
        }
      });

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.images) {
          setImages(data.images);
          setStagedImages([]);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
          } catch {}
          showToast(`✅ Successfully uploaded ${data.newItems?.length || stagedImages.length} photo(s) to the school website!`);
          setIsUploading(false);
          return;
        }
      }
      throw new Error("Server upload returned unsuccessful response");
    } catch (err: any) {
      console.warn("Server upload failed, applying local fallback:", err);
      // Fallback: save to state
      const fallbackItems: GalleryImage[] = stagedImages.map((s, idx) => ({
        id: `local-g${Date.now()}-${idx}`,
        src: s.previewUrl,
        fallbackSrc: s.previewUrl,
        alt: s.caption,
        category: s.category,
        caption: s.caption,
      }));
      const updated = [...fallbackItems, ...images];
      setImages(updated);
      setStagedImages([]);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      showToast(`⚠️ Photo saved locally in browser.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Apply batch category to all staged items
  const handleApplyBatchCategory = (category: GalleryImage["category"]) => {
    setBatchCategory(category);
    setStagedImages((prev) => prev.map((item) => ({ ...item, category })));
    showToast(`Applied "${category}" category to all queued photos.`);
  };

  // Remove single staged image
  const handleRemoveStaged = (id: string) => {
    setStagedImages((prev) => prev.filter((item) => item.id !== id));
  };

  // Update caption
  const handleUpdateStagedCaption = (id: string, caption: string) => {
    setStagedImages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, caption } : item))
    );
  };

  // Update category
  const handleUpdateStagedCategory = (id: string, category: GalleryImage["category"]) => {
    setStagedImages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, category } : item))
    );
  };

  // Delete an existing photo (sync with server)
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this photo from the school website?")) {
      try {
        const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.images) {
            setImages(data.images);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
            } catch {}
            if (lightboxImage?.id === id) setLightboxImage(null);
            showToast("Photo removed from website.");
            return;
          }
        }
      } catch (err) {
        console.warn("Delete request failed on server, deleting locally", err);
      }

      // Local deletion fallback
      const updated = images.filter((img) => img.id !== id);
      setImages(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      if (lightboxImage?.id === id) setLightboxImage(null);
      showToast("Photo removed from gallery view.");
    }
  };

  // Reset to initial demo photos
  const handleResetToDefaults = async () => {
    if (confirm("Reset gallery back to default initial photos? Custom uploaded photos will be cleared.")) {
      try {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "reset" }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.images) {
            setImages(data.images);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
            } catch {}
            showToast("Gallery reset to default photos.");
            return;
          }
        }
      } catch (err) {}

      setImages(GALLERY_IMAGES);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      showToast("Gallery reset to default photos.");
    }
  };

  // Submit modal single photo
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      if (modalTab === "file") {
        if (!modalFile && !modalFilePreview) {
          showToast("Please drag & drop or select an image file first.", "error");
          setIsUploading(false);
          return;
        }

        if (modalFile) {
          const fd = new FormData();
          fd.append("file", modalFile);
          fd.append("caption", formData.caption);
          fd.append("category", formData.category);

          const res = await fetch("/api/gallery/upload", {
            method: "POST",
            body: fd,
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.images) {
              setImages(data.images);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
              } catch {}
              setIsModalOpen(false);
              setModalFile(null);
              setModalFilePreview(null);
              showToast("Photo uploaded and updated on website!");
              setIsUploading(false);
              return;
            }
          }
        }
      } else {
        // URL Mode
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            src: formData.src,
            caption: formData.caption,
            category: formData.category,
            alt: formData.alt,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.images) {
            setImages(data.images);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(data.images));
            } catch {}
            setIsModalOpen(false);
            showToast("Photo URL added and updated on website!");
            setIsUploading(false);
            return;
          }
        }
      }
    } catch (err) {
      console.warn("Modal upload server error, falling back locally", err);
    }

    // Fallback single item
    const newItem: GalleryImage = {
      id: `custom-g${Date.now()}`,
      src: modalFilePreview || formData.src,
      fallbackSrc: modalFilePreview || formData.src,
      alt: formData.caption,
      category: formData.category,
      caption: formData.caption,
    };
    const updated = [newItem, ...images];
    setImages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setIsModalOpen(false);
    setIsUploading(false);
    showToast("Photo updated on website!");
  };

  // Filter images
  const filtered = images.filter((img) => {
    const matchesCategory = selectedCategory === "All" || img.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      img.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background:
              toast.type === "error"
                ? "#b91c1c"
                : toast.type === "info"
                ? "#1d4ed8"
                : "#065f46",
            color: "white",
            padding: "0.85rem 1.4rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "0.9rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "1.75rem" }}>🖼️</span>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Gallery & Media Management
            </h1>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
            Upload, curate, and tag school campus photographs. Changes appear live on the public website.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={handleResetToDefaults}
            title="Reset gallery to default demo images"
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "0.4rem",
              border: "1px solid #cbd5e1",
              background: "white",
              color: "#64748b",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🔄 Reset Demo Photos
          </button>

          <button
            onClick={() => {
              setModalTab("file");
              setModalFile(null);
              setModalFilePreview(null);
              setModalFileDetails(null);
              setIsModalOpen(true);
            }}
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1.1rem",
              fontSize: "0.875rem",
              fontWeight: 700,
            }}
          >
            <span>+</span>
            <span>Add Single Photo</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input for Main Drag & Drop Zone */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files) processFiles(e.target.files);
          e.target.value = "";
        }}
        multiple
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* ── DRAG & DROP UPLOAD ZONE ── */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          background: isDragging ? "#eff6ff" : "white",
          border: isDragging ? "2px dashed #2563eb" : "2px dashed #93c5fd",
          borderRadius: "1rem",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          boxShadow: isDragging
            ? "0 8px 30px rgba(37, 99, 235, 0.15)"
            : "0 2px 8px rgba(0,0,0,0.03)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isDragging && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(37, 99, 235, 0.05)",
              pointerEvents: "none",
            }}
          />
        )}

        <div
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 1rem",
            borderRadius: "50%",
            background: isDragging ? "#dbeafe" : "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            transition: "transform 0.2s ease",
            transform: isDragging ? "scale(1.15)" : "scale(1)",
          }}
        >
          {isDragging ? "📥" : "📸"}
        </div>

        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: isDragging ? "#1d4ed8" : "#0f172a",
            marginBottom: "0.35rem",
          }}
        >
          {isDragging
            ? "Release to Drop Photo(s) Here!"
            : "Drag & Drop School Photos Here"}
        </h3>

        <p
          style={{
            color: "#64748b",
            fontSize: "0.9rem",
            maxWidth: "520px",
            margin: "0 auto 1rem",
          }}
        >
          {isDragging
            ? "Drop multiple images simultaneously to upload directly to the school website."
            : "Drag photos directly from your computer, or click anywhere inside to browse files."}
        </p>

        <div style={{ display: "inline-flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <span
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#475569",
              padding: "0.25rem 0.65rem",
              borderRadius: "2rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            ✓ JPG, PNG, WEBP, GIF
          </span>
          <span
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              color: "#475569",
              padding: "0.25rem 0.65rem",
              borderRadius: "2rem",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            ✓ Batch Multi-Photo Support
          </span>
          <span
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              padding: "0.25rem 0.65rem",
              borderRadius: "2rem",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            ⚡ Live Server &amp; Website Sync
          </span>
        </div>
      </div>

      {/* ── STAGED / REVIEW UPLOAD QUEUE TRAY ── */}
      {stagedImages.length > 0 && (
        <div
          style={{
            background: "#ffffff",
            border: "2px solid #3b82f6",
            borderRadius: "0.875rem",
            padding: "1.25rem",
            marginBottom: "1.75rem",
            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.12)",
          }}
        >
          {/* Queue Header & Batch Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem" }}>📋</span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                  Ready to Upload ({stagedImages.length} photo{stagedImages.length > 1 ? "s" : ""})
                </h3>
              </div>
              <p style={{ color: "#64748b", fontSize: "0.8rem", margin: "0.2rem 0 0" }}>
                Review captions and categories before uploading to the live website.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Set all category:</span>
                <select
                  value={batchCategory}
                  onChange={(e) =>
                    handleApplyBatchCategory(e.target.value as GalleryImage["category"])
                  }
                  style={{
                    padding: "0.35rem 0.6rem",
                    borderRadius: "0.35rem",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background: "#f8fafc",
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setStagedImages([])}
                disabled={isUploading}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "0.4rem",
                  border: "1px solid #cbd5e1",
                  background: "white",
                  color: "#64748b",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: isUploading ? "not-allowed" : "pointer",
                }}
              >
                Clear Queue
              </button>

              <button
                onClick={handleConfirmUploadAll}
                disabled={isUploading}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "0.4rem",
                  border: "none",
                  background: isUploading ? "#94a3b8" : "#16a34a",
                  color: "white",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: isUploading ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 2px 6px rgba(22, 163, 74, 0.3)",
                }}
              >
                <span>{isUploading ? "⏳" : "✓"}</span>
                <span>{isUploading ? "Uploading to Server..." : `Confirm & Upload All (${stagedImages.length})`}</span>
              </button>
            </div>
          </div>

          {/* Staged Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
              maxHeight: "440px",
              overflowY: "auto",
              paddingRight: "0.3rem",
            }}
          >
            {stagedImages.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#f8fafc",
                  borderRadius: "0.6rem",
                  border: "1px solid #e2e8f0",
                  padding: "0.75rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "0.4rem",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#e2e8f0",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Staged Form Fields */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.35rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "140px",
                      }}
                      title={item.name}
                    >
                      {item.name}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                      {item.sizeFormatted}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={item.caption}
                    onChange={(e) => handleUpdateStagedCaption(item.id, e.target.value)}
                    placeholder="Enter photo caption..."
                    style={{
                      width: "100%",
                      padding: "0.3rem 0.5rem",
                      fontSize: "0.8rem",
                      borderRadius: "0.3rem",
                      border: "1px solid #cbd5e1",
                      marginBottom: "0.4rem",
                      background: "white",
                    }}
                  />

                  <select
                    value={item.category}
                    onChange={(e) =>
                      handleUpdateStagedCategory(
                        item.id,
                        e.target.value as GalleryImage["category"]
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "0.25rem 0.4rem",
                      fontSize: "0.75rem",
                      borderRadius: "0.3rem",
                      border: "1px solid #cbd5e1",
                      background: "white",
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => handleRemoveStaged(item.id)}
                  title="Remove from queue"
                  style={{
                    position: "absolute",
                    top: "0.4rem",
                    right: "0.4rem",
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "none",
                    color: "#dc2626",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FILTER & SEARCH TOOLBAR ── */}
      <div
        style={{
          background: "white",
          borderRadius: "0.75rem",
          padding: "1rem 1.25rem",
          border: "1px solid #e2e8f0",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
          {["All", ...CATEGORIES].map((cat) => {
            const count =
              cat === "All" ? images.length : images.filter((img) => img.category === cat).length;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.35rem 0.8rem",
                  borderRadius: "2rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  border: isActive ? "1px solid #0f172a" : "1px solid #cbd5e1",
                  background: isActive ? "#0f172a" : "white",
                  color: isActive ? "white" : "#475569",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  transition: "all 0.15s ease",
                }}
              >
                <span>{cat}</span>
                <span
                  style={{
                    background: isActive ? "rgba(255,255,255,0.2)" : "#f1f5f9",
                    color: isActive ? "white" : "#64748b",
                    fontSize: "0.7rem",
                    padding: "0.05rem 0.4rem",
                    borderRadius: "1rem",
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div style={{ position: "relative", minWidth: "240px", flex: "1 1 240px", maxWidth: "340px" }}>
          <span
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "0.85rem",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search photos by caption or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.45rem 0.75rem 0.45rem 2.2rem",
              borderRadius: "0.4rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.825rem",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "0.6rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "0.75rem",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── IMAGES GALLERY GRID ── */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((img) => (
            <div
              key={img.id}
              style={{
                background: "white",
                borderRadius: "0.75rem",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {/* Image Thumbnail */}
              <div
                onClick={() => setLightboxImage(img)}
                title="Click to view full photo"
                style={{
                  position: "relative",
                  height: "180px",
                  background: "#f1f5f9",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt || img.caption}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    if (img.fallbackSrc && e.currentTarget.src !== img.fallbackSrc) {
                      e.currentTarget.src = img.fallbackSrc;
                    }
                  }}
                  loading="lazy"
                />

                <span
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    left: "0.5rem",
                    background: "rgba(15, 32, 68, 0.85)",
                    backdropFilter: "blur(4px)",
                    color: "white",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "0.3rem",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  }}
                >
                  {img.category}
                </span>

                <div
                  style={{
                    position: "absolute",
                    bottom: "0.5rem",
                    right: "0.5rem",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    padding: "0.2rem 0.45rem",
                    borderRadius: "0.3rem",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                  }}
                >
                  🔍 View
                </div>
              </div>

              {/* Meta */}
              <div
                style={{
                  padding: "0.85rem 1rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#1e293b",
                      margin: 0,
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    {img.caption}
                  </p>
                  <span style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "0.25rem", display: "inline-block" }}>
                    ID: {img.id}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: "0.75rem",
                    paddingTop: "0.6rem",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setLightboxImage(img)}
                    style={{
                      background: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      color: "#1d4ed8",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "0.3rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => handleDelete(img.id)}
                    style={{
                      background: "#fee2e2",
                      border: "1px solid #fecaca",
                      color: "#b91c1c",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "0.3rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Delete Photo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "white",
            borderRadius: "0.75rem",
            padding: "3.5rem 1.5rem",
            textAlign: "center",
            border: "1px solid #e2e8f0",
            color: "#64748b",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🖼️</div>
          <h4 style={{ fontSize: "1.1rem", color: "#0f172a", marginBottom: "0.25rem" }}>
            No photographs match your filters
          </h4>
          <p style={{ fontSize: "0.85rem", maxWidth: "420px", margin: "0 auto 1.25rem" }}>
            Drag and drop new photos into the upload box above, or click below to clear active filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "0.4rem",
              background: "#0f172a",
              color: "white",
              border: "none",
              fontSize: "0.825rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── LIGHTBOX MODAL ── */}
      {lightboxImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(9, 21, 48, 0.85)", backdropFilter: "blur(6px)" }}
            onClick={() => setLightboxImage(null)}
          />

          <div
            style={{
              position: "relative",
              background: "white",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              zIndex: 1,
            }}
          >
            <div
              style={{
                padding: "1rem 1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <div>
                <span
                  style={{
                    background: "#0f2044",
                    color: "white",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    marginRight: "0.5rem",
                  }}
                >
                  {lightboxImage.category}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>ID: {lightboxImage.id}</span>
              </div>

              <button
                onClick={() => setLightboxImage(null)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#475569",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: "#0b1329", display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "480px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                style={{
                  maxWidth: "100%",
                  maxHeight: "480px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                padding: "1rem 1.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.75rem",
                background: "#f8fafc",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.95rem" }}>
                {lightboxImage.caption}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => handleDelete(lightboxImage.id)}
                  style={{
                    background: "#fee2e2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Delete Photo
                </button>
                <button
                  onClick={() => setLightboxImage(null)}
                  style={{
                    background: "#0f172a",
                    border: "none",
                    color: "white",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD SINGLE PHOTO MODAL ── */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
            onClick={() => setIsModalOpen(false)}
          />

          <div
            style={{
              position: "relative",
              background: "white",
              borderRadius: "0.875rem",
              width: "100%",
              maxWidth: "520px",
              padding: "1.75rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.25rem", color: "#0f172a", margin: 0, fontWeight: 700 }}>
                Add Photo to School Gallery
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#94a3b8",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                borderRadius: "0.5rem",
                padding: "0.25rem",
                marginBottom: "1.25rem",
              }}
            >
              <button
                type="button"
                onClick={() => setModalTab("file")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.4rem",
                  border: "none",
                  background: modalTab === "file" ? "white" : "transparent",
                  color: modalTab === "file" ? "#0f172a" : "#64748b",
                  fontWeight: modalTab === "file" ? 700 : 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: modalTab === "file" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                📁 Upload File (Drag & Drop)
              </button>
              <button
                type="button"
                onClick={() => setModalTab("url")}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "0.4rem",
                  border: "none",
                  background: modalTab === "url" ? "white" : "transparent",
                  color: modalTab === "url" ? "#0f172a" : "#64748b",
                  fontWeight: modalTab === "url" ? 700 : 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: modalTab === "url" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                🌐 Web Image URL
              </button>
            </div>

            <form onSubmit={handleModalSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {modalTab === "file" && (
                <div>
                  <input
                    type="file"
                    ref={modalFileInputRef}
                    onChange={handleModalFileSelect}
                    accept="image/*"
                    style={{ display: "none" }}
                  />

                  {modalFilePreview ? (
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        border: "1px solid #cbd5e1",
                        background: "#f8fafc",
                        padding: "0.5rem",
                        textAlign: "center",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={modalFilePreview}
                        alt="Preview"
                        style={{
                          maxHeight: "180px",
                          width: "auto",
                          margin: "0 auto",
                          borderRadius: "0.35rem",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#64748b",
                          marginTop: "0.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          {modalFileDetails?.name} ({modalFileDetails?.size})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setModalFile(null);
                            setModalFilePreview(null);
                            setModalFileDetails(null);
                          }}
                          style={{
                            background: "#fee2e2",
                            border: "none",
                            color: "#b91c1c",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "0.25rem",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleModalDragOver}
                      onDragEnter={handleModalDragEnter}
                      onDragLeave={handleModalDragLeave}
                      onDrop={handleModalDrop}
                      onClick={() => modalFileInputRef.current?.click()}
                      style={{
                        border: modalIsDragging ? "2px dashed #2563eb" : "2px dashed #cbd5e1",
                        background: modalIsDragging ? "#eff6ff" : "#f8fafc",
                        borderRadius: "0.5rem",
                        padding: "1.75rem 1rem",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: "0.35rem" }}>
                        {modalIsDragging ? "📥" : "🖼️"}
                      </div>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.9rem" }}>
                        {modalIsDragging ? "Drop photo here!" : "Drag & Drop photo here, or browse"}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.25rem" }}>
                        Supports JPG, PNG, WEBP (Max 10MB)
                      </div>
                    </div>
                  )}
                </div>
              )}

              {modalTab === "url" && (
                <div>
                  <label className="form-label">Image Web URL (HTTPS) *</label>
                  <input
                    type="url"
                    required
                    value={formData.src}
                    onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                    className="form-input"
                    placeholder="https://..."
                  />
                  {formData.src && (
                    <div
                      style={{
                        marginTop: "0.5rem",
                        maxHeight: "120px",
                        overflow: "hidden",
                        borderRadius: "0.4rem",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.src}
                        alt="URL Preview"
                        style={{ width: "100%", height: "120px", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="form-label">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as GalleryImage["category"] })
                  }
                  className="form-input"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Caption Label *</label>
                <input
                  type="text"
                  required
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Annual Day Dance Performance"
                />
              </div>

              <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline"
                  style={{ fontSize: "0.85rem", padding: "0.45rem 1rem" }}
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: "0.85rem", padding: "0.45rem 1.25rem", fontWeight: 700 }}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
