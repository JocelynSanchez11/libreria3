const mongoose = require('mongoose');
const uniqueValidator =require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let librosSchema = new Schema({
    nombre:{
        type:String,
        require:[true,'el nombre es necesario']
    },
    descripcion:{
        type:String,
        require:[true,'la descripcion es necesario'],
        unique:true
    },

    categoria:{
        type:String,
        require:[true,'la categoria es necesario']
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img:{
        type:String
        
    }
    
});

librosSchema.plugin(uniqueValidator,{
    message:'{PATH} Debe de ser unico y diferente'
});

module.exports = mongoose.model('libros',librosSchema);
