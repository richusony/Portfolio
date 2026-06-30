"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Star, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { api } from "@/lib/api"

export default function ReviewPage() {
  const params = useParams()
  const token = params.token as string

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    api.reviews.get(token)
      .then((d) => {
        setData(d)
        if (d.clientName) setName(d.clientName)
        if (d.submitted) setError("Already submitted")
      })
      .catch((e) => setError(e.message ?? "Failed to load review link"))
      .finally(() => setLoading(false))
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return
    setSubmitting(true)
    try {
      await api.reviews.submit(token, { content, rating, clientName: name })
      setSubmitted(true)
    } catch (e: any) {
      setError(e.message ?? "Submission failed")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="w-8 h-8 border-2 border-t-[var(--p)] rounded-full animate-spin" style={{ borderColor: "var(--border)", borderTopColor: "var(--p)" }} />
      </div>
    )
  }

  if (error && error !== "Already submitted") {
    const isExpired = error.toLowerCase().includes("expired")
    const isUsed = error.toLowerCase().includes("already")
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
        <div className="max-w-md w-full card p-10 text-center">
          {isUsed ? (
            <><CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "var(--green)" }} />
              <h2 className="font-black text-xl mb-2" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Already Submitted</h2>
              <p style={{ color: "var(--t2)" }}>This review has already been submitted. Thank you!</p></>
          ) : isExpired ? (
            <><Clock size={48} className="mx-auto mb-4" style={{ color: "var(--amber)" }} />
              <h2 className="font-black text-xl mb-2" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Link Expired</h2>
              <p style={{ color: "var(--t2)" }}>This review link has expired. Please contact the developer for a new one.</p></>
          ) : (
            <><AlertCircle size={48} className="mx-auto mb-4" style={{ color: "var(--red)" }} />
              <h2 className="font-black text-xl mb-2" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Invalid Link</h2>
              <p style={{ color: "var(--t2)" }}>This review link is invalid or has already been used.</p></>
          )}
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
        <div className="max-w-lg w-full">
          <div className="card p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, var(--p-light), var(--accent), var(--pink))" }} />

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white font-black text-2xl"
              style={{ background: "linear-gradient(135deg, var(--p-light), #6366F1)" }}
            >
              R
            </div>

            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "var(--p-muted)" }}
            >
              <CheckCircle2 size={28} style={{ color: "var(--green)" }} />
            </div>

            <h1 className="font-black text-2xl mb-3" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
              Thank You, {name || "Friend"}! 🎉
            </h1>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--t2)" }}>
              Your review has been submitted successfully. It means the world to me and helps me deliver even better work on the next project.
            </p>

            {rating > 0 && (
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={26} fill={i <= rating ? "var(--amber)" : "transparent"} style={{ color: "var(--amber)" }} />
                ))}
              </div>
            )}

            <div className="p-5 rounded-xl text-left mb-6" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
              <p className="text-sm italic leading-relaxed" style={{ color: "var(--t2)" }}>&ldquo;{content}&rdquo;</p>
            </div>

            <p className="text-xs" style={{ color: "var(--t3)" }}>
              Your feedback will appear on{" "}
              <a href="https://richusony.in" style={{ color: "var(--p)" }} className="hover:underline">richusony.in</a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const project = data?.projectId ?? {}

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Logo header */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
            style={{ background: "linear-gradient(135deg, var(--p-light), #6366F1)" }}
          >
            R
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: "var(--t1)" }}>richusony.in</p>
            <p className="text-xs" style={{ color: "var(--t3)" }}>Project Review Request</p>
          </div>
        </div>

        {/* Project info */}
        {project.title && (
          <div className="card p-5 mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--t3)" }}>Reviewing</p>
            <h2 className="font-bold text-lg mb-1" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>{project.title}</h2>
            {project.description && <p className="text-sm" style={{ color: "var(--t2)" }}>{project.description}</p>}
          </div>
        )}

        {/* Preview iframe */}
        {project.previewUrl && (
          <div className="card overflow-hidden mb-5">
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
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
              style={{ height: 380 }}
              title="Project Preview"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-7 space-y-5">
          <div>
            <h3 className="font-bold text-lg mb-1" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Share Your Experience</h3>
            <p className="text-sm" style={{ color: "var(--t3)" }}>Your honest feedback helps me deliver better work.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Your Name</label>
            <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-3" style={{ color: "var(--t2)" }}>Rating *</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} type="button" onClick={() => setRating(i)} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} className="transition-transform hover:scale-110">
                  <Star size={32} fill={i <= (hoverRating || rating) ? "var(--amber)" : "transparent"} style={{ color: "var(--amber)" }} />
                </button>
              ))}
              <span className="text-sm ml-1" style={{ color: "var(--t3)" }}>
                {(hoverRating || rating) > 0 ? ["", "Poor", "Fair", "Good", "Great", "Excellent"][hoverRating || rating] : "Select rating"}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Your Review *</label>
            <textarea required rows={5} placeholder="Share your experience — quality, communication, results..." value={content} onChange={(e) => setContent(e.target.value)} className="input" />
          </div>

          <button type="submit" disabled={submitting || !rating || !content.trim()} className="btn-primary w-full justify-center">
            {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={15} /> Submit Review</>}
          </button>

          <p className="text-xs text-center" style={{ color: "var(--t3)" }}>
            This is a one-time review link and cannot be reused after submission.
          </p>
        </form>
      </div>
    </div>
  )
}
