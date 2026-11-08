"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DEMO_STUDENTS, SCHOOL } from "@/lib/data";

type AttendanceStatus = "Present" | "Absent" | "Leave" | "Holiday";

interface AttendanceEntry {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  rollNo: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  status: AttendanceStatus;
  remark?: string;
  holidayName?: string;
}

interface HolidayItem {
  date: string;
  name: string;
  category: "National" | "State / Bihu" | "Festival" | "Vacation" | "Sunday";
  days: number;
}

// Assam Academic School Holidays 2026
const SCHOOL_HOLIDAYS_2026: HolidayItem[] = [
  { date: "2026-01-14", name: "Magh Bihu & Makar Sankranti", category: "State / Bihu", days: 2 },
  { date: "2026-01-23", name: "Netaji Subhas Chandra Bose Jayanti", category: "National", days: 1 },
  { date: "2026-01-26", name: "Republic Day", category: "National", days: 1 },
  { date: "2026-02-15", name: "Saraswati Puja", category: "Festival", days: 1 },
  { date: "2026-03-04", name: "Dol Jatra / Holi", category: "Festival", days: 1 },
  { date: "2026-04-13", name: "Bohag / Rongali Bihu", category: "State / Bihu", days: 4 },
  { date: "2026-05-01", name: "May Day / Labour Day", category: "National", days: 1 },
  { date: "2026-05-28", name: "Buddha Purnima", category: "Festival", days: 1 },
  { date: "2026-06-17", name: "Id-ul-Zuha (Bakrid)", category: "Festival", days: 1 },
  { date: "2026-07-01", name: "Summer Break (School Closed)", category: "Vacation", days: 15 },
  { date: "2026-08-15", name: "Independence Day", category: "National", days: 1 },
  { date: "2026-09-04", name: "Janmashtami", category: "Festival", days: 1 },
  { date: "2026-09-14", name: "Tithi of Srimanta Sankardeva", category: "State / Bihu", days: 1 },
  { date: "2026-10-02", name: "Mahatma Gandhi Jayanti", category: "National", days: 1 },
  { date: "2026-10-18", name: "Kati Bihu", category: "State / Bihu", days: 1 },
  { date: "2026-10-19", name: "Durga Puja & Bijoya Dashami", category: "Festival", days: 6 },
  { date: "2026-11-08", name: "Kali Puja & Diwali", category: "Festival", days: 2 },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", category: "Festival", days: 1 },
  { date: "2026-12-25", name: "Christmas & Winter Vacation", category: "Vacation", days: 7 },
];

const STORAGE_KEY = "nbjv_admin_attendance_data_v3";

function getHolidayForDate(dateStr: string): HolidayItem | undefined {
  return SCHOOL_HOLIDAYS_2026.find((h) => h.date === dateStr);
}

// Generate realistic seed attendance records
function generateInitialAttendance(): AttendanceEntry[] {
  const entries: AttendanceEntry[] = [];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const startDate = new Date("2026-09-01T00:00:00");
  const endDate = new Date("2026-11-09T00:00:00");

  DEMO_STUDENTS.forEach((student) => {
    const cur = new Date(startDate);
    let dayCount = 0;

    while (cur <= endDate) {
      const yyyy = cur.getFullYear();
      const mm = String(cur.getMonth() + 1).padStart(2, "0");
      const dd = String(cur.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;
      const dayName = daysOfWeek[cur.getDay()];
      const isSun = cur.getDay() === 0;
      const holiday = getHolidayForDate(dateStr);

      let status: AttendanceStatus = "Present";
      let remark = "";
      let holidayName = "";

      if (isSun) {
        status = "Holiday";
        holidayName = "Sunday (Weekly Off)";
      } else if (holiday) {
        status = "Holiday";
        holidayName = holiday.name;
      } else {
        const seed = (student.id.charCodeAt(student.id.length - 1) * 31 + dayCount * 17) % 100;
        const targetRate = parseInt(student.attendance, 10) || 90;

        if (seed >= targetRate) {
          if (seed % 3 === 0) {
            status = "Leave";
            remark = "Medical / Informed Leave";
          } else {
            status = "Absent";
            remark = "Absent without prior notice";
          }
        } else {
          status = "Present";
        }
      }

      entries.push({
        id: `att-${student.id}-${dateStr}`,
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        section: student.section,
        rollNo: student.rollNo,
        date: dateStr,
        dayName,
        status,
        remark,
        holidayName,
      });

      cur.setDate(cur.getDate() + 1);
      dayCount++;
    }
  });

  return entries;
}

export default function AttendanceManagementPage() {
  const [students, setStudents] = useState(DEMO_STUDENTS);
  const [attendanceData, setAttendanceData] = useState<AttendanceEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  // Modals
  const [viewingStudent, setViewingStudent] = useState<typeof DEMO_STUDENTS[0] | null>(null);
  const [editingStudent, setEditingStudent] = useState<typeof DEMO_STUDENTS[0] | null>(null);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // Month filter inside View modal
  const [viewMonthFilter, setViewMonthFilter] = useState("All");

  // Edit form state inside Edit modal
  const [editDate, setEditDate] = useState("2026-11-09");
  const [editStatus, setEditStatus] = useState<AttendanceStatus>("Present");
  const [editRemark, setEditRemark] = useState("");

  // Load from localStorage or initialize
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAttendanceData(parsed);
          return;
        }
      }
    } catch (e) {}

    const initial = generateInitialAttendance();
    setAttendanceData(initial);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch (e) {}
  }, []);

  const saveToStorage = (updated: AttendanceEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Filter students for the main minimal table
  const filteredStudents = useMemo(() => {
    return students.filter((stu) => {
      const matchesSearch =
        searchQuery === "" ||
        stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stu.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesClass = classFilter === "All" || stu.class === classFilter;
      return matchesSearch && matchesClass;
    });
  }, [students, searchQuery, classFilter]);

  // Attendance stats calculator for any student
  const getStudentStats = (studentId: string, month = "All") => {
    const entries = attendanceData.filter((entry) => {
      const matchesStudent = entry.studentId === studentId;
      const matchesMonth = month === "All" || entry.date.startsWith(month);
      return matchesStudent && matchesMonth;
    });

    let present = 0;
    let absent = 0;
    let leave = 0;
    let holidays = 0;

    entries.forEach((e) => {
      if (e.status === "Present") present++;
      else if (e.status === "Absent") absent++;
      else if (e.status === "Leave") leave++;
      else if (e.status === "Holiday") holidays++;
    });

    const totalDays = entries.length;
    const workingDays = present + absent + leave;
    const percentage = workingDays > 0 ? ((present / workingDays) * 100).toFixed(1) : "0.0";

    return {
      entries,
      totalDays,
      workingDays,
      present,
      absent,
      leave,
      holidays,
      percentage,
    };
  };

  // Stats for current viewing student
  const activeStudentStats = useMemo(() => {
    if (!viewingStudent) return null;
    return getStudentStats(viewingStudent.id, viewMonthFilter);
  }, [viewingStudent, attendanceData, viewMonthFilter]);

  // Update a single entry status
  const handleUpdateStatus = (entryId: string, newStatus: AttendanceStatus, newRemark?: string) => {
    const updated = attendanceData.map((e) => {
      if (e.id === entryId) {
        return {
          ...e,
          status: newStatus,
          remark: newRemark !== undefined ? newRemark : e.remark,
          holidayName: newStatus === "Holiday" ? (e.holidayName || "School Holiday") : "",
        };
      }
      return e;
    });

    setAttendanceData(updated);
    saveToStorage(updated);
    showToast(`Attendance updated to ${newStatus}`);
  };

  // Handle Edit Modal submit
  const handleSaveEditModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const targetEntry = attendanceData.find(
      (entry) => entry.studentId === editingStudent.id && entry.date === editDate
    );

    if (targetEntry) {
      handleUpdateStatus(targetEntry.id, editStatus, editRemark);
    } else {
      // Create new date record if not found
      const d = new Date(editDate + "T00:00:00");
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const newEntry: AttendanceEntry = {
        id: `att-${editingStudent.id}-${editDate}`,
        studentId: editingStudent.id,
        studentName: editingStudent.name,
        class: editingStudent.class,
        section: editingStudent.section,
        rollNo: editingStudent.rollNo,
        date: editDate,
        dayName: daysOfWeek[d.getDay()],
        status: editStatus,
        remark: editRemark,
      };
      const updated = [newEntry, ...attendanceData];
      setAttendanceData(updated);
      saveToStorage(updated);
      showToast(`Attendance recorded for ${editDate}`);
    }

    setEditingStudent(null);
  };

  // Handle Delete / Reset Student Attendance
  const handleDelete = (studentId: string, studentName: string) => {
    if (confirm(`Are you sure you want to delete and reset all attendance records for ${studentName} (${studentId})?`)) {
      const updated = attendanceData.filter((entry) => entry.studentId !== studentId);
      setAttendanceData(updated);
      saveToStorage(updated);
      if (viewingStudent?.id === studentId) setViewingStudent(null);
      if (editingStudent?.id === studentId) setEditingStudent(null);
      showToast(`Attendance records cleared for ${studentName}`);
    }
  };

  // Export CSV for viewing student
  const handleExportCSV = () => {
    if (!viewingStudent || !activeStudentStats) return;

    const headers = ["Date", "Day", "Student ID", "Student Name", "Class", "Section", "Roll No", "Status", "Holiday Name", "Remark"];
    const rows = activeStudentStats.entries.map((e) => [
      e.date,
      e.dayName,
      e.studentId,
      `"${e.studentName}"`,
      e.class,
      e.section,
      e.rollNo,
      e.status,
      `"${e.holidayName || ""}"`,
      `"${e.remark || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${viewingStudent.id}_${viewingStudent.name.replace(/\s+/g, "_")}_Attendance_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV Attendance Sheet downloaded successfully!");
  };

  // Print Dossier
  const handlePrint = () => {
    window.print();
  };

  // ── SVG PIE CHART COMPUTATION ──
  const pieChartData = useMemo(() => {
    if (!activeStudentStats || activeStudentStats.totalDays === 0) return { paths: [], slices: [] };

    const total = activeStudentStats.totalDays;
    const slices = [
      { key: "present", label: "Present Days", value: activeStudentStats.present, color: "#16a34a" },
      { key: "holidays", label: "School Holidays", value: activeStudentStats.holidays, color: "#6366f1" },
      { key: "absent", label: "Absent Days", value: activeStudentStats.absent, color: "#dc2626" },
      { key: "leave", label: "Leave / Medical", value: activeStudentStats.leave, color: "#f59e0b" },
    ].filter((s) => s.value > 0);

    const cx = 130;
    const cy = 130;
    const outerR = 105;
    const innerR = 56;

    let cumulativeAngle = -Math.PI / 2;

    const paths = slices.map((slice) => {
      const sliceAngle = (slice.value / total) * 2 * Math.PI;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + sliceAngle;
      cumulativeAngle = endAngle;

      const x1 = cx + outerR * Math.cos(startAngle);
      const y1 = cy + outerR * Math.sin(startAngle);
      const x2 = cx + outerR * Math.cos(endAngle);
      const y2 = cy + outerR * Math.sin(endAngle);

      const ix1 = cx + innerR * Math.cos(endAngle);
      const iy1 = cy + innerR * Math.sin(endAngle);
      const ix2 = cx + innerR * Math.cos(startAngle);
      const iy2 = cy + innerR * Math.sin(startAngle);

      const largeArc = sliceAngle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${x1} ${y1}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${ix1} ${iy1}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
        "Z",
      ].join(" ");

      const percentage = ((slice.value / total) * 100).toFixed(1);

      return {
        ...slice,
        d: pathData,
        percentage,
      };
    });

    return { paths, slices };
  }, [activeStudentStats]);

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "#065f46",
            color: "white",
            padding: "0.85rem 1.4rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          ✅ {toast}
        </div>
      )}

      {/* ── PRINT-ONLY ATTENDANCE DOSSIER ── */}
      {viewingStudent && activeStudentStats && (
        <div id="attendance-report-print-area" style={{ display: "none" }}>
          <div style={{ borderBottom: "2px solid #0f2044", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h1 style={{ fontSize: "1.6rem", color: "#0f2044", margin: 0, fontWeight: 800 }}>
                  {SCHOOL.name}
                </h1>
                <p style={{ margin: "0.2rem 0", color: "#475569", fontSize: "0.85rem" }}>
                  {SCHOOL.location.full} • UDISE: {SCHOOL.udise}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
                  Official Student Attendance Dossier &amp; Holiday Analytics • Academic Session 2026
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Date:</span>
                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{new Date().toLocaleDateString("en-IN")}</div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "1.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
              fontSize: "0.85rem",
            }}
          >
            <div>
              <span style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Student Name:</span>
              <strong>{viewingStudent.name}</strong>
            </div>
            <div>
              <span style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Student ID:</span>
              <strong>{viewingStudent.id}</strong>
            </div>
            <div>
              <span style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Class &amp; Section:</span>
              <strong>{viewingStudent.class} - {viewingStudent.section} (Roll: {viewingStudent.rollNo})</strong>
            </div>
            <div>
              <span style={{ color: "#64748b", display: "block", fontSize: "0.75rem" }}>Attendance Rate:</span>
              <strong style={{ color: "#16a34a", fontSize: "1.1rem" }}>{activeStudentStats.percentage}%</strong>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div style={{ border: "1px solid #cbd5e1", padding: "0.75rem", borderRadius: "0.4rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f2044" }}>{activeStudentStats.totalDays}</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase" }}>Total Days</div>
            </div>
            <div style={{ border: "1px solid #bbf7d0", background: "#f0fdf4", padding: "0.75rem", borderRadius: "0.4rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#16a34a" }}>{activeStudentStats.present}</div>
              <div style={{ fontSize: "0.7rem", color: "#166534", textTransform: "uppercase" }}>Present Days</div>
            </div>
            <div style={{ border: "1px solid #fecaca", background: "#fef2f2", padding: "0.75rem", borderRadius: "0.4rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#dc2626" }}>{activeStudentStats.absent}</div>
              <div style={{ fontSize: "0.7rem", color: "#991b1b", textTransform: "uppercase" }}>Absent Days</div>
            </div>
            <div style={{ border: "1px solid #fde68a", background: "#fffbeb", padding: "0.75rem", borderRadius: "0.4rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#d97706" }}>{activeStudentStats.leave}</div>
              <div style={{ fontSize: "0.7rem", color: "#92400e", textTransform: "uppercase" }}>Leave / Medical</div>
            </div>
            <div style={{ border: "1px solid #c7d2fe", background: "#eef2ff", padding: "0.75rem", borderRadius: "0.4rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#4f46e5" }}>{activeStudentStats.holidays}</div>
              <div style={{ fontSize: "0.7rem", color: "#3730a3", textTransform: "uppercase" }}>Holidays / Sundays</div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", marginBottom: "2rem" }}>
            <thead>
              <tr style={{ background: "#0f2044", color: "white" }}>
                <th style={{ padding: "6px 8px", textAlign: "left", border: "1px solid #0f2044" }}>Date</th>
                <th style={{ padding: "6px 8px", textAlign: "left", border: "1px solid #0f2044" }}>Day</th>
                <th style={{ padding: "6px 8px", textAlign: "left", border: "1px solid #0f2044" }}>Status</th>
                <th style={{ padding: "6px 8px", textAlign: "left", border: "1px solid #0f2044" }}>Event / Holiday / Remark</th>
              </tr>
            </thead>
            <tbody>
              {activeStudentStats.entries.slice(0, 35).map((e) => (
                <tr key={e.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "5px 8px", border: "1px solid #e2e8f0" }}>{e.date}</td>
                  <td style={{ padding: "5px 8px", border: "1px solid #e2e8f0" }}>{e.dayName}</td>
                  <td style={{ padding: "5px 8px", border: "1px solid #e2e8f0", fontWeight: 700 }}>{e.status}</td>
                  <td style={{ padding: "5px 8px", border: "1px solid #e2e8f0", color: "#475569" }}>
                    {e.status === "Holiday" ? (e.holidayName || "School Holiday") : (e.remark || "—")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4rem", paddingTop: "1rem" }}>
            <div style={{ textAlign: "center", width: "200px" }}>
              <div style={{ borderTop: "1px solid #000", paddingTop: "0.3rem", fontWeight: 600, fontSize: "0.8rem" }}>
                Class Teacher Signature
              </div>
            </div>
            <div style={{ textAlign: "center", width: "200px" }}>
              <div style={{ borderTop: "1px solid #000", paddingTop: "0.3rem", fontWeight: 600, fontSize: "0.8rem" }}>
                Principal / Headmistress Seal
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SCREEN VIEW HEADER ── */}
      <div className="no-print" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
              <span style={{ fontSize: "1.75rem" }}>✅</span>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                Attendance Management
              </h1>
            </div>
            <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0 }}>
              Select any student to view detailed attendance logs, pie charts (with all mentioned holidays), and download reports.
            </p>
          </div>

          <button
            onClick={() => setIsHolidayModalOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.4rem",
              border: "1px solid #c7d2fe",
              background: "#eef2ff",
              color: "#3730a3",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <span>🗓️</span>
            <span>View Holiday Calendar ({SCHOOL_HOLIDAYS_2026.length} Holidays)</span>
          </button>
        </div>
      </div>

      {/* ── FILTER & SEARCH BAR ── */}
      <div
        className="no-print"
        style={{
          background: "white",
          padding: "1rem 1.25rem",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", flex: 1 }}>
          {/* Search by Student Name or ID */}
          <div style={{ position: "relative", minWidth: "260px", flex: "1 1 260px", maxWidth: "360px" }}>
            <span style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "0.85rem" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search student by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.45rem 0.75rem 0.45rem 2.2rem",
                borderRadius: "0.4rem",
                border: "1px solid #cbd5e1",
                fontSize: "0.85rem",
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
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Class Filter Dropdown */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            style={{
              padding: "0.45rem 0.8rem",
              borderRadius: "0.4rem",
              border: "1px solid #cbd5e1",
              fontSize: "0.85rem",
              background: "#f8fafc",
              fontWeight: 500,
            }}
          >
            <option value="All">All Classes (I - VIII)</option>
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

        <span style={{ fontSize: "0.825rem", color: "#64748b" }}>
          Showing <strong>{filteredStudents.length}</strong> student{filteredStudents.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── MINIMAL STUDENT ATTENDANCE TABLE ── */}
      <div
        className="no-print"
        style={{
          background: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        <table className="data-table" style={{ width: "100%", margin: 0 }}>
          <thead>
            <tr>
              <th style={{ width: "160px" }}>Student ID</th>
              <th>Student Name</th>
              <th style={{ width: "260px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((stu) => {
                const stuStats = getStudentStats(stu.id);

                return (
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

                    {/* Student Name */}
                    <td>
                      <div
                        onClick={() => {
                          setViewMonthFilter("All");
                          setViewingStudent(stu);
                        }}
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
                          (Click to inspect attendance)
                        </span>
                      </div>
                    </td>

                    {/* Actions: View, Edit, Delete */}
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "0.45rem", alignItems: "center" }}>
                        {/* VIEW ATTENDANCE BUTTON */}
                        <button
                          onClick={() => {
                            setViewMonthFilter("All");
                            setViewingStudent(stu);
                          }}
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

                        {/* EDIT ATTENDANCE BUTTON */}
                        <button
                          onClick={() => {
                            setEditingStudent(stu);
                            setEditDate("2026-11-09");
                            setEditStatus("Present");
                            setEditRemark("");
                          }}
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
                          ✏️ Edit
                        </button>

                        {/* DELETE / RESET BUTTON */}
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
                );
              })
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
                  No students found matching current search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW MODAL: COMPREHENSIVE ATTENDANCE INFORMATION & PIE CHART
         ══════════════════════════════════════════════════════════════════════ */}
      {viewingStudent && activeStudentStats && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(9, 21, 48, 0.75)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "white",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "920px",
              maxHeight: "92vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header Bar */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#091530",
                color: "white",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={viewingStudent.photo}
                  alt={viewingStudent.name}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--gold)",
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "white" }}>
                    {viewingStudent.name}
                  </h3>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                    ID: {viewingStudent.id} • Class: {viewingStudent.class} - {viewingStudent.section} • Roll No: {viewingStudent.rollNo} • Guardian: {viewingStudent.guardian}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <button
                  onClick={handlePrint}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "0.35rem",
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  🖨️ Print
                </button>

                <button
                  onClick={handleExportCSV}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "0.35rem",
                    border: "none",
                    background: "var(--gold)",
                    color: "var(--navy-dark)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  📥 Export CSV
                </button>

                <button
                  onClick={() => setViewingStudent(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    padding: "0 0.5rem",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "1.5rem" }}>
              {/* Month Filter Selector */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  background: "#f8fafc",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "#475569" }}>
                    Select Analytics Period:
                  </span>
                  <select
                    value={viewMonthFilter}
                    onChange={(e) => setViewMonthFilter(e.target.value)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      borderRadius: "0.35rem",
                      border: "1px solid #cbd5e1",
                      fontSize: "0.825rem",
                      fontWeight: 600,
                      background: "white",
                    }}
                  >
                    <option value="All">Full Academic Term (Sep - Nov 2026)</option>
                    <option value="2026-11">Current Month (November 2026)</option>
                    <option value="2026-10">October 2026</option>
                    <option value="2026-09">September 2026</option>
                  </select>
                </div>

                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Attendance Rate:{" "}
                  <strong style={{ color: parseFloat(activeStudentStats.percentage) >= 85 ? "#16a34a" : "#dc2626", fontSize: "0.95rem" }}>
                    {activeStudentStats.percentage}%
                  </strong>
                </div>
              </div>

              {/* 4 Metric Summary Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Attendance Rate */}
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "0.85rem", borderRadius: "0.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#16a34a" }}>
                    {activeStudentStats.percentage}%
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#166534", fontWeight: 700, textTransform: "uppercase" }}>
                    Attendance Rate
                  </div>
                </div>

                {/* Present Days */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "0.85rem", borderRadius: "0.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#16a34a" }}>
                    {activeStudentStats.present}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                    Present Days
                  </div>
                </div>

                {/* Absent Days */}
                <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "0.85rem", borderRadius: "0.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#dc2626" }}>
                    {activeStudentStats.absent + activeStudentStats.leave}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>
                    Absent &amp; Leave
                  </div>
                </div>

                {/* School Holidays Mentioned */}
                <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", padding: "0.85rem", borderRadius: "0.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#4f46e5" }}>
                    {activeStudentStats.holidays}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#3730a3", fontWeight: 700, textTransform: "uppercase" }}>
                    Holidays Mentioned
                  </div>
                </div>
              </div>

              {/* ── PIE CHART & HOLIDAY BREAKDOWN SECTION ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                {/* SVG Pie Chart Box */}
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "100%", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem", marginBottom: "0.75rem" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                      📈 Student Attendance Pie Chart
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Present, Absent, Leave &amp; all School Holidays included
                    </span>
                  </div>

                  {/* Vector SVG Donut/Pie Chart */}
                  <div style={{ position: "relative", width: "260px", height: "260px" }}>
                    <svg width="260" height="260" viewBox="0 0 260 260">
                      {pieChartData.paths.map((p) => (
                        <path
                          key={p.key}
                          d={p.d}
                          fill={p.color}
                          style={{
                            transition: "transform 0.2s ease, opacity 0.2s ease",
                            cursor: "pointer",
                          }}
                        >
                          <title>{`${p.label}: ${p.value} days (${p.percentage}%)`}</title>
                        </path>
                      ))}
                      <circle cx="130" cy="130" r="54" fill="white" />
                      <text x="130" y="124" textAnchor="middle" fontSize="22" fontWeight="800" fill="#0f172a">
                        {activeStudentStats.percentage}%
                      </text>
                      <text x="130" y="142" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b" letterSpacing="0.05em">
                        ATTENDANCE
                      </text>
                    </svg>
                  </div>

                  {/* Legend Grid */}
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem",
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    {pieChartData.paths.map((item) => (
                      <div
                        key={item.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.45rem",
                          fontSize: "0.78rem",
                          background: "#f8fafc",
                          padding: "0.35rem 0.55rem",
                          borderRadius: "0.35rem",
                        }}
                      >
                        <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: item.color, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.75rem" }}>
                            {item.label}
                          </div>
                          <div style={{ color: "#64748b", fontSize: "0.7rem" }}>
                            {item.value} Days ({item.percentage}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Mentioned Holidays in Pie Chart Panel */}
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem", marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                        🗓️ All Holidays Mentioned in Pie Chart
                      </h4>
                      <span style={{ background: "#e0e7ff", color: "#3730a3", fontSize: "0.7rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "1rem" }}>
                        {activeStudentStats.holidays} Days Accounted
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Sundays &amp; official Assam state/national breaks
                    </span>
                  </div>

                  <div style={{ flex: 1, overflowY: "auto", maxHeight: "280px", paddingRight: "0.3rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                      <div
                        style={{
                          padding: "0.45rem 0.65rem",
                          background: "#eef2ff",
                          borderLeft: "3px solid #6366f1",
                          borderRadius: "0.3rem",
                          fontSize: "0.78rem",
                        }}
                      >
                        <strong style={{ color: "#1e1b4b" }}>Weekly Offs: Sundays</strong>
                        <div style={{ color: "#475569", fontSize: "0.7rem" }}>
                          All scheduled Sunday school holidays automatically integrated.
                        </div>
                      </div>

                      {SCHOOL_HOLIDAYS_2026.map((h, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0.4rem 0.65rem",
                            background: "#f8fafc",
                            borderLeft: "3px solid #818cf8",
                            borderRadius: "0.3rem",
                            fontSize: "0.78rem",
                          }}
                        >
                          <div>
                            <strong style={{ color: "#0f172a" }}>{h.name}</strong>
                            <div style={{ color: "#64748b", fontSize: "0.7rem" }}>{h.category}</div>
                          </div>
                          <span style={{ background: "#e2e8f0", color: "#334155", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontSize: "0.7rem", fontWeight: 600 }}>
                            {h.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── DETAILED ATTENDANCE LOG & INLINE EDITING ── */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "0.85rem 1.25rem",
                    background: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                    📅 Date-by-Date Attendance Log &amp; Inline Quick Edit
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Click <strong>[P]</strong>, <strong>[A]</strong>, or <strong>[L]</strong> to instantly edit any day
                  </span>
                </div>

                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="data-table" style={{ width: "100%", margin: 0 }}>
                    <thead>
                      <tr>
                        <th style={{ width: "110px" }}>Date</th>
                        <th style={{ width: "90px" }}>Day</th>
                        <th style={{ width: "120px" }}>Status</th>
                        <th>Holiday / Remark</th>
                        <th style={{ width: "180px", textAlign: "right" }}>Edit Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeStudentStats.entries.map((entry) => {
                        const isPres = entry.status === "Present";
                        const isAbs = entry.status === "Absent";
                        const isLv = entry.status === "Leave";
                        const isHol = entry.status === "Holiday";

                        return (
                          <tr key={entry.id} style={{ background: isHol ? "#fafafa" : "white" }}>
                            <td style={{ fontWeight: 600, fontSize: "0.825rem", color: isHol ? "#64748b" : "#0f172a" }}>
                              {entry.date}
                            </td>
                            <td style={{ color: "#64748b", fontSize: "0.8rem" }}>
                              {entry.dayName}
                            </td>
                            <td>
                              <span
                                style={{
                                  padding: "0.15rem 0.5rem",
                                  borderRadius: "1rem",
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  background: isPres
                                    ? "#dcfce7"
                                    : isAbs
                                    ? "#fee2e2"
                                    : isLv
                                    ? "#fef3c7"
                                    : "#e0e7ff",
                                  color: isPres
                                    ? "#166534"
                                    : isAbs
                                    ? "#991b1b"
                                    : isLv
                                    ? "#92400e"
                                    : "#3730a3",
                                }}
                              >
                                {entry.status}
                              </span>
                            </td>
                            <td style={{ fontSize: "0.8rem", color: isHol ? "#4338ca" : "#475569" }}>
                              {isHol ? <strong>{entry.holidayName || "School Holiday"}</strong> : (entry.remark || "—")}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <div style={{ display: "inline-flex", gap: "0.25rem" }}>
                                <button
                                  onClick={() => handleUpdateStatus(entry.id, "Present", "")}
                                  title="Mark Present"
                                  style={{
                                    padding: "0.2rem 0.5rem",
                                    borderRadius: "0.3rem",
                                    border: isPres ? "1px solid #16a34a" : "1px solid #cbd5e1",
                                    background: isPres ? "#16a34a" : "#f8fafc",
                                    color: isPres ? "white" : "#475569",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                  }}
                                >
                                  P
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(entry.id, "Absent", "Marked absent")}
                                  title="Mark Absent"
                                  style={{
                                    padding: "0.2rem 0.5rem",
                                    borderRadius: "0.3rem",
                                    border: isAbs ? "1px solid #dc2626" : "1px solid #cbd5e1",
                                    background: isAbs ? "#dc2626" : "#f8fafc",
                                    color: isAbs ? "white" : "#475569",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                  }}
                                >
                                  A
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(entry.id, "Leave", "Approved Leave")}
                                  title="Mark Leave"
                                  style={{
                                    padding: "0.2rem 0.5rem",
                                    borderRadius: "0.3rem",
                                    border: isLv ? "1px solid #d97706" : "1px solid #cbd5e1",
                                    background: isLv ? "#d97706" : "#f8fafc",
                                    color: isLv ? "white" : "#475569",
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                  }}
                                >
                                  L
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "flex-end",
                background: "#f8fafc",
                borderRadius: "0 0 1rem 1rem",
              }}
            >
              <button
                onClick={() => setViewingStudent(null)}
                className="btn-primary"
                style={{ padding: "0.45rem 1.25rem", fontSize: "0.85rem" }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          EDIT MODAL: EDIT ATTENDANCE SPECIFICALLY FOR A STUDENT
         ══════════════════════════════════════════════════════════════════════ */}
      {editingStudent && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "0.875rem",
              width: "100%",
              maxWidth: "480px",
              padding: "1.75rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                ✏️ Edit Student Attendance
              </h3>
              <button
                onClick={() => setEditingStudent(null)}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#94a3b8" }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "0.85rem", borderRadius: "0.5rem", marginBottom: "1.25rem", fontSize: "0.85rem" }}>
              <div><strong>Student Name:</strong> {editingStudent.name}</div>
              <div><strong>Student ID:</strong> {editingStudent.id}</div>
              <div><strong>Class &amp; Section:</strong> {editingStudent.class} - {editingStudent.section} (Roll: {editingStudent.rollNo})</div>
            </div>

            <form onSubmit={handleSaveEditModal} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Select Date *</label>
                <input
                  type="date"
                  required
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Attendance Status *</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as AttendanceStatus)}
                  className="form-input"
                >
                  <option value="Present">Present (Attended)</option>
                  <option value="Absent">Absent (Unexcused)</option>
                  <option value="Leave">Leave (Excused / Medical)</option>
                  <option value="Holiday">Holiday (School Closed)</option>
                </select>
              </div>

              <div>
                <label className="form-label">Reason / Remark</label>
                <input
                  type="text"
                  value={editRemark}
                  onChange={(e) => setEditRemark(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Medical certificate submitted, Family function"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="btn-outline"
                  style={{ fontSize: "0.85rem" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: "0.85rem", fontWeight: 700 }}
                >
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          HOLIDAY CALENDAR MODAL
         ══════════════════════════════════════════════════════════════════════ */}
      {isHolidayModalOpen && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(9, 21, 48, 0.75)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "1.5rem",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  🗓️ Official School Holidays &amp; Breaks Calendar 2026
                </h3>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  Assam state gazetted, Bihu festival, national, and vacation breaks
                </span>
              </div>
              <button
                onClick={() => setIsHolidayModalOpen(false)}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#94a3b8" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
              {SCHOOL_HOLIDAYS_2026.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.4rem",
                    padding: "0.75rem 0.85rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                      {h.name}
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                      {h.category} • {h.days} Day{h.days > 1 ? "s" : ""}
                    </span>
                  </div>
                  <strong style={{ fontSize: "0.8rem", color: "#1e293b" }}>{h.date}</strong>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setIsHolidayModalOpen(false)}
                className="btn-primary"
                style={{ fontSize: "0.85rem", padding: "0.45rem 1.25rem" }}
              >
                Close Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
