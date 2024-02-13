import mongoose from "mongoose";
const CompanyValueSchema = new mongoose.Schema(
  {
    AboutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "about",
    },

    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
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

module.exports = mongoose.model("value", CompanyValueSchema);
