import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Admin } from "../models/Admin"

const router = Router()

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) { res.status(400).json({ error: "Email and password required" }); return }

    const admin = await Admin.findOne({ email })
    if (!admin) { res.status(401).json({ error: "Invalid credentials" }); return }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) { res.status(401).json({ error: "Invalid credentials" }); return }

    const token = jwt.sign(
      { sub: admin._id.toString(), email: admin.email },
      process.env.JWT_SECRET ?? "",
      { expiresIn: "7d" }
    )

    res.json({ token, email: admin.email })
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

export default router
