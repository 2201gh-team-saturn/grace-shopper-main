const router = require('express').Router();
const CartItem = require('../db/models/CartItem');
const User = require('../db/models/User');

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
    });
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});
