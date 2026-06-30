import { MetadataRoute } from "next"

export const dynamic = "force-dynamic"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://richusony.in"

  let projectUrls: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${API}/api/projects`)
    if (res.ok) {
      const projects = await res.json()
      projectUrls = projects.map((p: any) => ({
        url: `${baseUrl}/projects/${p._id}`,
        lastModified: new Date(p.updatedAt ?? Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    }
  } catch {}

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/#about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/#work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/#contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...projectUrls,
  ]
}
