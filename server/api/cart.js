const express = require('express');
const router = express.Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const Room = require('../db/models/Room');
const { requireToken, isEmployee} = require('./security');
const {
  models: { User },
} = require('../db');

//for getting the cart and its items
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

// for creating a new cart
router.post('/cart', requireToken, async (req, res, next) => {
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

router.put('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cartToUpdate = await Cart.findByPk(req.body.id); //what am I passing?
    if (cartToUpdate) {
      res.status(201).send(await cartToUpdate.update(req.body));
    } else {
      res.status(404).send('Cart does not exist');
    }
  } catch (error) {
    console.error(
      'hey! you made a mistake with your cart put route'
    );
    next(error);
  }
});


// router.post('/cartItem', requireToken, async (req, res, next) => {
//   try {
//     if (!req.user) {
//       throw new Error('Unauthorized');
//     }
//     const [newCartItem, created] = await CartItem.findOrCreate({
//       where: {
//         id: req.body.id,
//         numberOfNights: req.body.numberOfNights,
//       },
//     });
//     if (created) {
//       res.status(201).send(newCartItem);
//     }
//     res.status(409).send('nope');
//   } catch (error) {
//     console.error('your post cartItem route is broken', error);
//     next(error);
//   }
// });

//to delete a cart item
router.delete('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cartItem = await CartItem.findByPk(req.body.cartId);
    cartItem.destroy();
    res.send(cartItem);
  } catch (error) {
    console.error('if you booked that room youre keepin it darnit');
    next(error);
  }
});

module.exports = router;
