import mongoose from "mongoose";
const Productschema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
    checked: {
      type: String,
    },
    page_title: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_desc: {
      type: String,
    },
    tags: [String],

    image: {
      type: String,
    },
    logo: {
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

module.exports = mongoose.model("product", Productschema);
