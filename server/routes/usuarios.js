const express = require('express'); //declaramos paqueterias
const app = express();
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/usuarios'); //y archuivos
const { verificaToken } = require('../middleware/auntenticaion');

//obtienes datos usuario
app.get('/usuarios', [verificaToken], function(req, res) {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;
    desde = Number(desde);
    limite = Number(limite);
    Usuarios.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `ocurrio un error al momento de consultar ${err}`
                })
            }
            res.json({
                ok: true,
                mensaje: 'consulta realizada con exito',
                usuarios
            })
        });

});

app.post('/usuarios', function(req, res) {
    let body = req.body;

    let usuario = new Usuarios({
        nombre: body.nombre,
        email: body.email,
        // password:body.password,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de guardar ${err}`
            });
        }
        res.json({
            ok: true,
            mensaje: 'el usuario a sido inserado con exito',
            usuario: usuarioDB
        });
    });

});

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado', 'role', 'email']);
    Usuarios.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de actualizar ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'cambios guardados',
            usuario: usuarioDB

        });
    });
});

app.delete('/usuarios/:id', function(req, res) {

    let id = req.params.id;

    //    Usuario.deleteOne({_id: id},(err,resp)=> {
    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             mensaje: `ocurrio un error al eliminar el registro ${err}`
    //         });
    //     }
    //     if(resp.deliteCount === 0){
    //         return res.status(400).json({
    //             ok:false,
    //             mensaje: `el usuario con el id ${id}, no se ha encontrado`
    //         });
    //     }
    //     return res.json({
    //         ok:true,
    //         mensaje:'registro borrado con exito',
    //         resp

    //     });
    // }); 

    Usuarios.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de eliminar el usuario ${err}`

            });
        }
        return res.json({
            ok: true,
            mensaje: 'registro borrado con exito',
            resp

        });
    });
});

module.exports = app;