import mongoose from "mongoose"

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  longDesc: { type: String, default: null },
  type: { type: String, enum: ["website", "mobile_app", "computer_application"], required: true },
  status: { type: String, enum: ["ongoing", "completed", "on_hold"], required: true },
  previewUrl: { type: String, default: null },
  liveUrl: { type: String, default: null },
  repoUrl: { type: String, default: null },
  imageUrl: { type: String, default: null },
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", default: null },
  year: { type: Number, default: () => new Date().getFullYear() },
}, { timestamps: true })

export const Project = mongoose.model("Project", schema)
