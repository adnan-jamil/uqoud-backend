import { Request } from "express";
import {
  ChallengesCard,
  GetChallengesCard,
  GetAllChallengesCard,
  deleteChallengesCard,
  UpdateChallengesCard,
} from "../controllers/ChallengesCardController";
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
    cb(null, "./upload/cards");
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
  "/challenges_card",
  CheckAccess as any,
  upload.single("image"),
  ChallengesCard
);
router.get("/get_challenges_card", CheckAccess as any, GetAllChallengesCard);
router.get("/challenges_by_id/:id", CheckAccess as any, GetChallengesCard);
router.delete(
  "/delete_challenges_card/:id",
  CheckAccess as any,
  deleteChallengesCard
);
router.put(
  "/update_challenges_card/:id",
  CheckAccess as any,
  upload.single("image"),
  UpdateChallengesCard
);
export default router;
