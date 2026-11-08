// School information constants — sourced and labelled by accuracy
export const SCHOOL = {
  name: "Natun Bazar Jatiya Vidyalaya",
  nameAlt: "Natun Bazar Jatio Vidyalaya",
  udise: "18300817116",
  location: {
    address: "1 No. Khring Khring",
    city: "Lanka",
    district: "Hojai",
    state: "Assam",
    pin: "[PIN code to be confirmed]",
    full: "1 No. Khring Khring, Lanka, Hojai, Assam",
    source: "Third-party directory listing",
  },
  phone: {
    number: "9365232226",
    source: "Recruitment poster",
    label: "Contact (as listed on recruitment poster — confirmation required)",
  },
  email: "[Official email to be provided by school]",
  principal: {
    name: "Wahida Begum",
    source: "Recruitment poster",
    label: "Principal name as shown on recruitment poster — confirmation required",
  },
  type: "Private, Co-educational",
  sections: "Primary and Upper Primary",
  sourceNote: "Directory-listed school data",
  disclaimer:
    "This is an independently prepared, non-official website concept by Handshake Co. for demonstration purposes only. It has not been commissioned, reviewed, or approved by Natun Bazar Jatiya Vidyalaya. Certain institutional details are based on third-party directory listings or a supplied recruitment poster and require confirmation by the school. Images and sample content may be illustrative. No real student information is used.",
};

export const AGENCY = {
  name: "Handshake Co.",
  website: "https://handshakeco.in",
  tagline: "Website Concept Designed & Developed by Handshake Co.",
  note: "This is a demonstration website concept. The school has not yet commissioned this website.",
};

export const NAV_ITEMS = [
  { label: "Home",        href: "/" },
  { label: "About Us",   href: "/about" },
  { label: "Academics",  href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Notices",    href: "/notices" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Staff",      href: "/staff" },
  { label: "Contact",    href: "/contact" },
];

export type NoticeCategory = "General" | "Academic" | "Admission" | "Important" | "Event";

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  excerpt: string;
  content: string;
  isImportant: boolean;
  hasAttachment: boolean;
}

export const DEMO_NOTICES: Notice[] = [
  {
    id: "notice-001",
    title: "Annual Sports Day — Registration Open",
    date: "2026-11-05",
    category: "Event",
    excerpt: "Students from Class I to VIII are invited to register for Annual Sports Day events.",
    content: `[DEMO NOTICE] Annual Sports Day registration is now open for all students from Class I to Class VIII. Students may register with their class teacher by November 15, 2026.\n\nEvents include running races, relay, long jump, and team games.\n\nParents are cordially invited to attend the Sports Day celebration.`,
    isImportant: false,
    hasAttachment: true,
  },
  {
    id: "notice-002",
    title: "Admission Enquiries for Session 2027–28 — Now Open",
    date: "2026-11-01",
    category: "Admission",
    excerpt: "Parents interested in admission for the upcoming academic session may submit enquiry forms.",
    content: `[DEMO NOTICE] Admission enquiries for the academic session 2027–28 are now being accepted.\n\nParents of prospective students are requested to visit the school office or submit an online enquiry form through this website.\n\nFurther information regarding eligibility and required documents will be communicated after submission.`,
    isImportant: true,
    hasAttachment: false,
  },
  {
    id: "notice-003",
    title: "Half-Yearly Examination Schedule",
    date: "2026-10-20",
    category: "Academic",
    excerpt: "The schedule for half-yearly examinations has been announced. Refer to the attachment.",
    content: `[DEMO NOTICE] The half-yearly examination schedule for all classes has been finalised.\n\nStudents are advised to prepare accordingly. The examination timetable is attached with this notice.\n\nAbsence without prior information will not be condoned.`,
    isImportant: true,
    hasAttachment: true,
  },
  {
    id: "notice-004",
    title: "School Closed — Public Holiday",
    date: "2026-10-15",
    category: "General",
    excerpt: "The school will remain closed on account of a public holiday.",
    content: `[DEMO NOTICE] This is to inform all parents and students that the school will remain closed on [date] on account of a public holiday as per the government calendar.\n\nRegular classes will resume from the following working day.`,
    isImportant: false,
    hasAttachment: false,
  },
  {
    id: "notice-005",
    title: "Parent-Teacher Meeting — November 2026",
    date: "2026-10-10",
    category: "General",
    excerpt: "A Parent-Teacher Meeting is scheduled. Attendance is requested from all parents.",
    content: `[DEMO NOTICE] A Parent-Teacher Meeting (PTM) is scheduled for the month of November 2026.\n\nParents are requested to attend and discuss their child's academic progress with respective class teachers. Specific dates and timings will be communicated separately.`,
    isImportant: false,
    hasAttachment: false,
  },
  {
    id: "notice-006",
    title: "Teacher Recruitment — Applications Invited",
    date: "2026-09-28",
    category: "Important",
    excerpt: "Applications are invited for Lower Primary and Upper Primary Teacher positions.",
    content: `[DEMO NOTICE — based on recruitment poster supplied] Applications are invited from qualified candidates for the following positions:\n\n• Lower Primary Teacher\n• Upper Primary Teacher\n\nFreshers and experienced candidates may apply. Salary negotiable.\n\nContact: 9365232226 (as listed on recruitment poster — confirmation required)\n\nNote: This notice is based on information from a recruitment poster. Details require confirmation from school administration.`,
    isImportant: true,
    hasAttachment: true,
  },
];

export interface GalleryImage {
  id: string;
  src: string;
  fallbackSrc?: string;
  alt: string;
  category: "Campus" | "Classroom" | "Activities" | "Events" | "Celebrations";
  caption: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "g1",  src: "/images/school/photo-1.jpg", fallbackSrc: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=75", alt: "School building exterior", category: "Campus", caption: "School campus & entrance" },
  { id: "g2",  src: "/images/school/photo-2.jpg", fallbackSrc: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=75", alt: "School corridor", category: "Campus", caption: "School corridors & premises" },
  { id: "g3",  src: "/images/school/photo-3.jpg", fallbackSrc: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=75", alt: "Classroom learning", category: "Classroom", caption: "Primary classroom session" },
  { id: "g4",  src: "/images/school/photo-4.jpg", fallbackSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=75", alt: "Students reading", category: "Classroom", caption: "Students during study session" },
  { id: "g5",  src: "/images/school/photo-5.jpg", fallbackSrc: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=75", alt: "Drawing activity", category: "Activities", caption: "Art and drawing activity" },
  { id: "g6",  src: "/images/school/photo-6.jpg", fallbackSrc: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=75", alt: "Sports day running", category: "Activities", caption: "Sports & outdoor activities" },
  { id: "g7",  src: "/images/school/photo-7.jpg", fallbackSrc: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=600&q=75", alt: "School event assembly", category: "Events", caption: "Morning school assembly" },
  { id: "g8",  src: "/images/school/photo-8.jpg", fallbackSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75", alt: "Annual function", category: "Events", caption: "Annual day event" },
  { id: "g9",  src: "/images/school/photo-9.jpg", fallbackSrc: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&q=75", alt: "Independence Day celebration", category: "Celebrations", caption: "National festival celebration" },
  { id: "g10", src: "/images/school/photo-10.jpg", fallbackSrc: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=75", alt: "School gate", category: "Campus", caption: "School entrance view" },
  { id: "g11", src: "/images/school/photo-11.jpg", fallbackSrc: "https://images.unsplash.com/photo-1491841651911-c44484b6a97c?w=600&q=75", alt: "Sports competition", category: "Activities", caption: "Inter-class sports competition" },
  { id: "g12", src: "/images/school/photo-12.jpg", fallbackSrc: "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=600&q=75", alt: "Cultural celebration", category: "Celebrations", caption: "Cultural celebration & festivities" },
];

export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  subject?: string;
  section?: string;
  note: string;
  isDemo: boolean;
}

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-001",
    name: "Wahida Begum",
    designation: "Principal",
    note: "Name as shown on recruitment poster — confirmation required",
    isDemo: false,
  },
  {
    id: "staff-002",
    name: "[Teacher Name]",
    designation: "Upper Primary Teacher",
    subject: "Mathematics & Science",
    section: "Upper Primary",
    note: "Demo placeholder — actual staff profile to be provided by school",
    isDemo: true,
  },
  {
    id: "staff-003",
    name: "[Teacher Name]",
    designation: "Upper Primary Teacher",
    subject: "Language & Social Studies",
    section: "Upper Primary",
    note: "Demo placeholder — actual staff profile to be provided by school",
    isDemo: true,
  },
  {
    id: "staff-004",
    name: "[Teacher Name]",
    designation: "Lower Primary Teacher",
    subject: "Primary Curriculum",
    section: "Lower Primary",
    note: "Demo placeholder — actual staff profile to be provided by school",
    isDemo: true,
  },
  {
    id: "staff-005",
    name: "[Teacher Name]",
    designation: "Lower Primary Teacher",
    subject: "Primary Curriculum",
    section: "Lower Primary",
    note: "Demo placeholder — actual staff profile to be provided by school",
    isDemo: true,
  },
];

// Demo admin data
export const DEMO_STUDENTS = [
  {
    id: "STU001",
    name: "Arindam Bora",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80",
    class: "Class V",
    section: "A",
    rollNo: "01",
    dob: "2016-04-12",
    attendance: "96%",
    graceMark: "5",
    bloodGroup: "O+",
    guardian: "Pranab Bora",
    phone: "98640XXXXX",
    status: "Active",
  },
  {
    id: "STU002",
    name: "Priyanka Kalita",
    photo: "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=200&q=80",
    class: "Class III",
    section: "A",
    rollNo: "02",
    dob: "2018-07-22",
    attendance: "92%",
    graceMark: "0",
    bloodGroup: "B+",
    guardian: "Dipen Kalita",
    phone: "97060XXXXX",
    status: "Active",
  },
  {
    id: "STU003",
    name: "Debojit Saikia",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    class: "Class VII",
    section: "B",
    rollNo: "03",
    dob: "2014-11-05",
    attendance: "88%",
    graceMark: "4",
    bloodGroup: "A+",
    guardian: "Gautom Saikia",
    phone: "94350XXXXX",
    status: "Active",
  },
  {
    id: "STU004",
    name: "Ananya Hazarika",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80",
    class: "Class II",
    section: "A",
    rollNo: "04",
    dob: "2019-02-18",
    attendance: "95%",
    graceMark: "2",
    bloodGroup: "AB+",
    guardian: "Mridul Hazarika",
    phone: "91010XXXXX",
    status: "Active",
  },
  {
    id: "STU005",
    name: "Manash Jyoti Nath",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
    class: "Class VI",
    section: "A",
    rollNo: "05",
    dob: "2015-09-30",
    attendance: "78%",
    graceMark: "0",
    bloodGroup: "O-",
    guardian: "Babul Nath",
    phone: "88760XXXXX",
    status: "Inactive",
  },
];

export const DEMO_ENQUIRIES = [
  { id: "ENQ001", parentName: "Demo Parent A", studentName: "Demo Child A", dob: "2020-04-12", class: "Class I",    phone: "98XXXXXXXX", email: "demo@example.com", date: "2026-11-05", status: "New",      message: "Enquiry about Class I admission." },
  { id: "ENQ002", parentName: "Demo Parent B", studentName: "Demo Child B", dob: "2016-08-25", class: "Class V",    phone: "97XXXXXXXX", email: "demo2@example.com", date: "2026-11-04", status: "Contacted", message: "Interested in Upper Primary admission." },
  { id: "ENQ003", parentName: "Demo Parent C", studentName: "Demo Child C", dob: "2018-11-03", class: "Class III",  phone: "96XXXXXXXX", email: "demo3@example.com", date: "2026-11-02", status: "New",      message: "Requires information on fees and timings." },
];

export const DEMO_FEE_RECORDS = [
  { id: "FEE001", studentName: "Demo Student A", class: "Class V",   month: "November 2026", amount: "₹[Amount]", status: "Paid",    paidOn: "2026-11-02" },
  { id: "FEE002", studentName: "Demo Student B", class: "Class III", month: "November 2026", amount: "₹[Amount]", status: "Pending", paidOn: "—" },
  { id: "FEE003", studentName: "Demo Student C", class: "Class VII", month: "November 2026", amount: "₹[Amount]", status: "Paid",    paidOn: "2026-11-01" },
];

export const DEMO_ATTENDANCE = [
  { id: "ATT001", studentName: "Demo Student A", class: "Class V",   date: "2026-11-08", status: "Present" },
  { id: "ATT002", studentName: "Demo Student B", class: "Class III", date: "2026-11-08", status: "Absent"  },
  { id: "ATT003", studentName: "Demo Student C", class: "Class VII", date: "2026-11-08", status: "Present" },
  { id: "ATT004", studentName: "Demo Student D", class: "Class II",  date: "2026-11-08", status: "Present" },
];

export const DEMO_RESULTS = [
  { id: "RES001", studentName: "Demo Student A", class: "Class V",   exam: "Half-Yearly 2026", subject: "Mathematics", marks: "78/100", grade: "B+" },
  { id: "RES002", studentName: "Demo Student A", class: "Class V",   exam: "Half-Yearly 2026", subject: "Language",    marks: "85/100", grade: "A"  },
  { id: "RES003", studentName: "Demo Student C", class: "Class VII", exam: "Half-Yearly 2026", subject: "Science",     marks: "91/100", grade: "A+" },
];

export const DEMO_CONTACT_MESSAGES = [
  { id: "MSG001", name: "Demo Visitor A", email: "visitora@example.com", subject: "General Enquiry",  message: "I would like to know about school timings.", date: "2026-11-06", read: false },
  { id: "MSG002", name: "Demo Visitor B", email: "visitorb@example.com", subject: "Admission Query",  message: "Please send me admission details for Class I.", date: "2026-11-05", read: true  },
  { id: "MSG003", name: "Demo Visitor C", email: "visitorc@example.com", subject: "Teacher Vacancy",  message: "I saw the recruitment notice. How do I apply?", date: "2026-11-04", read: true  },
];

