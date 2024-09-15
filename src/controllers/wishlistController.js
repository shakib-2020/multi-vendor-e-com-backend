import expressAsyncHandler from "express-async-handler";
import { Wishlist } from "../models/wishlistModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new wishlist
// @router /api/wishlist
// @access Privete

export const createWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const newWishlist = await Wishlist.create(req.body);
    res.status(201).json({ status: true, data: newWishlist });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get All Wishlists
// @router /api/wishlist
// @access Public

export const getAllWishlists = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.find();
    res.status(201).json({ status: true, data: wishlist });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get a Wishlist by id
// @router /api/wishlist/:id
// @access Public

export const getAWishlistById = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    res.status(201).json({ status: true, data: wishlist });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Update a Wishlist
// @router /api/wishlist/:id
// @access Privet

export const updateAWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wishlist) {
      throw new AppError("Wishlist not found!", 400);
    }
    res.status(201).json({ status: true, data: wishlist });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Delete a Wishlist
// @router /api/wishlist/:id
// @access Privet

export const deleteAWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      throw new AppError("Wishlist not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "Wishlist deleted successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});
