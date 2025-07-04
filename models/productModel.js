const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
    },
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    image: {
      type: String,
      // required: [true, "A product must have an image"],
    },
    category: {
      type: String,
      required: [true, "A product must have a category"],
    },
    size: {
      type: String,
      required: [true, "A product must have a size"],
    },
    color: {
      type: String,
      required: [true, "A product must have a color"],
    },
    quantity: {
      type: Number,
      required: [true, "A product must have a quantity"],
    },
    inStock: {
      type: Boolean,
      required: [true, "A product must have a stock"],
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
