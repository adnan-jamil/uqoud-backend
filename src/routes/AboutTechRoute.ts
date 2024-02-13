import { Router } from "express";
import { CheckAccess } from "../controllers/AuthController";
const router = Router();
import multer from "multer";
const upload = multer();
import {
  addAboutTech,
  GetAboutTech,
  DeleteAboutTech,
  UpdateAboutTech,
} from "../controllers/AboutTechController";
router.post("/about_tech", upload.none(), CheckAccess as any, addAboutTech);
router.get("/get_about_tech", CheckAccess as any, GetAboutTech);
router.put(
  "/update_about_tech/:id",
  upload.none(),
  CheckAccess as any,
  UpdateAboutTech
);
export default router;
