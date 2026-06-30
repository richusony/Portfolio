"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/ui/ThemeToggle"

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
        <nav
          className="w-full max-w-5xl transition-all duration-300"
          style={{
            background: scrolled ? "var(--glass-strong, color-mix(in srgb, var(--surface) 85%, transparent))" : "transparent",
            backdropFilter: scrolled ? "blur(40px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(40px)" : "none",
            border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
            borderRadius: "18px",
            boxShadow: scrolled ? "var(--shadow-lg)" : "none",
            padding: scrolled ? "10px 20px" : "8px 20px",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
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

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                    style={{ color: "var(--t2)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--t1)"
                      e.currentTarget.style.background = "var(--bg-2)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--t2)"
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right controls */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <a href="#contact" className="btn-primary text-sm px-4 py-2 rounded-xl">
                Hire Me
              </a>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                style={{ background: "var(--bg-2)", color: "var(--t2)" }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="md:hidden mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <ul className="space-y-0.5 mb-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2.5 rounded-xl text-sm font-medium"
                      style={{ color: "var(--t2)" }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary w-full text-center justify-center text-sm">
                Hire Me
              </a>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
