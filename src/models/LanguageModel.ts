import mongoose from "mongoose";
const LanguageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
    },
    en: {
      type: String,
    },
    ar: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("translation", LanguageSchema);
