import { Router } from "express";
import { reviewController } from "./review.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  reviewController.createReview
);

export const reviewRoutes = router;