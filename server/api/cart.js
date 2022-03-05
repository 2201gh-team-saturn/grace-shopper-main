const express = require('express');
const router = express.Router();
const Cart = require('../db/models/Cart');
const CartItem = require('../db/models/CartItem')
const Room = require('../db/models/Room')

/* mounted on /api */
// router.get('/cart', async (req, res, next) => {
//   try {
//     const cartItems = await Cart.findAll({
//       include: [CartItem]
//     });
//     res.status(200).send(cartItems);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/cart/:id', async (req, res, next) => {
  try {
    //maybe find or create
    const cartId = req.params.id;
    const cartById = await CartItem.findAll({
      where: {
        cartId: cartId
      },
      include: [Room, Cart]
    });

    res.status(200).send(cartById);
  } catch (error) {
    next(error);
  }
});

// router.post('/cart/:id', async (req, res, next) => {
//   try {
//     const cartId = req.params.id;
//     const { cartItemId } = req.body;
//     const cartItem = await CartItem.findOne({
//       where: {
//         cartId: cartId,
//         cartItemId: cartItemId
//       }, include: [Cart]
//     });
//     let totalCartQty = cartItem.carts.totalQuantity;
//     let numberOfNights = cartItem.numberOfNights
//     if (numberOfNights > 0) {
//       numberOfNights--;
//       totalCartQty--;
//       await cartItem.save();
//     } else {
//       res.status(404).send('Item not found in cart')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/cart/:id', async (req, res, next) => {
  try {
    // const doesProjectExist = await Project.findOne({
    //   where: {
    //     title: req.body.title,
    //   },
    // });

    const updateCart = Cart.findOrCreate({
      where: {}
    })
    if (!doesProjectExist) {
      const newProject = await Project.create(req.body);
      res.status(201).send(newProject);
    } else {
      res.status(409).send('Project already exist');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/cart/:id', async (req, res, next) => {
  try {
    // console.log(req.body)
    const { cartId, cartItemId } = req.body;
    const cartItemToBeDeleted = await CartItem.findOne({
      where: {
        cartId: cartId,
        cartItemId: cartItemId
      }
    });
    let totalCartQty = cartItemToBeDeleted.carts.totalQuantity;
    let itemQty = cartItemToBeDeleted.numberOfNights;
    totalCartQty - itemQty;
    await cartItemToBeDeleted.destroy();
    res.status(400).send(cartItemToBeDeleted);
  } catch (error) {
    next(error);
  }
});




module.exports = router; 