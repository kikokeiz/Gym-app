const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/progress');

// Crear nuevo progreso
router.post('/', auth, async (req, res) => {
  try {
    const { exercise, weight, reps } = req.body;

    const newProgress = new Progress({
      user: req.user.id,
      exercise,
      weight,
      reps
    });

    await newProgress.save();
    res.status(201).json({ msg: 'Progreso guardado', progress: newProgress });
  } catch (err) {
    res.status(500).json({ msg: 'Error al guardar progreso' });
  }
});

// Obtener todos los progresos del usuario
router.get('/', auth, async (req, res) => {
  try {
    const progresses = await Progress.find({ user: req.user.id }).sort({ date: -1 });
    res.json(progresses);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener progresos' });
  }
});

module.exports = router;
