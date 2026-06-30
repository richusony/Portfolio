import "dotenv/config"
import express from "express"
import cors from "cors"
import { connectDB } from "./lib/db"
import authRoutes from "./routes/auth"
import projectRoutes from "./routes/projects"
import clientRoutes from "./routes/clients"
import reviewRoutes from "./routes/reviews"
import messageRoutes from "./routes/messages"

const app = express()

const allowedOrigins = [
  process.env.CLIENT_URL ?? "http://localhost:3000",
  "http://localhost:3000",
  "https://richusony.in",
  "https://www.richusony.in",
]

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true)
    else cb(new Error("Not allowed by CORS"))
  },
  credentials: true,
}))

app.use(express.json())

app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }))

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/clients", clientRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/messages", messageRoutes)

// Seed endpoint
app.get("/api/init", async (_req, res) => {
  try {
    const { seedDatabase } = await import("./scripts/seed")
    const result = await seedDatabase()
    res.json({ ok: true, ...result })
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) })
  }
})

const PORT = Number(process.env.PORT) || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`))
}).catch(console.error)

export default app
