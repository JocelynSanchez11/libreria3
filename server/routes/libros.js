const express = require('express');
const app = express();
const _ = require('underscore');
const Libros = require('../models/libros');


app.get('/libros', function(req, res) {

    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;
    desde = Number(desde);
    limite = Number(limite);
    Libros.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `ocurrio un error al momento de consultar ${err}`
                })
            }
            res.json({
                ok: true,
                mensaje: 'consulta realizada con exito',
                libros
            })
        });

});

app.post('/libros', function(req, res) {
    let body = req.body;

    let libros = new Libros({
        nombre: body.nombre,
        descripcion: body.descripcion,
        categoria: body.categoria,
        disponible: body.disponible

    });
    libros.save((err, librosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de guardar ${err}`
            });
        }
        res.json({
            ok: true,
            mensaje: 'el libro a sido inserado con exito',
            libros: librosDB
        });
    });

});

app.put('/libros/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion', 'categoria', 'disponible']);

    Libros.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, librosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de actualizar ${err}`
            });
        }
        return res.json({
            ok: true,
            mensaje: 'cambios guardados',
            libros: librosDB

        });
    });
});

app.delete('/libros/:id', function(req, res) {
    //no lo eliminamos completamente ya que la tabla contiene un campo llamado disponible que nos ayuda a solo mantenerlo solo no disponible
    let id = req.params.id;


    Libros.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de eliminar el libro ${err}`

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