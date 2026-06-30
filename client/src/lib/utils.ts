import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const PROJECT_TYPES = [
  { value: "website", label: "Website" },
  { value: "mobile_app", label: "Mobile App (Android/iOS)" },
  { value: "computer_application", label: "Computer Application" },
] as const

export const PROJECT_STATUSES = [
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"]
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]["value"]

export function getStatusColor(status: string) {
  switch (status) {
    case "completed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "ongoing": return "bg-violet-500/20 text-violet-400 border-violet-500/30"
    case "on_hold": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    default: return "bg-slate-500/20 text-slate-400 border-slate-500/30"
  }
}

export function getTypeIcon(type: string) {
  switch (type) {
    case "website": return "🌐"
    case "mobile_app": return "📱"
    case "computer_application": return "💻"
    default: return "🔧"
  }
}

export function getTypeLabel(type: string) {
  return PROJECT_TYPES.find(t => t.value === type)?.label ?? type
}
