"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/ui/ThemeToggle"

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#reviews", label: "Reviews", id: "reviews" },
  { href: "#contact", label: "Contact", id: "contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -50% 0px" }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("nav")) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
        <nav
          className="w-full max-w-5xl transition-all duration-300"
          style={{
            background: scrolled || open ? "color-mix(in srgb, var(--surface) 90%, transparent)" : "transparent",
            backdropFilter: scrolled || open ? "blur(40px)" : "none",
            WebkitBackdropFilter: scrolled || open ? "blur(40px)" : "none",
            border: scrolled || open ? "1px solid var(--border)" : "1px solid transparent",
            borderRadius: "18px",
            boxShadow: scrolled || open ? "var(--shadow-lg)" : "none",
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
              {links.map((l) => {
                const isActive = activeSection === l.id
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                      style={{
                        color: isActive ? "var(--p)" : "var(--t2)",
                        background: isActive ? "var(--p-muted)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "var(--t1)"
                          e.currentTarget.style.background = "var(--bg-2)"
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isActive ? "var(--p)" : "var(--t2)"
                        e.currentTarget.style.background = isActive ? "var(--p-muted)" : "transparent"
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
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
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
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
                {links.map((l) => {
                  const isActive = activeSection === l.id
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                        style={{
                          color: isActive ? "var(--p)" : "var(--t2)",
                          background: isActive ? "var(--p-muted)" : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.color = "var(--t1)"
                            e.currentTarget.style.background = "var(--bg-2)"
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = isActive ? "var(--p)" : "var(--t2)"
                          e.currentTarget.style.background = isActive ? "var(--p-muted)" : "transparent"
                        }}
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm" style={{ display: "flex" }}>
                Hire Me
              </a>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
