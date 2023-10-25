const AppError = require("../utils/errorHandler");

const validateSchemaMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errorMessage = error.inner.map((err) => err.message).join(", ");
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  };
};

module.exports = validateSchemaMiddleware;
