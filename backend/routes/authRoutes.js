const express = require("express");
const {
  signup,
  checkUsername,
  login,
  enable2FA,
  verify2FA,
  resend2FA,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/check-username", checkUsername);
router.post("/login", login);
router.post("/enable-2fa", enable2FA);
router.post("/verify-2fa", verify2FA);
router.post("/resend-2fa", resend2FA);

module.exports = router;
