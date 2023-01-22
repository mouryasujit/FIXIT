import express from "express";
import { Register } from "../Controllers/auth.js";
import { Login } from "../Controllers/auth.js";
import { Logout } from "../Controllers/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
export default router;
