// dependencies
import express from "express";
import {
  createUser,
  deleteSingleUser,
  editUser,
  getAllUser,
  getSingleUser,
  userLogin,
  userLogout,
} from "../controllers/user.js";

// init router
const router = express.Router();

// create routes
router.get("/api/v1/user", getAllUser);
router.post("/api/v1/user", createUser);
router.get("/api/v1/user/:id", getSingleUser);
router.delete("/api/v1/user/:id", deleteSingleUser);
router.patch("/api/v1/user/edit/:id", editUser);
router.post("/api/v1/user/login", userLogin);
router.get("/api/v1/user-logout", userLogout);

// export router
export default router;
