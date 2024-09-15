import expressAsyncHandler from "express-async-handler";
import { Support } from "../models/supportModel.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Create A New Support
// @router /api/support/
// @access Private

export const createSupport = expressAsyncHandler(async (req, res) => {
  try {
    const support = new Support(req.body);
    await support.save();
    res.status(201).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error);
  }
});

// @desc get All supports
// @router /api/support/
// @access Private

export const getAllSupport = expressAsyncHandler(async (req, res) => {
  try {
    const supports = new Support.find().populate(
      "user product assignedTo assignedBy"
    );
    res.status(200).json({ status: true, data: supports });
  } catch (error) {
    throw new AppError(error);
  }
});

// @desc get a support by id
// @router /api/support/
// @access Private

export const getASupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = new Support.findById(req.params.id).populate(
      "user product assignedTo assignedBy"
    );

    if (!support) {
      return res.status(404).json({
        status: false,
        message: "Support Query Not Found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error);
  }
});

// @desc update a support by id
// @router /api/support/
// @access Private

export const updateASupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = new Support.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!support) {
      return res.status(404).json({
        status: false,
        message: "Support Query Not Found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error);
  }
});

// @desc delete a support by id
// @router /api/support/
// @access Private

export const deleteASupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = new Support.findByIdAndDelete(req.params.id);
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "Support Query Not Found",
      });
    }
    res
      .status(200)
      .json({ status: true, message: "Support Deleted successfully" });
  } catch (error) {
    throw new AppError(error);
  }
});

// @desc assign a support
// @router /api/support/
// @access Private

export const assignASupport = expressAsyncHandler(async (req, res) => {
  try {
    const { assignedTo, assignedBy } = req.body;
    const support = new Support.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo,
        assignedBy,
      },
      {
        new: true,
      }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "Support Query Not Found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error);
  }
});

// @desc update support status
// @router /api/support/
// @access Private

export const updateASupportStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const support = new Support.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "Support Query Not Found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error);
  }
});
