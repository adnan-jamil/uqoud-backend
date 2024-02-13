import {
  AddLanguage,
  UpdateLanguage,
  deleteLanguage,
  GetAllLanguage,
} from "../controllers/LanguageController";
import { Router } from "express";
const router = Router();
import multer from "multer";
const upload = multer();
import { CheckAccess } from "../controllers/AuthController";
router.post("/add_language", CheckAccess as any, upload.none(), AddLanguage);
router.get("/get_languages", CheckAccess as any, GetAllLanguage);
router.patch(
  "/update_language/:id",
  CheckAccess as any,
  upload.none(),
  UpdateLanguage
);
router.delete("/Delete_language/:id", CheckAccess as any, deleteLanguage);
export default router;
