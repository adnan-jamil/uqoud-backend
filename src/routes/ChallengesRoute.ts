import {
  GetChallenges,
  Challenge,
  deleteChallenges,
  UpdateChallenges,
  GetAllChallenges,
} from "../controllers/ChallengesController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
router.post("/challenges", CheckAccess as any, Challenge);
router.get("/get_challenges", CheckAccess as any, GetAllChallenges);
router.get("/challenges/:id", CheckAccess as any, GetChallenges);
router.delete("/challenges/:id", CheckAccess as any, deleteChallenges);
router.put("/update_challenges/:id", CheckAccess as any, UpdateChallenges);
export default router;