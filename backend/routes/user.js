import express from "express";
const router = express.Router();
import { protect, admin } from "../helpers/middlewares/authMiddleware.js";
import {
  getUsers,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  deleteUser,
  getUserById,
  updateUser,
  createFeedback,
} from "../controllers/user.js";

router.route("/").post(registerUser).get(getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/:id/feedback").post(createFeedback);

export default router;
