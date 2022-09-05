import express from "express";
import UserService from "../sevice/userService.js";

const router = express.Router();
router.post("/signup", UserService.signUp);
router.post("/login", UserService.login);

export default router;
