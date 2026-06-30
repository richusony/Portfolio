"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { FolderKanban, Users, MessageSquare, TrendingUp, ArrowRight, Plus } from "lucide-react"
import { api, type Project, type Client } from "@/lib/api"

export default function ManageDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.projects.list(), api.clients.list()])
      .then(([p, c]) => { setProjects(p); setClients(c) })
      .finally(() => setLoading(false))
  }, [])

  const reviewCount = projects.reduce((n, p) => n + (p.reviews?.filter((r) => r.submitted)?.length ?? 0), 0)
  const ongoingCount = projects.filter((p) => p.status === "ongoing").length

  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderKanban, color: "var(--p)", href: "/manage/projects" },
    { label: "Clients", value: clients.length, icon: Users, color: "var(--green)", href: "/manage/clients" },
    { label: "Reviews Received", value: reviewCount, icon: MessageSquare, color: "var(--amber)", href: "/manage/projects" },
    { label: "Ongoing Projects", value: ongoingCount, icon: TrendingUp, color: "var(--accent)", href: "/manage/projects" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-black text-2xl mb-1" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Dashboard</h1>
        <p className="text-sm" style={{ color: "var(--t3)" }}>Overview of your portfolio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Link key={s.label} href={s.href} className="card p-5 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}18` }}>
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--t3)" }} />
              </div>
              <p className="font-black text-2xl" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
                {loading ? "—" : s.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--t3)" }}>{s.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link href="/manage/projects/new" className="card p-5 group flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--p-muted)" }}>
            <Plus size={18} style={{ color: "var(--p)" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--t1)" }}>New Project</p>
            <p className="text-xs" style={{ color: "var(--t3)" }}>Add a new project to your portfolio</p>
          </div>
          <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--t3)" }} />
        </Link>
        <Link href="/manage/clients/new" className="card p-5 group flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--green) 12%, transparent)" }}>
            <Plus size={18} style={{ color: "var(--green)" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--t1)" }}>New Client</p>
            <p className="text-xs" style={{ color: "var(--t3)" }}>Add a new client record</p>
          </div>
          <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--t3)" }} />
        </Link>
      </div>

      {/* Recent projects */}
      {projects.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="font-bold text-sm" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Recent Projects</h2>
            <Link href="/manage/projects" className="text-xs" style={{ color: "var(--p)" }}>View all</Link>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {projects.slice(0, 5).map((p) => (
              <Link key={p._id} href={`/manage/projects/${p._id}`} className="flex items-center gap-4 p-4 group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--t1)" }}>{p.title}</p>
                  <p className="text-xs" style={{ color: "var(--t3)" }}>{p.type.replace("_", " ")} · {p.year}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex-shrink-0 ${
                    p.status === "completed" ? "status-completed" : p.status === "ongoing" ? "status-ongoing" : "status-on_hold"
                  }`}
                >
                  {p.status.replace("_", " ")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
