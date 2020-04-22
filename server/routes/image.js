const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/imagen/:ruta/:nombre',(req,res) => {
    let ruta = req.params.ruta;
    let nombreImagen =req.param.nombre;
    let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);
    let noImagen = path.resolve(__dirname, '../assets/no-imagen.jpg'); 

    if(fs.existsSync(rutaImagen)){
        return res.sendFile(rutaImagen);
    }else{
        return res.sendFile(noImagen);
    }
});

module.exports = app;