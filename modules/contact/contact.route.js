const express = require("express");
const { isAuthenticUser } = require("../../middleware/auth");
const { registerContact, getContact } = require("./contact.controller");

const router = express.Router();

router.route("/addContact").post(isAuthenticUser, registerContact);
// router.route("/getcontact").get(isAuthenticUser, getContact);



module.exports = router;