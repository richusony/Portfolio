"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react"

const roles = ["Full-Stack Developer", "Mobile App Engineer", "UI/UX Designer", "React Native Expert"]

const floatingCards = [
  { icon: "📱", label: "Mobile Apps", sub: "iOS & Android", delay: 0, x: -80, y: 60 },
  { icon: "🌐", label: "Web Apps", sub: "Next.js · React", delay: 0.4, x: 60, y: -50 },
  { icon: "✦", label: "Affordable", sub: "Starts ₹5k", delay: 0.8, x: -40, y: -100, accent: true },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [typed, setTyped] = useState("")
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const role = roles[roleIdx]
    if (typing) {
      if (typed.length < role.length) {
        const t = setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 55)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 28)
        return () => clearTimeout(t)
      } else {
        setRoleIdx((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [typed, typing, roleIdx])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-glow">
      {/* Dot grid overlay — separate div so it doesn't conflict with hero-glow background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.6 }} />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--p-glow) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Left ────────────────────────────────── */}
          <div className="space-y-7">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: "var(--p-muted)", color: "var(--p-light)", border: "1px solid var(--p-glow)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Available for new projects
              <Sparkles size={11} />
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <p className="text-base font-semibold" style={{ color: "var(--t2)", fontFamily: "var(--font-display)" }}>
                Hi, I&apos;m Richu Sony 👋
              </p>
              <h1
                className="font-black leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 7vw, 4.5rem)", fontFamily: "var(--font-display)", color: "var(--t1)" }}
              >
                Crafting Digital{" "}
                <span className="grad-text">Experiences</span>{" "}
                That Scale.
              </h1>
            </div>

            {/* Typing role */}
            <div className="flex items-center gap-2 h-8">
              <span className="text-lg font-semibold" style={{ color: "var(--t2)" }}>
                {typed}
                <span className="inline-block w-0.5 h-5 bg-current ml-0.5 animate-pulse align-middle" />
              </span>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed max-w-lg" style={{ color: "var(--t2)" }}>
              I build <strong style={{ color: "var(--t1)", fontWeight: 600 }}>high-quality digital products </strong> at prices that won&apos;t break the bank.
              From cross-platform mobile apps to lightning-fast web platforms — delivered fast, built to last.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              {[
                { n: "4+", label: "Years building" },
                { n: "30+", label: "Projects shipped" },
                { n: "100%", label: "Happy clients" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black grad-text" style={{ fontFamily: "var(--font-display)" }}>{s.n}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--t3)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">
                View My Work <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-secondary">
                <MessageCircle size={16} /> Get a Free Quote
              </a>
            </div>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["React", "Next.js", "React Native", "Supabase", "Node.js", "TypeScript"].map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </div>

          {/* ── Right — Photo ─────────────────────── */}
          <div className="hidden lg:flex justify-center relative">
            <div className="relative w-[360px] h-[420px]">
              {/* Rotating border ring */}
              <div
                className="absolute animate-spin-slow rounded-3xl"
                style={{
                  inset: "-2px",
                  background: "linear-gradient(135deg, var(--p-light), transparent, var(--accent), transparent, var(--p-light))",
                  borderRadius: "28px",
                  opacity: 0.6,
                }}
              />

              {/* Glow */}
              <div
                className="absolute inset-4 rounded-3xl"
                style={{ background: "var(--p-glow)", filter: "blur(40px)" }}
              />

              {/* Photo card */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-xl)",
                }}
              >
                <Image
                  src="/profile.png"
                  alt="Richu Sony — Full-Stack Developer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="360px"
                />
                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28"
                  style={{ background: "linear-gradient(to top, var(--surface), transparent)" }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-bold" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Richu Sony</p>
                  <p className="text-xs" style={{ color: "var(--t2)" }}>Full-Stack Developer</p>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((c, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    ...(c.x < 0 ? { left: `${c.x}px` } : { right: `-${Math.abs(c.x) - 20}px` }),
                    ...(c.y < 0 ? { top: `${Math.abs(c.y)}px` } : { bottom: `${c.y}px` }),
                    animationDelay: `${c.delay}s`,
                  }}
                >
                  <div
                    className="px-3 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap"
                    style={{
                      background: c.accent ? "var(--p)" : "var(--surface)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <span className="text-base">{c.icon}</span>
                    <div>
                      <p className="text-xs font-bold" style={{ color: c.accent ? "#fff" : "var(--t1)", lineHeight: 1 }}>{c.label}</p>
                      <p className="text-[10px]" style={{ color: c.accent ? "rgba(255,255,255,0.7)" : "var(--t3)" }}>{c.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hidden lg:flex flex-col items-center gap-2 mt-20 opacity-40">
          <p className="text-xs" style={{ color: "var(--t3)" }}>Scroll</p>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--t3), transparent)" }} />
        </div>
      </div>
    </section>
  )
}
