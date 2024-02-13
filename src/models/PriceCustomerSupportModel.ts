import mongoose from "mongoose";
const PricePageschema = new mongoose.Schema(
  {
    price_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pricepage",
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

module.exports = mongoose.model("support", PricePageschema);
