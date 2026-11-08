import type { Metadata } from "next";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Portal",
    default: "Admin Portal | Natun Bazar Jatiya Vidyalaya",
  },
  description:
    "Institutional administrative portal prototype for Natun Bazar Jatiya Vidyalaya, Lanka, Hojai, Assam. Developed by Handshake Co.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
