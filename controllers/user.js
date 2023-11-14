// dependencies
import { userModel } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

/**
 * @DESC ALL USER
 * @ROUTE /api/v1/user
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getAllUser = asyncHandler(async (req, res) => {
  // get all user
  const allUser = await userModel.find();

  // if no data in db
  if (allUser.length === 0) {
    return res.status(200).json({ message: "No Data found!", users: [] });
  }

  // if data found
  res.status(200).json({ message: "All User data", users: allUser });
});

/**
 * @DESC CREATE USER
 * @ROUTE /api/v1/user
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const createUser = asyncHandler(async (req, res) => {
  // get data from req body
  const { username, email, password } = req.body;

  // password hasing
  const hashPass = await bcrypt.hash(password, 10);

  // save to db
  const newUser = new userModel({ username, email, password: hashPass });
  await newUser.save();

  // send response
  res.status(201).json({ message: "New user created!", user: newUser });
});

/**
 * @DESC GET SINGLE USER
 * @ROUTE /api/v1/user/:id
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  // get user id
  const { id } = req.params;

  // single user data
  const user = await userModel.findById(id);

  // send data to respond
  res.status(200).json({ message: "single user", user_info: user });
});

/**
 * @DESC DELETE SINGLE USER BY ID
 * @ROUTE /api/v1/user/:id
 * @METHOD DELETE
 * @ACCESS PUBLIC
 */
export const deleteSingleUser = asyncHandler(async (req, res) => {
  // user id
  const { id } = req.params;

  // delete user
  const deletedUser = await userModel.findByIdAndDelete(id);

  // send res
  res.status(200).json({ message: "User Deleted", user: deletedUser });
});

/**
 * @DESC UPDATE USER
 * @ROUTE /api/v1/user/edit/:id
 * @METHOD PATCH
 * @ACCESS PUBLIC
 */
export const editUser = asyncHandler(async (req, res) => {
  // get user id
  const { id } = req.params;

  // form data
  const { username, email } = req.body;

  // update user
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { username, email },
    { new: true }
  );

  // send data to res
  res.status(200).json({ message: "User Updated!", updatedUser });
});

/**
 * @DESC USER LOGIN
 * @ROUTE /api/v1/user/login
 * @METHOD POST
 * @ACCESS PUBLIC
 */
export const userLogin = asyncHandler(async (req, res) => {
  // get username & password
  const { email, password } = req.body;

  // form validation
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // get user data
  const user = await userModel.findOne({ email });

  // is have account with email
  if (!user) {
    return res
      .status(404)
      .json({ message: "No account is found with this email" });
  }

  // password check
  const passCheck = await bcrypt.compare(password, user.password);

  // if password wrong
  if (!passCheck) {
    return res.status(400).json({ message: "Wrong password!" });
  }

  // generate accessToken
  const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // set cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV === "DEVELOPMENT" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // log in
  res.status(200).json({ message: "Login success!", user });
});

/**
 * @DESC USER LOGOUT
 * @ROUTE /api/v1/user-logout
 * @METHOD GET
 * @ACCESS PUBLIC
 */
export const userLogout = asyncHandler(async (req, res) => {
  // clear authentication cookie
  res.clearCookie("accessToken");

  // send response
  res.status(200).json({ message: "You are no longer log in" });
});
