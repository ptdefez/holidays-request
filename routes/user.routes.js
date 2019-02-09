const constants = require('../constants');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

router.get('/profile', secure.isAuthenticated, usersController.profile);
    
module.exports = router;