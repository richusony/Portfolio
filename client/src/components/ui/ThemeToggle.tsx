"use client"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const options = [
  { value: "light" as const, Icon: Sun, label: "Light" },
  { value: "system" as const, Icon: Monitor, label: "System" },
  { value: "dark" as const, Icon: Moon, label: "Dark" },
]

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className="flex items-center p-1 rounded-xl"
      style={{ background: "var(--bg-2)", border: "1px solid var(--border)" }}
      title="Toggle theme"
    >
      {options.map(({ value, Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} mode`}
          className="relative w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
          style={{
            background: theme === value ? "var(--surface)" : "transparent",
            color: theme === value ? "var(--p)" : "var(--t3)",
            boxShadow: theme === value ? "var(--shadow-xs)" : "none",
          }}
        >
          <Icon size={13} strokeWidth={2.2} />
        </button>
      ))}
    </div>
  )
}
