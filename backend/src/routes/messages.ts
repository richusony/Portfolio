import { Router } from "express"
import { Message } from "../models/Message"
import { requireAuth } from "../middleware/requireAuth"

const router = Router()

// Public — visitor submits a contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, budget, message } = req.body
    if (!name || !email || !phone || !message) {
      res.status(400).json({ error: "Name, email, phone and message are required" })
      return
    }
    const doc = await Message.create({ name, email, phone, budget: budget || null, message })
    res.status(201).json({ ok: true, id: doc._id })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
})

// Protected — list all messages (newest first)
router.get("/", requireAuth, async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch {
    res.status(500).json({ error: "Server error" })
  }
})

// Protected — mark a message as read
router.patch("/:id/read", requireAuth, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!msg) { res.status(404).json({ error: "Not found" }); return }
    res.json(msg)
  } catch {
    res.status(500).json({ error: "Server error" })
  }
})

// Protected — delete a message
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: "Server error" })
  }
})

export default router
