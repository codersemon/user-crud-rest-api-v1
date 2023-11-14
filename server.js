// depenedencies
import express from "express";
import "dotenv/config";
import "colors";
import userRoute from "./routes/user.js";
import { mongoDBConnection } from "./config/mongodb.js";
import {errorHandler} from './middlewares/errorHandler.js';
import cookieParser from "cookie-parser";

// express app init
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRoute);
app.use(cookieParser());

// error handler middleware 
app.use(errorHandler);

// server listen
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
  mongoDBConnection(); // show mongodb connection msg
  console.log(`Server running on port ${PORT}`.bgBlue);
});
