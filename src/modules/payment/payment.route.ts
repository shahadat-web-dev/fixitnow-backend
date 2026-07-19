import { Router } from "express";
import express from "express";
import { paymentController } from "./payment.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = Router();

router.post(
  "/confirm",
  express.raw({ type: "application/json" }),
  paymentController.confirmPayment
);

router.post(
  "/create",
  auth(Role.CUSTOMER),
  paymentController.createPayment
);

router.get(
  "/",
  auth(Role.CUSTOMER),
  paymentController.getMyPayments
);

router.get(
  "/:id",
  auth(Role.CUSTOMER),
  paymentController.getSinglePayment
);

export const paymentRoutes = router;