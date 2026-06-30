"use client"
import { useState, useEffect, useRef } from "react"

const skills = [
  { name: "React / Next.js", pct: 95, color: "var(--accent)" },
  { name: "React Native / Mobile", pct: 90, color: "var(--p)" },
  { name: "Node.js / Express", pct: 88, color: "var(--green)" },
  { name: "TypeScript", pct: 92, color: "var(--p-light)" },
  { name: "UI/UX Design", pct: 85, color: "var(--pink)" },
  { name: "Database Design", pct: 87, color: "var(--amber)" },
]

const techs = ["React", "Next.js", "React Native", "Supabase", "Node.js", "TypeScript", "Python", "PostgreSQL", "MongoDB", "TailwindCSS", "Figma", "Firebase", "AWS", "Docker", "GraphQL"]

function SkillBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWidth(pct) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [pct])

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: "var(--t2)" }}>{name}</span>
        <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-3)" }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="section-eyebrow mb-4">
              <span className="w-5 h-px" style={{ background: "var(--p)" }} />
              About Me
            </div>
            <h2
              className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "var(--font-display)", color: "var(--t1)" }}
            >
              Studio-quality work,{" "}
              <span className="grad-text">freelancer prices</span>
            </h2>

            <div className="space-y-4 mb-8" style={{ color: "var(--t2)", lineHeight: 1.75 }}>
              <p>
                I&apos;m a passionate full-stack developer with 4+ years of hands-on experience turning complex ideas into elegant, high-performance applications.
              </p>
              <p>
                Unlike agencies that charge premium retainers, I offer the same level of craftsmanship at a fraction of the cost — because{" "}
                <strong style={{ color: "var(--t1)" }}>great software should be accessible to everyone</strong>.
              </p>
              <p>
                From mobile apps that climb the charts to web platforms handling millions of requests, I bring the same level of precision and care to every line of code.
              </p>
            </div>

            {/* Key traits */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { emoji: "⚡", title: "Fast Turnaround", desc: "Quick without cutting corners" },
                { emoji: "🎯", title: "Clean Code", desc: "Maintainable, production-ready" },
                { emoji: "🌍", title: "Global Clients", desc: "Worked across 10+ countries" },
                { emoji: "💬", title: "Always Available", desc: "Responsive communication" },
              ].map((t) => (
                <div key={t.title} className="card card-static p-4">
                  <div className="text-xl mb-2">{t.emoji}</div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>{t.title}</p>
                  <p className="text-xs" style={{ color: "var(--t3)" }}>{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--t3)" }}>Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techs.map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Right — Skills */}
          <div>
            <div className="card card-static p-7 space-y-6">
              <h3 className="font-bold text-base" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
                Technical Proficiency
              </h3>
              {skills.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>

            {/* Experience timeline */}
            <div className="mt-6 space-y-3">
              {[
                { year: "2025", role: "Senior Freelance Developer", type: "Remote", color: "var(--green)" },
                { year: "2023", role: "Full-Stack Developer", type: "Agency", color: "var(--p)" },
                { year: "2021", role: "Junior Developer", type: "Startup", color: "var(--accent)" },
              ].map((e) => (
                <div key={e.year} className="flex items-center gap-4 card card-static p-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `color-mix(in srgb, ${e.color} 15%, transparent)`, color: e.color }}>
                    {e.year}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{e.role}</p>
                    <p className="text-xs" style={{ color: "var(--t3)" }}>{e.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
