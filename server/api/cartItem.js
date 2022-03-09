const router = require('express').Router();
const CartItem = require('../db/models/CartItem');
const User = require('../db/models/User');
const Cart = require('../db/models/Cart');

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

router.post('/cart', requireToken, async (req, res, next) => {
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

//delete specific item
router.delete('/cart', async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.body.id);
    cartItem.numberOfNights

   // let findCart = await CartItem.findByPk(req.params.id, {include: [Cart]})
    // let cartId = findCart.cart.dataValues.id
    console.log('this is cartItem',cartItem)
    console.log('this is cartId',cartItem.cartId)

    let cartTotalQuantity = await Cart.findByPk(cartItem.cartId); 
    cartTotalQuantity.totalQuantity -= cartItem.numberOfNights;
    // console.log(cartTotalQuantity)
    await cartTotalQuantity.save()
    cartItem.destroy();

    res.send(cartItem);
  } catch (error) {
    console.error('if you booked that room youre keepin it darnit');
    next(error);
  }
});

module.exports = router;
