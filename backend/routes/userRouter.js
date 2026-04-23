const express = require("express");
const userController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");

const userRouter = express.Router();

//! Register
userRouter.post("/api/v1/users/register", userController.register);
//! Login
userRouter.post("/api/v1/users/login", userController.login);
//! profile
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  userController.profile,
);

//! change password
userRouter.put(
  "/api/v1/users/change-password",
  isAuthenticated,
  userController.changeUserPassword,
);

//!update profile
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  userController.updateUserProfile
);

module.exports = userRouter;
