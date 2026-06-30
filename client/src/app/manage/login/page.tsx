"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogIn, Eye, EyeOff } from "lucide-react"
import { api, setToken } from "@/lib/api"

export default function ManageLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await api.auth.login(email, password)
      setToken(data.token)
      router.replace("/manage")
    } catch (e: any) {
      setError(e.message ?? "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-xl"
            style={{ background: "linear-gradient(135deg, var(--p-light), #6366F1)" }}
          >
            R
          </div>
          <h1 className="font-black text-xl" style={{ color: "var(--t1)", fontFamily: "var(--font-display)" }}>Admin Login</h1>
          <p className="text-sm mt-1" style={{ color: "var(--t3)" }}>richusony.in management</p>
        </div>

        <form onSubmit={submit} className="card p-7 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "var(--red-muted, #fee2e2)", color: "var(--red, #dc2626)" }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Email</label>
            <input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@richusony.in" className="input" />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: "var(--t2)" }}>Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--t3)" }}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn size={15} /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-xs mt-5" style={{ color: "var(--t3)" }}>
          Protected admin area ·{" "}
          <a href="/" style={{ color: "var(--p)" }}>Return to portfolio</a>
        </p>
      </div>
    </div>
  )
}
