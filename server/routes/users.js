import express from "express";
const router = express.Router();

import { getUsers, warnAuthor, login, signup, updateUser, forgotPassword, resetPassword } from "../controllers/user.js";

router.get("/viewProfile", getUsers);
router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.patch("/reset/:id", resetPassword);
router.patch('/:id', updateUser);
router.post('/warn', warnAuthor);

export default router;