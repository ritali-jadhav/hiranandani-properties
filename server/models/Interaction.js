const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  type: { type: String, required: true }, // view, like, enquiry
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interaction', interactionSchema);