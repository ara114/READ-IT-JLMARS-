import express from "express";
const router = express.Router();

import { loginMod } from "../controllers/moderator.js";

router.post("/loginMod", loginMod);

export default router;