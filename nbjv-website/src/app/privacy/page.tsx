import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHOOL, AGENCY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ fontFamily: "inherit", color: "#1a1a1a" }}>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 100%)",
            color: "#ffffff",
            padding: "80px 24px 60px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: "1rem",
              opacity: 0.85,
              margin: 0,
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            {SCHOOL.name} &mdash; {SCHOOL.location.city}, {SCHOOL.location.district}
          </p>
        </section>

        {/* ── Content wrapper ───────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: "860px",
            marginInline: "auto",
            padding: "48px 24px 80px",
          }}
        >
          {/* ── DRAFT notice banner ─────────────────────────────────────────── */}
          <div
            role="alert"
            style={{
              background: "#fef9c3",
              border: "2px solid #ca8a04",
              borderRadius: "10px",
              padding: "24px 28px",
              marginBottom: "48px",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#854d0e",
                margin: "0 0 10px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              ⚠ DRAFT — Requires Review and Approval
            </p>
            <p style={{ margin: "0 0 8px", color: "#713f12", fontSize: "0.95rem", lineHeight: 1.65 }}>
              This privacy policy is a <strong>draft document prepared for demonstration purposes only</strong>. It has{" "}
              <strong>not</strong> been reviewed, approved, or adopted by {SCHOOL.name} or any affiliated body. It{" "}
              <strong>must not</strong> be treated as a legally binding policy.
            </p>
            <p style={{ margin: 0, color: "#713f12", fontSize: "0.95rem", lineHeight: 1.65 }}>
              Before this website is published publicly, this policy must be reviewed and approved by{" "}
              <strong>school administration</strong> and <strong>appropriate legal counsel</strong> to ensure compliance
              with applicable data-protection laws, including but not limited to the{" "}
              <em>Digital Personal Data Protection Act, 2023 (India)</em>.
            </p>
          </div>

          {/* ── 1. Introduction ─────────────────────────────────────────────── */}
          <Section title="1. Introduction">
            <p>
              This page describes how information submitted to or collected by this website may be handled. This website
              is a <strong>demonstration concept</strong> created by{" "}
              <strong>{AGENCY.name}</strong> to showcase a possible online presence for{" "}
              <strong>{SCHOOL.name}</strong>, {SCHOOL.location.full}. It has{" "}
              <strong>not been commissioned or officially approved</strong> by the school.
            </p>
            <p>
              In its current demo state, the website does not operate any live back-end, does not collect personal data
              in a production capacity, and is not publicly indexed. Nevertheless, this draft policy is provided in the
              spirit of transparency, to illustrate what a full privacy policy would cover should the website go live.
            </p>
          </Section>

          {/* ── 2. Information We May Collect ───────────────────────────────── */}
          <Section title="2. Information We May Collect">
            <p>
              If and when this website becomes operational, it may collect the following categories of information:
            </p>
            <h3 style={subHeadingStyle}>a. Enquiry Form Data</h3>
            <p>
              When a visitor submits the contact or admissions enquiry form, the following fields may be collected:
            </p>
            <ul style={listStyle}>
              <li>
                <strong>Full Name</strong> — the name of the parent, guardian, or enquirer.
              </li>
              <li>
                <strong>Contact Number</strong> — a phone number to follow up on the enquiry.
              </li>
              <li>
                <strong>Email Address</strong> — an email address for correspondence.
              </li>
              <li>
                <strong>Class of Interest</strong> — the grade or class level the student is being enquired about.
              </li>
              <li>
                <strong>Message</strong> — a free-text field for any additional information or questions.
              </li>
            </ul>
            <h3 style={subHeadingStyle}>b. Cookies and Local Storage</h3>
            <p>
              This website may use strictly necessary cookies or browser local storage to maintain basic session state
              (for example, to keep an admin user logged in during a session). No third-party advertising cookies or
              tracking pixels are used in the current design. If analytics tools are added in the future, this policy
              will be updated accordingly and visitors will be informed.
            </p>
            <h3 style={subHeadingStyle}>c. General Usage Data</h3>
            <p>
              Standard web server logs may capture information such as the visitor&apos;s IP address, browser type,
              referring URL, and pages visited. This data, if collected at all, would be used solely for diagnosing
              technical issues and understanding general usage patterns. It would not be used to identify individuals.
            </p>
          </Section>

          {/* ── 3. How Information Is Used ──────────────────────────────────── */}
          <Section title="3. How Information Is Used">
            <p>Any information collected through this website would be used exclusively for the following purposes:</p>
            <ul style={listStyle}>
              <li>
                <strong>Responding to enquiries</strong> — to reply to questions submitted through the contact or
                admissions form, within a reasonable timeframe.
              </li>
              <li>
                <strong>Contacting interested parents and guardians</strong> — to provide information about admissions
                procedures, available classes, school events, or other matters directly relevant to the submitted
                enquiry.
              </li>
              <li>
                <strong>School administration purposes</strong> — to allow the school administration to manage and
                follow up on enquiry records internally.
              </li>
            </ul>
            <p>
              Information collected will <strong>not</strong> be used for unsolicited marketing, sold to third parties,
              or used for any purpose not described in this policy without the explicit consent of the individual
              concerned.
            </p>
          </Section>

          {/* ── 4. Data Storage ─────────────────────────────────────────────── */}
          <Section title="4. Data Storage">
            <div
              style={{
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: "8px",
                padding: "16px 20px",
                marginBottom: "16px",
              }}
            >
              <p style={{ margin: 0, color: "#166534", fontSize: "0.95rem" }}>
                <strong>Demo notice:</strong> In the current demonstration version of this website, no form submissions
                are processed by a live back-end and <strong>no personal data is stored</strong> in any database or
                file system. Any data entered into forms exists only in the browser session and is not transmitted or
                retained.
              </p>
            </div>
            <p>
              Should this website transition to a production environment, appropriate secure data-storage measures would
              be implemented before launch. These would include, but not be limited to:
            </p>
            <ul style={listStyle}>
              <li>Storage of form data in a secure, access-controlled database hosted within India.</li>
              <li>Encryption of data in transit (HTTPS / TLS) and at rest where applicable.</li>
              <li>Role-based access controls ensuring only authorised school personnel can view enquiry data.</li>
              <li>A defined data-retention period after which records are securely deleted.</li>
            </ul>
            <p>
              Full storage details would be documented in the approved version of this policy prior to public launch.
            </p>
          </Section>

          {/* ── 5. Third-Party Services ─────────────────────────────────────── */}
          <Section title="5. Third-Party Services">
            <p>
              This website may integrate or link to third-party services. Visitors should be aware of the following:
            </p>
            <h3 style={subHeadingStyle}>a. Embedded Maps</h3>
            <p>
              If an embedded map (such as Google Maps) is used to display the school&apos;s location, the map provider
              may set its own cookies and collect data about the user&apos;s interaction with the map widget, subject to
              the map provider&apos;s own privacy policy. We would seek to minimise data collection by using
              privacy-friendly embedding options (e.g., Google Maps Embed API without tracking where possible).
            </p>
            <h3 style={subHeadingStyle}>b. External Images and Assets</h3>
            <p>
              Certain illustrative images used in the demo version may be sourced from stock image libraries. In a
              production version, all images would either be owned by the school, properly licensed, or attributed
              correctly. No external image CDN that tracks users is used in the current design.
            </p>
            <h3 style={subHeadingStyle}>c. No Third-Party Advertising</h3>
            <p>
              This website does not carry third-party advertising and does not use ad-network tracking scripts. This
              applies to both the demo and any planned production version.
            </p>
          </Section>

          {/* ── 6. Children's Privacy ───────────────────────────────────────── */}
          <Section title="6. Children&apos;s Privacy">
            <p>
              {SCHOOL.name} is an educational institution serving children. We take the privacy of children with
              particular seriousness.
            </p>
            <ul style={listStyle}>
              <li>
                This website is intended to be used by <strong>parents, guardians, and adults</strong> seeking
                information about the school on behalf of a child.
              </li>
              <li>
                We do <strong>not</strong> knowingly collect personal data directly from children below the age of 18
                without prior verifiable parental or guardian consent.
              </li>
              <li>
                Enquiry forms should be completed by a parent or guardian, not by a child.
              </li>
              <li>
                If we become aware that personal data has been submitted by or about a child without appropriate
                parental consent, we will delete that data promptly.
              </li>
              <li>
                In a production environment, the admissions process will include explicit consent mechanisms in
                accordance with applicable law, including the{" "}
                <em>Digital Personal Data Protection Act, 2023</em>.
              </li>
            </ul>
          </Section>

          {/* ── 7. Contact for Privacy Concerns ─────────────────────────────── */}
          <Section title="7. Contact for Privacy Concerns">
            <p>
              If you have any questions, concerns, or requests regarding this privacy policy or the handling of your
              personal data, please contact the school administration:
            </p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "20px 24px",
                marginTop: "12px",
              }}
            >
              <p style={{ margin: "0 0 6px" }}>
                <strong>{SCHOOL.name}</strong>
              </p>
              <p style={{ margin: "0 0 6px", color: "#475569" }}>{SCHOOL.location.full}</p>
              <p style={{ margin: "0 0 6px", color: "#475569" }}>
                Phone: {SCHOOL.phone.number}{" "}
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>({SCHOOL.phone.source})</span>
              </p>
              <p style={{ margin: 0, color: "#475569" }}>
                Email:{" "}
                <span style={{ color: "#64748b", fontStyle: "italic" }}>
                  [official-privacy-email@school.edu.in &mdash; placeholder, to be confirmed]
                </span>
              </p>
            </div>
            <p style={{ marginTop: "16px", fontSize: "0.9rem", color: "#64748b" }}>
              We aim to respond to all privacy-related queries within 30 days. For urgent matters involving a child
              &apos;s data, please contact us by phone in the first instance.
            </p>
          </Section>

          {/* ── 8. Policy Review ────────────────────────────────────────────── */}
          <Section title="8. Policy Review">
            <p>
              This policy is a <strong>draft</strong> that has not yet been approved or adopted. Before this website
              enters public use, this policy will be:
            </p>
            <ul style={listStyle}>
              <li>
                Reviewed by <strong>school administration</strong> to ensure it accurately reflects the school&apos;s
                data practices.
              </li>
              <li>
                Reviewed by <strong>qualified legal counsel</strong> to ensure compliance with Indian data-protection
                law, including the Digital Personal Data Protection Act, 2023, and any applicable state regulations.
              </li>
              <li>
                Formally <strong>approved and dated</strong> before publication.
              </li>
            </ul>
            <p>
              Once live, this policy will be reviewed at least annually, or whenever significant changes are made to
              the website, the services offered, or applicable law. Changes to the policy will be announced on this
              page, with the revision date updated accordingly.
            </p>
          </Section>

          {/* ── 9. Date ─────────────────────────────────────────────────────── */}
          <div
            style={{
              borderTop: "2px solid #e2e8f0",
              marginTop: "48px",
              paddingTop: "24px",
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.9rem",
            }}
          >
            <p style={{ margin: "0 0 4px" }}>
              <strong>Draft prepared:</strong> November 2026
            </p>
            <p style={{ margin: 0, fontStyle: "italic" }}>Not yet approved or in effect.</p>
            <p style={{ margin: "12px 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
              Concept website by {AGENCY.name} &mdash;{" "}
              <a
                href={AGENCY.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#94a3b8", textDecoration: "underline" }}
              >
                {AGENCY.website}
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────────────── */

const subHeadingStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "#1e3a5f",
  marginTop: "24px",
  marginBottom: "8px",
};

const listStyle: React.CSSProperties = {
  paddingLeft: "24px",
  lineHeight: 1.8,
  marginBottom: "16px",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#1e3a5f",
          borderBottom: "2px solid #e2e8f0",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          lineHeight: 1.75,
          color: "#334155",
          fontSize: "0.97rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}
