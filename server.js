import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { dbConnect } from "./src/utils/utils.js";
import {
  AppError,
  errorHanlder,
  notFoundErrorHandler,
} from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoutes.js";

// load env. variable from env file
dotenv.config();

// initialize express app
const app = express();

// connection to mongodb
dbConnect();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(helmet());
app.use(morgan());
app.use(cors());

// api routes

app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/product", productRouter);

// error handler middleware
app.use(errorHanlder);
app.use(notFoundErrorHandler);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
