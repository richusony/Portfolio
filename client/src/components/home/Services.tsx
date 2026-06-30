const services = [
  {
    icon: "📱",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    title: "Mobile App Development",
    desc: "Cross-platform iOS & Android apps that feel native. Built with React Native or Flutter, optimized for performance, offline-first, App Store ready.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    highlight: "Most Popular",
  },
  {
    icon: "🌐",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    title: "Website & Web App",
    desc: "Blazing-fast, SEO-optimized websites and complex web applications. From landing pages to full SaaS platforms with real-time features.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
    highlight: null,
  },
  {
    icon: "💻",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
    title: "Desktop Applications",
    desc: "Powerful cross-platform desktop software for Windows, macOS, and Linux. Built with Electron or Tauri, with native OS integration.",
    tags: ["Electron", "Tauri", "React", "SQLite"],
    highlight: null,
  },
  {
    icon: "🎨",
    gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
    title: "UI/UX Design",
    desc: "Pixel-perfect interfaces that convert. From wireframes to production-ready Figma designs with full component libraries and design systems.",
    tags: ["Figma", "Prototyping", "Design System", "Framer"],
    highlight: null,
  },
  {
    icon: "⚡",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    title: "Performance Optimization",
    desc: "Speed up your existing product. Lighthouse audits, Core Web Vitals fixes, database query tuning, caching layers, and CDN setup.",
    tags: ["Optimization", "Caching", "CDN", "Web Vitals"],
    highlight: null,
  },
  {
    icon: "🔌",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
    title: "API & Backend",
    desc: "Secure, scalable REST and GraphQL APIs. Third-party integrations, payment gateways, authentication systems, and cloud infrastructure.",
    tags: ["REST API", "GraphQL", "OAuth", "Payments"],
    highlight: null,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="section-eyebrow justify-center mb-4">
            <span className="w-5 h-px" style={{ background: "var(--p)" }} />
            Services
            <span className="w-5 h-px" style={{ background: "var(--p)" }} />
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontFamily: "var(--font-display)", color: "var(--t1)" }}
          >
            Everything you need to{" "}
            <span className="grad-text">ship faster</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--t2)" }}>
            Full-service development from concept to launch. One developer, zero overhead, agency-quality results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="card p-6 group cursor-default relative overflow-hidden"
            >
              {s.highlight && (
                <div
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: "var(--p-muted)", color: "var(--p)" }}
                >
                  {s.highlight}
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                style={{ background: s.gradient, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              >
                {s.icon}
              </div>

              <h3
                className="font-bold text-base mb-2 group-hover:text-[var(--p)] transition-colors"
                style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--t2)" }}>{s.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => <span key={t} className="badge text-xs">{t}</span>)}
              </div>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: s.gradient }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center"
          style={{ background: "linear-gradient(135deg, var(--p-muted) 0%, transparent 100%)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-black text-xl mb-2" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>
            Have something in mind?
          </h3>
          <p className="mb-6 text-sm" style={{ color: "var(--t2)" }}>
            Get a free consultation and a detailed project estimate within 24 hours.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Start a Conversation →
          </a>
        </div>
      </div>
    </section>
  )
}
