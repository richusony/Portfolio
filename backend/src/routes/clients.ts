import { Router } from "express"
import { Client } from "../models/Client"
import { Project } from "../models/Project"
import { requireAuth } from "../middleware/requireAuth"

const router = Router()

router.get("/", requireAuth, async (_req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 })
    const withProjects = await Promise.all(
      clients.map(async (c) => {
        const projects = await Project.find({ clientId: c._id }).select("_id title status type")
        return { ...c.toObject(), projects }
      })
    )
    res.json(withProjects)
  } catch { res.status(500).json({ error: "Server error" }) }
})

router.post("/", requireAuth, async (req, res) => {
  try {
    const client = await Client.create(req.body)
    res.status(201).json(client)
  } catch (err: any) { res.status(400).json({ error: err.message }) }
})

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!client) { res.status(404).json({ error: "Not found" }); return }
    res.json(client)
  } catch (err: any) { res.status(400).json({ error: err.message }) }
})

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch { res.status(500).json({ error: "Server error" }) }
})

export default router
