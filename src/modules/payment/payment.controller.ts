import { Request, Response } from "express";
import httpStatus from "http-status";
import { paymentService } from "./payment.service";




// Done
const createPayment = async (
  req: Request,
  res: Response
) => {

  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await paymentService.createPayment(
    req.user.id,
    req.body.bookingId
  );

  res.status(httpStatus.OK).json({

    success: true,

    message: "Checkout session created successfully",

    data: result

  });


  

};



const confirmPayment = async (
  req: Request,
  res: Response
) => {

  const signature = req.headers["stripe-signature"] as string;

  const result = await paymentService.confirmPayment(
    req.body,
    signature
  );

  res.status(200).json(result);

};


// Done
const getMyPayments = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await paymentService.getMyPayments(req.user.id);

  res.status(200).json({
    success: true,
    message: "Payment history retrieved successfully",
    data: result,
  });
};


// Done
const getSinglePayment = async (
  req: Request,
  res: Response
) => {
  if (!req.user) {
    throw new Error("Unauthorized");
  }

  const result = await paymentService.getSinglePayment(
    req.params.id as string,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
};





export const paymentController = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};