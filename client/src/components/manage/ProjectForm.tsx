"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, X, Plus } from "lucide-react"
import { api, type Project, type Client } from "@/lib/api"

type Mode = "create" | "edit"

interface Props {
  project?: Project
  mode: Mode
}

const TYPE_OPTIONS = [
  { value: "website", label: "🌐 Website" },
  { value: "mobile_app", label: "📱 Mobile App" },
  { value: "computer_application", label: "💻 Desktop App" },
]
const STATUS_OPTIONS = [
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
]

export default function ProjectForm({ project, mode }: Props) {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    longDesc: project?.longDesc ?? "",
    type: project?.type ?? "website",
    status: project?.status ?? "ongoing",
    year: project?.year ?? new Date().getFullYear(),
    tags: project?.tags ?? [],
    clientId: (typeof project?.clientId === "object" ? project?.clientId?._id : project?.clientId) ?? "",
    previewUrl: project?.previewUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
    repoUrl: project?.repoUrl ?? "",
    featured: project?.featured ?? false,
  })

  useEffect(() => {
    api.clients.list().then(setClients).catch(console.error)
  }, [])

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) set("tags", [...form.tags, t])
    setTagInput("")
  }
  const removeTag = (t: string) => set("tags", form.tags.filter((x) => x !== t))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    try {
      const payload = { ...form, clientId: form.clientId || undefined }
      if (mode === "create") {
        await api.projects.create(payload)
        router.push("/manage/projects")
      } else if (project) {
        await api.projects.update(project._id, payload)
        router.push("/manage/projects")
      }
    } catch (e: any) {
      setError(e.message ?? "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "color-mix(in srgb, var(--red, #ef4444) 10%, transparent)", color: "var(--red, #ef4444)", border: "1px solid color-mix(in srgb, var(--red, #ef4444) 20%, transparent)" }}>
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Project Title *</label>
        <input required value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. E-Commerce Mobile App" className="input" />
      </div>

      {/* Type + Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Type *</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value)} className="input">
            {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Status *</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="input">
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Short Description *</label>
        <textarea required rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief description shown on the portfolio card" className="input" />
      </div>

      {/* Long desc */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Full Description</label>
        <textarea rows={5} value={form.longDesc} onChange={(e) => set("longDesc", e.target.value)} placeholder="Detailed project overview shown on the project page" className="input" />
      </div>

      {/* Year + Client */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Year</label>
          <input type="number" min={2015} max={2030} value={form.year} onChange={(e) => set("year", +e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Client</label>
          <select value={form.clientId} onChange={(e) => set("clientId", e.target.value)} className="input">
            <option value="">— No client —</option>
            {clients.map((c) => <option key={c._id} value={c._id}>{c.name} {c.company ? `(${c.company})` : ""}</option>)}
          </select>
        </div>
      </div>

      {/* URLs */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Live URL</label>
          <input type="url" value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} placeholder="https://..." className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Repository URL</label>
          <input type="url" value={form.repoUrl} onChange={(e) => set("repoUrl", e.target.value)} placeholder="https://github.com/..." className="input" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Preview URL (iframe)</label>
          <input type="url" value={form.previewUrl} onChange={(e) => set("previewUrl", e.target.value)} placeholder="https://..." className="input" />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Tech Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
            placeholder="e.g. React Native"
            className="input flex-1"
          />
          <button type="button" onClick={addTag} className="btn-secondary px-3">
            <Plus size={15} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {form.tags.map((t) => (
            <span key={t} className="badge flex items-center gap-1">
              {t}
              <button type="button" onClick={() => removeTag(t)} className="hover:opacity-70"><X size={10} /></button>
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set("featured", e.target.checked)}
          className="w-4 h-4 rounded"
          style={{ accentColor: "var(--p)" }}
        />
        <span className="text-sm font-medium" style={{ color: "var(--t1)" }}>Mark as Featured (shown larger in portfolio)</span>
      </label>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} /> {mode === "create" ? "Create Project" : "Save Changes"}</>}
        </button>
        <button type="button" onClick={() => router.push("/manage/projects")} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  )
}
