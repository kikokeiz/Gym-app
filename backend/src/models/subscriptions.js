// models/Subscription.js
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  startDate: { type: Date },
  endDate: { type: Date }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
