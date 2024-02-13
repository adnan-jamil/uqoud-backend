import { userHomePage } from "../controllers/UserDataController";
import {
  getUserAbout,
  getUserPrice,
  getUserProduct,
  getUserContact,
  getUserTranslation,
  getUserProductdata,
  getUserTranslationBylan,
} from "../controllers/UserDataController";
import { Router } from "express";
const router = Router();
router.get("/user/homepage", userHomePage);
router.get("/user/about", getUserAbout);
router.get("/user/price", getUserPrice);
router.get("/user/products/:slug", getUserProduct);
router.get("/user/products", getUserProductdata);
router.get("/user/contact", getUserContact);
router.get("/user/translation", getUserTranslation);
router.get("/user/translation/lan", getUserTranslationBylan);
export default router;
