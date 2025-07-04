const Product = require("./../models/productModel");
const factoryHandler = require("./factoryHandler");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");

exports.getAllProducts = factoryHandler.getAll(Product);
exports.getProduct = factoryHandler.getOne(Product);
exports.createProduct = factoryHandler.createOne(Product);
exports.updateProduct = factoryHandler.updateOne(Product);
exports.deleteProduct = factoryHandler.deleteOne(Product);

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadProductPhoto = upload.single("image");

exports.resizeProductPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `product-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`imgs/products/${req.file.filename}`);
  next();
});
