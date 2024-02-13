import { Request } from "express";

const express = require("express");
import {
  NewProduct,
  getsingleproducts,
  Allproducts,
  updateproduct,
  Deletesingleproducts,
} from "../controllers/ProductController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "./upload/product");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/our_products",
  CheckAccess as any,
  upload.fields([{ name: "logo" }, { name: "image" }]),
  NewProduct
);
router.get("/get_products", CheckAccess as any, Allproducts);
router.get("/get_products/:id", CheckAccess as any, getsingleproducts);
router.delete("/delete_products/:id", CheckAccess as any, Deletesingleproducts);
router.put(
  "/update_products/:id",
  CheckAccess as any,
  upload.fields([{ name: "logo" }, { name: "image" }]),
  updateproduct
);
export default router;
