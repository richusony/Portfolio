import { Router } from "express"
import { v4 as uuid } from "uuid"
import { Review } from "../models/Review"
import { Project } from "../models/Project"
import { requireAuth } from "../middleware/requireAuth"

const router = Router()

router.post("/generate", requireAuth, async (req, res) => {
  try {
    const { projectId } = req.body
    const project = await Project.findById(projectId)
    if (!project) { res.status(404).json({ error: "Project not found" }); return }

    await Review.deleteMany({ projectId, submitted: false })

    const token = uuid()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await Review.create({ token, projectId, expiresAt })

    const baseUrl = process.env.CLIENT_URL ?? "http://localhost:3000"
    res.json({ token, url: `${baseUrl}/review/${token}` })
  } catch { res.status(500).json({ error: "Server error" }) }
})

router.get("/:token", async (req, res) => {
  try {
    const review = await Review.findOne({ token: req.params.token }).populate("projectId")
    if (!review) { res.status(404).json({ error: "Invalid link" }); return }
    if (review.submitted) { res.status(410).json({ error: "Already submitted" }); return }
    if (review.expiresAt && review.expiresAt < new Date()) {
      res.status(410).json({ error: "Link expired" }); return
    }
    res.json(review)
  } catch { res.status(500).json({ error: "Server error" }) }
})

router.post("/:token", async (req, res) => {
  try {
    const review = await Review.findOne({ token: req.params.token })
    if (!review) { res.status(404).json({ error: "Invalid link" }); return }
    if (review.submitted) { res.status(410).json({ error: "Already submitted" }); return }
    if (review.expiresAt && review.expiresAt < new Date()) {
      res.status(410).json({ error: "Link expired" }); return
    }

    const { content, rating, clientName } = req.body
    review.content = content
    review.rating = rating ? Number(rating) : undefined
    review.clientName = clientName ?? undefined
    review.submitted = true
    review.submittedAt = new Date()
    await review.save()

    res.json({ ok: true })
  } catch { res.status(500).json({ error: "Server error" }) }
})

router.get("/project/:projectId", requireAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ projectId: req.params.projectId }).sort({ createdAt: -1 })
    res.json(reviews)
  } catch { res.status(500).json({ error: "Server error" }) }
})

export default router
