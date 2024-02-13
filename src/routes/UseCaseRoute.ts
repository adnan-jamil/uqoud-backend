import { Request } from "express";
import {
  useCases,
  useCasesdelete,
  useCasesbyId,
  updateuseCases,
  GetuseCases,
} from "../controllers/UseCaseController";
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
    cb(null, "./upload/Usecases");
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

router.post("/usecase", CheckAccess as any, upload.single("image"), useCases);
router.get("/get_usecase", CheckAccess as any, GetuseCases);
router.put(
  "/update_usecase/:id",
  CheckAccess as any,
  upload.single("image"),
  updateuseCases
);
router.get("/get_by_usecase/:id", CheckAccess as any, useCasesbyId);
router.delete("/delete_usecase/:id", CheckAccess as any, useCasesdelete);
export default router;
