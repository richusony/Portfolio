import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/review/"],
      },
    ],
    sitemap: "https://richusony.in/sitemap.xml",
  }
}
