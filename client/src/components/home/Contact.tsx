"use client"
import { useState } from "react"
import { Send, Mail, Clock, CheckCircle2 } from "lucide-react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons"
import { api } from "@/lib/api"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await api.messages.submit({
        name: form.name,
        email: form.email,
        phone: form.phone,
        budget: form.budget || undefined,
        message: form.message,
      })
      setSent(true)
    } catch {
      setError("Something went wrong. Please try emailing me directly.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-4">
            <span className="w-5 h-px" style={{ background: "var(--p)" }} />
            Get In Touch
            <span className="w-5 h-px" style={{ background: "var(--p)" }} />
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontFamily: "var(--font-display)", color: "var(--t1)" }}
          >
            Let&apos;s build something{" "}
            <span className="grad-text">remarkable</span>
          </h2>
          <p style={{ color: "var(--t2)" }}>Have a project in mind? I respond within 24 hours.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", val: "dev.richusony@gmail.com", href: "mailto:dev.richusony@gmail.com", color: "var(--p)" },
              { icon: Clock, label: "Response Time", val: "Within 24 hours", href: null, color: "var(--green)" },
            ].map(({ icon: Icon, label, val, href, color }) => (
              <div key={label} className="card p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: "var(--t3)" }}>{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold hover:underline" style={{ color: "var(--t1)" }}>{val}</a>
                  ) : (
                    <p className="text-sm font-semibold" style={{ color: "var(--t1)" }}>{val}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="card p-5" style={{ borderLeft: "3px solid var(--p)" }}>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--p)", fontFamily: "var(--font-display)" }}>💡 Affordable Pricing</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>
                Projects start from ₹5,000. I work with all budgets — share your requirements and I&apos;ll tailor a solution that fits.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--t3)" }}>Connect</p>
              <div className="flex gap-2">
                {[
                  { href: "https://github.com/richusony", Icon: GithubIcon, label: "GitHub" },
                  { href: "https://linkedin.com/in/richusony", Icon: LinkedinIcon, label: "LinkedIn" },
                  { href: "https://twitter.com/richusony", Icon: TwitterIcon, label: "Twitter/X" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 card rounded-xl flex items-center justify-center transition-colors"
                    style={{ color: "var(--t2)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--p)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t2)")}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="card p-12 text-center">
                <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "var(--green)" }} />
                <h3 className="font-black text-xl mb-2" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Message Sent!</h3>
                <p className="text-sm mb-6" style={{ color: "var(--t2)" }}>Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", budget: "", message: "" }) }}
                  className="btn-secondary"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="card p-8 space-y-5">
                {error && (
                  <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--red-muted, #fee2e2)", color: "var(--red, #dc2626)" }}>
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Your Name *</label>
                    <input required type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Email *</label>
                    <input required type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Phone Number *</label>
                  <input required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Budget Range</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="input">
                    <option value="">Select a range</option>
                    <option>Under ₹5,000</option>
                    <option>₹5,000 – ₹15,000</option>
                    <option>₹15,000 – ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>₹1,00,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Tell me about your project *</label>
                  <textarea required rows={5} placeholder="Describe what you need, your goals, and timeline..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
