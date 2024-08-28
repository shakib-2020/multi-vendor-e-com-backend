import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createVendor,
  deleteVendor,
  getVendorBySlug,
  getVendors,
  updateVendor,
} from "../controllers/vendorController.js";

const vendorRouter = express.Router();

// create a vendor route
vendorRouter.post("/", createVendor);

// get vendors route
vendorRouter.get("/all", getVendors);

// get vendors by slug route
vendorRouter.get("/:slug", getVendorBySlug);

// Update Vendor route
vendorRouter.put("/:id", updateVendor);

// Delete Vendor route
vendorRouter.delete("/:id", deleteVendor);

export default vendorRouter;
