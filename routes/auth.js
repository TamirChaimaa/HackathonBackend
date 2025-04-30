const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// C’est ici qu’on déclare la route POST /auth/register
router.post('/register', authController.register);

module.exports = router;
