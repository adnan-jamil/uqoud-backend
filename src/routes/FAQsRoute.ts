import {
  NewFAQs,
  AllFAQs,
  updateFAQ,
  deleteFAQ,
  getSingleProductFAQs,
} from "../controllers/FAQsController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
router.post("/faqs", CheckAccess as any, NewFAQs);
router.get("/get_faqs", CheckAccess as any, AllFAQs);
router.put("/faqs/:id", CheckAccess as any, updateFAQ);
router.get("/get_faqs_single/:id", CheckAccess as any, getSingleProductFAQs);
router.delete("/delete_faqs/:id", CheckAccess as any, deleteFAQ);
export default router;
