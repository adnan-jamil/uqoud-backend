import {
  AddAboutUs,
  GetAboutUs,
  AddAboutSection,
  DeleteItemById,
  UpdateAboutSection,
  CreateAboutPage,
} from "../controllers/CompanyController";
import { Router } from "express";
import { CheckAccess } from "../controllers/AuthController";
import multer from "multer";
const router = Router();
const upload = multer();
router.post(
  "/company/create",
  upload.none(),
  CheckAccess as any,
  CreateAboutPage
);
router.put("/about_us/:id", CheckAccess as any, upload.none(), AddAboutUs);
router.get("/get_about_us", CheckAccess as any, GetAboutUs);
router.delete(
  "/delete_about/:companyId/_item/:itemId",
  CheckAccess as any,
  DeleteItemById
);
router.put(
  "/Update_about/:companyId/_item/:id",
  upload.none(),
  CheckAccess as any,
  UpdateAboutSection
);
router.put(
  "/add_about_section/:id",
  upload.none(),
  CheckAccess as any,
  AddAboutSection
);
export default router;
