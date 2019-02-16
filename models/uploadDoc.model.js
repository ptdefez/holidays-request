const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
      },
    path: {
        type: String,
    },
    originalName: {
        type: String,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });



const UploadDoc = mongoose.model('UploadDoc', schema);
module.exports = UploadDoc;