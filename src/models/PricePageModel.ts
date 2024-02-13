import mongoose from "mongoose";
const PricePageschema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    page_tag: {
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

module.exports = mongoose.model("pricepage", PricePageschema);
