import { Router } from "express"
import { Project } from "../models/Project"
import { Review } from "../models/Review"
import { requireAuth } from "../middleware/requireAuth"

const router = Router()

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
}

// Public
router.get("/", async (req, res) => {
  try {
    const { status, type, featured } = req.query
    const filter: Record<string, unknown> = {}
    if (status) filter.status = status
    if (type) filter.type = type
    if (featured === "true") filter.featured = true

    const projects = await Project.find(filter).populate("clientId").sort({ createdAt: -1 })

    const withReviews = await Promise.all(
      projects.map(async (p) => {
        const reviews = await Review.find({ projectId: p._id, submitted: true }).select("content rating clientName submittedAt")
        return { ...p.toObject(), reviews }
      })
    )

    res.json(withReviews)
  } catch { res.status(500).json({ error: "Server error" }) }
})

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("clientId")
    if (!project) { res.status(404).json({ error: "Not found" }); return }
    const reviews = await Review.find({ projectId: project._id, submitted: true })
    res.json({ ...project.toObject(), reviews })
  } catch { res.status(500).json({ error: "Server error" }) }
})

// Protected
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, ...rest } = req.body
    const slug = slugify(title) + "-" + Date.now()
    const project = await Project.create({ title, slug, ...rest })
    res.status(201).json(project)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("clientId")
    if (!project) { res.status(404).json({ error: "Not found" }); return }
    res.json(project)
  } catch (err: any) { res.status(400).json({ error: err.message }) }
})

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    await Review.deleteMany({ projectId: req.params.id })
    res.json({ ok: true })
  } catch { res.status(500).json({ error: "Server error" }) }
})

export default router
