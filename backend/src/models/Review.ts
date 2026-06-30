import mongoose from "mongoose"

const schema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  content: { type: String, default: null },
  rating: { type: Number, min: 1, max: 5, default: null },
  clientName: { type: String, default: null },
  submitted: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  expiresAt: { type: Date, default: null },
  submittedAt: { type: Date, default: null },
}, { timestamps: true })

export const Review = mongoose.model("Review", schema)
