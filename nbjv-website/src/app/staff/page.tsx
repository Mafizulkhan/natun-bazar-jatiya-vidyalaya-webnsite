import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { STAFF_MEMBERS, StaffMember } from "@/lib/data";

const principal = STAFF_MEMBERS.find((s) => s.designation === "Principal")!;
const teachers: StaffMember[] = STAFF_MEMBERS.filter((s) => s.isDemo);

export default function StaffPage() {
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
              "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.09) 0%, transparent 60%)",
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
            Meet Our Team
          </p>
          <h1
            style={{
              color: "var(--white)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontFamily: "Georgia, serif",
              marginBottom: "1rem",
            }}
          >
            Teachers &amp; Staff
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
            Dedicated educators shaping the futures of students at Natun Bazar Jatiya Vidyalaya.
          </p>
        </div>
      </section>

      {/* Demo Disclaimer */}
      <div
        style={{
          background: "#fefce8",
          borderBottom: "1px solid #fde68a",
          borderTop: "1px solid #fde68a",
          padding: "0.85rem 1.5rem",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: "0.85rem", color: "#78350f", lineHeight: 1.6, margin: 0 }}>
            <strong>Demo Content:</strong> Staff profiles below are placeholders. The principal&apos;s
            name is sourced from a recruitment poster and requires confirmation. Teacher profiles are
            illustrative — actual staff details will be provided by school administration before
            publishing.
          </p>
        </div>
      </div>

      {/* Principal Section */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              className="gold-underline gold-underline-center"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontFamily: "Georgia, serif",
                color: "var(--navy)",
                display: "inline-block",
                paddingBottom: "0.5rem",
              }}
            >
              School Principal
            </h2>
          </div>

          {/* Principal Card */}
          <div
            style={{
              maxWidth: "480px",
              margin: "0 auto",
              background: "var(--white)",
              borderRadius: "1.25rem",
              boxShadow: "0 8px 40px rgba(15,32,68,0.12)",
              border: "1px solid var(--grey-200)",
              padding: "2.5rem 2rem",
              textAlign: "center",
            }}
          >
            {/* Photo placeholder */}
            <div
              style={{
                width: "140px",
                height: "140px",
                border: "2.5px dashed var(--grey-400)",
                borderRadius: "50%",
                background: "var(--grey-100)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <span style={{ fontSize: "3rem", lineHeight: 1 }}>👤</span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "var(--grey-400)",
                  marginTop: "0.3rem",
                  fontWeight: 500,
                }}
              >
                Photo TBC
              </span>
            </div>

            {/* Name */}
            <h3
              style={{
                fontSize: "1.5rem",
                fontFamily: "Georgia, serif",
                color: "var(--navy)",
                marginBottom: "0.3rem",
              }}
            >
              {principal.name}
            </h3>

            {/* Title badge */}
            <span
              style={{
                display: "inline-block",
                background: "var(--navy)",
                color: "var(--gold-light)",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.3rem 1rem",
                borderRadius: "2rem",
                marginBottom: "1rem",
              }}
            >
              {principal.designation}
            </span>

            {/* Source note */}
            <p
              style={{
                fontSize: "0.78rem",
                fontStyle: "italic",
                color: "var(--text-muted)",
                background: "var(--grey-50)",
                border: "1px solid var(--grey-200)",
                borderRadius: "0.5rem",
                padding: "0.6rem 0.9rem",
                marginBottom: "1.25rem",
                lineHeight: 1.55,
              }}
            >
              ℹ️ {principal.note}
            </p>

            {/* Description placeholder */}
            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              [A message or brief profile from the Principal will be featured here once
              provided by school administration. This space is reserved for an introduction
              to the school&apos;s vision and leadership.]
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Staff Section */}
      <section className="section" style={{ background: "var(--grey-50)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              className="gold-underline gold-underline-center"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontFamily: "Georgia, serif",
                color: "var(--navy)",
                display: "inline-block",
                paddingBottom: "0.5rem",
              }}
            >
              Teaching Staff
            </h2>
            <p
              style={{
                marginTop: "1.25rem",
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
              }}
            >
              The following profiles are illustrative placeholders. Actual teacher details will
              be populated once provided by the school.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
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
                {/* Circle photo placeholder */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    border: "2px dashed var(--grey-200)",
                    borderRadius: "50%",
                    background: "var(--grey-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: "2rem",
                  }}
                >
                  👤
                </div>

                {/* Name — muted since demo */}
                <h4
                  style={{
                    fontSize: "1rem",
                    fontFamily: "Georgia, serif",
                    color: "var(--grey-400)",
                    marginBottom: "0.4rem",
                    fontStyle: "italic",
                  }}
                >
                  {teacher.name}
                </h4>

                {/* Designation */}
                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--navy)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {teacher.designation}
                </p>

                {/* Subject */}
                {teacher.subject && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {teacher.subject}
                  </p>
                )}

                {/* Section badge */}
                {teacher.section && (
                  <span
                    style={{
                      display: "inline-block",
                      background:
                        teacher.section === "Upper Primary"
                          ? "rgba(30,79,194,0.1)"
                          : "rgba(201,168,76,0.15)",
                      color:
                        teacher.section === "Upper Primary"
                          ? "var(--blue)"
                          : "#92400e",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.65rem",
                      borderRadius: "1rem",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {teacher.section}
                  </span>
                )}

                {/* Demo note */}
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontStyle: "italic",
                    color: "var(--grey-400)",
                    marginTop: "0.5rem",
                    lineHeight: 1.5,
                    borderTop: "1px solid var(--grey-100)",
                    paddingTop: "0.65rem",
                  }}
                >
                  {teacher.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team — Recruitment Section */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              background: "linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)",
              borderRadius: "1.25rem",
              padding: "2.5rem 2rem",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Gold accent top border */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))",
              }}
            />

            <h2
              style={{
                fontSize: "1.5rem",
                fontFamily: "Georgia, serif",
                color: "var(--white)",
                marginBottom: "0.5rem",
              }}
            >
              Join Our Team
            </h2>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--gold-light)",
                fontStyle: "italic",
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}
            >
              ℹ️ The following recruitment information is based on a recruitment poster
              supplied for this website concept. All details require confirmation from school
              administration before this information is considered verified.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Positions */}
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    color: "var(--gold)",
                    marginBottom: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                >
                  Positions Open
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {["Lower Primary Teacher", "Upper Primary Teacher"].map((pos) => (
                    <li
                      key={pos}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.95rem",
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "var(--gold)",
                          borderRadius: "50%",
                          flexShrink: 0,
                        }}
                      />
                      {pos}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "1rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      marginBottom: "0.2rem",
                      fontWeight: 600,
                    }}
                  >
                    Eligibility
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
                    Freshers &amp; Experienced
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      marginBottom: "0.2rem",
                      fontWeight: 600,
                    }}
                  >
                    Salary
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>
                    Negotiable
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      marginBottom: "0.2rem",
                      fontWeight: 600,
                    }}
                  >
                    Contact
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--gold-light)" }}>
                    9365232226
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      marginBottom: "0.2rem",
                      fontWeight: 600,
                    }}
                  >
                    Source
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    Recruitment poster
                  </p>
                </div>
              </div>

              {/* Confirmation note */}
              <div
                style={{
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  ⚠️ The contact number listed above (9365232226) is as listed on the recruitment
                  poster. All recruitment details require official confirmation from school
                  administration before this website is published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
