const createError = require('http-errors');
const mongoose = require('mongoose');
const Request = require('../models/request.model');


module.exports.create = (req, res, next) => {
    res.render('request/new');
}

module.exports.doCreate = (req,res, next) => {
    res.send(req.body)
}