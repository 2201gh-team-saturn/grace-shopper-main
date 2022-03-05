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
      include: [Room]
    });

    res.status(200).send(cartById);
  } catch (error) {
    next(error);
  }
});

// router.put('/cart/:id/decreaseQuantity', async(req, res, next) => {
//   try{
//     const cartId = req.params.id;
//     const {cartItemId} = req.body;
//     const decreaseRoomQty = await shopping_carts.findOne({
//       where: {
//         cartId: cartId,
//         cartItemId: cartItemId
//       }
//      });
//     //  if (){
       
//     //  }
//   } catch(error){
//     next(error)
//   }
// })

router.delete('/cart/:id', async (req, res, next) => {
  try {
    // console.log(req.body)
    const { cartId, cartItemId } = req.body;
    const cartAndCartItemToBeDeleted = await shopping_cart.findOne({
      where: {
        cartId: cartId,
        cartItemId: cartItemId
      }
     });
    //  const totalQty = ;
     await cartAndCartItemToBeDeleted.destroy();
    res.status(400).send(cartAndCartItemToBeDeleted);
  } catch (error) {
    next(error);
  }
});




module.exports = router; 