import {
  addPricePage,
  GetPricePage,
  updatePricePage,
  deletePricePage,
} from "../controllers/PricePageController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
import multer from "multer";
const upload = multer();
router.post("/add_price_page", upload.none(), CheckAccess as any, addPricePage);
router.get("/get_price_page", CheckAccess as any, GetPricePage);
router.put(
  "/update_price_page/:id",
  upload.none(),
  CheckAccess as any,
  updatePricePage
);
router.delete("/delete_price_page/:id", CheckAccess as any, deletePricePage);
export default router;
