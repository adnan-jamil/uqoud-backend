import mongoose from "mongoose";
const TechCardschema = new mongoose.Schema(
  {
    techID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tech",
    },
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

module.exports = mongoose.model("techcard", TechCardschema);
