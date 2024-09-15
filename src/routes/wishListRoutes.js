import express from "express";
import {
  createWishlist,
  deleteAWishlist,
  getAllWishlists,
  getAWishlistById,
  updateAWishlist,
} from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/", createWishlist);
wishlistRouter.get("/all", getAllWishlists);
wishlistRouter.get("/:id", getAWishlistById);
wishlistRouter.put("/:id", updateAWishlist);
wishlistRouter.delete("/:id", deleteAWishlist);

export default wishlistRouter;
