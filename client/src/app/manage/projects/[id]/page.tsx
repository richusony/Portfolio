"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, Trash2 } from "lucide-react"
import { api, type Project } from "@/lib/api"
import ProjectForm from "@/components/manage/ProjectForm"
import AskReviewBtn from "@/components/manage/AskReviewBtn"

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.projects.get(id)
      .then(setProject)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-t-[var(--p)] rounded-full animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "var(--p)" }} />
      </div>
    )
  }

  if (!project) return <p style={{ color: "var(--t2)" }}>Project not found.</p>

  const reviews = (project.reviews ?? []).filter((r) => r.submitted && r.content)

  return (
    <div>
      <Link href="/manage/projects" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: "var(--t3)" }}>
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <h1 className="font-black text-2xl" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
          Edit Project
        </h1>
        <AskReviewBtn projectId={project._id} />
      </div>

      <ProjectForm project={project} mode="edit" />

      {/* Reviews section */}
      {reviews.length > 0 && (
        <div className="mt-10 max-w-2xl">
          <h2 className="font-bold text-base mb-4" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
            Client Reviews ({reviews.length})
          </h2>
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r._id} className="card p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{r.clientName ?? "Anonymous"}</p>
                    {r.submittedAt && (
                      <p className="text-xs" style={{ color: "var(--t3)" }}>
                        {new Date(r.submittedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                      </p>
                    )}
                  </div>
                  {r.rating && (
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={12} fill={s <= r.rating! ? "var(--amber)" : "transparent"} style={{ color: "var(--amber)" }} />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm italic leading-relaxed" style={{ color: "var(--t2)" }}>&ldquo;{r.content}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
