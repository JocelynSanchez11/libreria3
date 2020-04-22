const mongoose = require('mongoose');
const uniqueValidator =require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    usuario:{
        type:String,
        require:[true,'el usuario es necesario']
    },
    libro:{
        type:String,
        require:[true,'el nombre de el libro es necesario'],
        unique:true
    },

    fechaDePrestamo:{
        type:String,
        require:[true,'la fecha de prestamo es necesario']
     },
    fechaDeEntrega:{
        type:String,
        require:[true,'la fecha de entrega es necesario']
    },
    estado:{
        type:Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniqueValidator,{
    message:'{PATH} Debe de ser unico y diferente'
});

module.exports = mongoose.model('prestamo',prestamoSchema);
