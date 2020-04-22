require('./config/config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization,token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,DELETE,OPTIONS'
    )
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true

    },
    (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    });


app.listen(process.env.PORT, () => {
    console.log('escuchando por el puerto:', process.env.PORT);
});