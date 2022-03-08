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

//change to put route
router.post('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const [newCart, created] = await Cart.findOrCreate({
      where: {
        id: req.body.id,
        totalQuantity: req.body.totalQuantity,
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

router.put('/cart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cartToUpdate = await Cart.findByPk(req.body.id);
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


// router.delete('/cart', requireToken, async (req, res, next) => {
//   try {
//     if (!req.user) {
//       throw new Error('Unauthorized');
//     }
//     const cart = await Cart.findByPk(req.body.cartId);
//     cart.destroy();
//     res.send(cart);
//   } catch (error) {
//     console.error('you break it you buy it');
//     next(error);
//   }
// });

//clear entire cart after checkout
router.delete('/cart/checkout', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
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
    }
  } catch (err) {
    next(err)
  }
})

//add item to cart
router.post('/cart/addToCart', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const created = await CartItem.findOne({
      where: {
        roomId: req.body.roomId,
        cartId: cart.id
        // numberOfNights: req.body.numberOfNights,
      },
    });
    if (created) {
      // created.numberOfNights += req.body.numberOfNights;
      created.numberOfNights ++;
      await created.save();
      res.status(201).json(created);
    }
    let newCartItem = await CartItem.create({
      where: {
        roomId: req.body.roomId,
        cartId: cart.id,
        // numberOfNights: req.body.numberOfNights,
      }
    })
    res.status(200).send(newCartItem);
  } catch (error) {
    console.error('your post cartItem route is broken', error);
    next(error);
  }
});


module.exports = router;

//==================================
//Cart Item schtuff
