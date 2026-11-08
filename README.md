# Natun Bazar Jatiya Vidyalaya — Official Website & School Management Portal

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mafizulkhan/natun-bazar-jatiya-vidyalaya-webnsite)

A comprehensive, full-stack demonstration website and 13-module school administration portal for **Natun Bazar Jatiya Vidyalaya**, 1 No. Khring Khring, Lanka, Hojai, Assam (UDISE: `18300817116`). Developed and prepared by **Handshake Co.** (https://handshakeco.in).

---

## 🚀 1-Click Live Deployment (Free on Vercel)

Click the **Deploy with Vercel** button above or click this link to go live instantly:
👉 **[Deploy on Vercel (1-Click Instant Live Link)](https://vercel.com/new/clone?repository-url=https://github.com/Mafizulkhan/natun-bazar-jatiya-vidyalaya-webnsite)**

Once clicked, Vercel will build the Next.js project automatically and provide a live public HTTPS URL (e.g. `https://natun-bazar-jatiya-vidyalaya.vercel.app`).

---

## 🌟 Key Features

### 1. Public School Website
- **Home**: Dynamic background hero slider, pop-up admission notice modal, school gallery preview, academic curriculum overview.
- **About Us**: School profile, mission, leadership, and location details.
- **Academics**: Primary and Upper Primary curriculum, academic calendar, subject distribution.
- **Admissions**: Public online enquiry form with Date of Birth (`dob`) input and live validation.
- **Gallery**: Live photo grid with category filters, synced with the server upload API.
- **Notices**: Searchable notice board with category filters, important badges, and download buttons.
- **Teachers & Staff**: Faculty profiles and subject specializations.
- **Contact Us**: Interactive contact form with school directory information.

### 2. Administrative School Management Portal (`/admin`)
- **Student Management**: Clean minimal table (`Student ID`, `Student Name`, `Actions`), detailed inspection modal, and interactive printable **Student ID Card Generator** (front/back flip & barcode).
- **Attendance Management**: Minimal student view, detailed attendance dossier modal with interactive vector SVG **Pie Chart** (Present vs Absent vs Leave vs **All School Holidays & Sundays**), holiday breakdown panel, inline attendance editing, printable A4 official dossier, and CSV export.
- **Gallery & Media Management**: Drag-and-drop multi-photo uploader with live preview, server-side storage in `public/uploads/`, and live website synchronization.
- **Admission Enquiries**: Manage applicant submissions and follow-ups.
- **Fee Management**: Track fee payments and receipt generation.
- **Examination & Results**: Report cards, subject marks, and grades.
- **Teachers & Staff Management**: Faculty directory, designations, and contacts.
- **Notices & Circulars Manager**: Publish school announcements and important alerts.
- **Website Content & Settings**: Configure school info, terms, and branding.

---

## 🛠️ Local Development

### 1. Clone & Install
```bash
git clone https://github.com/Mafizulkhan/natun-bazar-jatiya-vidyalaya-webnsite.git
cd natun-bazar-jatiya-vidyalaya-webnsite
npm install --prefix nbjv-website
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Website**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin`
- **Student Management**: `http://localhost:3000/admin/students`
- **Attendance Management**: `http://localhost:3000/admin/attendance`
- **Gallery Management**: `http://localhost:3000/admin/gallery`

---

## 📄 License & Attribution
- **School**: Natun Bazar Jatiya Vidyalaya (1 No. Khring Khring, Lanka, Hojai, Assam; UDISE: 18300817116).
- **Agency**: Designed & Developed by Handshake Co. (https://handshakeco.in).
