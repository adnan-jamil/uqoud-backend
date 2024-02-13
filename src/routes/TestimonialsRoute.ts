import {
  NewTestimonial,
  AllTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialbyId,
} from "../controllers/TestimonialsController";
import { Request, Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "./upload/testimonials");
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
  "/testimonials",
  CheckAccess as any,
  upload.single("image"),
  NewTestimonial
);
router.get("/get_testimonials", CheckAccess as any, AllTestimonial);
router.put(
  "/update_testimonials/:id",
  CheckAccess as any,
  upload.single("image"),
  updateTestimonial
);
router.get("/testimonials/id", CheckAccess as any, getTestimonialbyId);
router.delete(
  "/delete_testimonials/:id",
  CheckAccess as any,
  deleteTestimonial
);
export default router;
