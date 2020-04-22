const express = require('express');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuarios');
const app = express();

app.post('/login',(req,res)=>{
    let body = req.body;
Usuarios.findOne( {email: body.email},(err,usuarioDB)=>{
if(err){
    return res.status(400).json({
ok:false,
mensaje:`la consulta fallo  ${err}`

    });
}
if(!usuarioDB){
    return res.status(400).json({
ok: false,
mensaje: '*usuarios y/o contraseña incorrectas '
    });
}
if(!bcrypt.compareSync(body.password,usuarioDB.password)){
    return res.status(400).json({
        ok: false,
        mensaje: 'usuario y/o *contraseña incorrectas '
    });        
}
let token = jwt.sign({usuario:usuarioDB},process.env.FIRMA);

return res.json({
    ok: true,
    mensaje:`bienvenido  ${body.nombre,usuarioDB.nombre}`,
    Usuarios:usuarioDB,
    token:token
});
});
});

module.exports = app;