import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  budget: { type: String, default: null },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true })

export const Message = mongoose.model("Message", schema)
