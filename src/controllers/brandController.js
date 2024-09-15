import expressAsyncHandler from "express-async-handler";
import { Brand } from "../models/brandModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new brand
// @router /api/brand
// @access Privete

export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json({ status: true, data: newBrand });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get All Brands
// @router /api/brand
// @access Public

export const getAllBrands = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find();
    res.status(201).json({ status: true, data: brand });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get a Brand
// @router /api/brand/:slug
// @access Public

export const getABrandBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: brand });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Update a Brand
// @router /api/brand/:id
// @access Privet

export const updateABrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!brand) {
      throw new AppError("Brand not found!", 400);
    }
    res.status(201).json({ status: true, data: brand });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Delete a Brand
// @router /api/brand/:id
// @access Privet

export const deleteABrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      throw new AppError("Brand not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "Brand deleted successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});
