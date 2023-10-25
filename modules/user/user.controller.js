const catchAsyncError = require("../../middleware/catchAsyncError");
const User = require("./user.model");
const sendToken = require("../../utils/jwtToken");
const {
  loginSchema,
} = require("../../validators/authValidations");

exports.registerUser = catchAsyncError(async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).json({
        status: 422,
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
    });

    return sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

exports.loginUser = catchAsyncError(async (req, res) => {
  try {
    const { email, password } = await loginSchema.validate(req.body);

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Email or Password is incorrect",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Email or Password is incorrect",
      });
    }

    return sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

exports.logoutUser = catchAsyncError(async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

   return res.status(200).json({
      status: res.statusCode,
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.deleteUser = catchAsyncError(async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a parameter

    // Find the user by ID
    const user = await User.findById(userId);

    console.log(user)
    if (!user) {
      return res.status(error.statusCode).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    user.deleteOne()

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error, 'error')
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});
