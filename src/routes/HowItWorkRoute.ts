import { Request } from "express";
import {
  GetHowItWork,
  HowItWork,
  updateHowItWork,
  HowItWorkbyId,
  HowItWorkdelete,
} from "../controllers/HowItWorkController";
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
    cb(null, "./upload/howItWork");
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
  "/howitwork",
  CheckAccess as any,
  upload.single("image"),
  HowItWork
);
router.get("/get_howitwork", CheckAccess as any, GetHowItWork);
router.put(
  "/update_howitwork/:id",
  CheckAccess as any,
  upload.single("image"),
  updateHowItWork
);
router.get("/howitwork/:id", CheckAccess as any, HowItWorkbyId);
router.delete("/delete_howitwork/:id", CheckAccess as any, HowItWorkdelete);
export default router;
