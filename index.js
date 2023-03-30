const express = require('express');
require('dotenv').config(); // Leemos las variables de entorno
const cors = require('cors');
const {dbConnection} = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//base de datos 
dbConnection();


//Rutas
app.use("/api/usuarios", require('./routes/usuarios_routes' ));
app.use("/api/hospitales", require("./routes/hospitales_routes"));
app.use("/api/medicos", require("./routes/medicos_routes"));
app.use("/api/buscar", require("./routes/busquedas"));
app.use("/api/login", require("./routes/auth_routes"));
app.use("/api/upload", require("./routes/uploads"));





app.listen( 3000, () => {
    console.log('Servidor corriendo en puerto'  + process.env.PORT );
});


