const express = require("express");
const {
  signup,
  checkUsername,
  login,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/check-username", checkUsername);
router.post("/login", login);

module.exports = router;
