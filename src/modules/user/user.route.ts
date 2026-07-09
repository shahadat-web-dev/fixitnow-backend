import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", userController.registerUser);
router.get("/me", auth(), userController.getMyProfile);
router.patch("/me", auth(), userController.updateMyProfile);

export const userRouters = router;