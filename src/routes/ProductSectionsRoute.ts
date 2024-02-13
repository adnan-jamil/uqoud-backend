import { Request } from "express";
const {
  NewSection,
  AllSection,
  getSingleSection,
  updateSection,
  getSectionById,
  deleteSection,
  getproductbyId,
} = require("../controllers/ProductSectionsController");
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
    cb(null, "./upload/productItems");
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
  "/productsection",
  CheckAccess as any,
  upload.single("image"),
  NewSection
);
router.get("/get_productsection", CheckAccess as any, AllSection);
router.get("/get_productsection_byid/:id", CheckAccess as any, getSectionById);
router.get(
  "/get_single_productsection/:id",
  CheckAccess as any,
  getSingleSection
);
router.patch(
  "/update_productsection/:id",
  upload.single("image"),
  CheckAccess as any,
  updateSection
);
router.delete("/delete_productsection/:id", CheckAccess as any, deleteSection);
router.get("/by_productsection/:id", CheckAccess as any, getproductbyId);
export default router;
