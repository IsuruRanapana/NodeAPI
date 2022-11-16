const express = require('express');
const userController = require('../controllers/user_controller');
const protect = require('../middleware/protection');

const router = express.Router();

router.route('/register').post(userController.addUser);

module.exports = router;