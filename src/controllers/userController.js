import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import { AppError } from "../middlewares/errorHandler.js";

// @desc Register a new user
// @router /api/user/register
// @access Public

export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    // first we find if user already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new AppError("User Already Exist!", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      throw new AppError("Invalid User Data", 400);
    }
  } catch (error) {
    next(error);
  }
});

// @desc loign a new user
// @router /api/user/login
// @access Public
export const longinUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // first we find the user exits
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    throw new AppError("Invalid user email and password!");
  }
});

// @desc Get a user profile
// @router /api/user/profile
// @access Private
export const profile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;

  console.log(req.body);

  // first we find the user exits

  const user = await User.findById(_id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isAcive: user.isActive,
    });
  } else {
    throw new AppError("User Not Found");
  }
});

// @desc update a user profile
// @router /api/user/profile
// @access Private
export const updateProfile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  // first we find the user exits

  const user = await User.findById(_id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.address = req.body.password || user.address;
    user.phone = req.body.phone || user.phone;

    const updateUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isAcive: user.isActive,
      address: user.address,
    });
  } else {
    throw new AppError("User Not Found!");
  }
});

// @desc Get All user profile
// @router /api/users
// @access Private
export const getAllProfile = expressAsyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.json(users);
  } else {
    throw new AppError("Users Not Found!");
  }
});

// @desc update a user profile
// @router /api/user/profile
// @access Privat
export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Removed!" });
  } catch (error) {
    throw new AppError("User Not Found!");
  }
});
