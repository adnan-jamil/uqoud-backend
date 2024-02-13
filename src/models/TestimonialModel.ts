import mongoose from "mongoose";
const Testimonialschema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    review_by: {
      type: String,
    },
    review_from: {
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

module.exports = mongoose.model("testimonial", Testimonialschema);
