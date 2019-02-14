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

// module.exports.ownList = (req,res, next) => {
//     function renderWithErrors(request, errors) {
//         res.render('user/profile', {
//           request: request,
//           errors: errors
//         });
//       }
//     Request.find({user: req.user.id} )
//         .then(requests => {           
//             res.render('user/profile', {ownRequests});     
//         })
//         .catch(error => {
//             renderWithErrors(req.body, {
//                 'no-request': 'No hay solicitudes.'
//             });
//         });

// }

// module.exports.bossList = (req,res, next) => {
//     function renderWithErrors(bossRequest, errors) {
//         res.render('user/profile', {
//             bossRequest: bossRequest,
//             errors: errors
//         });
//       }
//     Request.find({responsable: req.user.id} )
//         .then(bossRequests => {           
//             res.render('user/profile', {bossRequests});      
//         })
//         .catch(error => {
//             renderWithErrors(req.body, {
//                 'no-bossRequest': 'No hay solicitudes.'
//             });
//         });



module.exports.changeStatus = (req, res, next) => {

}



module.exports.delete = (req, res, next) => {
    Request.findByIdAndDelete(req.params.id)
        .then((request) => res.redirect('request/list'))
        // .cath(error => next(error));  

      
}

