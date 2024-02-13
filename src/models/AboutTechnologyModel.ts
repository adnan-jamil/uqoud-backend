import mongoose from "mongoose";
const AboutTechSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    AboutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "about",
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tech", AboutTechSchema);
