const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({ path: "user" }).populate({
    path: "products.product",
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;
