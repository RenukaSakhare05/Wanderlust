const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users.js");
const { renderSignupForm, renderLoginForm } = require("../controllers/users.js");

// ⭐ SIGNUP FORM
router.get("/signup", renderSignupForm);

// ⭐ SIGNUP POST ROUTE
router.post(
  "/signup",
  wrapAsync(userController.signup)
);

// ⭐ LOGIN FORM
router.get("/login", renderLoginForm);

// ⭐ LOGIN POST ROUTE
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  userController.login
);

// ⭐ LOGOUT ROUTE
router.get("/logout", userController.logout);

module.exports = router;
