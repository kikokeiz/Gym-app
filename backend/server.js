const express = require('express');
const authRoutes = require('./src/routes/authRoutes');  // Importar correctamente
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // Cambia al puerto/host de tu frontend
  credentials: true,
}));
app.use(express.json());

// Ruta básica para verificar que el servidor está activo
app.get('/', (req, res) => {
  res.send('Servidor está activo');
});

// Configuración de rutas protegidas
const protectedRoutes = require('./src/routes/protectedRoutes');
app.use('/api', protectedRoutes); // accederás a /api/profile

// Configuración de rutas de progreso
const progressRoutes = require('./src/routes/progressRoutes');
app.use('/api/progress', progressRoutes);

// Configuración de rutas de subscripciones y productos
const shopRoutes = require('./src/routes/shopRoutes');
app.use('/api/subscriptions', shopRoutes);
app.use('/api/products', shopRoutes);


// Verificación de la URI de la base de datos
console.log(process.env.DB_URI);  // Verifica que la URL esté cargada correctamente

// Rutas de autenticación
app.use('/api/auth', authRoutes);  

const port = 5000; // Cambia el puerto si es necesario

// Conexión a la base de datos y puesta en marcha del servidor
mongoose.connect(process.env.DB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto ${port}`);
    });
  })
  .catch(err => console.error('Error al conectar con MongoDB:', err));
