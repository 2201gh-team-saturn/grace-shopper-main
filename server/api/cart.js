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

router.post('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const [newCart, created] = await Cart.findOrCreate({
      where: {
        userId: req.user.id,
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

//for updating the cart itself
router.put('/cart/increase/:id', async (req, res, next) => {
  try {
    let cartItem = await CartItem.findByPk(req.params.id);
    cartItem.numberOfNights++;
    await cartItem.save();
    res.json(cartItem);
  }
  catch (err) {
    next(err);
  }
});

router.put('/cart/decrease/:id', async (req, res, next) => {
  try {
    let cartItem = await CartItem.findByPk(req.params.id);
    cartItem.numberOfNights--;
    await cartItem.save();
    res.json(cartItem);
  }
  catch (err) {
    next(err);
  }
});

//for updating the cart item
router.put('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cartItemToUpdate = await CartItem.findByPk(req.body.id);
    if (cartItemToUpdate) {
      res.status(201).send(await cartItemToUpdate.update(req.body));
    } else {
      res.status(404).send('Cart Item does not exist');
    }
  } catch (error) {
    console.error(
      'Hey! Hey you! you made a mistake with your cart Item put route!'
    );
    next(error);
  }
});

//to delete all cart items
router.delete('/cart/checkout', requireToken, async (req, res, next) => {
  try {
    // if (!req.user) {
    //   throw new Error('Unauthorized');
    // }
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id
      },
    });
    const cartItemsToBeDeleted = await CartItem.findAll({
      where: {
        cartId: cart.id
      }
    });
    if (!cartItemsToBeDeleted) {
      res.sendStatus(400);
    } else {
      await cartItemsToBeDeleted.destroy();
      res.sendStatus(204);
    }
  } catch (err) {
    next(err)
  }
})

//I feel like this isnt working
//add item to cart
router.post('/cart/addToCart/:id', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    console.log('This is hitting')
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const created = await CartItem.findOne({
      where: {
        roomId: req.params.id,
        cartId: cart.id
      },
    });
    console.log("CREATED RIGHT HERE", created)
    if (created) {
      created.numberOfNights += req.body.numberOfNights;
      created.numberOfNights ++;
      await created.save();
      res.status(201).json(created);
    }
    let newCartItem = await CartItem.create({
      where: {
        roomId: req.params.roomId,
        cartId: cart.id,
        // numberOfNights: req.body.numberOfNights,
      }
  }
    )
    res.status(200).send(newCartItem);
  } catch (error) {
    console.error('your post cartItem route is broken', error);
    next(error);
  }
});


module.exports = router;
