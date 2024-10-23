const bcrypt = require('bcryptjs');
const UserModel = require('../models/userLogin');

async function userSignUpController(req, res) {
  try {
    const { email, password } = req.body;
    console.log('req.body', req.body);

    // Check if email, password, and name are provided
    

    if (!email) {
      return res
        .status(400)
        .json({
          message: 'Please provide an email',
          error: true,
          success: false,
        });
    }

    if (!password) {
      return res
        .status(400)
        .json({
          message: 'Please provide a password',
          error: true,
          success: false,
        });
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: 'User already exists', error: true, success: false });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      return res
        .status(500)
        .json({
          message: 'Something went wrong with password hashing',
          error: true,
          success: false,
        });
    }

    // Prepare payload
    const payload = {
     
      email,
      password: hashPassword,
  
    };

    // Create a new user
    const newUser = new UserModel(payload);
    const saveUser = await newUser.save();

    // Respond with success message
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: 'User created successfully',
    });
  } catch (err) {
    console.error('Error in userSignUpController:', err); // Log the error for debugging
    res.status(500).json({
      message: err.message || 'An error occurred',
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
