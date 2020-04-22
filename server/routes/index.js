const express = require('express');
const app = express();

app.use(require('./usuarios'));
app.use(require('./categorias'));
app.use(require('./libros'));
app.use(require('./prestamo'));
app.use(require('./login'));

app.use(require('./upload'));
app.use(require('./image'));

module.exports = app;