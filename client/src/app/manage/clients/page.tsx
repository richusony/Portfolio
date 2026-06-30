"use client"
import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import { api, type ClientWithProjects } from "@/lib/api"

type FormState = { name: string; email: string; company: string; website: string; notes: string }

function ClientFormCard({
  form,
  setForm,
  error,
  saving,
  editId,
  onSubmit,
  onCancel,
}: {
  form: FormState
  setForm: (f: FormState) => void
  error: string
  saving: boolean
  editId: string | null
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-4">
      {error && <p className="text-xs" style={{ color: "var(--red, #ef4444)" }}>{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Company</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Website</label>
          <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." className="input" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Notes</label>
        <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Internal notes..." className="input" />
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : editId ? "Save Changes" : "Add Client"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
      </div>
    </form>
  )
}

export default function ManageClients() {
  const [clients, setClients] = useState<ClientWithProjects[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", company: "", website: "", notes: "" })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState("")

  const load = () => {
    api.clients.list()
      .then(setClients)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const resetForm = () => setForm({ name: "", email: "", company: "", website: "", notes: "" })

  const startEdit = (c: ClientWithProjects) => {
    setEditId(c._id)
    setShowNew(false)
    setForm({ name: c.name, email: c.email ?? "", company: c.company ?? "", website: c.website ?? "", notes: c.notes ?? "" })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      if (editId) {
        const updated = await api.clients.update(editId, form)
        setClients((prev) => prev.map((c) => c._id === editId ? { ...c, ...updated } : c))
        setEditId(null)
      } else {
        await api.clients.create(form)
        setShowNew(false)
        load()
      }
      resetForm()
    } catch (e: any) {
      setError(e.message ?? "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete client "${name}"?`)) return
    setDeleting(id)
    try {
      await api.clients.delete(id)
      setClients((prev) => prev.filter((c) => c._id !== id))
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
          <h1 className="font-black text-2xl mb-1" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Clients</h1>
          <p className="text-sm" style={{ color: "var(--t3)" }}>{clients.length} total</p>
        </div>
        {!showNew && !editId && (
          <button onClick={() => { setShowNew(true); resetForm() }} className="btn-primary">
            <Plus size={15} /> New Client
          </button>
        )}
      </div>

      {showNew && (
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-3" style={{ color: "var(--t1)" }}>New Client</h2>
          <ClientFormCard
            form={form} setForm={setForm} error={error} saving={saving} editId={null}
            onSubmit={submit} onCancel={() => { setShowNew(false); resetForm() }}
          />
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-16 skeleton rounded-xl" />)}</div>
      ) : clients.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-3xl mb-3">👥</p>
          <p className="font-semibold mb-1" style={{ color: "var(--t1)" }}>No clients yet</p>
          <p className="text-sm mb-5" style={{ color: "var(--t3)" }}>Add your first client to get started</p>
          <button onClick={() => { setShowNew(true); resetForm() }} className="btn-primary"><Plus size={15} /> Add Client</button>
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((c) => (
            <div key={c._id}>
              {editId === c._id ? (
                <div>
                  <h2 className="font-bold text-sm mb-3" style={{ color: "var(--t1)" }}>Edit {c.name}</h2>
                  <ClientFormCard
                    form={form} setForm={setForm} error={error} saving={saving} editId={editId}
                    onSubmit={submit} onCancel={() => { setEditId(null); resetForm() }}
                  />
                </div>
              ) : (
                <div className="card">
                  <div className="flex items-center gap-4 p-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: "var(--p-muted)", color: "var(--p)" }}
                    >
                      {c.name[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{c.name}</p>
                      <p className="text-xs" style={{ color: "var(--t3)" }}>
                        {c.company ?? c.email ?? "No email"} · {c.projects?.length ?? 0} project{(c.projects?.length ?? 0) !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {(c.projects?.length ?? 0) > 0 && (
                        <button onClick={() => setExpanded(expanded === c._id ? null : c._id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: "var(--t3)" }}>
                          {expanded === c._id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      )}
                      <button onClick={() => startEdit(c)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "var(--t3)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
                      >
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(c._id, c.name)} disabled={deleting === c._id} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: "var(--t3)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--red, #ef4444)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t3)")}
                      >
                        {deleting === c._id ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </div>

                  {expanded === c._id && c.projects && c.projects.length > 0 && (
                    <div className="px-4 pb-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <p className="text-xs font-semibold uppercase tracking-widest my-2" style={{ color: "var(--t3)" }}>Projects</p>
                      <div className="space-y-1">
                        {c.projects.map((p: any) => (
                          <div key={p._id} className="flex items-center gap-3 py-1.5 text-sm">
                            <span className="text-base">
                              {p.type === "website" ? "🌐" : p.type === "mobile_app" ? "📱" : "💻"}
                            </span>
                            <span style={{ color: "var(--t1)" }}>{p.title}</span>
                            <span
                              className={`ml-auto px-2 py-0.5 rounded-lg text-xs font-semibold border ${
                                p.status === "completed" ? "status-completed" : p.status === "ongoing" ? "status-ongoing" : "status-on_hold"
                              }`}
                            >
                              {p.status.replace("_", " ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
