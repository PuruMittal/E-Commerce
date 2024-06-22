const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authoriseRole } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users")
  .get(isAuthenticatedUser, authoriseRole("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authoriseRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authoriseRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authoriseRole('admin'), deleteUser)

module.exports = router;
