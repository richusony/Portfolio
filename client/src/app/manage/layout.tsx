"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard, FolderKanban, Users, LogOut, ChevronLeft, ChevronRight, Menu
} from "lucide-react"
import { clearToken } from "@/lib/api"

const NAV = [
  { href: "/manage", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/manage/projects", label: "Projects", icon: FolderKanban },
  { href: "/manage/clients", label: "Clients", icon: Users },
]

function SidebarContent({
  collapsed,
  onNavClick,
  onLogout,
  isActive,
}: {
  collapsed: boolean
  onNavClick: () => void
  onLogout: () => void
  isActive: (href: string, exact?: boolean) => boolean
}) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, var(--p-light), #6366F1)" }}
        >
          R
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Manage</p>
            <p className="text-xs" style={{ color: "var(--t3)" }}>richusony.in</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium"
              style={{
                background: active ? "var(--p-muted)" : "transparent",
                color: active ? "var(--p)" : "var(--t2)",
              }}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-4 space-y-1 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors" style={{ color: "var(--t3)" }}>
          <span className="text-base flex-shrink-0">🌐</span>
          {!collapsed && "View Site"}
        </Link>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors" style={{ color: "var(--t3)" }}>
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </>
  )
}

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (pathname === "/manage/login") return <>{children}</>

  const logout = () => {
    clearToken()
    router.replace("/manage/login")
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col flex-shrink-0 transition-all duration-200 relative"
        style={{
          width: collapsed ? 64 : 220,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <SidebarContent
          collapsed={collapsed}
          onNavClick={() => {}}
          onLogout={logout}
          isActive={isActive}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full flex items-center justify-center text-xs z-10"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--t3)" }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
          <aside
            className="absolute left-0 top-0 bottom-0 w-56 flex flex-col"
            style={{ background: "var(--surface)", borderRight: "1px solid var(--border)", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent
              collapsed={false}
              onNavClick={() => setMobileOpen(false)}
              onLogout={logout}
              isActive={isActive}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
          <button onClick={() => setMobileOpen(true)} aria-label="Open sidebar" style={{ color: "var(--t2)" }}>
            <Menu size={20} />
          </button>
          <span className="font-bold text-sm" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Management Panel</span>
          <button onClick={logout} aria-label="Logout" style={{ color: "var(--t3)" }}><LogOut size={18} /></button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
