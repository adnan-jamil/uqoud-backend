import { Request } from "express";
const {
  AddAboutBrand,
  GetAllAboutBrand,
  DeleteAboutBrand,
  UpdateAboutBrand,
} = require("../controllers/CompanybrandsController");
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
    cb(null, "./upload/brands");
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
  "/add_about_brand",
  CheckAccess as any,
  upload.single("image"),
  AddAboutBrand
);
router.get("/get_about_brands", CheckAccess as any, GetAllAboutBrand);
router.delete("/delete_about_brand/:id", CheckAccess as any, DeleteAboutBrand);
router.put(
  "/update_about_brand/:id",
  CheckAccess as any,
  upload.single("image"),
  UpdateAboutBrand
);
export default router;
