import express from "express";
const router = express.Router();

import { getUser, login, signup, updateUser, forgotPassword, resetPassword } from "../controllers/user.js";

router.get("/viewProfile/:id", getUser);
router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.patch("/reset/:id", resetPassword);
router.patch('/:id', updateUser);

export default router;