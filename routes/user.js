const express = require("express");
const userController = require("../controllers/user_controller");
const { protect } = require("../middleware/protection");

const router = express.Router();

router.route("/register").post(userController.addUser);
router.route("/login").post(userController.login);
router.route("/verify").get(protect, userController.verify);
router.route("/rfidvalidate").post(userController.rfidvalidate);

module.exports = router;
