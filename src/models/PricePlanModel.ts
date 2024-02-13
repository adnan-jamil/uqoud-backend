import mongoose from "mongoose";
const PricePlanschema = new mongoose.Schema(
  {
    price_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pricepage",
    },
    title: {
      type: String,
    },
    plan_description: {
      type: String,
    },
    other_description: {
      type: String,
    },
    price: {
      type: Number,
    },
    features: {
      type: [String],
    },
    cta_text: {
      type: String,
      default: "Try or Subscribe",
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

module.exports = mongoose.model("priceplan", PricePlanschema);
