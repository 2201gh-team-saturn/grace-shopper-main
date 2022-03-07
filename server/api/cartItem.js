const router = require('express').Router();
const CartItem = require('../db/models/CartItem');
const User = require('../db/models/User');
const Cart = require('../db/models/Cart');
const Room = require('../db/models/Room');

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

router.get('/cartItems', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cartItems = await CartItem.findAll({
      where: {
        cartId: req.user.id,
      },
      include: [Cart, Room]
    });
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

router.post('/cartItems', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const [newCartItem, created] = await CartItem.findOrCreate({
      where: {
        id: req.body.id,
        numberOfNights: req.body.numberOfNights,
      },
    });
    if (created) {
      res.status(201).send(newCartItem);
    }
    res.status(409).send('nope');
  } catch (error) {
    console.error('your post cartItem route is broken', error);
    next(error);
  }
});

router.delete('/cartItems', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cartItem = await CartItem.findByPk(req.params.id);
    cartItem.destroy();
    res.send(cartItem);
  } catch (error) {
    console.error('if you booked that room youre keepin it darnit');
    next(error);
  }
});

module.exports = router;
