"use client"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"
type Resolved = "light" | "dark"

interface Ctx {
  theme: Theme
  resolved: Resolved
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<Ctx>({ theme: "system", resolved: "dark", setTheme: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolved, setResolved] = useState<Resolved>("light")

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) ?? "system"
    setThemeState(stored)
  }, [])

  useEffect(() => {
    const apply = (t: Theme) => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const isDark = t === "dark" || (t === "system" && prefersDark)
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
      setResolved(isDark ? "dark" : "light")
    }
    apply(theme)

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = () => apply("system")
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }
  }, [theme])

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem("theme", t)
  }

  return <ThemeContext.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
