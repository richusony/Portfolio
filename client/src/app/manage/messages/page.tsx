"use client"
import { useEffect, useState } from "react"
import { Phone, Mail, Trash2, MailOpen, ChevronDown, ChevronRight } from "lucide-react"
import { api, type ContactMessage } from "@/lib/api"

export default function ManageMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    api.messages.list()
      .then(setMessages)
      .finally(() => setLoading(false))
  }, [])

  const expand = async (msg: ContactMessage) => {
    if (expanded === msg._id) { setExpanded(null); return }
    setExpanded(msg._id)
    if (!msg.read) {
      try {
        await api.messages.markRead(msg._id)
        setMessages((prev) => prev.map((m) => m._id === msg._id ? { ...m, read: true } : m))
      } catch { /* ignore */ }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return
    setDeleting(id)
    try {
      await api.messages.delete(id)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      if (expanded === id) setExpanded(null)
    } catch (e: any) {
      alert(e.message ?? "Delete failed")
    } finally {
      setDeleting(null)
    }
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl mb-1" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Messages</h1>
          <p className="text-sm" style={{ color: "var(--t3)" }}>
            {messages.length} total{unread > 0 && ` · `}
            {unread > 0 && <span style={{ color: "var(--p)", fontWeight: 600 }}>{unread} unread</span>}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-16 skeleton rounded-xl" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-3xl mb-3">📭</p>
          <p className="font-semibold mb-1" style={{ color: "var(--t1)" }}>No messages yet</p>
          <p className="text-sm" style={{ color: "var(--t3)" }}>Messages from the contact form will appear here</p>
        </div>
      ) : (
        <div className="card divide-y" style={{ borderColor: "var(--border)" }}>
          {messages.map((msg) => (
            <div key={msg._id}>
              {/* Row */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                style={{ background: msg.read ? "transparent" : "color-mix(in srgb, var(--p) 4%, transparent)" }}
                onClick={() => expand(msg)}
              >
                {/* Unread dot */}
                <div className="flex-shrink-0 w-2 h-2 rounded-full" style={{ background: msg.read ? "transparent" : "var(--p)" }} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--t1)", fontWeight: msg.read ? 500 : 700 }}>
                      {msg.name}
                    </p>
                    {msg.budget && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold flex-shrink-0" style={{ background: "var(--p-muted)", color: "var(--p)" }}>
                        {msg.budget}
                      </span>
                    )}
                  </div>
                  <p className="text-xs truncate mt-0.5" style={{ color: "var(--t3)" }}>{msg.message}</p>
                </div>

                <p className="text-xs flex-shrink-0" style={{ color: "var(--t3)" }}>
                  {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(msg._id) }}
                    disabled={deleting === msg._id}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ color: "var(--t3)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red, #ef4444)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
                  >
                    {deleting === msg._id
                      ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      : <Trash2 size={14} />}
                  </button>
                  {expanded === msg._id ? <ChevronDown size={14} style={{ color: "var(--t3)" }} /> : <ChevronRight size={14} style={{ color: "var(--t3)" }} />}
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === msg._id && (
                <div className="px-6 pb-5 pt-1 space-y-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <a
                      href={`mailto:${msg.email}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: "var(--p-muted)", color: "var(--p)" }}
                    >
                      <Mail size={12} /> {msg.email}
                    </a>
                    <a
                      href={`tel:${msg.phone}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: "color-mix(in srgb, var(--green) 12%, transparent)", color: "var(--green)" }}
                    >
                      <Phone size={12} /> {msg.phone}
                    </a>
                    {msg.budget && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "var(--surface-2, var(--surface))", color: "var(--t2)" }}>
                        Budget: {msg.budget}
                      </span>
                    )}
                  </div>

                  <div className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap" style={{ background: "var(--surface-2, var(--bg))", color: "var(--t1)" }}>
                    {msg.message}
                  </div>

                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--t3)" }}>
                    <MailOpen size={12} />
                    Received {new Date(msg.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
