import {
  AddPricePlan,
  GetPricePlan,
  updatePricePlan,
  deletePricePlan,
} from "../controllers/PricePlanController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
import multer from "multer";
const upload = multer();

router.post("/add_price_plan", CheckAccess as any, upload.none(), AddPricePlan);
router.get("/get_price_plans", CheckAccess as any, GetPricePlan);
router.put(
  "/update_price_plan/:id",
  CheckAccess as any,
  upload.none(),
  updatePricePlan
);
router.delete("/delete_price_plan/:id", CheckAccess as any, deletePricePlan);
export default router;
