import { Order } from "../models/orderModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";

//@desc Create a new Order
//@router /api/order/
//@access Private

export const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ status: true, date: order });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc Get All Orders
//@router /api/order/
//@access Private

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user items.product");
    res.status(200).json({ status: true, date: orders });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc Get a single Orders
//@router /api/order/
//@access Private

export const getAOrderById = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user items.product"
    );
    res.status(200).json({ status: true, date: order });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc Update a single Orders
//@router /api/order/
//@access Private

export const updateAOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res
        .status(400)
        .json({ status: false, message: "Order Not Found!" });
    }
    res.status(200).json({ status: true, date: order });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc Delete a  Orders
//@router /api/order/
//@access Private

export const deleteAOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res
        .status(400)
        .json({ status: false, message: "Order Not Found!" });
    }
    res.status(200).json({ status: true, message: "Order Deleted!" });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc Update Order Status
//@router /api/order/
//@access Private

export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
      }
    );
    if (!order) {
      return res
        .status(400)
        .json({ status: false, message: "Order Not Found!" });
    }
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc handle Order Chancellation
//@router /api/order/
//@access Private

export const handleOrderCancellation = expressAsyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled", cancellation: { reason, createdAt: new Date() } },
      {
        new: true,
      }
    );
    if (!order) {
      return res
        .status(400)
        .json({ status: false, message: "Order Not Found!" });
    }
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc handle Order Return
//@router /api/order/
//@access Private

export const handleOrderReturn = expressAsyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { return: { reason, status: "pending", createdAt: new Date() } },
      {
        new: true,
      }
    );
    if (!order) {
      return res
        .status(400)
        .json({ status: false, message: "Order Not Found!" });
    }
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error);
  }
});

//@desc handle Order Return Status
//@router /api/order/
//@access Private

export const handleOrderReturnStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, "return.status": "pending" },
      { "return.status": status },
      {
        new: true,
      }
    );
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order Not Found! Or Already Processed",
      });
    }
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error);
  }
});
