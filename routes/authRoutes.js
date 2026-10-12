
const express = require("express");
const router = express.Router()

const { register, login } = require("../controllers/authController");
const validateLogin = require("../middleware/authLoginValidation");
const {validateRegister} = require("../middleware/validateAuth");
const loginLimiter = require("../middleware/loginLimiter");

router.post(
    "/register",
    validateRegister,
    register
);


router.post("/login", loginLimiter, validateLogin, login);

module.exports = router;


