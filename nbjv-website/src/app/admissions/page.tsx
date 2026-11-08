"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHOOL } from "@/lib/data";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  parentName: string;
  studentName: string;
  dob: string;
  phone: string;
  email: string;
  classInterested: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  parentName?: string;
  studentName?: string;
  dob?: string;
  phone?: string;
  email?: string;
  classInterested?: string;
  message?: string;
  consent?: string;
}

// ─── Admission Process Steps ──────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Submit Enquiry Form",
    description:
      "Fill out the online enquiry form below or visit the school office in person to express your interest in admission.",
    icon: "📋",
  },
  {
    step: 2,
    title: "School Response",
    description:
      "The school will review your enquiry and contact you via phone or email to schedule a visit or provide further information.",
    icon: "📞",
  },
  {
    step: 3,
    title: "Document Verification",
    description:
      "Bring the required documents to the school for verification. Our administrative staff will guide you through the process.",
    icon: "📄",
  },
  {
    step: 4,
    title: "Admission Confirmation",
    description:
      "Upon successful verification and seat availability, admission will be confirmed and details will be communicated.",
    icon: "✅",
  },
];

// ─── Eligibility Cards ────────────────────────────────────────────────────────

const ELIGIBILITY_ITEMS = [
  {
    title: "Age Criteria",
    description:
      "[Age criteria to be confirmed by school administration. Typically based on class-wise age norms as per state board guidelines.]",
    icon: "🎂",
  },
  {
    title: "Previous Class Completion",
    description:
      "[Completion of the preceding class with passing grades is generally required. Specific criteria require confirmation from the school.]",
    icon: "📚",
  },
  {
    title: "Residential Preference",
    description:
      "[Information regarding any residential preference or priority for local students to be confirmed by the school.]",
    icon: "🏠",
  },
  {
    title: "Seat Availability",
    description:
      "[Admission is subject to seat availability in the respective class. Contact the school for current availability details.]",
    icon: "💺",
  },
];

// ─── Required Documents ───────────────────────────────────────────────────────

const REQUIRED_DOCS = [
  { icon: "🪪", label: "Birth Certificate (original + photocopy)" },
  { icon: "📊", label: "Previous Class Report Card / Mark Sheet" },
  { icon: "🏠", label: "Residential Proof (Aadhaar card / utility bill)" },
  { icon: "📸", label: "Passport-size Photographs (4 copies)" },
  { icon: "🏥", label: "Health / Medical Certificate (if applicable)" },
  { icon: "🔖", label: "Transfer Certificate from previous school (if applicable)" },
  { icon: "📋", label: "Caste Certificate (if applicable)" },
];

// ─── Validation ───────────────────────────────────────────────────────────────

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.parentName.trim()) {
    errors.parentName = "Parent / Guardian name is required.";
  }

  if (!data.studentName.trim()) {
    errors.studentName = "Student name is required.";
  }

  if (!data.dob) {
    errors.dob = "Student date of birth is required.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Contact number is required.";
  } else if (!/^\d{10}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.classInterested) {
    errors.classInterested = "Please select the class interested in.";
  }

  if (!data.message.trim()) {
    errors.message = "Please add a brief message or query.";
  }

  if (!data.consent) {
    errors.consent = "You must agree to the terms to submit this enquiry.";
  }

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdmissionsPage() {
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    studentName: "",
    dob: "",
    phone: "",
    email: "",
    classInterested: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
    // Clear error on change
    if (errors[target.name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [target.name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulate async submission — no real data sent
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  }

  function handleReset() {
    setFormData({
      parentName: "",
      studentName: "",
      dob: "",
      phone: "",
      email: "",
      classInterested: "",
      message: "",
      consent: false,
    });
    setErrors({});
    setIsSuccess(false);
  }

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, #091530 0%, #0f2044 60%, #1a3a6e 100%)",
          padding: "5rem 0 3.5rem",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              marginBottom: "1.25rem",
              fontSize: "0.85rem",
              color: "rgba(226,196,122,0.75)",
            }}
          >
            <Link href="/" style={{ color: "rgba(226,196,122,0.75)" }}>
              Home
            </Link>
            <span style={{ margin: "0 0.5rem" }}>›</span>
            <span style={{ color: "#e2c47a" }}>Admissions</span>
          </nav>

          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontFamily: "Georgia, serif",
              marginBottom: "0.75rem",
            }}
          >
            Admissions
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.1rem",
              maxWidth: "560px",
            }}
          >
            Begin your child&apos;s journey at Natun Bazar Jatiya Vidyalaya. Find out how to
            apply and what to expect.
          </p>
        </div>
      </section>

      {/* ── Introduction ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#f8f9fc" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Left — intro text */}
            <div>
              <h2
                className="gold-underline"
                style={{
                  fontSize: "1.75rem",
                  color: "#0f2044",
                  marginBottom: "1.75rem",
                }}
              >
                Welcome to Our Admissions
              </h2>
              <p style={{ color: "#3d4f6e", lineHeight: 1.8, marginBottom: "1rem" }}>
                [<em>Demo copy — to be replaced with official content from the school.</em>]{" "}
                Natun Bazar Jatiya Vidyalaya offers quality primary and upper primary education
                to children in the Lanka, Hojai district of Assam. We are committed to
                nurturing young minds in a safe, inclusive, and academically rigorous
                environment.
              </p>
              <p style={{ color: "#3d4f6e", lineHeight: 1.8, marginBottom: "1rem" }}>
                Admissions to Class I through Class VIII are considered subject to eligibility
                and seat availability. We encourage parents and guardians to reach out early to
                secure a place for their child.
              </p>
              <p style={{ color: "#3d4f6e", lineHeight: 1.8 }}>
                For any immediate queries, please contact the school directly at{" "}
                <strong style={{ color: "#0f2044" }}>+91 {SCHOOL.phone.number}</strong>{" "}
                <span
                  style={{ fontSize: "0.8rem", color: "#6b7a99", fontStyle: "italic" }}
                >
                  ({SCHOOL.phone.source})
                </span>
                .
              </p>
            </div>

            {/* Right — Important Notice card */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "0.875rem",
                border: "2px solid #c9a84c",
                padding: "1.75rem",
                boxShadow: "0 4px 20px rgba(15,32,68,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>📢</span>
                <h3
                  style={{
                    color: "#0f2044",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  Important Notice
                </h3>
              </div>
              <div
                style={{
                  background: "#fef9ec",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  borderLeft: "4px solid #c9a84c",
                  marginBottom: "1.25rem",
                }}
              >
                <p style={{ color: "#92400e", fontWeight: 600, fontSize: "0.95rem" }}>
                  🎓 Admissions are currently open for the academic session 2027–28.
                </p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Applications being accepted for Class I to Class VIII",
                  "Subject to seat availability in each class",
                  "Documents verification required in person",
                  "No registration fee for submitting an enquiry",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      marginBottom: "0.6rem",
                      color: "#3d4f6e",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ color: "#c9a84c", flexShrink: 0 }}>✔</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid #e2e6ef" }}>
                <p style={{ fontSize: "0.85rem", color: "#6b7a99", marginBottom: "0.4rem" }}>
                  School Contact:
                </p>
                <a
                  href={`tel:${SCHOOL.phone.number}`}
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#0f2044",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  📱 +91 {SCHOOL.phone.number}
                </a>
                <p style={{ fontSize: "0.75rem", color: "#9ba7c0", marginTop: "0.25rem", fontStyle: "italic" }}>
                  {SCHOOL.phone.label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admission Process Steps ───────────────────────────────────────── */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              className="gold-underline gold-underline-center"
              style={{ fontSize: "1.75rem", color: "#0f2044", display: "inline-block" }}
            >
              Admission Process
            </h2>
            <p style={{ color: "#6b7a99", marginTop: "1.25rem", fontSize: "0.875rem", fontStyle: "italic" }}>
              [Proposed procedure — to be confirmed by school administration]
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="card-hover"
                style={{
                  background: "#f8f9fc",
                  borderRadius: "0.875rem",
                  padding: "1.75rem",
                  border: "1px solid #e2e6ef",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Step number accent */}
                <div
                  style={{
                    position: "absolute",
                    top: "-14px",
                    right: "-10px",
                    fontSize: "5rem",
                    fontWeight: 900,
                    color: "rgba(201,168,76,0.08)",
                    fontFamily: "Georgia, serif",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {item.step}
                </div>

                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: "#0f2044",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c9a84c",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    marginBottom: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>

                <div style={{ fontSize: "1.75rem", marginBottom: "0.6rem" }}>{item.icon}</div>

                <h3
                  style={{
                    fontSize: "1rem",
                    color: "#0f2044",
                    fontWeight: 700,
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#5a6782", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eligibility Information ───────────────────────────────────────── */}
      <section className="section" style={{ background: "#f0f2f7" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              className="gold-underline gold-underline-center"
              style={{ fontSize: "1.75rem", color: "#0f2044", display: "inline-block" }}
            >
              Eligibility Information
            </h2>
            <p style={{ color: "#6b7a99", marginTop: "1.25rem", fontSize: "0.875rem", fontStyle: "italic" }}>
              [All eligibility details require confirmation from the school]
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {ELIGIBILITY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="card-hover"
                style={{
                  background: "#ffffff",
                  borderRadius: "0.875rem",
                  padding: "1.75rem",
                  border: "1px solid #e2e6ef",
                  boxShadow: "0 2px 8px rgba(15,32,68,0.05)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h3
                  style={{
                    fontSize: "1rem",
                    color: "#0f2044",
                    fontWeight: 700,
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#5a6782",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Documents ────────────────────────────────────────────── */}
      <section className="section" style={{ background: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            <div>
              <h2
                className="gold-underline"
                style={{ fontSize: "1.75rem", color: "#0f2044", marginBottom: "1.75rem" }}
              >
                Required Documents
              </h2>
              <p
                style={{
                  color: "#6b7a99",
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                  borderLeft: "3px solid #c9a84c",
                  paddingLeft: "0.75rem",
                }}
              >
                [Document list to be confirmed by school administration. The list below is
                indicative and may change.]
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {REQUIRED_DOCS.map((doc, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      padding: "0.75rem 0",
                      borderBottom: idx < REQUIRED_DOCS.length - 1 ? "1px solid #f0f2f7" : "none",
                    }}
                  >
                    <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{doc.icon}</span>
                    <span style={{ color: "#2d3a52", fontSize: "0.95rem" }}>{doc.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right info panel */}
            <div>
              <div
                style={{
                  background: "#f8f9fc",
                  borderRadius: "0.875rem",
                  padding: "1.75rem",
                  border: "1px solid #e2e6ef",
                  marginBottom: "1.5rem",
                }}
              >
                <h3 style={{ color: "#0f2044", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                  💡 Tips for a Smooth Process
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Carry both originals and photocopies of all documents.",
                    "Ensure photographs are recent (taken within 3 months).",
                    "Contact the school in advance to confirm requirements.",
                    "Submit the enquiry form below before visiting the school.",
                  ].map((tip, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.6rem",
                        color: "#3d4f6e",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#1e4fc2", flexShrink: 0 }}>→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "#0f2044",
                  borderRadius: "0.875rem",
                  padding: "1.75rem",
                  color: "#ffffff",
                }}
              >
                <h3 style={{ color: "#c9a84c", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Office Hours
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  [Office hours to be confirmed by the school]
                </p>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
                  📅 Monday – Saturday
                </p>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
                  🕘 [Timing to be confirmed]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admission Enquiry Form ────────────────────────────────────────── */}
      <section className="section" style={{ background: "linear-gradient(135deg, #f0f2f7 0%, #e8ecf5 100%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              className="gold-underline gold-underline-center"
              style={{ fontSize: "1.75rem", color: "#0f2044", display: "inline-block" }}
            >
              Admission Enquiry Form
            </h2>
            <p style={{ color: "#5a6782", marginTop: "1.25rem", maxWidth: "520px", margin: "1.25rem auto 0" }}>
              Fill in the details below and our team will get in touch with you shortly.
            </p>
          </div>

          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              background: "#ffffff",
              borderRadius: "1rem",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              boxShadow: "0 8px 40px rgba(15,32,68,0.1)",
              border: "1px solid #e2e6ef",
            }}
          >
            {/* Success State */}
            {isSuccess ? (
              <div
                className="animate-fadeInUp"
                style={{ textAlign: "center", padding: "2rem 0" }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
                <h3
                  style={{
                    color: "#0f2044",
                    fontSize: "1.4rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Enquiry Submitted Successfully!
                </h3>
                <p style={{ color: "#5a6782", maxWidth: "420px", margin: "0 auto 0.75rem" }}>
                  Thank you for your interest. We have received your enquiry and will contact
                  you within 1–2 working days.
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#9ba7c0",
                    fontStyle: "italic",
                    marginBottom: "1.75rem",
                    background: "#f8f9fc",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 1rem",
                    display: "inline-block",
                  }}
                >
                  [DEMO — No actual data was collected or transmitted. This is a website
                  demonstration only.]
                </p>
                <br />
                <button className="btn-primary" onClick={handleReset}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Parent Name + Student Name */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <label htmlFor="parentName" className="form-label">
                      Parent / Guardian Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      className={`form-input${errors.parentName ? " error" : ""}`}
                      placeholder="e.g. Ramesh Das"
                      value={formData.parentName}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.parentName && (
                      <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        {errors.parentName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="studentName" className="form-label">
                      Student Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      className={`form-input${errors.studentName ? " error" : ""}`}
                      placeholder="e.g. Priya Das"
                      value={formData.studentName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.studentName && (
                      <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        {errors.studentName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Date of Birth + Class Interested */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <label htmlFor="dob" className="form-label">
                      Student Date of Birth (DOB) <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className={`form-input${errors.dob ? " error" : ""}`}
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && (
                      <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="classInterested" className="form-label">
                      Class Interested In <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      id="classInterested"
                      name="classInterested"
                      className={`form-input${errors.classInterested ? " error" : ""}`}
                      value={formData.classInterested}
                      onChange={handleChange}
                    >
                      <option value="">— Select a class —</option>
                      {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((cls) => (
                        <option key={cls} value={`Class ${cls}`}>
                          Class {cls}
                        </option>
                      ))}
                    </select>
                    {errors.classInterested && (
                      <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        {errors.classInterested}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Phone + Email */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Contact Number <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-input${errors.phone ? " error" : ""}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input${errors.email ? " error" : ""}`}
                      placeholder="e.g. parent@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Message */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="message" className="form-label">
                    Message / Query <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-input${errors.message ? " error" : ""}`}
                    placeholder="Please share any specific questions or requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    style={{ resize: "vertical", minHeight: "100px" }}
                  />
                  {errors.message && (
                    <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Consent checkbox */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="consent"
                      id="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      style={{
                        width: "1.1rem",
                        height: "1.1rem",
                        flexShrink: 0,
                        marginTop: "0.15rem",
                        accentColor: "#0f2044",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ fontSize: "0.875rem", color: "#3d4f6e", lineHeight: 1.6 }}>
                      I understand this is a demonstration website and that submitting this
                      form does not constitute an official admission application. I consent to
                      being contacted by the school for enquiry purposes.{" "}
                      <span style={{ color: "#ef4444" }}>*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.4rem" }}>
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.75 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          style={{
                            display: "inline-block",
                            width: "1rem",
                            height: "1rem",
                            border: "2px solid rgba(15,32,68,0.3)",
                            borderTopColor: "#0f2044",
                            borderRadius: "50%",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                        Submitting…
                      </>
                    ) : (
                      "Submit Enquiry →"
                    )}
                  </button>
                  <span style={{ fontSize: "0.8rem", color: "#9ba7c0", fontStyle: "italic" }}>
                    * Required fields
                  </span>
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Demo Disclaimer ───────────────────────────────────────────────── */}
      <section className="section-sm" style={{ background: "#091530" }}>
        <div className="container">
          <div
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚠️</span>
            <div>
              <p
                style={{
                  color: "#e2c47a",
                  fontWeight: 700,
                  marginBottom: "0.4rem",
                  fontSize: "0.9rem",
                }}
              >
                DEMO PAGE — ADMISSIONS
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", lineHeight: 1.7 }}>
                This admissions page is part of a demonstration website concept prepared by{" "}
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>Handshake Co.</strong> It
                has not been commissioned or approved by Natun Bazar Jatiya Vidyalaya. All
                eligibility criteria, process steps, document requirements, and form
                submissions shown here are illustrative placeholders. No real admissions data
                is collected. Contact the school directly at{" "}
                <strong style={{ color: "#e2c47a" }}>+91 {SCHOOL.phone.number}</strong> for
                official admission information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
