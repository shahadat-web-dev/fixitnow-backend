import { Router } from "express";
import { technicianController } from "./technician.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = Router();


router.get(
  "/",
  technicianController.getAllTechnicians
);


router.put(
  "/profile",
  auth(Role.TECHNICIAN),
  technicianController.updateProfile
);



router.put(
  "/availability",
  auth(Role.TECHNICIAN),
  technicianController.updateAvailability
);

router.get(
  "/bookings",
  auth(Role.TECHNICIAN),
  technicianController.getTechnicianBookings
);


router.patch(
  "/bookings/:id",
  auth(Role.TECHNICIAN),
  technicianController.updateBookingStatus
);


export const technicianRoutes = router;