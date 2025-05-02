const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String, // URL de imagen
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
