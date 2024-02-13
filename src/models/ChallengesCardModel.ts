import mongoose from "mongoose";
const Challengescardchema = new mongoose.Schema(
  {
    challengeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "challenge",
      required: true,
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

module.exports = mongoose.model("carditem", Challengescardchema);
