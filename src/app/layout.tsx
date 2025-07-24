import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Vishal Kumar | Full-Stack Developer Portfolio",
  description:
    "Explore Vishal Kumar's portfolio showcasing web development, full-stack projects, skills, and experience. Built with modern technologies.",
  keywords: [
    "Vishal Kumar",
    "full-stack developer",
    "portfolio",
    "projects",
    "JavaScript",
    "React",
    "Next.js",
    "iit",
    "web development",
    "software engineer",
    "developer portfolio",
    "iit indore",
    "full-stack projects",
    "skills",
    "experience",
    "web developer",
    "software development",
    "programming",
    "web applications",
    "frontend development",
    "backend development",
    "UI/UX design",
  ],
  authors: [{ name: "Vishal Kumar", url: "https://vishalshuffled.vercel.app" }],
  creator: "Vishal Kumar",
  metadataBase: new URL("https://vishalshuffled.vercel.app"),
  openGraph: {
    title: "Vishal Kumar | Developer Portfolio",
    description: "Explore my projects, skills, and achievements.",
    url: "https://vishalshuffled.vercel.app",
    siteName: "Vishal's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vishal Portfolio Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishal Kumar | Developer Portfolio",
    description: "Explore my projects, skills, and achievements.",
    creator: "@VishalKuma72",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
