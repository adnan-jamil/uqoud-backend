import { Request } from "express";
import {
  managementitem,
  Getmanagementitem,
  updatemanagementitem,
  managementitembyId,
  deletemanagementitem,
} from "../controllers/ManagementItemController";
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
    cb(null, "./upload/challenge");
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
  "/management_items",
  CheckAccess as any,
  upload.single("image"),
  managementitem
);
router.get("/management_items", CheckAccess as any, Getmanagementitem);
router.put(
  "/update_items/:id",
  CheckAccess as any,
  upload.single("image"),
  updatemanagementitem
);
router.get("/get_items/:id", CheckAccess as any, managementitembyId);
router.delete("/Delete_items/:id", CheckAccess as any, deletemanagementitem);
export default router;
