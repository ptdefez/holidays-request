const constants = require('../constants');
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const secure = require('../middlewares/secure.mid');

router.get('/new', secure.isAuthenticated, requestController.create);
router.post('/new', secure.isAuthenticated, requestController.doCreate);

router.get('/list', secure.isAuthenticated, requestController.list);

router.get('/:id', secure.isAuthenticated, requestController.get)

router.post('/:id/delete', secure.isAuthenticated, requestController.delete); 

router.post('/:id/validate', secure.isAuthenticated, requestController.validate);
router.post('/:id/deny', secure.isAuthenticated, requestController.deny);

module.exports = router;