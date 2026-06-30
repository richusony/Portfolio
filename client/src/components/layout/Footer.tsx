"use client"
import Link from "next/link"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons"
import { Mail } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

const socials = [
  { href: "https://github.com/richusony", Icon: GithubIcon, label: "GitHub" },
  { href: "https://linkedin.com/in/richusony", Icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://twitter.com/richusony", Icon: TwitterIcon, label: "Twitter" },
]

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: "linear-gradient(135deg, var(--p-light), #6366F1)" }}
              >
                R
              </div>
              <span className="font-bold text-base" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
                richu<span style={{ color: "var(--p)" }}>sony</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
              Building premium digital products at affordable prices. Mobile apps, web platforms & desktop software.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--t3)" }}>Navigate</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--t2)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t2)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--t3)" }}>Get in touch</p>
            <a
              href="mailto:dev.richusony@gmail.com"
              className="flex items-center gap-2 text-sm mb-4 transition-colors"
              style={{ color: "var(--t2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t2)")}
            >
              <Mail size={14} />
              dev.richusony@gmail.com
            </a>
            <div className="flex gap-2">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: "var(--bg-3)", color: "var(--t2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t2)")}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--t3)" }}>
            © {new Date().getFullYear()} Richusony. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--t3)" }}>Crafted with precision · richusony.in</p>
        </div>
      </div>
    </footer>
  )
}
