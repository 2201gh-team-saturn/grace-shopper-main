const express = require('express');
const router = express.Router();
const Cart = require('../db/models/cart');

/* mounted on /api */
router.get('/cart', async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll();
    res.status(200).send(cartItems);
  } catch (error) {
    next(error);
  }
});

router.get('/cart/:id', async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const cartItemById = await Cart.findByPk(cartItemId);
    res.status(200).send(getCartItemById);
  } catch (error) {
    next(error);
  }
});


router.delete('/cart/:id', async (req, res, next) => {
  try {
    const cartItemId = req.params.id;
    const itemToBeDeleted = await Cart.findByPk(cartItemId);

    if (!itemToBeDeleted) {
      res.sendStatus(400);
    } else {
      await itemToBeDeleted.destroy();
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router; 