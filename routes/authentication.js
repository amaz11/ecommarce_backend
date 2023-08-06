//Require Packeage
const express = require("express");

// Controller
const {
  signup,
  signin,
  getUser,
  signout,
  getCustomer,
} = require("../controller/auth");

// Middelware
const roleMiddleware = require("../middleware/roleMiddleware");

//All Router For Sign Up & In
const router = express.Router();
router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/sign-out", signout);
router.get("/get-user", roleMiddleware, getUser);
router.get("/customer", getCustomer);
module.exports = router;
