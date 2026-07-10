import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { userRouters } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/service/service.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { categoryRoutes } from "./modules/category/category.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import { paymentRoutes } from "./modules/payment/payment.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { reviewRoutes } from "./modules/review/review.route";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


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