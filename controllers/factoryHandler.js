const AppError = require("../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, ...popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      console.log(popOptions);
      popOptions.forEach((el) => (query = query.populate(el)));
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (Model.modelName === "Product") {
      if (req.file) req.body.image = req.file.filename;
    }
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let object = req.body;
    if (Model.modelName === "Product") {
      if (req.file) {
        object = {
          ...object,
          image: req.file.filename,
        };
      }
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, object, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
