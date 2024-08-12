const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const routes = require('./routes.js');
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 3000);

// Configura CORS para permitir acceso desde cualquier origen
app.use(cors());



// Configuración de la base de datos
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tareasD'
};

// Middlewares
app.use(myconnection(mysql, dbOptions, 'single'));
app.use(express.json()); // Para parsear el body de las solicitudes

// Rutas
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});
app.use('/actividades', routes);

// Servidor en ejecución
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});
