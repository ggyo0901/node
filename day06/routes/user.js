import express from "express";
import { isLoggedin, isNotLoggedin } from "../middleware/auth.js";
import UserService from "../service/user.js";

const router = express.Router();
router.post("/signup", isNotLoggedin, UserService.signUp);
router.post("/login", isLoggedin, UserService.login);

export default router;
