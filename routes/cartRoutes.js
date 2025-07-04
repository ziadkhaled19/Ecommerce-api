const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");

const express = require("express");
const router = express.Router();

// all routes are protected
router.use(authController.protect);

router.route("/addProductToCart").patch(cartController.addProductToCart);
router
  .route("/removeProductFromCart/:productCartId")
  .patch(cartController.removeProductFromCart);
router.route("/myCart").get(cartController.getMyCart);
router.route("/clearCart").put(cartController.clearCart);

// for admins only
router.use(authController.restrictTo("admin"));

router.route("/allCarts").get(cartController.getAllCarts);
router.route("/:id/getCart").get(cartController.getCart);
module.exports = router;
