const mongoose = require('mongoose');
const uniqueValidator =require('mongoose-unique-validator');

let roleValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message :'{VALUE} No es un rol valido'
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        require:[true,'el nombre es necesario']
    },
    email:{
        type:String,
        require:[true,'el correo es necesario'],
        unique:true
    },

    password:{
        type:String,
        require:[true,'la contraseña  es necesario']
     },
    role:{
        type:String,
        enum: roleValidos,
        default: 'USER_ROLE'
    },
    estado:{
        type:Boolean,
        default: true
    }
});

usuarioSchema.plugin(uniqueValidator,{
    message:'{PATH} Debe de ser unico y diferente'
});

module.exports = mongoose.model('Usuarios',usuarioSchema);
