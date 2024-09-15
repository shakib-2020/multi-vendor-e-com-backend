import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/reviewModel.js";
import { AppError } from "../middlewares/errorHandler.js";
// @desc Create a new review
// @router /api/review
// @access Privete

export const createReview = expressAsyncHandler(async (req, res) => {
  try {
    console.log("inside review");

    const newReview = await Review.create(req.body);
    res.status(201).json({ status: true, data: newReview });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get All Reviews
// @router /api/review
// @access Public

export const getAllReviews = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.find();
    res.status(201).json({ status: true, data: review });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get a Review by id
// @router /api/review/:id
// @access Public

export const getAReviewById = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(201).json({ status: true, data: review });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Update a Review
// @router /api/review/:id
// @access Privet

export const updateAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      throw new AppError("Review not found!", 400);
    }
    res.status(201).json({ status: true, data: review });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Delete a Review
// @router /api/review/:id
// @access Privet

export const deleteAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      throw new AppError("Review not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "Review deleted successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc update Is Approved
// @router /api/review/approve-request
// @access Privet

export const approveAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(
      req.params.id,
      { isApproved: req.body.isApproved },
      {
        new: true,
      }
    );
    if (!review) {
      throw new AppError("Review not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "Review updated successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});
