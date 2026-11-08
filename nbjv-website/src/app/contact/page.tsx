"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHOOL, AGENCY } from "@/lib/data";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters.";
    }
    return newErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitState("loading");
    // Simulate async submission (demo — no backend)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitState("success");
  }

  function handleReset() {
    setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
    setSubmitState("idle");
  }

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 60%, var(--navy-light) 100%)",
          padding: "5rem 0 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 80% 30%, rgba(201,168,76,0.09) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Get In Touch
          </p>
          <h1
            style={{
              color: "var(--white)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontFamily: "Georgia, serif",
              marginBottom: "1rem",
            }}
          >
            Contact Us
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We&apos;d love to hear from you. Reach out for admissions, general enquiries,
            or to visit the school.
          </p>
        </div>
      </section>

      {/* Important Notice Banner */}
      <div
        style={{
          background: "#fff7ed",
          borderBottom: "1px solid #fed7aa",
          borderTop: "1px solid #fed7aa",
          padding: "0.85rem 1.5rem",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>📋</span>
          <p style={{ fontSize: "0.85rem", color: "#7c2d12", lineHeight: 1.6, margin: 0 }}>
            <strong>Important Notice:</strong> All contact details shown on this page are based on
            third-party directory listings or a recruitment poster and require official confirmation
            from school administration before this website is published. Do not rely on these details
            as verified until confirmed.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="section" style={{ background: "var(--grey-50)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              className="gold-underline gold-underline-center"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
                fontFamily: "Georgia, serif",
                color: "var(--navy)",
                display: "inline-block",
                paddingBottom: "0.5rem",
              }}
            >
              Contact Information
            </h2>
          </div>

          {/* Three info cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            {/* Address */}
            <div
              className="card-hover"
              style={{
                background: "var(--white)",
                borderRadius: "1rem",
                boxShadow: "0 2px 14px rgba(15,32,68,0.07)",
                border: "1px solid var(--grey-200)",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(15,32,68,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  margin: "0 auto 1rem",
                }}
              >
                📍
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontFamily: "Georgia, serif",
                  color: "var(--navy)",
                  marginBottom: "0.5rem",
                }}
              >
                Address
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "0.75rem",
                }}
              >
                {SCHOOL.location.full}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  background: "var(--grey-50)",
                  border: "1px solid var(--grey-200)",
                  borderRadius: "0.4rem",
                  padding: "0.4rem 0.65rem",
                  lineHeight: 1.5,
                }}
              >
                ℹ️ Directory-listed address — official confirmation required
              </p>
            </div>

            {/* Phone */}
            <div
              className="card-hover"
              style={{
                background: "var(--white)",
                borderRadius: "1rem",
                boxShadow: "0 2px 14px rgba(15,32,68,0.07)",
                border: "1px solid var(--grey-200)",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(15,32,68,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  margin: "0 auto 1rem",
                }}
              >
                📞
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontFamily: "Georgia, serif",
                  color: "var(--navy)",
                  marginBottom: "0.5rem",
                }}
              >
                Phone
              </h3>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginBottom: "0.75rem",
                  letterSpacing: "0.04em",
                }}
              >
                {SCHOOL.phone.number}
              </p>
            </div>

            {/* Email */}
            <div
              className="card-hover"
              style={{
                background: "var(--white)",
                borderRadius: "1rem",
                boxShadow: "0 2px 14px rgba(15,32,68,0.07)",
                border: "1px solid var(--grey-200)",
                padding: "1.75rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(15,32,68,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  margin: "0 auto 1rem",
                }}
              >
                ✉️
              </div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontFamily: "Georgia, serif",
                  color: "var(--navy)",
                  marginBottom: "0.5rem",
                }}
              >
                Email
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.5,
                }}
              >
                {SCHOOL.email}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  background: "var(--grey-50)",
                  border: "1px solid var(--grey-200)",
                  borderRadius: "0.4rem",
                  padding: "0.4rem 0.65rem",
                  lineHeight: 1.5,
                }}
              >
                ℹ️ Awaiting school administration details
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              border: "1.5px dashed var(--grey-400)",
              background: "var(--grey-100)",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "2.5rem 1.5rem",
              gap: "0.75rem",
            }}
          >
            <div style={{ fontSize: "2.5rem" }}>🗺️</div>
            <h3
              style={{
                fontSize: "1.05rem",
                color: "var(--grey-800)",
                fontFamily: "Georgia, serif",
              }}
            >
              School Location Map
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--text-muted)",
                maxWidth: "480px",
                lineHeight: 1.65,
              }}
            >
              School location map — location to be verified before embedding. Currently showing
              directory-listed address only:{" "}
              <strong style={{ color: "var(--grey-800)" }}>{SCHOOL.location.full}</strong>.
              An interactive map will be embedded here once the school&apos;s exact location
              is confirmed.
            </p>
            <span
              style={{
                fontSize: "0.75rem",
                fontStyle: "italic",
                color: "var(--grey-400)",
                borderTop: "1px solid var(--grey-200)",
                paddingTop: "0.6rem",
                marginTop: "0.25rem",
              }}
            >
              Map integration pending location verification
            </span>
          </div>
        </div>
      </section>

      {/* Contact Form + School Hours */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr min(360px, 100%)",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Contact Form */}
            <div>
              <h2
                className="gold-underline"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.875rem)",
                  fontFamily: "Georgia, serif",
                  color: "var(--navy)",
                  display: "inline-block",
                  paddingBottom: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                Send Us a Message
              </h2>

              {submitState === "success" ? (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1.5px solid #86efac",
                    borderRadius: "1rem",
                    padding: "2.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      color: "#15803d",
                      fontFamily: "Georgia, serif",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message Received!
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#166534",
                      lineHeight: 1.65,
                      marginBottom: "1.25rem",
                    }}
                  >
                    Thank you for getting in touch. This is a demonstration form — in a live
                    deployment, your message would be sent to the school. We appreciate your
                    interest in Natun Bazar Jatiya Vidyalaya.
                  </p>
                  <button onClick={handleReset} className="btn-primary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`form-input${errors.fullName ? " error" : ""}`}
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "0.3rem" }}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email + Phone row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`form-input${errors.email ? " error" : ""}`}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "0.3rem" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone Number{" "}
                        <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className="form-input"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="form-label">
                      Subject <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Admission Enquiry, General Query"
                      className={`form-input${errors.subject ? " error" : ""}`}
                    />
                    {errors.subject && (
                      <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: "0.3rem" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="form-label">
                      Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here (minimum 20 characters)..."
                      className={`form-input${errors.message ? " error" : ""}`}
                      style={{ resize: "vertical", minHeight: "120px", fontFamily: "inherit" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginTop: "0.3rem",
                      }}
                    >
                      {errors.message ? (
                        <p style={{ color: "#ef4444", fontSize: "0.78rem" }}>{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color:
                            formData.message.length < 20 && formData.message.length > 0
                              ? "#ef4444"
                              : "var(--text-muted)",
                          marginLeft: "auto",
                        }}
                      >
                        {formData.message.length} / 20+ chars
                      </span>
                    </div>
                  </div>

                  {/* Demo note */}
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontStyle: "italic",
                      color: "var(--text-muted)",
                      lineHeight: 1.55,
                      borderTop: "1px solid var(--grey-100)",
                      paddingTop: "0.75rem",
                    }}
                  >
                    📌 This is a demonstration form. In a live website, submissions would be
                    delivered to the school. No data is stored or transmitted from this demo.
                  </p>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={submitState === "loading"}
                      style={{
                        opacity: submitState === "loading" ? 0.75 : 1,
                        cursor: submitState === "loading" ? "not-allowed" : "pointer",
                        minWidth: "180px",
                        justifyContent: "center",
                      }}
                    >
                      {submitState === "loading" ? (
                        <>
                          <span
                            style={{
                              width: "14px",
                              height: "14px",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "white",
                              borderRadius: "50%",
                              display: "inline-block",
                              animation: "spin 0.75s linear infinite",
                            }}
                          />
                          Sending…
                        </>
                      ) : (
                        "Send Message →"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right column: School Hours + Agency note */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* School Hours */}
              <div
                style={{
                  background: "var(--grey-50)",
                  borderRadius: "1rem",
                  border: "1px solid var(--grey-200)",
                  padding: "1.75rem 1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontFamily: "Georgia, serif",
                    color: "var(--navy)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  🕐 School Hours
                </h3>
                <div
                  style={{
                    background: "#fefce8",
                    border: "1px dashed #fde68a",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                      color: "#78350f",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    [School timings to be confirmed by school administration]
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: "0.75rem",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  Office visit timings, holiday schedules, and academic calendar details
                  will be listed here once confirmed by the school.
                </p>
              </div>

              {/* Quick Info */}
              <div
                style={{
                  background: "var(--grey-50)",
                  borderRadius: "1rem",
                  border: "1px solid var(--grey-200)",
                  padding: "1.75rem 1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontFamily: "Georgia, serif",
                    color: "var(--navy)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  🏫 About the School
                </h3>
                <dl
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    fontSize: "0.85rem",
                  }}
                >
                  {[
                    { label: "UDISE Code", value: SCHOOL.udise },
                    { label: "Type", value: SCHOOL.type },
                    { label: "Sections", value: SCHOOL.sections },
                    { label: "District", value: `${SCHOOL.location.city}, ${SCHOOL.location.district}` },
                    { label: "State", value: SCHOOL.location.state },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        paddingBottom: "0.5rem",
                        borderBottom: "1px solid var(--grey-200)",
                      }}
                    >
                      <dt style={{ color: "var(--text-muted)", fontWeight: 500 }}>{label}</dt>
                      <dd
                        style={{
                          color: "var(--navy)",
                          fontWeight: 600,
                          textAlign: "right",
                          margin: 0,
                        }}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Agency credit */}
              <div
                style={{
                  background: "linear-gradient(135deg, var(--navy-dark), var(--navy))",
                  borderRadius: "1rem",
                  padding: "1.25rem 1.5rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.55)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Website concept by
                </p>
                <a
                  href={AGENCY.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--gold-light)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  {AGENCY.name} ↗
                </a>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: "0.4rem",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  {AGENCY.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Important Notice */}
      <section
        style={{
          background: "#fef2f2",
          borderTop: "1px solid #fecaca",
          padding: "2rem 0",
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                color: "#991b1b",
                fontFamily: "Georgia, serif",
                marginBottom: "0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              🔴 Verification Required Before Publication
            </h3>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#7f1d1d",
                lineHeight: 1.7,
              }}
            >
              All contact details displayed on this page — including the address (
              {SCHOOL.location.source.toLowerCase()}), phone number (from {SCHOOL.phone.source.toLowerCase()}),
              and email — require official confirmation from Natun Bazar Jatiya Vidyalaya administration
              before this website is made publicly accessible. This page is part of a demonstration
              website concept prepared by {AGENCY.name} and has not been commissioned or approved
              by the school.
            </p>
          </div>
        </div>
      </section>

      {/* Spinner keyframe — injected via style tag */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </>
  );
}
