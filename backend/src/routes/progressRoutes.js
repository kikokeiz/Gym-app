const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware para proteger rutas
const Progress = require('../models/progress');

// GET progreso del usuario
router.get('/', auth, async (req, res) => {
  try {
    const progressData = await Progress.find({ user: req.user.id }).sort({ date: -1 });
    res.json(progressData);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener progreso' });
  }
});

// POST nuevo progreso
router.post('/', auth, async (req, res) => {
  const { weight, reps, exercise, date } = req.body;
  try {
    const newProgress = new Progress({
      user: req.user.id,
      weight,
      reps,
      exercise,
      date: date || Date.now()
    });
    const savedProgress = await newProgress.save();
    res.status(201).json(savedProgress);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar progreso' });
  }
});

module.exports = router;
