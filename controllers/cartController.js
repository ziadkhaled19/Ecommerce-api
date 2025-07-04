const mongoose = require("mongoose");
const factoryHandler = require("./factoryHandler");
const Cart = require("./../models/cartModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.getAllCarts = factoryHandler.getAll(Cart);
exports.getCart = factoryHandler.getOne(Cart);

exports.getMyCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError("Error in getting your cart", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: cart,
    },
  });
});

exports.addProductToCart = catchAsync(async (req, res, next) => {
  if (
    !req.body.productId ||
    !mongoose.Types.ObjectId.isValid(req.body.productId)
  ) {
    return next(new AppError("Invalid or missing productId", 400));
  }
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError("No cart found with that ID", 404));
  }
  const updatedCart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    {
      $push: {
        products: {
          product: req.body.productId,
          quantity: req.body.quantity,
        },
      },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    data: {
      data: updatedCart,
    },
  });
});

exports.removeProductFromCart = catchAsync(async (req, res, next) => {
  const productCartId = req.params.productCartId;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError("No cart found for this user", 404));
  }

  const productToRemove = cart.products.id(productCartId);
  if (!productToRemove) {
    return next(
      new AppError("Cart does not contain a product with this ID", 404)
    );
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    {
      $pull: {
        products: { _id: productCartId },
      },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product removed from cart successfully",
    data: {
      data: updatedCart,
    },
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError("Error in getting your cart", 404));
  }
  cart.products = [];
  await cart.save();
  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
    data: {
      data: cart,
    },
  });
});
