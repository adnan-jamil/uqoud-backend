const {
  sendMessage,
  GetAllmessage,
  deleteMessage,
} = require("../controllers/MessagesController");
import { Router } from "express";
const router = Router();
import { CheckAccess } from "../controllers/AuthController";
const { check } = require("express-validator");

router.post(
  "/messages",
  [
    check("phone", "Phone is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check("product", "Product is required").not().isEmpty(),
    check("message", "Please provide a message").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
  ],
  sendMessage
);
router.get("/messages", CheckAccess as any, GetAllmessage);
router.delete("/messages/:id", CheckAccess as any, deleteMessage);
export default router;
