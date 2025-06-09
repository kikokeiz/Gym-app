const mongoose = require('mongoose');


const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: Number,
  reps: Number,
  exercise: String
});

module.exports = mongoose.model('Progress', progressSchema);
