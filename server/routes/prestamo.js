const express  = require('express');
const app = express();
const _ = require('underscore');
const Prestamo= require('../models/prestamo');


app.get('/prestamo',function(req,res){

    let desde = req.query.desde || 0;
let limite = req.query.limite|| 0;
    desde = Number(desde);
limite = Number(limite);
    Prestamo.find({})
    .skip(desde)
    .limit(limite)
    .exec((err,prestamo)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de consultar ${err}`
            })
        }
        res.json({
            ok: true,
            mensaje: 'consulta realizada con exito',
            prestamo
        })
    });

});

app.post('/prestamo',function(req,res){
    let body = req.body;

    let prestamo = new Prestamo({
        usuario:body.usuario,
        libro:body.libro,
        fechaDePrestamo:body.fechaDePrestamo,
        fechaDeEntrega:body.fechaDeEntrega,
        estado:body.estado

    });
prestamo.save((err, prestamoDB) => {
    if(err){
        return res.status(400).json({
            ok:false,
            mensaje: `ocurrio un error al momento de guardar ${err}`
        });
    }
    res.json({
        ok: true,
        mensaje: 'el prestamo a sido inserado con exito',
        prestamo:prestamoDB
    });
});

});

app.put('/prestamo/:id',function(req,res){
let id =req.params.id;
let body = _.pick(req.body,['usuario','libro','fechaDePrestamo','fechaDeEntrega','estado'] );

Prestamo.findByIdAndUpdate(id, body,{new:true,runValidators:true,context:'query'},(err,prestamoDB)=>{
if (err){
return res.status(400).json({
    ok:false,
    mensaje: `ocurrio un error al momento de actualizar ${err}`
});    
}
return res.json({
    ok:true,
    mensaje:'cambios guardados',
    prestamo:prestamoDB

});
});
});

 app.delete('/prestamo/:id',function(req,res){
//lo mejor seria eliminar completamente ya todo el registro
     let id = req.params.id;

     Prestamo.deleteOne({_id: id},(err,resp)=> {
         if(err){
                 return res.status(400).json({
                     ok:false,
                     mensaje: `ocurrio un error al eliminar el registro ${err}`
                 });
             }
             if(resp.deliteCount === 0){
                 return res.status(400).json({
                    ok:false,
                    mensaje: `el usuario con el id ${id}, no se ha encontrado`
                });
            }
            return res.json({
                ok:true,
                mensaje:'registro borrado con exito',
                resp
            
            });
        }); 
    

});


module.exports = app;