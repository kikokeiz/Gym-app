const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// Middleware para autenticar usuario (ejemplo muy básico, ajústalo a tu auth real)
const authMiddleware = (req, res, next) => {
  // Suponemos que tienes req.user con userId
  // En un caso real, deberías validar JWT o sesión
  if (!req.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

// Obtener workouts del usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener workouts' });
  }
});

// Añadir nuevo workout
router.post('/', authMiddleware, async (req, res) => {
  const { day, minutes } = req.body;
  if (!day || typeof minutes !== 'number' || minutes < 0) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  try {
    const workout = new Workout({ day, minutes, userId: req.user._id });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar workout' });
  }
});

module.exports = router;
