import mongoose from "mongoose";
const Contractschema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
    },
    cta_text: {
      type: String,
    },
    cta_link: {
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

module.exports = mongoose.model("contract", Contractschema);
