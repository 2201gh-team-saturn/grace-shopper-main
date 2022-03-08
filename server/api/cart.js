const express = require('express');
const router = express.Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const Room = require('../db/models/Room');
const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const userCart = await CartItem.findAll({
      where: {
        cartId: cart.id,
      },
      include: [Cart, Room],
    });
    res.send(userCart);
  } catch (err) {
    next(err);
  }
});

router.post('/cart/:id', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const [newCart, created] = await Cart.findOrCreate({
      where: {
        id: req.body.id,
        totalQuanitity: req.body.totalQuanitity,
      },
    });
    if (created) {
      res.status(201).send(newCart);
    }
    res.status(409).send('not today');
  } catch (error) {
    console.error('your post cart route is broken', error);
    next(error);
  }
});

router.put('/cart', async (req, res, next) => {
  try {
    let cartItem = await CartItem.findByPk(req.body.id);
    cartItem.numberOfNights++;
    await cartItem.save();
    res.json(cartItem);
  }
  catch (err) {
    next(err);
  }
});

router.put('/cart', async (req, res, next) => {
  try {
    console.log('hey',req.body.id)
    let cartItem = await CartItem.findOne({
      where: { id: req.body.id}
    }
    );
    console.log('look',cartItem)
    cartItem.numberOfNights--;
    await cartItem.save();
    res.json(cartItem);
  }
  catch (err) {
    next(err);
  }
});

router.delete('/cart/:id', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cart = await Cart.findByPk(req.params.id);
    cart.destroy();
    res.send(cart);
  } catch (error) {
    console.error('you break it you buy it');
    next(error);
  }
});

module.exports = router;
