import mongoose from "mongoose";
const Challengeschema = new mongoose.Schema(
  {
    title: {
      type: String,
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

module.exports = mongoose.model("challenge", Challengeschema);
