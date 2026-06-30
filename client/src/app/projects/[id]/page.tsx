import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Star, ExternalLink } from "lucide-react"
import { GithubIcon } from "@/components/ui/SocialIcons"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

const TYPE_LABEL: Record<string, string> = {
  website: "Website",
  mobile_app: "Mobile App",
  computer_application: "Desktop App",
}
const STATUS_STYLE: Record<string, string> = {
  completed: "status-completed",
  ongoing: "status-ongoing",
  on_hold: "status-on_hold",
}

async function getProject(id: string) {
  try {
    const res = await fetch(`${API}/api/projects/${id}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) return { title: "Project Not Found" }
  return {
    title: `${project.title} · Richu Sony`,
    description: project.description,
    openGraph: { title: project.title, description: project.description },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()

  const reviews = (project.reviews ?? []).filter((r: any) => r.submitted && r.content)
  const clientName = project.clientId?.name

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Person", name: "Richu Sony", url: "https://richusony.in" },
    dateCreated: String(project.year),
    url: project.liveUrl ?? undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Back */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
            style={{ color: "var(--t3)" }}
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>

          {/* Header card */}
          <div className="card p-8 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-xl text-xs font-semibold border ${STATUS_STYLE[project.status]}`}>
                {project.status.replace("_", " ")}
              </span>
              <span className="badge">{TYPE_LABEL[project.type]}</span>
              {project.year && <span className="badge">{project.year}</span>}
            </div>

            <h1
              className="font-black mb-4"
              style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)", fontFamily: "var(--font-display)", color: "var(--t1)", lineHeight: 1.1 }}
            >
              {project.title}
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "var(--t2)" }}>{project.description}</p>

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((t: string) => <span key={t} className="badge">{t}</span>)}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                  <ExternalLink size={14} /> View Live
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                  <GithubIcon size={14} /> Source Code
                </a>
              )}
            </div>

            {/* Client */}
            {clientName && (
              <div className="mt-6 pt-6 flex items-center gap-3" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: "var(--p-muted)", color: "var(--p)" }}
                >
                  {clientName[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{clientName}</p>
                  {project.clientId?.company && (
                    <p className="text-xs" style={{ color: "var(--t3)" }}>{project.clientId.company}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Long description */}
          {project.longDesc && (
            <div className="card p-7 mb-6">
              <h2 className="font-bold text-base mb-4" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
                Project Overview
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{project.longDesc}</p>
            </div>
          )}

          {/* Preview iframe */}
          {project.previewUrl && (
            <div className="card overflow-hidden mb-6">
              <div
                className="px-4 py-2.5 flex items-center gap-2"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs truncate" style={{ color: "var(--t3)" }}>{project.previewUrl}</span>
              </div>
              <iframe
                src={project.previewUrl}
                className="w-full"
                style={{ height: 480 }}
                title={`${project.title} preview`}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="card p-7">
              <h2 className="font-bold text-base mb-5 flex items-center gap-2" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
                <Star size={16} style={{ color: "var(--amber)" }} />
                Client Reviews ({reviews.length})
              </h2>
              <div className="space-y-4">
                {reviews.map((r: any) => (
                  <div key={r._id} className="p-5 rounded-xl" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: "var(--p-muted)", color: "var(--p)" }}
                        >
                          {(r.clientName ?? "A")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{r.clientName ?? "Client"}</p>
                          {r.submittedAt && (
                            <p className="text-xs" style={{ color: "var(--t3)" }}>
                              {new Date(r.submittedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
                            </p>
                          )}
                        </div>
                      </div>
                      {r.rating && (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={12} fill={s <= r.rating ? "var(--amber)" : "transparent"} style={{ color: "var(--amber)" }} />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed italic" style={{ color: "var(--t2)" }}>
                      &ldquo;{r.content}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
