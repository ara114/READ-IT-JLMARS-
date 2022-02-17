import express from "express";
const router = express.Router();

import { login, signup, updateUser } from "../controllers/user.js";

router.post("/login", login);
router.post("/signup", signup);
router.patch('/:id', updateUser);

export default router;