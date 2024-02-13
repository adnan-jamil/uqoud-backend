const express = require("express");
import { Router } from "express";
const router = Router();
const multer = require("multer");
import {
  RegisterUser,
  LoginUser,
  UserRoute,
  CheckAccess,
  updatePassword,
  ristrictTo,
  GetDetails,
} from "../controllers/AuthController";

const storage = multer.diskStorage({
  destination: (
    req: any,
    file: any,
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, "./upload/howItWork"); // Specify the upload directory
  },
  filename: (
    req: any,
    file: { originalname: string },
    cb: (arg0: null, arg1: string) => void
  ) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });
router.post("/signup", upload.none(), RegisterUser);
router.post("/login", upload.none(), LoginUser);
router.get("/users", UserRoute);
router.patch("/UpdatePassword", CheckAccess as any, updatePassword);
router.get("/get/details", CheckAccess as any, GetDetails);

export default router;
