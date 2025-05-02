const Product = require('../models/Product');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: '❌ Error al obtener productos' });
  }
};

module.exports = { getAllProducts };
