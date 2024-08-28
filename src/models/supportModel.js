import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const supportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  messege: [messageSchema],
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  category: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

supportSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const Support = mongoose.model("Support", supportSchema);
