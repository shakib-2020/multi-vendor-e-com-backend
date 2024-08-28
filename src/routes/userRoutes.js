import express from "express";
import {
  deleteUserProfile,
  getAllProfile,
  longinUser,
  profile,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", longinUser);
userRouter.get("/profile", protect, profile);
userRouter.put("/profile", protect, updateProfile);
userRouter.get("/profiles", protect, authorize("admin"), getAllProfile);
userRouter.delete("/:id", protect, deleteUserProfile);

export default userRouter;
