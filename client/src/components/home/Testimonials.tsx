"use client"
import { useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { api, type Review, type Project } from "@/lib/api"

interface ReviewWithProject extends Review {
  projectTitle?: string
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<ReviewWithProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.projects.list()
      .then((projects) => {
        const all: ReviewWithProject[] = []
        projects.forEach((p) => {
          (p.reviews ?? []).forEach((r) => {
            if (r.content) all.push({ ...r, projectTitle: p.title })
          })
        })
        setReviews(all)
      })
      .finally(() => setLoading(false))
  }, [])

  if (!loading && reviews.length === 0) return null

  return (
    <section id="reviews" className="py-28" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-4">
            <span className="w-5 h-px" style={{ background: "var(--p)" }} />
            Client Reviews
            <span className="w-5 h-px" style={{ background: "var(--p)" }} />
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontFamily: "var(--font-display)", color: "var(--t1)" }}
          >
            What clients <span className="grad-text">actually say</span>
          </h2>
          <p style={{ color: "var(--t2)" }}>Verified reviews from real project collaborations.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <div key={i} className="h-44 skeleton rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="card p-6 flex flex-col gap-4 group">
                <div className="flex items-start justify-between">
                  <Quote size={20} style={{ color: "var(--p)", opacity: 0.4 }} />
                  {r.rating && (
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          style={{ color: star <= r.rating! ? "var(--amber)" : "var(--border-2)" }}
                          fill={star <= r.rating! ? "var(--amber)" : "var(--border-2)"}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm leading-relaxed flex-1 italic" style={{ color: "var(--t2)" }}>
                  &ldquo;{r.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "var(--p-muted)", color: "var(--p)" }}
                  >
                    {(r.clientName ?? "A")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{r.clientName ?? "Anonymous"}</p>
                    {r.projectTitle && (
                      <p className="text-xs" style={{ color: "var(--t3)" }}>{r.projectTitle}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
