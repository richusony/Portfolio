import "dotenv/config"
import bcrypt from "bcryptjs"
import { connectDB } from "../lib/db"
import { Admin } from "../models/Admin"
import { Client } from "../models/Client"
import { Project } from "../models/Project"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
}

export async function seedDatabase() {
  await connectDB()

  const email = process.env.ADMIN_EMAIL ?? "admin@richusony.in"
  const exists = await Admin.findOne({ email })
  if (exists) return { seeded: false, message: "Already seeded" }

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "Admin@2024", 12)
  await Admin.create({ email, password: hashed })

  const clients = await Client.insertMany([
    { name: "Alex Carter", email: "alex@techventures.io", company: "TechVentures Inc.", website: "https://techventures.io" },
    { name: "Priya Sharma", email: "priya@bloom.co", company: "Bloom Co.", website: "https://bloom.co" },
    { name: "Marcus Williams", email: "marcus@swiftlogix.com", company: "SwiftLogix" },
  ])

  const projects = [
    {
      title: "Bloom E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory, AI-powered recommendations, and seamless checkout.",
      longDesc: "Built a scalable e-commerce platform from scratch featuring product catalog management, cart system, Stripe payment integration, real-time stock updates, and an AI recommendation engine that increased average order value by 34%.",
      type: "website", status: "completed", previewUrl: "https://example.com", liveUrl: "https://example.com",
      tags: ["Next.js", "Stripe", "PostgreSQL", "TailwindCSS", "AI"], featured: true, clientId: clients[1]._id, year: 2024,
    },
    {
      title: "SwiftLogix Delivery App",
      description: "Cross-platform delivery tracking app with real-time GPS, route optimization, and driver management.",
      longDesc: "Engineered a React Native mobile application for logistics management with live GPS tracking, automated route optimization reducing fuel costs by 22%, push notifications, and a companion web dashboard.",
      type: "mobile_app", status: "completed",
      tags: ["React Native", "Node.js", "Google Maps API", "Firebase"], featured: true, clientId: clients[2]._id, year: 2024,
    },
    {
      title: "TechVentures Analytics Dashboard",
      description: "Real-time business intelligence dashboard with data visualization and predictive analytics.",
      longDesc: "Developed a comprehensive analytics platform processing 10M+ events daily with Next.js, D3.js charts, WebSocket live updates, and custom ML models for churn prediction.",
      type: "website", status: "ongoing", previewUrl: "https://example.com",
      tags: ["Next.js", "D3.js", "Python", "PostgreSQL", "WebSockets"], featured: true, clientId: clients[0]._id, year: 2025,
    },
    {
      title: "MindSpace Wellness App",
      description: "Mental wellness mobile app with guided meditation, mood tracking, and personalized AI insights.",
      longDesc: "Designed and built a cross-platform wellness app with 50+ guided meditation sessions, daily mood journaling with sentiment analysis, sleep tracking, and AI-generated personalized wellness reports.",
      type: "mobile_app", status: "completed",
      tags: ["Flutter", "Firebase", "TensorFlow Lite", "Node.js"], featured: false, year: 2024,
    },
    {
      title: "ProDesk CRM Suite",
      description: "Enterprise CRM desktop app with workflow automation and deep email integration.",
      longDesc: "Built a cross-platform Electron CRM application for sales teams featuring contact management, automated email sequences, deal pipeline visualization, calendar sync, and custom reporting.",
      type: "computer_application", status: "on_hold",
      tags: ["Electron", "React", "SQLite", "Node.js"], featured: false, year: 2025,
    },
    {
      title: "FoodieMap Restaurant Discovery",
      description: "Hyper-local restaurant discovery app with AR menu preview and social dining features.",
      longDesc: "Created a location-based restaurant discovery platform with AR-powered menu visualization, user reviews, table booking, and social features. Achieved 4.8/5 App Store rating.",
      type: "mobile_app", status: "completed",
      tags: ["React Native", "ARKit", "ARCore", "Node.js", "MongoDB"], featured: false, year: 2023,
    },
  ]

  for (const p of projects) {
    await Project.create({ ...p, slug: slugify(p.title) + "-" + Date.now(), clientId: (p as any).clientId ?? null })
  }

  return { seeded: true }
}

if (require.main === module) {
  seedDatabase()
    .then((r) => { console.log("✅ Seeded:", r); process.exit(0) })
    .catch((e) => { console.error(e); process.exit(1) })
}
