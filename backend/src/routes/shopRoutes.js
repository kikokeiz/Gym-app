// routes/shop.js
const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Subscription = require('../models/subscriptions');
const auth = require('../middleware/auth');

// Obtener estado de membresía
router.get('/', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    res.json(subscription || { status: 'inactive' });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la membresía' });
  }
});

// Comprar o renovar membresía (30 días)
router.post('/subscriptions', auth, async (req, res) => {
  try {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    let subscription = await Subscription.findOne({ user: req.user.id });

    if (subscription) {
      subscription.startDate = startDate;
      subscription.endDate = endDate;
      subscription.status = 'active';
    } else {
      subscription = new Subscription({
        user: req.user.id,
        startDate,
        endDate,
        status: 'active'
      });
    }

    await subscription.save();
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la membresía' });
  }
});

// Obtener productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Comprar producto
router.post('/purchase', auth, async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product || product.stock <= 0) {
      return res.status(400).json({ message: 'Producto no disponible' });
    }

    product.stock -= 1;
    await product.save();

    res.json({ message: 'Compra realizada', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al procesar la compra' });
  }
});

module.exports = router;
