require('dotenv').config();
console.log('DB_URI:', process.env.DB_URI);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const workoutRoutes = require('./routes/workoutsRoutes');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/workouts', workoutRoutes);

// Importar rutas (ajusta las rutas según tu estructura real)
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

// Usar rutas
app.use('/auth', authRoutes);
app.use('/api', shopRoutes);

// Conexión a MongoDB (con opciones actualizadas)
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log("✅ Conexión a MongoDB exitosa!");
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  });

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('API del Gym App funcionando!');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});