import {
  ContactFocus,
  GetContactFocus,
  deleteFocuses,
  UpdateFocuses,
} from "../controllers/ContractFocusController";
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";

router.post("/contract_focuses", CheckAccess as any, ContactFocus);
router.get("/contract_focuses", CheckAccess as any, GetContactFocus);
router.delete(
  "/delete_contract_focuses/:id",
  CheckAccess as any,
  deleteFocuses
);
router.put("/update_contract_focuses/:id", CheckAccess as any, UpdateFocuses);
export default router;
