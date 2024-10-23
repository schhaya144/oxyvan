const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/Uers');
// const userModel = require('../models/userModel');

async function userSignInController(req, res) {
    console.log("first")
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      throw new Error("Please provide an email");
    }

    if (!password) {
      throw new Error("Please provide a password");
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

    // Cookie options
    const tokenOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 8 * 1000, // 8 hours in milliseconds
    };

    // Set cookie and respond with success message and token
    res.cookie("token", token, tokenOptions).status(200).json({
      message: "User signed in successfully",
      success: true,
      error: false,
      data: token,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;