import mongoose from "mongoose";
const Contactschema = new mongoose.Schema(
  {
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    business_email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    support_email: {
      type: String,
      unique: true,
      lowercase: true,
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

module.exports = mongoose.model("contactinfo", Contactschema);
