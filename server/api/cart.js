
const express = require('express');
const router = express.Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem')
const Room = require('../db/models/Room')
const { models: { User },} = require('../db');
//

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
    const userCart = await CartItem.findAll({
      where: {
        cartId: req.user.id
      },
      include: [Room]
    });
    res.send(userCart);
  } catch (err) {
    next(err)
  }
})

module.exports = router; 