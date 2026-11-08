"use client";

import { useState } from "react";
import { DEMO_RESULTS } from "@/lib/data";

interface ResultRecord {
  id: string;
  studentName: string;
  class: string;
  exam: string;
  subject: string;
  marks: string;
  grade: string;
}

interface ExamScheduleItem {
  id: string;
  class: string;
  subject: string;
  date: string;
  time: string;
  venue: string;
}

const INITIAL_SCHEDULE: ExamScheduleItem[] = [
  { id: "EX01", class: "Class V", subject: "Language & Literature", date: "2026-12-10", time: "09:30 AM – 12:00 PM", venue: "Room 101" },
  { id: "EX02", class: "Class V", subject: "Mathematics", date: "2026-12-12", time: "09:30 AM – 12:00 PM", venue: "Room 101" },
  { id: "EX03", class: "Class VII", subject: "General Science", date: "2026-12-11", time: "09:30 AM – 12:30 PM", venue: "Room 204" },
  { id: "EX04", class: "Class VII", subject: "Social Science", date: "2026-12-14", time: "09:30 AM – 12:30 PM", venue: "Room 204" },
];

export default function AdminExamsPage() {
  const [activeTab, setActiveTab] = useState<"schedules" | "results">("schedules");
  const [schedules, setSchedules] = useState<ExamScheduleItem[]>(INITIAL_SCHEDULE);
  const [results, setResults] = useState<ResultRecord[]>(DEMO_RESULTS);
  const [toast, setToast] = useState<string | null>(null);

  // Forms
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [scheduleForm, setScheduleForm] = useState({
    class: "Class V",
    subject: "",
    date: "",
    time: "09:30 AM – 12:00 PM",
    venue: "Main Hall",
  });

  const [resultForm, setResultForm] = useState({
    studentName: "",
    class: "Class V",
    exam: "Half-Yearly 2026",
    subject: "Mathematics",
    marks: "80/100",
    grade: "A",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleForm.subject || !scheduleForm.date) {
      alert("Please fill in subject and date");
      return;
    }
    const newItem: ExamScheduleItem = {
      id: `EX${String(schedules.length + 1).padStart(2, "0")}`,
      ...scheduleForm,
    };
    setSchedules([...schedules, newItem]);
    setIsScheduleModalOpen(false);
    showToast(`Exam timetable slot added for ${scheduleForm.subject}.`);
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultForm.studentName) {
      alert("Please enter student name");
      return;
    }
    const newRes: ResultRecord = {
      id: `RES${String(results.length + 1).padStart(3, "0")}`,
      ...resultForm,
    };
    setResults([newRes, ...results]);
    setIsResultModalOpen(false);
    showToast(`Marks entry recorded for ${resultForm.studentName}.`);
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
            Examinations & Progress Evaluation
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
            Timetable scheduling, invigilation rosters, and term examination marksheets.
          </p>
        </div>

        <div>
          {activeTab === "schedules" ? (
            <button onClick={() => setIsScheduleModalOpen(true)} className="btn-primary" style={{ fontSize: "0.85rem" }}>
              + Schedule Exam Slot
            </button>
          ) : (
            <button onClick={() => setIsResultModalOpen(true)} className="btn-primary" style={{ fontSize: "0.85rem" }}>
              + Enter Marks Record
            </button>
          )}
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
        ⚠️ <strong>Demonstration Framework:</strong> In a production setup, marks entry integrates with automatic grading calculations, grace mark policies, and print-ready student report cards with school seal.
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "2px solid #e2e8f0", marginBottom: "1.5rem" }}>
        <button
          onClick={() => setActiveTab("schedules")}
          style={{
            padding: "0.6rem 1.25rem",
            border: "none",
            background: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: activeTab === "schedules" ? "#1e4fc2" : "#64748b",
            borderBottom: activeTab === "schedules" ? "3px solid #1e4fc2" : "3px solid transparent",
            cursor: "pointer",
            marginBottom: "-2px",
          }}
        >
          📅 Exam Schedules ({schedules.length})
        </button>
        <button
          onClick={() => setActiveTab("results")}
          style={{
            padding: "0.6rem 1.25rem",
            border: "none",
            background: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: activeTab === "results" ? "#1e4fc2" : "#64748b",
            borderBottom: activeTab === "results" ? "3px solid #1e4fc2" : "3px solid transparent",
            cursor: "pointer",
            marginBottom: "-2px",
          }}
        >
          📊 Student Results & Marks ({results.length})
        </button>
      </div>

      {/* Tab 1: Schedules */}
      {activeTab === "schedules" && (
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Class</th>
                <th>Subject Paper</th>
                <th>Date</th>
                <th>Session Time</th>
                <th>Examination Hall</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((sch) => (
                <tr key={sch.id}>
                  <td style={{ fontWeight: 600, color: "var(--blue)" }}>{sch.id}</td>
                  <td>
                    <span style={{ background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontWeight: 600, fontSize: "0.78rem" }}>
                      {sch.class}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>{sch.subject}</td>
                  <td style={{ color: "#475569" }}>{sch.date}</td>
                  <td style={{ color: "#475569" }}>{sch.time}</td>
                  <td style={{ color: "#64748b" }}>{sch.venue}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSchedules(schedules.filter((s) => s.id !== sch.id));
                        showToast(`Removed slot ${sch.id}`);
                      }}
                      style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: "0.85rem" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Results */}
      {activeTab === "results" && (
        <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Result ID</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Examination</th>
                <th>Subject</th>
                <th>Marks Scored</th>
                <th>Assigned Grade</th>
                <th>Report Card</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.id}>
                  <td style={{ fontWeight: 600, color: "var(--blue)", fontSize: "0.8rem" }}>{res.id}</td>
                  <td style={{ fontWeight: 600, color: "#0f172a" }}>{res.studentName}</td>
                  <td>
                    <span style={{ background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "0.3rem", fontWeight: 600, fontSize: "0.78rem" }}>
                      {res.class}
                    </span>
                  </td>
                  <td style={{ color: "#475569", fontSize: "0.8rem" }}>{res.exam}</td>
                  <td style={{ fontWeight: 500 }}>{res.subject}</td>
                  <td style={{ fontWeight: 700, color: "#0f172a" }}>{res.marks}</td>
                  <td>
                    <span style={{ background: "#dcfce7", color: "#166534", padding: "0.2rem 0.6rem", borderRadius: "1rem", fontSize: "0.75rem", fontWeight: 800 }}>
                      {res.grade}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => showToast(`Generating Printable Progress Card for ${res.studentName} (Demo preview)`)}
                      style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1e40af", padding: "0.25rem 0.55rem", borderRadius: "0.3rem", fontSize: "0.75rem", cursor: "pointer", fontWeight: 600 }}
                    >
                      🖨️ Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal 1: Add Schedule */}
      {isScheduleModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setIsScheduleModalOpen(false)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "460px", padding: "1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: "0 0 1.25rem" }}>Schedule Examination Paper</h3>
            <form onSubmit={handleAddSchedule} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Class</label>
                <select
                  value={scheduleForm.class}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, class: e.target.value })}
                  className="form-input"
                >
                  {["Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Subject Paper *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mathematics"
                  value={scheduleForm.subject}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, subject: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  required
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Timing</label>
                <input
                  type="text"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setIsScheduleModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Add Timetable Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add Result */}
      {isResultModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setIsResultModalOpen(false)} />
          <div style={{ position: "relative", background: "white", borderRadius: "0.75rem", width: "100%", maxWidth: "460px", padding: "1.75rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: "0 0 1.25rem" }}>Record Student Marks</h3>
            <form onSubmit={handleAddResult} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label className="form-label">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={resultForm.studentName}
                  onChange={(e) => setResultForm({ ...resultForm, studentName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Class</label>
                  <select
                    value={resultForm.class}
                    onChange={(e) => setResultForm({ ...resultForm, class: e.target.value })}
                    className="form-input"
                  >
                    {["Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    value={resultForm.subject}
                    onChange={(e) => setResultForm({ ...resultForm, subject: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Marks (e.g. 85/100)</label>
                  <input
                    type="text"
                    value={resultForm.marks}
                    onChange={(e) => setResultForm({ ...resultForm, marks: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Grade</label>
                  <select
                    value={resultForm.grade}
                    onChange={(e) => setResultForm({ ...resultForm, grade: e.target.value })}
                    className="form-input"
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                <button type="button" onClick={() => setIsResultModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Marks</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

