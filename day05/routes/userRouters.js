import express from "express";
import UserService from "../sevice/userService.js";

const router = express.Router();

router.post("/signup", UserService.prototype.signUp);
export default router;
