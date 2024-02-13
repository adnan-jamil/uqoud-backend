import {
  addHomeSlider,
  GetHomeSlider,
  updateHomeSlider,
  GetSingleSlider,
} from "../controllers/HomeSliderController";
import { Request, Router } from "express";
const router = Router();
import multer from "multer";
import { CheckAccess } from "../controllers/AuthController";

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "./upload");
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
  "/homeslider",
  CheckAccess as any,
  upload.single("image"),
  addHomeSlider
);
router.get("/homeslider", CheckAccess as any, GetHomeSlider);
router.get("/homeslider/:id", CheckAccess as any, GetSingleSlider);
router.put(
  "/update_homeslider/:id",
  CheckAccess as any,
  upload.single("image"),
  updateHomeSlider
);
export default router;
