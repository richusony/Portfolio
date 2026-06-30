"use client"
import { useState } from "react"
import { MessageSquarePlus, Copy, Check } from "lucide-react"
import { api } from "@/lib/api"

export default function AskReviewBtn({ projectId }: { projectId: string }) {
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const generate = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await api.reviews.generate(projectId)
      const reviewUrl = `${window.location.origin}/review/${data.token}`
      setUrl(reviewUrl)
    } catch (e: any) {
      setError(e.message ?? "Failed to generate link")
    } finally {
      setLoading(false)
    }
  }

  const copy = () => {
    if (!url) return
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <button onClick={generate} disabled={loading} className="btn-secondary">
        {loading
          ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : <><MessageSquarePlus size={15} /> Ask for Review</>
        }
      </button>

      {error && <p className="text-xs mt-2" style={{ color: "var(--red, #ef4444)" }}>{error}</p>}

      {url && (
        <div className="mt-3 p-4 rounded-xl" style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>One-time review link (expires in 7 days):</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="input flex-1 text-xs"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={copy}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ background: copied ? "var(--p-muted)" : "var(--bg-3)", color: copied ? "var(--p)" : "var(--t2)" }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--t3)" }}>Share this link with your client. It can only be used once.</p>
        </div>
      )}
    </div>
  )
}
