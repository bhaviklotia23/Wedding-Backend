const jwt = require("jsonwebtoken");
const userModel = require("../modules/user/user.model");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      // Handle missing token
      return res.status(403).json({
        success: false,
        message: 'Please login to access this resource',
      });
    }

    try {
      const decodedData = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      const user = await userModel.findById(decodedData.id);

      if (!user) {
        // Handle user not found
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      // Handle token verification error
      return res.status(400).json({
        success: false,
        message: 'Invalid token',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const errorMessage = `${req.user.role} not authorized to access this resource`;
      const error = new ErrorHandler(errorMessage, 403);
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next();
  };
};
