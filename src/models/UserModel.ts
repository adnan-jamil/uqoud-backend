import mongoose from "mongoose";
const crypto = require("crypto");
var validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a Name"],
      minlength: 5,
      trim: true,
    },
    email: {
      required: [true, "please provide an Email"],
      unique: true,
      type: String,
      validate: [validator.isEmail, "Please provide a valid Email"],
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },
    confirmpassword: {
      type: String,
      required: true,
      validate: {
        validator: function (el: any) {
          return el === this.password;
        },
        message: "passwords do not match",
      },
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next: () => void) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmpassword = "";
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword: any,
  userPassword: any
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
