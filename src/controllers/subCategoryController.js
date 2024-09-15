import expressAsyncHandler from "express-async-handler";
import { SubCategory } from "../models/subCategoryModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new subCategory
// @router /api/subCategory
// @access Privete

export const createSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(201).json({ status: true, data: newSubCategory });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get All SubCategorys
// @router /api/subCategory
// @access Public

export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.find();
    res.status(201).json({ status: true, data: subCategory });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get a SubCategory
// @router /api/subCategory/:slug
// @access Public

export const getASubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: subCategory });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Update a SubCategory
// @router /api/subCategory/:id
// @access Privet

export const updateASubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!subCategory) {
      throw new AppError("SubCategory not found!", 400);
    }
    res.status(201).json({ status: true, data: subCategory });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Delete a SubCategory
// @router /api/subCategory/:id
// @access Privet

export const deleteASubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      throw new AppError("SubCategory not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "SubCategory deleted successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});
