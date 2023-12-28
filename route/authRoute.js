import express from "express";
import {
  registerController,
  loginController,
  testController,
  frogotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
  getAllusersController,
} from "../controller/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//user register
router.post("/register", registerController);
//login route
router.post("/login", loginController);

//get all users
router.get("/alluser", getAllusersController);

//to forget password
router.post("/forgot-pass", requireSignIn, frogotPasswordController);

//protected route for user dashboard
router.get("/user-dashboard", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route for adin dashboard
router.get("/admin-dashboard", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//update profile

router.put("/update-profile", requireSignIn, updateProfileController);

//order

router.get("/orders", requireSignIn, getOrderController);

//All orders

router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);

// orders status

router.put(
  "/update-orders/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
