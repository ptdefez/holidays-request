const constants = require('../constants');
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const secure = require('../middlewares/secure.mid');

router.get('/new', secure.isAuthenticated, requestController.create);
router.post('/new', secure.isAuthenticated, requestController.doCreate);

router.get('/profile', secure.isAuthenticated, requestController.userList);
router.get('/profile', secure.isAuthenticated, requestController.bossList);

router.post('/:id/delete', secure.isAuthenticated, requestController.delete); 

router.post('/:id/validate', secure.isAuthenticated, requestController.validate);

module.exports = router;