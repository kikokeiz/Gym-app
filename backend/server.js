// /server.js
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');  // Importar correctamente
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const protectedRoutes = require('./src/routes/protectedRoutes');
app.use('/api', protectedRoutes); // accederás a /api/profile

const progressRoutes = require('./src/routes/progressRoutes');
app.use('/api/progress', progressRoutes);




console.log(process.env.DB_URI);  // Verifica que la URL esté cargada correctamente

// Rutas de autenticación (aquí usas la variable authRoutes)
app.use('/auth', authRoutes);  //

const port = 5000; // Cambia el puerto si es necesario
// Conexión a la base de datos
mongoose.connect(process.env.DB_URI)
  .then(() => {
    app.listen(5000, () => console.log('Servidor corriendo en puerto 5000'));
  })
  .catch(err => console.error('Error al conectar con MongoDB:', err));
