# Natun Bazar Jatiya Vidyalaya — Advanced School Website Demo
### Developed by Handshake Co. (https://handshakeco.in)

> **DEMO DISCLAIMER:** This is an independently prepared, non-official website concept by Handshake Co. for demonstration purposes only. It has not been commissioned, reviewed, or approved by Natun Bazar Jatiya Vidyalaya. Certain institutional details are based on third-party directory listings or a supplied recruitment poster and require confirmation by the school. Images and sample content are illustrative. No real student information is used.

---

## 🏫 Institutional Profile (Demo Reference)

- **School Name:** Natun Bazar Jatiya Vidyalaya (also listed as *Natun Bazar Jatio Vidyalaya*)
- **UDISE Code:** 18300817116 (Directory-listed)
- **Location:** 1 No. Khring Khring, Lanka, Hojai, Assam
- **Structure:** Private, Co-educational (Primary & Upper Primary sections)
- **Principal (Poster Reference):** Wahida Begum *(Requires school confirmation)*
- **Contact Number (Poster Reference):** 9365232226 *(Requires school confirmation)*

---

## 🚀 Architecture & Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router architecture)
- **UI Library:** [React 19](https://react.dev)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 & Custom Accessible Design System
- **Palette:** Deep Navy (`#0f2044`), Professional Blue (`#1e4fc2`), Subtle Gold (`#c9a84c`), and Clean White
- **Typography:** Georgia Serif (Headings) & Inter Sans-Serif (Body & Administrative UI)

---

## 📂 Complete Project Structure

```
nbjv-website/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   └── layout.tsx            # Public passthrough layout
│   │   ├── about/
│   │   │   └── page.tsx              # School overview, principal placeholder, vision & mission
│   │   ├── academics/
│   │   │   └── page.tsx              # Primary & Upper Primary, syllabus roadmap, exam framework
│   │   ├── admissions/
│   │   │   └── page.tsx              # Process steps, eligibility, interactive enquiry form
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact channels, interactive validated contact form
│   │   ├── gallery/
│   │   │   └── page.tsx              # Category tabs (Campus, Classroom, Activities, Events)
│   │   ├── notices/
│   │   │   ├── page.tsx              # Live keyword search & category filter notice board
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Dynamic notice detail view with simulated PDF download
│   │   ├── privacy/
│   │   │   └── page.tsx              # Draft data handling & compliance policy
│   │   ├── admin/
│   │   │   ├── layout.tsx            # Admin portal sidebar, mobile drawer, demo alerts
│   │   │   ├── page.tsx              # Dashboard Overview, KPI cards, recent enquiries
│   │   │   ├── students/page.tsx     # Student management (Enroll, edit, delete, search)
│   │   │   ├── enquiries/page.tsx    # Admission leads tracker (Inspect, status update, export)
│   │   │   ├── attendance/page.tsx   # Daily attendance marking, summary counter
│   │   │   ├── fees/page.tsx         # Fee records, payment toggle, challan generation modal
│   │   │   ├── exams/page.tsx        # Exam scheduling & student marks records
│   │   │   ├── staff/page.tsx        # Faculty directory, recruitment notice integration
│   │   │   ├── notices-mgmt/page.tsx # Publish, edit, and categorize school announcements
│   │   │   ├── gallery-mgmt/page.tsx # Add, categorize, and manage album photographs
│   │   │   ├── content/page.tsx      # Website CMS (Hero copy, welcome message, contact info)
│   │   │   ├── downloads/page.tsx    # Manage downloadable documents & circulars
│   │   │   ├── messages/page.tsx     # Split-pane contact inbox with read/unread states
│   │   │   └── settings/page.tsx     # Public feature toggles & mock data reset
│   │   ├── globals.css               # Design system tokens, buttons, badges, tables
│   │   ├── layout.tsx                # Root layout with fonts & global metadata
│   │   ├── page.tsx                  # High-conversion school homepage
│   │   ├── robots.ts                 # Dynamic robots.txt
│   │   └── sitemap.ts                # Dynamic XML sitemap
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky header, logo, nav items, mobile slideout drawer
│   │   └── Footer.tsx                # Quick links, institutional info, disclaimer, branding
│   └── lib/
│       └── data.ts                   # Structured source-labeled school data & demo constants
```

---

## 🛠️ How to Run Locally

1. Open your terminal in this directory:
   ```bash
   cd "d:\Project\Natun Bazar Jatiya Vidyalaya Website\nbjv-website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   - **Public School Website:** [http://localhost:3000](http://localhost:3000)
   - **Administration Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

5. To generate a production build:
   ```bash
   npm run build
   npm run start
   ```

---

## 💼 Handshake Co. Presentation Pitch Summary

When demonstrating this website to the school principal and management committee:

1. **Mobile-First Experience:** Open the website on a mobile device or inspect at 360px/390px width to show smooth touch navigation and clean card layouts.
2. **Interactive Admissions:** Fill out and submit the admission enquiry form on `/admissions` to show instant validation, error alerts, and animated confirmation.
3. **Live Administrative Control:** Navigate to `/admin` to demonstrate how the school office can view the inquiry in real-time under Admission Enquiries, mark the parent as contacted, or publish a new notice to the public website without contacting a webmaster.
4. **Institutional Accuracy & Dignity:** Point out the transparent handling of verified vs. placeholder information, showing that Handshake Co. operates with integrity.

---
Developed with pride by **Handshake Co.** — Web Development & Digital Solutions (https://handshakeco.in)
