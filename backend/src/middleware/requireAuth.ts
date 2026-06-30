import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
  adminId?: string
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }
  const token = auth.slice(7)
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "") as { sub: string }
    req.adminId = payload.sub
    next()
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}
