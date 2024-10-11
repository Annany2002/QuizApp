import express from "express";
import { userValidation } from "../middlewares/users.middleware";
import { userLogin, userRegister } from "../controllers/user.controllers";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userValidation, userLogin);

export default router;
