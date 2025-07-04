const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.signup);
router.get("/login", authController.login);
router.patch("/logout", authController.logout);
router.patch("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// protected routes
router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);
router.get("/getMe", userController.getMe);
router.delete("/deleteMe", userController.deleteMe);
router.get("/:id", userController.getUser);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

module.exports = router;
