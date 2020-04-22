const express  = require('express');
const app = express();
const _ = require('underscore');
const Categorias= require('../models/categorias');


app.get('/categoria',function(req,res){

    let desde = req.query.desde || 0;
let limite = req.query.limite|| 0;
    desde = Number(desde);
limite = Number(limite);
    Categorias.find({})
    .skip(desde)
    .limit(limite)
    .exec((err,categorias)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                mensaje: `ocurrio un error al momento de consultar ${err}`
            })
        }
        res.json({
            ok: true,
            mensaje: 'consulta realizada con exito',
            categorias
        })
    });

});

app.post('/categoria',function(req,res){
    let body = req.body;

    let categorias = new Categorias({
        nombre:body.nombre,
        usuario:body.usuario
        });
categorias.save((err, categoriaDB) => {
    if(err){
        return res.status(400).json({
            ok:false,
            mensaje: `ocurrio un error al momento de guardar ${err}`
        });
    }
    res.json({
        ok: true,
        mensaje: 'el usuario a sido inserado con exito',
        categorias: categoriaDB
    });
});

});

app.put('/categoria/:id',function(req,res){
let id =req.params.id;
let body = _.pick(req.body,['nombre','usuario'] );
Categorias.findByIdAndUpdate(id, body,{new:true,runValidators:true,context:'query'},(err,categoriaDB)=>{
if (err){
return res.status(400).json({
    ok:false,
    mensaje: `ocurrio un error al momento de actualizar ${err}`
});    
}
return res.json({
    ok:true,
    mensaje:'cambios guardados',
    categorias:categoriaDB

});
});
});

 app.delete('/categoria/:id',function(req,res){

   
   let id = req.params.id;

       Categorias.deleteOne({_id: id},(err,resp)=> {
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