const express = require('express');
const fileUpload = require('express-fileupload');
const uniqid = require('uniqid');
const path = require('path');
const fs = require('fs');
const app = express();

// const Usuario = require('../models/usuario');


const libros = require('../models/libros');


app.use(fileUpload());

app.put('/upload/:ruta/:id', (req, res) => {
    let id = req.params.id;
    let ruta = req.params.ruta;
    let archivo = req.files.archivo;
    let nombre = uniqid() + path.extname(archivo.name);

    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se a encontrado el archivo'
        });

    }

    let validExtensions = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png'];
    if(!validExtensions.includes(archivo.mimetype)){
        return res.status(400).json({
            ok: false,
            mensaje: 'Solo las extensiones <jpg, gif, jpeg> son validas, por favor suba otro archivo'
        });
    }

    archivo.mv(`uploads/${ruta}/${nombre}`, (err) => { 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: `Ocurrio un error en el servidor al tratar de subir la imagen: ${err}`
            });
        }
    });

    switch (ruta) {
        case 'libros':
            imagenlibros(id, res, nombre);
            break;
        default:
            console.log('ruta no valida');
            break;
    }
});


function imagenlibros(id, res, nombreImagen){
    libros.findById(id, (err, lib) => {   
        if(err){
            borrarArchivo(nombreImagen, 'libros');
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de subir la imagen ${err}`
            });
        }

        if(!lib){
            borrarArchivo(nombreImagen, 'libros');
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el usuario especificado'
            });
        }

        lib.img = nombreImagen;

        lib.save((err, librosDB) => {
            if(err){
                borrarArchivo(nombreImagen, 'libros');
                return res.status(500).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de relacionar el archivo con el registro: ${err}`
                });
            }

            return res.json({
                ok: true,
                mensaje: 'La imagen a sido subida con exito',
                libros: librosDB
            });

        });

    });

}

    function borrarArchivo(nombreImagen, ruta){
        let pathImg = path.resolve(__dirname, `../../uploads/${ruta}/${nombreImagen}`);

        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);

        }
            console.log('Imagen borrada');
    }

    module.exports = app 