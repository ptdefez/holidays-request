const constants = require('../constants');
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const secure = require('../middlewares/secure.mid');


router.get('/new', secure.isAuthenticated, requestController.create);
router.post('/new', secure.isAuthenticated, requestController.doCreate);

module.exports = router;