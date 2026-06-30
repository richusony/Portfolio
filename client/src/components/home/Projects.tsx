"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Star } from "lucide-react"
import { api, type Project } from "@/lib/api"

const FILTERS = [
  { key: "all", label: "All Projects" },
  { key: "website", label: "🌐 Web" },
  { key: "mobile_app", label: "📱 Mobile" },
  { key: "computer_application", label: "💻 Desktop" },
]

const TYPE_ICON: Record<string, string> = { website: "🌐", mobile_app: "📱", computer_application: "💻" }
const TYPE_LABEL: Record<string, string> = { website: "Website", mobile_app: "Mobile App", computer_application: "Desktop App" }
const STATUS_STYLE: Record<string, string> = {
  completed: "status-completed",
  ongoing: "status-ongoing",
  on_hold: "status-on_hold",
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.projects.list()
      .then(setProjects)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter)
  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <section id="work" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-eyebrow mb-4">
              <span className="w-5 h-px" style={{ background: "var(--p)" }} />
              Portfolio
            </div>
            <h2
              className="font-black"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontFamily: "var(--font-display)", color: "var(--t1)" }}
            >
              Selected <span className="grad-text">Work</span>
            </h2>
          </div>

          {/* Filter */}
          <div
            className="flex flex-wrap gap-1.5 p-1 rounded-2xl self-start"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: filter === f.key ? "var(--surface)" : "transparent",
                  color: filter === f.key ? "var(--t1)" : "var(--t3)",
                  boxShadow: filter === f.key ? "var(--shadow-sm)" : "none",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-64 skeleton rounded-2xl" />)}
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-2">
            <p className="font-semibold" style={{ color: "var(--t2)" }}>Couldn&apos;t load projects</p>
            <p className="text-sm" style={{ color: "var(--t3)" }}>Check back soon or <a href="#contact" className="underline" style={{ color: "var(--p)" }}>reach out directly</a>.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center" style={{ color: "var(--t3)" }}>No projects found.</div>
        ) : (
          <div className="space-y-5">
            {/* Featured: 2-column */}
            {featured.length > 0 && (
              <div className={`grid gap-5 ${featured.length === 1 ? "grid-cols-1 max-w-2xl" : "grid-cols-1 md:grid-cols-2"}`}>
                {featured.map((p) => <ProjectCard key={p._id} project={p} large />)}
              </div>
            )}
            {/* Rest: 3-column */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((p) => <ProjectCard key={p._id} project={p} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project: p, large = false }: { project: Project; large?: boolean }) {
  const reviews = p.reviews ?? []
  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + (r.rating ?? 5), 0) / reviews.length
    : null

  const clientName = typeof p.clientId === "object" && p.clientId ? (p.clientId as any).name : null

  return (
    <Link
      href={`/projects/${p._id}`}
      className="card group block relative overflow-hidden"
      style={{ minHeight: large ? 280 : 220 }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ background: "linear-gradient(90deg, var(--p-light), var(--accent))" }}
      />

      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{TYPE_ICON[p.type]}</span>
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${STATUS_STYLE[p.status]}`}
            >
              {p.status.replace("_", " ")}
            </span>
          </div>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
            style={{ background: "var(--p-muted)", color: "var(--p)" }}
          >
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="font-bold text-base mb-2 group-hover:text-[var(--p)] transition-colors line-clamp-2"
            style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}
          >
            {p.title}
          </h3>
          <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: "var(--t2)" }}>
            {p.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 4).map((t) => <span key={t} className="badge text-xs">{t}</span>)}
            {p.tags.length > 4 && <span className="badge text-xs">+{p.tags.length - 4}</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3 text-xs" style={{ color: "var(--t3)" }}>
            <span>{TYPE_LABEL[p.type]}</span>
            <span>·</span>
            <span>{p.year}</span>
            {clientName && (
              <>
                <span>·</span>
                <span style={{ color: "var(--t2)" }}>{clientName}</span>
              </>
            )}
          </div>
          {avgRating !== null && (
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--amber)" }}>
              <Star size={11} className="fill-current" />
              {avgRating.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
