const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

function getToken(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|;\s*)manage_token=([^;]*)/)
  return match ? match[1] : null
}

export function setToken(token: string) {
  const exp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `manage_token=${token}; path=/; expires=${exp}; SameSite=Lax`
}

export function clearToken() {
  document.cookie = "manage_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"
}

async function req<T>(path: string, opts?: RequestInit): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts?.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? "Request failed")
  }
  return res.json()
}

// Auth
export const api = {
  auth: {
    login: (email: string, password: string) =>
      req<{ token: string; email: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
  },

  // Projects (public)
  projects: {
    list: (params?: { status?: string; type?: string; featured?: boolean }) => {
      const qs = new URLSearchParams()
      if (params?.status) qs.set("status", params.status)
      if (params?.type) qs.set("type", params.type)
      if (params?.featured) qs.set("featured", "true")
      return req<Project[]>(`/api/projects${qs.toString() ? "?" + qs : ""}`)
    },
    get: (id: string) => req<Project>(`/api/projects/${id}`),
    create: (data: Partial<Project>) =>
      req<Project>("/api/projects", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Project>) =>
      req<Project>(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: string) =>
      req<{ ok: boolean }>(`/api/projects/${id}`, { method: "DELETE" }),
  },

  // Clients (protected)
  clients: {
    list: () => req<ClientWithProjects[]>("/api/clients"),
    create: (data: Partial<Client>) =>
      req<Client>("/api/clients", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Client>) =>
      req<Client>(`/api/clients/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
    delete: (id: string) =>
      req<{ ok: boolean }>(`/api/clients/${id}`, { method: "DELETE" }),
  },

  // Reviews
  reviews: {
    generate: (projectId: string) =>
      req<{ token: string; url: string }>("/api/reviews/generate", {
        method: "POST",
        body: JSON.stringify({ projectId }),
      }),
    get: (token: string) => req<ReviewWithProject>(`/api/reviews/${token}`),
    submit: (token: string, data: { content: string; rating: number; clientName?: string }) =>
      req<{ ok: boolean }>(`/api/reviews/${token}`, { method: "POST", body: JSON.stringify(data) }),
    byProject: (projectId: string) => req<Review[]>(`/api/reviews/project/${projectId}`),
  },

  // Messages
  messages: {
    submit: (data: { name: string; email: string; phone: string; budget?: string; message: string }) =>
      req<{ ok: boolean; id: string }>("/api/messages", { method: "POST", body: JSON.stringify(data) }),
    list: () => req<ContactMessage[]>("/api/messages"),
    markRead: (id: string) => req<ContactMessage>(`/api/messages/${id}/read`, { method: "PATCH" }),
    delete: (id: string) => req<{ ok: boolean }>(`/api/messages/${id}`, { method: "DELETE" }),
  },

  init: () => req<{ ok: boolean; seeded: boolean }>("/api/init"),
}

// Types
export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  longDesc: string | null
  type: "website" | "mobile_app" | "computer_application"
  status: "ongoing" | "completed" | "on_hold"
  previewUrl: string | null
  liveUrl: string | null
  repoUrl: string | null
  imageUrl: string | null
  tags: string[]
  featured: boolean
  clientId: Client | string | null
  year: number
  reviews: Review[]
  createdAt: string
  updatedAt: string
}

export interface Client {
  _id: string
  name: string
  email: string
  company: string | null
  website: string | null
  notes: string | null
  createdAt: string
}

export interface ClientWithProjects extends Client {
  projects: { _id: string; title: string; status: string; type: string }[]
}

export interface Review {
  _id: string
  token: string
  content: string | null
  rating: number | null
  clientName: string | null
  submitted: boolean
  projectId: string
  expiresAt: string | null
  submittedAt: string | null
  createdAt: string
}

export interface ReviewWithProject extends Omit<Review, "projectId"> {
  projectId: Project
}

export interface ContactMessage {
  _id: string
  name: string
  email: string
  phone: string
  budget: string | null
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
}
