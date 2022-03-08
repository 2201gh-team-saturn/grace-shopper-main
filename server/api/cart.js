const express = require('express');
const router = express.Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem');
const Room = require('../db/models/Room');
const {
  models: { User },
} = require('../db');

// JOE CR: This can and should be centralized in its own file and imported when needed.
// Love it though!
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
    // JOE CR: I don't think this query is necessary, and also ends up with some really redundant data.
    // Let's discuss!
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
    // JOE CR: I dunno about this findOrCreate ... what is the purpose? To make sure
    // there is not a second cart made for the same user? I don't think this achieves that.
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
router.delete('/cart', requireToken, async (req, res, next) => {
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
      // JOE CR: Can you call destroy on an array of Sequelize instances? Are we sure this is working?
      await cartItemsToBeDeleted.destroy();
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router;

//==================================
//Cart Item schtuff
// JOE CR: I was promised schtuff but I see no schtuff. D: