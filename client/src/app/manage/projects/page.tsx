"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, Link2, Star } from "lucide-react"
import { api, type Project } from "@/lib/api"

const STATUS_STYLE: Record<string, string> = {
  completed: "status-completed",
  ongoing: "status-ongoing",
  on_hold: "status-on_hold",
}

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = () => {
    api.projects.list()
      .then(setProjects)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await api.projects.delete(id)
      setProjects((p) => p.filter((x) => x._id !== id))
    } catch (e: any) {
      alert(e.message ?? "Delete failed")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl mb-1" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Projects</h1>
          <p className="text-sm" style={{ color: "var(--t3)" }}>{projects.length} total</p>
        </div>
        <Link href="/manage/projects/new" className="btn-primary">
          <Plus size={15} /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map((i) => <div key={i} className="h-16 skeleton rounded-xl" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-3xl mb-3">📁</p>
          <p className="font-semibold mb-1" style={{ color: "var(--t1)" }}>No projects yet</p>
          <p className="text-sm mb-5" style={{ color: "var(--t3)" }}>Add your first project to get started</p>
          <Link href="/manage/projects/new" className="btn-primary">
            <Plus size={15} /> Add Project
          </Link>
        </div>
      ) : (
        <div className="card divide-y" style={{ borderColor: "var(--border)" }}>
          {projects.map((p) => {
            const reviews = p.reviews?.filter((r) => r.submitted) ?? []
            const avgRating = reviews.length
              ? (reviews.reduce((a, r) => a + (r.rating ?? 5), 0) / reviews.length).toFixed(1)
              : null

            return (
              <div key={p._id} className="flex items-center gap-4 p-4 group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{p.title}</p>
                    {p.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg" style={{ background: "var(--amber-muted, #fef9c3)", color: "var(--amber)" }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs flex-wrap" style={{ color: "var(--t3)" }}>
                    <span>{p.type.replace("_", " ")}</span>
                    <span>·</span>
                    <span>{p.year}</span>
                    {avgRating && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-0.5" style={{ color: "var(--amber)" }}>
                          <Star size={10} className="fill-current" /> {avgRating} ({reviews.length})
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex-shrink-0 ${STATUS_STYLE[p.status]}`}>
                  {p.status.replace("_", " ")}
                </span>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "var(--t3)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
                    >
                      <Link2 size={14} />
                    </a>
                  )}
                  <Link href={`/manage/projects/${p._id}`} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "var(--t3)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id, p.title)}
                    disabled={deleting === p._id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "var(--t3)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red, #ef4444)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
                  >
                    {deleting === p._id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
