const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJWT");
const mainController = require("../controllers/mainController");

// Add logging to confirm middleware functions
// console.log("verifyJWT:", verifyJWT);
// console.log("loginLimiter:", loginLimiter);

// Use verifyJWT middleware
router.use(verifyJWT);

// Define routes
router.route("/").post(loginLimiter, mainController.login);

module.exports = router; // Ensure the correct export here
