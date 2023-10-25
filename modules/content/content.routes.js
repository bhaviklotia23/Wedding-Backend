const express = require("express");
const {
  getContentList,
  upsertContent,
  getContentDetail,
} = require("./content.controller");
const { isAuthenticUser, authorizeRoles } = require("../../middleware/auth");

const router = express.Router();

router
  .route("/content")
  .get(isAuthenticUser, authorizeRoles("admin"), getContentList)
  .post(isAuthenticUser, authorizeRoles("admin"), upsertContent);

// router.put(
//   "/content/:id",
//   isAuthenticUser,
//   authorizeRoles("admin"),
//   updateContent
// );

router.get("/content-detail", getContentDetail);

module.exports = router;
