

console.log('DB_URI:', process.env.DB_URI);  // Verifica si la URL de MongoDB se está leyendo correctamente

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');


// Crear la app de Express
const app = express();

const authRoutes = require('../routes/auth');

app.use('/auth', authRoutes);

const shopRoutes = require('../routes/shop');
app.use('/api', shopRoutes);


// Configurar middleware
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Para habilitar CORS

// Conectar a MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a MongoDB exitosa!");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB: ", error);
  });

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
