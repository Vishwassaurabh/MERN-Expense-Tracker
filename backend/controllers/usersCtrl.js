const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//! user registration

const userController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;

    //! validation
    if (!username || !email || !password) {
      throw new Error("please all fields are required");
    }

    //! check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("Already Register User");
    }

    //! Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    //! create the user and save into DB
    const userCreated = await User.create({
      email,
      password: hashedPassowrd,
      username,
    });

    //! send the response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //! Login----------
  login: asyncHandler(async (req, res) => {
    //! Get the user data
    const { email, password } = req.body;

    //! if email is correct
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid login credentials");
    }

    //! compare user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    
    //! Generate a token
    const token = jwt.sign({ id: user._id }, "vishwas", { expiresIn: "30d" });

    //! send the response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  }),

  //! profile
  profile: asyncHandler(async (req, res) => {
    //! find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    //! send the response
    res.json({ username: user.username, email: user.email });
  }),

  //! Changed password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    //! find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    //! Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    //! Resave
    await user.save({
      validateBeforeSave:false,
    });

    //! send the response
    res.json({ message: "password changed successfully" });
  }),

  //! Update
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true },
    );

    //! send the response
    res.json({ message: "User profile Updated successfully", updatedUser });
  }),
};

module.exports = userController;
