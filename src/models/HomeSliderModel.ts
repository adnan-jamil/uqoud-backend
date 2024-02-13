import mongoose from "mongoose";
const homeschema = new mongoose.Schema(
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
    tags: [String],

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

module.exports = mongoose.model("homeslide", homeschema);
