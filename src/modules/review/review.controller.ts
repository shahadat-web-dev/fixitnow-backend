import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {

  const result = await reviewService.createReview(
    req.user!.id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: result,
  });

};

export const reviewController = {
  createReview,
};