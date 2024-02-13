import mongoose from "mongoose";
const AboutToolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    AboutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "about",
    },
    link: {
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

module.exports = mongoose.model("abouttool", AboutToolSchema);
