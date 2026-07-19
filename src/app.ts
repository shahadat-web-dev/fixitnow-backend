import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config/index.js";
import { userRouters } from "./modules/user/user.route.js";
import { authRoutes } from "./modules/auth/auth.route.js";
import { serviceRoutes } from "./modules/service/service.route.js";
import { technicianRoutes } from "./modules/technician/technician.route.js";
import { categoryRoutes } from "./modules/category/category.route.js";
import { bookingRoutes } from "./modules/booking/booking.route.js";
import { paymentRoutes } from "./modules/payment/payment.route.js";
import { adminRoutes } from "./modules/admin/admin.route.js";
import { reviewRoutes } from "./modules/review/review.route.js";
import { notFound } from "./middlewares/notFound.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";


const app: Application = express();

app.use(cors({
  origin: config.app_url,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.use("/api/auth", userRouters);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/technician", technicianRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);



app.use(notFound);

app.use(globalErrorHandler);

export default app;