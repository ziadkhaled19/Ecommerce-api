const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");

const express = require("express");
const router = express.Router();

router
  .route("/:id")
  .get(authController.protect, orderController.getOrder)
  .patch(authController.protect, orderController.updateOrder)
  .delete(authController.protect, orderController.deleteOrder);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    orderController.getAllOrders
  );  
module.exports = router;
