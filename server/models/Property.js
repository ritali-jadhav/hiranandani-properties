const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true }, // 2BHK, 3BHK, Shop
  size: { type: Number, required: true }, // in sq ft
  bedrooms: { type: Number },
  imageUrl: { type: String },
  status: { type: String, default: 'available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);