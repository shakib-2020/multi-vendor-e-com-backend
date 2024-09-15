import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/categoryModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new category
// @router /api/category
// @access Privete

export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ status: true, data: newCategory });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get All Categorys
// @router /api/category
// @access Public

export const getAllCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.find();
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get a Category
// @router /api/category/:slug
// @access Public

export const getACategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Update a Category
// @router /api/category/:id
// @access Privet

export const updateACategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      throw new AppError("Category not found!", 400);
    }
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Delete a Category
// @router /api/category/:id
// @access Privet

export const deleteACategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new AppError("Category not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "Category deleted successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});
