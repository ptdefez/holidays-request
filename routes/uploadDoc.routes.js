const constants = require('../constants');
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const secure = require('../middlewares/secure.mid');

// router.get('/new', secure.isAuthenticated, uploadDocController.create);
router.post('/new', secure.isAuthenticated, uploadDocController.doCreate);

// router.get('/:id', secure.isAuthenticated, uploadDocController.get)

// router.post('/:id/delete', secure.isAuthenticated, uploadDocController.delete); 