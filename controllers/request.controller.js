const createError = require('http-errors');
const mongoose = require('mongoose');
const Request = require('../models/request.model');
const User = require('../models/user.model');


module.exports.create = (req, res, next) => {
    console.info('estoy en el create');
    res.render('request/new');
}

module.exports.doCreate = (req,res, next) => {
    function renderWithErrors(errors) {
        console.log(errors);
        res.render('request/new', {
            request: req.body,
            errors: errors
        });
    }

    console.log(req.body);
    const request = new Request(req.body);
    request.user = req.user.id;
    request.responsable = req.user.responsable;

    request.save()
        .then(request => {
            res.redirect('auth/profile');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors);
            } else {
                next(error);
            }
        })
}

module.exports.userList = (req,res, next) => {
    function renderWithErrors(request, errors) {
        res.render('user/profile', {
          request: request,
          errors: errors
        });
      }
    Request.find({user: req.user.id} )
        .then(requests => {           
            res.render('user/profile', {requests});     
        })
        .catch(error => {
            renderWithErrors(req.body, {
                'no-request': 'No hay solicitudes.'
            });
        });

}

module.exports.bossList = (req,res, next) => {
    function renderWithErrors(bossRequest, errors) {
        res.render('user/profile', {
            bossRequest: bossRequest,
            errors: errors
        });
      }
    Request.find({responsable: req.user.id} )
        .then(bossRequests => {           
            res.render('user/profile', {bossRequests});      
        })
        .catch(error => {
            renderWithErrors(req.body, {
                'no-bossRequest': 'No hay solicitudes.'
            });
        });

}

module.exports.delete = (req, res, next) => {
    Request.findByIdAndDelete(req.params.id)
        
}

module.exports.validate = (req, res, next) => {
    Request.findByIdAndUpdate(req.params.id)
        
}
