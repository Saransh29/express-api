const express = require("express");
const UserController = require("../controller/userController");
const authMiddleware = require("../middleware/auth");

const { check, validationResult } = require("express-validator");
const router = express.Router();

router.get("/", authMiddleware, UserController.getAllUsers);
router.post(
  "/",
  [
    check("username", "Please include a valid username").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  UserController.createUser
);
router.post(
  "/signin",
  [
    check("username", "Please include a valid username").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  UserController.signIn
);

module.exports = router;
