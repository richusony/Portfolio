import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, default: null },
  website: { type: String, default: null },
  notes: { type: String, default: null },
}, { timestamps: true })

export const Client = mongoose.model("Client", schema)
