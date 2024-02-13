import mongoose from "mongoose";
const Sectionschema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    typeofsection: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
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

module.exports = mongoose.model("productsection", Sectionschema);
