import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();

router.post("/signup", arcjetProtection, signup);
router.post("/sign", arcjetProtection, signup);

router.post("/login", arcjetProtection, login);
router.post("/logout",arcjetProtection ,logout);
router.put("/update-profile", arcjetProtection, protectRoute, updateProfile);

router.get("/check", arcjetProtection, protectRoute, checkAuth);
export default router;