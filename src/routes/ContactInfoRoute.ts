import {
  AddNewContactInfo,
  GetContactInfo,
  updateContactInfo,
} from "../controllers/ContactInfoController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
router.post("/new_contactinfo", CheckAccess as any, AddNewContactInfo);
router.get("/get_contactinfo", CheckAccess as any, GetContactInfo);
router.patch("/update_contactinfo/:id", CheckAccess as any, updateContactInfo);
export default router;
