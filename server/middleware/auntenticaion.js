const jwt = require('jsonwebtoken'); //mandamos llamar paqueteria jasonwebtoken en una constante jwt

let verificaToken = (req, res, next) => { //variable verificar token en una funcion tipo flecha para validar si es verdadero
    let token = req.get('token');

    jwt.verify(token, process.env.FIRMA, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: `ocurrio un error avrificar el token ${err}`
            });
        }
        req.Usuarios = decoded.Usuarios;
        next();

    });
}

module.exports = {
    verificaToken
}