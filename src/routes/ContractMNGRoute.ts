import { Request } from "express";
import {
  ContactManagement,
  GetContactManagement,
  deleteContactManagement,
  updateContactManagement,
} from "../controllers/ContractManagementController";
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
  "/post_contract_management",
  CheckAccess as any,
  upload.single("image"),
  ContactManagement
);
router.get(
  "/get_contract_management",
  CheckAccess as any,
  GetContactManagement
);
router.delete(
  "/delete_contract_management/:id",
  CheckAccess as any,
  deleteContactManagement
);
router.put(
  "/update_contract_management/:id",
  CheckAccess as any,
  upload.single("image"),
  updateContactManagement
);
export default router;
