import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f2044",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Natun Bazar Jatiya Vidyalaya",
    default: "Natun Bazar Jatiya Vidyalaya — Website Demo by Handshake Co.",
  },
  description:
    "An independently prepared website concept for Natun Bazar Jatiya Vidyalaya, Lanka, Hojai, Assam — developed by Handshake Co. for demonstration purposes.",
  keywords: ["Natun Bazar Jatiya Vidyalaya", "school", "Lanka", "Hojai", "Assam", "Handshake Co"],
  authors: [{ name: "Handshake Co.", url: "https://handshakeco.in" }],
  openGraph: {
    title: "Natun Bazar Jatiya Vidyalaya — Website Demo",
    description: "School website demonstration concept designed & developed by Handshake Co.",
    url: "https://handshakeco.in",
    siteName: "Natun Bazar Jatiya Vidyalaya Demo",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
