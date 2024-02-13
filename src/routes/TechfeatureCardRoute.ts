import {
  NewTechCard,
  AllTechcards,
  UpdateTechCard,
  DeletetechCard,
} from "../controllers/TechFeatureCardController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
const multer = require("multer");
const upload = multer();
router.post("/add_tech_card", upload.none(), CheckAccess as any, NewTechCard);
router.get("/get_tech_cards", CheckAccess as any, AllTechcards);
router.delete("/delete_Tech_card/:id", CheckAccess as any, DeletetechCard);
router.patch(
  "/update_tech_card/:id",
  upload.none(),
  CheckAccess as any,
  UpdateTechCard
);
export default router;
