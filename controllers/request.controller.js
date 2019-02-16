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

    console.log('body', req.body);
    console.log('files', req.files);
    console.log('file', req.file);
    const requestObj = { ...req.body };
    if (req.file) {
        requestObj.file = `/uploads/${req.file.filename}`;
    }
    const request = new Request(requestObj);
    
    request.dates = req.body;
    request.user = req.user.id;
    request.responsable = req.user.responsable;

    request.save()
        .then(result => {
            console.info('result => ', result)
            res.redirect('/profile');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                renderWithErrors(error.errors);
            } else {
                next(error);
            }
        })
}
module.exports.list = (req, res, next) => {
    User.find({ responsable_email: req.user.email })
        .then((users) => {
            subordinadosIds = users.map(u => u._id);

            Request.find({ user: { $in: [...subordinadosIds, req.user._id] } })
                .populate('user')
                .then((requests) => {
                    //return res.send({ requests })
                    const ownRequests = requests.filter(r => req.user._id.toString() === r.user._id.toString());
                    const bossRequests = requests.filter(r => req.user._id.toString() !== r.user._id.toString());
                    //return res.send({ ownRequests, bossRequests })
                    res.render("request/list", { ownRequests, bossRequests })
                });
        });
}

module.exports.get = (req, res, next) => {
    Request.findById(req.params.id)
    // .then(request => res.send( { request }));
        .populate('user')  
        .then(request => res.render('request/show', { request }));
  }






module.exports.delete = (req, res, next) => {
    Request.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/request/list'))
        // .cath(error => next(error));  

      
}

module.exports.validate = (req, res, next) => {
    const { id } = req.params;
    // return res.send({ id })
    Request.findByIdAndUpdate(id, { $set: { isPending: 'false', isApproved: 'true' }}, { new: true })
        .then(() => {
            res.redirect("/request/list")
        })
        .catch(error => {
            console.info(error)
            res.redirect("/request/list")
        });
}

module.exports.deny = (req, res, next) => {
    const { id } = req.params;
    // return res.send({ id })
    Request.findByIdAndUpdate(id, { $set: { isRejected: 'true', isPending: 'false' }}, { new: true })
        .then(() => {
            res.redirect("/request/list")
        })
        .catch(error => {
            console.info(error)
            res.redirect("/request/list")
        });
}