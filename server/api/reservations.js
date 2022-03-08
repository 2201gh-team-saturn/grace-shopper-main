const express = require('express');
const router = express.Router();
const Reservation = require('../db/models/Reservation');
const { models: { User }, } = require('../db');
const Room = require('../db/models/Room');

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

/* mounted on /api */
router.get('/reservations', requireToken, async (req, res, next) => {
  try {
    if (req.user.type !== 'employee') {
      throw new Error('Unauthorized');
    }
    const getAllReservations = await Reservation.findAll({
      include: [User, Room]
    });
    res.status(200).send(getAllReservations);
  } catch (error) {
    next(error);
  }
});

// router.get('/reservations/:id', async (req, res, next) => {
//   try {
//     const reservationId = req.params.id;
//     const getReservationById = await Reservation.findByPk(reservationId); 
//     res.status(200).send(getReservationById);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/reservations', requireToken, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const [newReservation, created] = await Reservation.findOrCreate({
      where: {
        totalNumOfDays: req.body.totalNumOfDays,
        roomId: req.body.roomId,
        userId: req.user.id,
      },
    });
    if (created) {
      res.status(201).send(newReservation);
    }
    res.status(409).send("you've reserved enough");
  } catch (error) {
    console.error('your post reservation route is broken', error);
    next(error);
  }
});

// router.put('/reservations/:id', async (req, res, next) => {
//   try {
//     const reservationId = req.params.id;
//     const reservation = await Reservation.findByPk(reservationId);
//     if (reservation) {
//       res.status(201).send(await reservation.update(req.body));
//     } else {
//       res.status(404).send('Reservation does not exist');
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/reservations/:id', async (req, res, next) => {
//   try {
//     const reservationId = req.params.id;
//     const reservationToBeDeleted = await Reservation.findByPk(reservationId);

//     if (!reservationToBeDeleted) {
//       res.sendStatus(400);
//     } else {
//       await reservationToBeDeleted.destroy();
//     }
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;
