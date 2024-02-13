import { Router } from "express";
import {
  AddAboutTool,
  GetAllAboutTool,
  DeleteAboutTool,
  UpdateAboutTool,
} from "../controllers/CompanyToolsController";
const router = Router();
import multer from "multer";
import { CheckAccess } from "../controllers/AuthController";
const upload = multer();
router.post("/about_tool", upload.none(), CheckAccess as any, AddAboutTool);
router.get("/get_about_tool", CheckAccess as any, GetAllAboutTool);
router.delete("/delete_about_tool/:id", CheckAccess as any, DeleteAboutTool);
router.put(
  "/update_about_tool/:id",
  upload.none(),
  CheckAccess as any,
  UpdateAboutTool
);
export default router;
