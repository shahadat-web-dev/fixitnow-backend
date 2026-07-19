import { Router } from "express";
import { bookingController } from "./booking.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = Router();

router.post("/", auth(Role.CUSTOMER), bookingController.createBooking);

router.get("/", auth(Role.CUSTOMER), bookingController.getMyBookings);

router.get("/:id", auth(Role.CUSTOMER), bookingController.getSingleBooking);

export const bookingRoutes = router;