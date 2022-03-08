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

router.post('/cartItem', requireToken, async (req, res, next) => {
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

router.delete('/cartItem/:id', requireToken, async (req, res, next) => {
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
