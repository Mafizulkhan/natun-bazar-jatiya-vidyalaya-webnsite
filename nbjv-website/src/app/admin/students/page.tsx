"use client";

import { useState } from "react";
import { DEMO_STUDENTS, SCHOOL } from "@/lib/data";

interface Student {
  id: string;
  name: string;
  photo?: string;
  class: string;
  section: string;
  rollNo: string;
  dob?: string;
  attendance?: string;
  graceMark?: string | number;
  bloodGroup?: string;
  guardian?: string;
  phone?: string;
  status: string;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>(DEMO_STUDENTS as Student[]);
  const [activeTab, setActiveTab] = useState<"list" | "idcard">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  // Inspection Modal state
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // ID Card Generator state
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student>(
    (DEMO_STUDENTS[0] as Student) || null
  );
  const [cardSide, setCardSide] = useState<"front" | "back">("front");
  const [academicSession, setAcademicSession] = useState("2027–2028");

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Student, "id">>({
    name: "",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80",
    class: "Class I",
    section: "A",
    rollNo: "",
    dob: "2018-05-10",
    attendance: "95%",
    graceMark: "0",
    bloodGroup: "B+",
    guardian: "",
    phone: "",
    status: "Active",
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80",
      class: "Class I",
      section: "A",
      rollNo: String(students.length + 1).padStart(2, "0"),
      dob: "2018-05-10",
      attendance: "95%",
      graceMark: "0",
      bloodGroup: "B+",
      guardian: "",
      phone: "",
      status: "Active",
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (stu: Student) => {
    setEditingId(stu.id);
    setFormData({
      name: stu.name,
      photo: stu.photo || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80",
      class: stu.class,
      section: stu.section,
      rollNo: stu.rollNo,
      dob: stu.dob || "2016-04-12",
      attendance: stu.attendance || "90%",
      graceMark: stu.graceMark ?? "0",
      bloodGroup: stu.bloodGroup || "O+",
      guardian: stu.guardian || "",
      phone: stu.phone || "",
      status: stu.status,
    });
    setIsFormOpen(true);
  };

  const handleGenerateCard = (stu: Student) => {
    setSelectedStudentForCard(stu);
    setActiveTab("idcard");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`[DEMO] Are you sure you want to remove ${name} from student records?`)) {
      setStudents(students.filter((s) => s.id !== id));
      if (viewingStudent?.id === id) setViewingStudent(null);
      showNotification(`Student "${name}" deleted from records.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a student name");
      return;
    }

    if (editingId) {
      // Edit
      const updatedList = students.map((s) =>
        s.id === editingId ? { ...s, ...formData } : s
      );
      setStudents(updatedList);
      if (selectedStudentForCard?.id === editingId) {
        setSelectedStudentForCard({ id: editingId, ...formData });
      }
      if (viewingStudent?.id === editingId) {
        setViewingStudent({ id: editingId, ...formData });
      }
      showNotification(`Student "${formData.name}" successfully updated.`);
    } else {
      // Create
      const newStudent: Student = {
        id: `STU${String(students.length + 1).padStart(3, "0")}`,
        ...formData,
      };
      setStudents([newStudent, ...students]);
      showNotification(`New student "${formData.name}" enrolled.`);
    }

    setIsFormOpen(false);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.includes(searchQuery) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.guardian && s.guardian.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesClass = selectedClass === "All" || s.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div>
      {/* Toast Notification */}
      {notification && (
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
          ✅ {notification}
        </div>
      )}

      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Student Management &amp; ID Card Portal
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Maintain enrollment records, inspect full student profiles with photos, and generate printable student ID cards.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={handleOpenAdd} className="btn-primary" style={{ fontSize: "0.875rem" }}>
            + Enroll New Student
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          borderBottom: "2px solid #e2e8f0",
          marginBottom: "1.5rem",
        }}
      >
        <button
          onClick={() => setActiveTab("list")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "list" ? "3px solid var(--blue)" : "3px solid transparent",
            color: activeTab === "list" ? "var(--blue)" : "#64748b",
            fontWeight: 700,
            fontSize: "0.92rem",
            padding: "0.6rem 1.25rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "-2px",
          }}
        >
          <span>📋</span> Student Register ({students.length})
        </button>

        <button
          onClick={() => setActiveTab("idcard")}
          style={{
            background: "none",
            border: "none",
            borderBottom: activeTab === "idcard" ? "3px solid var(--gold)" : "3px solid transparent",
            color: activeTab === "idcard" ? "#b45309" : "#64748b",
            fontWeight: 700,
            fontSize: "0.92rem",
            padding: "0.6rem 1.25rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "-2px",
          }}
        >
          <span>🪪</span> Student ID Card Generator
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: STUDENT INFORMATION REGISTER (CLEAN TABLE)                         */}
      {/* ========================================================================= */}
      {activeTab === "list" && (
        <>
          {/* Search and Filters */}
          <div
            style={{
              background: "white",
              padding: "1.1rem 1.25rem",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
              <input
                type="text"
                placeholder="Search by student name or student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ fontSize: "0.875rem", paddingLeft: "2.25rem" }}
              />
              <span style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
                🔍
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.825rem", color: "#64748b", fontWeight: 600 }}>Filter Class:</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="form-input"
                style={{ fontSize: "0.875rem", padding: "0.5rem 0.75rem", width: "auto" }}
              >
                <option value="All">All Classes</option>
                {["Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Showing: <strong>{filteredStudents.length}</strong> of {students.length} students
            </span>
          </div>

          {/* Minimal Students Table */}
          <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: "160px" }}>Student ID</th>
                  <th>Student Name</th>
                  <th style={{ width: "260px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((stu) => (
                    <tr key={stu.id}>
                      {/* Student ID */}
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "var(--blue)",
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "0.35rem",
                            fontSize: "0.825rem",
                          }}
                        >
                          {stu.id}
                        </span>
                      </td>

                      {/* Student Full Name */}
                      <td>
                        <div
                          onClick={() => setViewingStudent(stu)}
                          title="Click to view complete student profile"
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                            fontSize: "0.95rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span>{stu.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--blue)", fontWeight: 500 }}>
                            (Click to inspect)
                          </span>
                        </div>
                      </td>

                      {/* Actions: View Info, Edit, Delete */}
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.45rem", alignItems: "center" }}>
                          {/* View Info Button */}
                          <button
                            onClick={() => setViewingStudent(stu)}
                            style={{
                              background: "#eff6ff",
                              border: "1px solid #bfdbfe",
                              color: "#1d4ed8",
                              padding: "0.35rem 0.8rem",
                              borderRadius: "0.35rem",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                            }}
                          >
                            👁️ View
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEdit(stu)}
                            style={{
                              background: "#f8fafc",
                              border: "1px solid #cbd5e1",
                              color: "#334155",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "0.35rem",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >
                            Edit
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(stu.id, stu.name)}
                            style={{
                              background: "#fee2e2",
                              border: "1px solid #fca5a5",
                              color: "#b91c1c",
                              padding: "0.35rem 0.75rem",
                              borderRadius: "0.35rem",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                              fontWeight: 600,
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
                    <td colSpan={3} style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
                      No student records matched current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* DETAILED STUDENT INFO VIEW MODAL                                          */}
      {/* (Shows Photo, Name & ID, Class & Section, Roll No, Attendance, Grace etc) */}
      {/* ========================================================================= */}
      {viewingStudent && (
        <div style={{ position: "fixed", inset: 0, zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(9, 21, 48, 0.65)", backdropFilter: "blur(4px)" }} onClick={() => setViewingStudent(null)} />
          <div
            style={{
              position: "relative",
              background: "white",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "560px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
              border: "1px solid #e2e8f0",
              animation: "fadeInUp 0.25s ease forwards",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #091530 0%, #0f2044 100%)",
                color: "white",
                padding: "1.2rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "3px solid #c9a84c",
              }}
            >
              <div>
                <span style={{ fontSize: "0.72rem", color: "#e2c47a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  STUDENT COMPLETE RECORD
                </span>
                <h3 style={{ margin: "0.2rem 0 0", fontSize: "1.25rem", color: "white", fontFamily: "Georgia, serif" }}>
                  {viewingStudent.name}
                </h3>
              </div>
              <button
                onClick={() => setViewingStudent(null)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "white",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "1.5rem" }}>
              {/* Photo & Primary Details Card */}
              <div
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                  background: "#f8fafc",
                  padding: "1rem 1.25rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #e2e8f0",
                }}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewingStudent.photo || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80"}
                  alt={viewingStudent.name}
                  style={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "0.75rem",
                    objectFit: "cover",
                    border: "2.5px solid #0f2044",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>
                    {viewingStudent.name}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--blue)", fontWeight: 700, marginTop: "0.2rem" }}>
                    Student ID: {viewingStudent.id} • Roll No: #{viewingStudent.rollNo}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ background: "#0f2044", color: "#e2c47a", padding: "0.2rem 0.6rem", borderRadius: "0.3rem", fontSize: "0.75rem", fontWeight: 700 }}>
                      {viewingStudent.class} – {viewingStudent.section}
                    </span>
                    <span
                      style={{
                        background: viewingStudent.status === "Active" ? "#dcfce7" : "#fee2e2",
                        color: viewingStudent.status === "Active" ? "#15803d" : "#b91c1c",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "0.3rem",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                      }}
                    >
                      {viewingStudent.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Information Grid: Class, Roll, Attendance, Grace Mark, DOB, Blood Group */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Class &amp; Section
                  </span>
                  <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                    {viewingStudent.class} – {viewingStudent.section}
                  </strong>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Roll Number
                  </span>
                  <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>
                    #{viewingStudent.rollNo}
                  </strong>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Attendance Information
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.2rem" }}>
                    <strong style={{ color: "#15803d", fontSize: "0.95rem" }}>
                      {viewingStudent.attendance || "—"}
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>(Regular Presence)</span>
                  </div>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Grace Mark
                  </span>
                  <strong style={{ color: Number(viewingStudent.graceMark) > 0 ? "#b45309" : "#64748b", fontSize: "0.95rem" }}>
                    {Number(viewingStudent.graceMark) > 0 ? `+${viewingStudent.graceMark} Grace Marks` : "0 (No grace needed)"}
                  </strong>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Date of Birth (DOB)
                  </span>
                  <strong style={{ color: "#0f172a", fontSize: "0.9rem" }}>
                    {viewingStudent.dob || "—"}
                  </strong>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Blood Group
                  </span>
                  <strong style={{ color: "#dc2626", fontSize: "0.9rem" }}>
                    {viewingStudent.bloodGroup || "O+"}
                  </strong>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Parent / Guardian
                  </span>
                  <strong style={{ color: "#0f172a", fontSize: "0.9rem" }}>
                    {viewingStudent.guardian || "—"}
                  </strong>
                </div>

                <div style={{ background: "#ffffff", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                  <span style={{ color: "#64748b", display: "block", fontSize: "0.72rem", textTransform: "uppercase", fontWeight: 700 }}>
                    Emergency Phone
                  </span>
                  <strong style={{ color: "#0f172a", fontSize: "0.9rem" }}>
                    {viewingStudent.phone || "—"}
                  </strong>
                </div>
              </div>

              {/* Modal Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "1rem",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={() => {
                    handleGenerateCard(viewingStudent);
                    setViewingStudent(null);
                  }}
                  style={{
                    background: "#fef3c7",
                    border: "1px solid #fbbf24",
                    color: "#92400e",
                    padding: "0.5rem 1.1rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  🪪 Generate ID Card
                </button>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => {
                      handleOpenEdit(viewingStudent);
                      setViewingStudent(null);
                    }}
                    className="btn-outline"
                    style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                  >
                    Edit Record
                  </button>

                  <button
                    onClick={() => setViewingStudent(null)}
                    className="btn-primary"
                    style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STUDENT ID CARD GENERATOR SECTION                                  */}
      {/* ========================================================================= */}
      {activeTab === "idcard" && selectedStudentForCard && (
        <div style={{ background: "white", borderRadius: "0.875rem", border: "1px solid #e2e8f0", padding: "1.75rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
          {/* Controls Bar */}
          <div
            className="no-print"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              paddingBottom: "1.25rem",
              borderBottom: "1px solid #e2e8f0",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginBottom: "0.25rem" }}>
                  Select Student to Print / Preview:
                </label>
                <select
                  value={selectedStudentForCard.id}
                  onChange={(e) => {
                    const found = students.find((s) => s.id === e.target.value);
                    if (found) setSelectedStudentForCard(found);
                  }}
                  className="form-input"
                  style={{ fontSize: "0.875rem", padding: "0.45rem 0.75rem", fontWeight: 600, minWidth: "220px" }}
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.class}–{s.section}, Roll #{s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginBottom: "0.25rem" }}>
                  Academic Session:
                </label>
                <input
                  type="text"
                  value={academicSession}
                  onChange={(e) => setAcademicSession(e.target.value)}
                  className="form-input"
                  style={{ fontSize: "0.875rem", padding: "0.45rem 0.75rem", width: "130px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#64748b", marginBottom: "0.25rem" }}>
                  Card Face:
                </label>
                <div style={{ display: "flex", gap: "0.35rem" }}>
                  <button
                    onClick={() => setCardSide("front")}
                    style={{
                      background: cardSide === "front" ? "var(--navy)" : "#f1f5f9",
                      color: cardSide === "front" ? "white" : "#475569",
                      border: "none",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "0.35rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Front Side
                  </button>
                  <button
                    onClick={() => setCardSide("back")}
                    style={{
                      background: cardSide === "back" ? "var(--navy)" : "#f1f5f9",
                      color: cardSide === "back" ? "white" : "#475569",
                      border: "none",
                      padding: "0.45rem 0.85rem",
                      borderRadius: "0.35rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Back Side
                  </button>
                </div>
              </div>
            </div>

            {/* Print & Action Buttons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handlePrintCard}
                className="btn-gold"
                style={{ fontSize: "0.875rem", padding: "0.55rem 1.25rem" }}
              >
                🖨️ Print Student ID Card
              </button>

              <button
                onClick={() => {
                  alert(
                    `[DEMO EXPORT]\nGenerated ready-to-print official PVC Identity Card for ${selectedStudentForCard.name} (ID: ${selectedStudentForCard.id}). In full deployment, this outputs a 300 DPI CMYK PDF for card printers.`
                  );
                }}
                className="btn-primary"
                style={{ fontSize: "0.875rem", padding: "0.55rem 1.1rem" }}
              >
                ⬇ Export High-Res Badge
              </button>
            </div>
          </div>

          {/* ID Card Display Stage */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "#f8fafc",
              borderRadius: "0.75rem",
              border: "1px dashed #cbd5e1",
            }}
          >
            <p className="no-print" style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "1.25rem", textAlign: "center" }}>
              Standard ISO/IEC 7810 ID-1 PVC Format (85.60 mm × 53.98 mm portrait badge). Ready for direct thermal or inkjet badge printers.
            </p>

            {/* PRINTABLE ID CARD CONTAINER */}
            <div id="student-id-card-print-area">
              {cardSide === "front" ? (
                /* FRONT OF CARD */
                <div
                  style={{
                    width: "320px",
                    height: "490px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "2px solid #0f2044",
                    boxShadow: "0 12px 32px rgba(15,32,68,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {/* Top Header Strip */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #091530 0%, #0f2044 100%)",
                      color: "white",
                      padding: "0.85rem 0.75rem 0.75rem",
                      textAlign: "center",
                      borderBottom: "3px solid #c9a84c",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #c9a84c, #e2c47a)",
                          color: "#0f2044",
                          fontWeight: 900,
                          fontSize: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "serif",
                        }}
                      >
                        NB
                      </div>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          fontFamily: "Georgia, serif",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {SCHOOL.name}
                      </h4>
                    </div>

                    <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.03em" }}>
                      1 No. Khring Khring, Lanka, Hojai, Assam
                    </div>
                    <div style={{ fontSize: "0.58rem", color: "#e2c47a", fontWeight: 700, marginTop: "0.15rem" }}>
                      UDISE: {SCHOOL.udise} • SESSION: {academicSession}
                    </div>
                  </div>

                  {/* Card Badge Banner */}
                  <div
                    style={{
                      background: "#c9a84c",
                      color: "#0f2044",
                      textAlign: "center",
                      padding: "0.2rem 0",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    STUDENT IDENTITY CARD
                  </div>

                  {/* Photo & Student Name Section */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.9rem 1rem 0.5rem" }}>
                    <div style={{ position: "relative", width: "96px", height: "96px", marginBottom: "0.6rem" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedStudentForCard.photo || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80"}
                        alt={selectedStudentForCard.name}
                        style={{
                          width: "96px",
                          height: "96px",
                          borderRadius: "10px",
                          objectFit: "cover",
                          border: "2.5px solid #0f2044",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-6px",
                          right: "-6px",
                          background: "#0f2044",
                          color: "#e2c47a",
                          padding: "0.1rem 0.4rem",
                          borderRadius: "0.3rem",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                        }}
                      >
                        Roll: {selectedStudentForCard.rollNo}
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        fontSize: "1.05rem",
                        color: "#0f2044",
                        fontWeight: 800,
                        textAlign: "center",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {selectedStudentForCard.name}
                    </h3>

                    <div style={{ fontSize: "0.72rem", color: "var(--blue)", fontWeight: 700, marginTop: "0.15rem" }}>
                      STUDENT ID: {selectedStudentForCard.id}
                    </div>
                  </div>

                  {/* Student Details Table */}
                  <div style={{ padding: "0 1.25rem", flex: 1 }}>
                    <table style={{ width: "100%", fontSize: "0.74rem", borderCollapse: "collapse" }}>
                      <tbody>
                        <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ color: "#64748b", padding: "0.22rem 0", fontWeight: 600 }}>Class &amp; Section:</td>
                          <td style={{ color: "#0f172a", fontWeight: 700, textAlign: "right" }}>
                            {selectedStudentForCard.class} – {selectedStudentForCard.section}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ color: "#64748b", padding: "0.22rem 0", fontWeight: 600 }}>Date of Birth:</td>
                          <td style={{ color: "#0f172a", fontWeight: 600, textAlign: "right" }}>
                            {selectedStudentForCard.dob || "14/08/2016"}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ color: "#64748b", padding: "0.22rem 0", fontWeight: 600 }}>Blood Group:</td>
                          <td style={{ color: "#b91c1c", fontWeight: 700, textAlign: "right" }}>
                            {selectedStudentForCard.bloodGroup || "O+"}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ color: "#64748b", padding: "0.22rem 0", fontWeight: 600 }}>Guardian:</td>
                          <td style={{ color: "#0f172a", fontWeight: 600, textAlign: "right" }}>
                            {selectedStudentForCard.guardian || "Parent / Guardian"}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ color: "#64748b", padding: "0.22rem 0", fontWeight: 600 }}>Emergency Contact:</td>
                          <td style={{ color: "#0f172a", fontWeight: 700, textAlign: "right" }}>
                            {selectedStudentForCard.phone || "9864XXXXXX"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Card Bottom: Barcode & Principal Sign */}
                  <div
                    style={{
                      background: "#f8fafc",
                      borderTop: "1px solid #e2e8f0",
                      padding: "0.5rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {/* Barcode simulation */}
                      <div style={{ display: "flex", gap: "1.5px", height: "16px", alignItems: "center" }}>
                        {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4].map((w, i) => (
                          <span
                            key={i}
                            style={{
                              width: `${w}px`,
                              height: "100%",
                              background: "#0f172a",
                              display: "inline-block",
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: "0.55rem", color: "#64748b", letterSpacing: "0.08em" }}>
                        {selectedStudentForCard.id}-ASSAM
                      </span>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: "cursive",
                          fontSize: "0.75rem",
                          color: "#1e3a8a",
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        Wahida Begum
                      </div>
                      <div
                        style={{
                          borderTop: "1px dashed #94a3b8",
                          fontSize: "0.56rem",
                          color: "#64748b",
                          fontWeight: 700,
                          marginTop: "2px",
                          paddingTop: "1px",
                        }}
                      >
                        Principal Signature
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* BACK OF CARD */
                <div
                  style={{
                    width: "320px",
                    height: "490px",
                    background: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "2px solid #0f2044",
                    boxShadow: "0 12px 32px rgba(15,32,68,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.25rem",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <div>
                    <div style={{ textAlign: "center", borderBottom: "2px solid #e2e8f0", paddingBottom: "0.75rem", marginBottom: "0.85rem" }}>
                      <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#0f2044", fontWeight: 700 }}>
                        CARD HOLDER INSTRUCTIONS
                      </h4>
                      <p style={{ margin: "0.2rem 0 0", fontSize: "0.65rem", color: "#64748b" }}>
                        General Rules &amp; Emergency Protocol
                      </p>
                    </div>

                    <ul style={{ paddingLeft: "1.1rem", margin: 0, fontSize: "0.72rem", color: "#334155", lineHeight: 1.6 }}>
                      <li>This identity card is mandatory for campus entry and school examinations.</li>
                      <li>In case of loss or damage, report immediately to the Headmistress / Principal office.</li>
                      <li>This card is non-transferable and remains the property of Natun Bazar Jatiya Vidyalaya.</li>
                      <li>Please notify the office promptly if change of residence or guardian phone occurs.</li>
                    </ul>

                    <div style={{ marginTop: "1rem", background: "#f8fafc", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", fontSize: "0.7rem" }}>
                      <strong style={{ color: "#0f2044", display: "block", marginBottom: "0.2rem" }}>
                        School Campus Address:
                      </strong>
                      <span style={{ color: "#475569" }}>
                        1 No. Khring Khring, Lanka, Dist: Hojai, Assam - 782446
                      </span>
                      <div style={{ marginTop: "0.4rem", color: "#1e40af", fontWeight: 600 }}>
                        UDISE Code: 18300817116
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "center", borderTop: "1px solid #e2e8f0", paddingTop: "0.6rem" }}>
                    <div style={{ fontSize: "0.65rem", color: "#dc2626", fontWeight: 700 }}>
                      🚨 If found, please return to school office or nearest police station.
                    </div>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8", marginTop: "0.2rem" }}>
                      Designed &amp; Managed via Handshake Co. School Suite
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ADD / EDIT STUDENT MODAL                                                  */}
      {/* ========================================================================= */}
      {isFormOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setIsFormOpen(false)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "560px", padding: "1.75rem", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: 0 }}>
                {editingId ? "Edit Student Record" : "Enroll New Student (Demo)"}
              </h3>
              <button onClick={() => setIsFormOpen(false)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Photo & Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", alignItems: "center" }}>
                <div>
                  <label className="form-label">Photo Preview</label>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.photo || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80"}
                    alt="Preview"
                    style={{ width: "70px", height: "70px", borderRadius: "0.5rem", objectFit: "cover", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div>
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="form-label">Photo URL / File Reference</label>
                <input
                  type="text"
                  placeholder="https://... or /images/school/photo-1.jpg"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="form-input"
                />
              </div>

              {/* Class & Section */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Class *</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="form-input"
                  >
                    {["Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Section *</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="form-input"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              {/* Roll No, Grace Mark & Attendance */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Roll Number</label>
                  <input
                    type="text"
                    placeholder="01"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Attendance (%)</label>
                  <input
                    type="text"
                    placeholder="95%"
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Grace Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    placeholder="0"
                    value={formData.graceMark}
                    onChange={(e) => setFormData({ ...formData, graceMark: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* DOB & Blood Group */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Date of Birth (DOB)</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="form-input"
                  >
                    <option value="O+">O+</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              {/* Guardian & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Parent / Guardian</label>
                  <input
                    type="text"
                    placeholder="Father/Mother name"
                    value={formData.guardian}
                    onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    placeholder="9864XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="form-label">Enrollment Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-input"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
                <button type="button" onClick={() => setIsFormOpen(false)} className="btn-outline" style={{ fontSize: "0.85rem" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: "0.85rem" }}>
                  {editingId ? "Save Changes" : "Register Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
