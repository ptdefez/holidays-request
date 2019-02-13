const constants = require('../constants');
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/request.controller');
const secure = require('../middlewares/secure.mid');

router.get('/new', secure.isAuthenticated, requestController.create);
router.post('/new', secure.isAuthenticated, requestController.doCreate);

router.get('/list', secure.isAuthenticated, requestController.list);
// router.get('/list', secure.isAuthenticated, requestController.ownList);
// router.get('/list', secure.isAuthenticated, requestController.bossList);

router.post('/:id/delete', secure.isAuthenticated, requestController.delete); 

router.post('/:id/changeStatus', secure.isAuthenticated, requestController.changeStatus);

module.exports = router;