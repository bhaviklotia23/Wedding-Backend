const express = require("express");
// const validateSchemaMiddleware = require("../../middleware/validationMiddleware");
const { isAuthenticUser, authorizeRoles } = require("../../middleware/auth");
const {
  registerWedding,
  getAllWeddings,
  getWedding,
} = require("./wedding.controller");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.route("/registerWedding", upload.single("photo")).post(registerWedding);

//   router.post(
//     '/login',
//     validateSchemaMiddleware(loginSchema),
//     loginUser
//   );
// router.route("/logout").get(isAuthenticUser, logoutUser);
router.route("/weddings").get(getAllWeddings);
router.route("/wedding/:id").get(getWedding);
// router.route("/delete-user/:id").delete(isAuthenticUser, deleteUser);

module.exports = router;
