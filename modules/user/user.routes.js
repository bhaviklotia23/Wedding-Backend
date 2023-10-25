const express = require("express");
const { registerUser, loginUser, logoutUser, getAllUsers, deleteUser } = require("./user.controller");
const validateSchemaMiddleware = require("../../middleware/validationMiddleware");
const { registrationSchema, loginSchema } = require("../../validators/authValidations");
const { isAuthenticUser, authorizeRoles } = require("../../middleware/auth");

const router = express.Router();

router.post(
    '/register',
    validateSchemaMiddleware(registrationSchema),
    registerUser
  );
  router.post(
    '/login',
    validateSchemaMiddleware(loginSchema),
    loginUser
  );
router.route("/logout").get(isAuthenticUser, logoutUser);
router.route("/users").get(isAuthenticUser, authorizeRoles("admin"), getAllUsers);

router.route("/delete-user/:id").delete(isAuthenticUser, deleteUser);




module.exports = router;
