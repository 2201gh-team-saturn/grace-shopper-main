
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
      // where: {
      //   totalNumOfDays: req.body.totalNumOfDays,
      //   roomId: req.body.roomId,
      //   userId: req.user.id,
      // },
      include: [User, Room]
    });
    res.status(200).send(getAllReservations);
  } catch (error) {
    next(error);
  }
});

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

module.exports = router;
