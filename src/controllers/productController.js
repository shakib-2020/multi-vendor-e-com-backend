import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create a new product
// @router /api/product
// @access Privete

export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get All Products
// @router /api/product
// @access Public

export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    res.status(201).json({ status: true, data: product });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Get a Product
// @router /api/product/:slug
// @access Public

export const getAProductBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: product });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Update a Product
// @router /api/product/:id
// @access Privet

export const updateAProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw new AppError("Product not found!", 400);
    }
    res.status(201).json({ status: true, data: product });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});

// @desc Delete a Product
// @router /api/product/:id
// @access Privet

export const deleteAProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new AppError("Product not found!", 400);
    }
    res
      .status(201)
      .json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    throw new AppError("Something went wrong!", 400);
  }
});
