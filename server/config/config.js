//Puerto
process.env.POST = process.env.POST || 3000;

//ENTORNO


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//firma secreta de jwt
process.env.FIRMA = process.env.FIRMA || 'firma-bm24k';

//CONECION A BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') { //condicion para conectar con el cluster y si no se conecta localmente
    urlDB = 'mongodb+srv://admin:admin@cluster0-fb2ad.mongodb.net/biblioteca?retryWrites=true&w=majority';



}

process.env.URLDB = urlDB;