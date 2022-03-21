import express from "express";
const router = express.Router();

import { login, signup, updateUser, forgotPassword, resetPassword } from "../controllers/user.js";

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.patch("/reset/:id", resetPassword);
router.patch('/:id', updateUser);

export default router;