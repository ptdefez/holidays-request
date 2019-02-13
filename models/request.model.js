
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    kind: {
        type: String,
        enum: ['Vacaciones', 'Asuntos Propios', 'Permiso Retribuido'],
        require: [true, 'Es necesario señalar la clase de solicitud'],
    },
    dates: [{
        start: Date,
        end: Date,
    },{
        validate: [isDateRangeValid, 'La fecha de finalización no puede ser anterior a la de inicio']
    }],
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
    responsable_email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPending: {
        type: Boolean,
        default: true
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    }

})

function isDateRangeValid(dateRange) {
    return dateRange.start <= dateRange.end;
}

const Request = mongoose.model('Request', schema);
module.exports = Request;