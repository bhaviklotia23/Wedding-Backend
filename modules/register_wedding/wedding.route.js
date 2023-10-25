const express = require("express");
// const validateSchemaMiddleware = require("../../middleware/validationMiddleware");
const { isAuthenticUser, authorizeRoles } = require("../../middleware/auth");
const { registerWedding, getAllWeddings, getWedding } = require("./wedding.controller");

const router = express.Router();

router.route("/registerWedding").post(isAuthenticUser, registerWedding);
//   router.post(
//     '/login',
//     validateSchemaMiddleware(loginSchema),
//     loginUser
//   );
// router.route("/logout").get(isAuthenticUser, logoutUser);
router.route("/weddings").get(isAuthenticUser, getAllWeddings);
router.route("/wedding/:id").get(isAuthenticUser, getWedding);
// router.route("/delete-user/:id").delete(isAuthenticUser, deleteUser);

module.exports = router;
