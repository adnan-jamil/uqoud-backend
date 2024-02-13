import mongoose from "mongoose";
const HowToschema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    features: {
      type: [
        {
          type: String,
        },
      ],
    },
    image: {
      type: String,
    },
    tags: {
      type: [String],
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

module.exports = mongoose.model("howitwork", HowToschema);
