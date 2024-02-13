import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    HeaderSection: [
      {
        itemTitle: {
          type: String,
        },
        itemDescription: {
          type: String,
        },
      },
      { timestamps: true },
    ],

    isActive: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("about", CompanySchema);
