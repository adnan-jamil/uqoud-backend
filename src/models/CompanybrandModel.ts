import mongoose from "mongoose";
const AboutBrandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    AboutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "about",
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

module.exports = mongoose.model("brand", AboutBrandSchema);
