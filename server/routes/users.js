import express from "express";
const router = express.Router();

import { getUsers, warnAuthor, login, signup, updateUser, forgotPassword, updatePassword, resetPassword, deleteUser } from "../controllers/user.js";

router.get("/viewProfile", getUsers);
router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.patch("/reset/:id", resetPassword);
router.patch('/update/:id', updateUser);
router.patch("/security/:id", updatePassword);
router.post('/warn', warnAuthor);
router.delete('/:id', deleteUser);

export default router;