import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createProductController,
  getProductphotoController,
  getallProductController,
  getsingleProductController,
  deleteProductController,
  updateProductController,
  productFilterController,
  countProductController,
  listProductController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controller/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(), // This should be before createProductController
  createProductController
);
router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(), // This should be before createProductController
  updateProductController
);

//get products

router.get("/get-product", getallProductController);
export default router;

//set single product

router.get("/get-single-product/:slug", getsingleProductController);

//product photo

router.get("/product-photo/:pid", getProductphotoController);

//delete product

router.delete("/delete-product/:pid", deleteProductController);

// filter products

router.post("/filter-product", productFilterController);

//pagination
router.get("/count-product", countProductController);

//productper page
router.get("/product-list/:page", listProductController);

//search

router.get("/search/:keyword", searchProductController);
//related products

router.get("/related-product/:pid/:cid", relatedProductController);

//product-category

router.get("/product-category/:slug", productCategoryController);

//payment routes
//token

router.get("/braintree/token", braintreeTokenController);

//payment

router.post("/braintree/payment", requireSignIn, braintreePaymentController);
