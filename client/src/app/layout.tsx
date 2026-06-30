import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/contexts/ThemeContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

const BASE = "https://richusony.in"

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: "Richusony — Affordable Mobile & Web Developer", template: "%s · Richusony" },
  description: "Richusony is an affordable, high-quality full-stack developer specializing in mobile apps (Android/iOS), websites, and desktop applications. Freelance. Available worldwide.",
  keywords: ["affordable developer","cheapest mobile app developer","budget web developer","freelance developer india","mobile app development","web development","android ios developer","react native developer","next.js developer","richusony","affordable software developer kerala","low cost app development","full stack developer"],
  authors: [{ name: "Richusony", url: BASE }],
  creator: "Richusony",
  openGraph: { type: "website", locale: "en_IN", url: BASE, siteName: "Richusony", title: "Richusony — Affordable Mobile & Web Developer", description: "High-quality apps & websites at affordable prices. 4+ years experience.", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Richusony — Affordable Developer", description: "High-quality mobile apps & websites at affordable prices.", images: ["/og.png"], creator: "@richusony" },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${BASE}/#person`, name: "Richusony", url: BASE, image: `${BASE}/profile.png`, jobTitle: "Full-Stack Developer", description: "Affordable freelance developer — mobile apps, websites, desktop software.", knowsAbout: ["Web Development","Mobile App Development","React Native","Next.js","Flutter","Node.js","TypeScript","UI/UX Design"], contactPoint: { "@type": "ContactPoint", email: "dev.richusony@gmail.com", availableLanguage: ["English","Malayalam"] }, sameAs: ["https://github.com/richusony","https://linkedin.com/in/richusony"] },
    { "@type": "ProfessionalService", "@id": `${BASE}/#service`, name: "Richusony Development Services", url: BASE, description: "Affordable mobile app, web, and desktop development", provider: { "@id": `${BASE}/#person` }, areaServed: "Worldwide", priceRange: "₹₹" },
    { "@type": "WebSite", "@id": `${BASE}/#website`, url: BASE, name: "Richusony Portfolio", publisher: { "@id": `${BASE}/#person` } },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var isDark=t==='dark'||(t==='system'&&d);document.documentElement.setAttribute('data-theme',isDark?'dark':'light')})()` }} />
      </head>
      <body style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
