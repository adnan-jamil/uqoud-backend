import { Request } from "express";
import {
  addPriceSupport,
  GetAllpriceSupport,
  deletepriceSupport,
  updatePriceSupport,
} from "../controllers/PriceCustomerSupportController";
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
    cb(null, "./upload/price");
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
  "/price/support",
  CheckAccess as any,
  upload.single("image"),
  addPriceSupport
);
router.get("/price/get/support", CheckAccess as any, GetAllpriceSupport);
router.delete(
  "/delete/price/support/:id",
  CheckAccess as any,
  deletepriceSupport
);
router.put(
  "/update/price/support/:id",
  CheckAccess as any,
  upload.single("image"),
  updatePriceSupport
);
export default router;
