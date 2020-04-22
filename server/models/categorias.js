//paqueterias que se van a utilizar 
const mongoose = require('mongoose'); //para poder usar funciones de mongo
const uniqueValidator = require('mongoose-unique-validator'); //crea datos unicos
//const Usuario = require ('./usuario');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'el nombre es necesario'],
        unique: true
    },
    usuario: {
        type: Schema.Types.ObjectId,

        ref: 'Usuario',
        require: [true, 'el usuario es necesario']
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe de ser unico y diferente'
});

module.exports = mongoose.model('categorias', categoriaSchema);