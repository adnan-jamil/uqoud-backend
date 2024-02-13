import { Request } from "express";
import {
  AddAboutvalue,
  GetAllAboutvalue,
  DeleteAboutvalue,
  UpdateAboutvalue,
} from "../controllers/CompanyvaluesController";
import { Router } from "express";
const router = Router();
import multer from "multer";
import { CheckAccess } from "../controllers/AuthController";
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "./upload/values");
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
  "/about_value",
  CheckAccess as any,
  upload.single("image"),
  AddAboutvalue
);
router.get("/get_about_values", CheckAccess as any, GetAllAboutvalue);
router.delete("/delete_about_value/:id", CheckAccess as any, DeleteAboutvalue);
router.put(
  "/update_about_value/:id",
  CheckAccess as any,
  upload.single("image"),
  UpdateAboutvalue
);
export default router;
