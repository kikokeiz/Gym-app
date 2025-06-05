const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  day: { type: String, required: true },
  minutes: { type: Number, required: true, min: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // para asociar al usuario
});

module.exports = mongoose.model('Workout', workoutSchema);
