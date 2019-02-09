
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    kind: {
        type: String,
        enum: ['Vacaciones', 'Asuntos Propios', 'Permiso Retribuido'],
        require: [true, 'Es necesario señalar la clase de solicitud'],
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    duration: {
        type: Number,
        enum: [2, 4, 8]
    },
    reason: {
        type: String,
        enum: ['Matrimonio', 'Nacimiento Hijo', 'Intervención / Hospitalización 1º / 2º Grado', 'Traslado Domicilio Habitual', 'Asistencia Juicio / Jurado', 'Fallecimiento Familiar 1º / 2º Grado', 'Otra'],
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    responsable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Request = mongoose.model('Request', schema);
module.exports = Request;