const express = require('express');
const router = express.Router();
const Reservation = require('../db/models/Reservation');

/* mounted on /api */
router.get('/reservations', async (req, res, next) => {
  try {
    const getAllReservations = await Reservation.findAll();
    res.status(200).send(getAllReservations);
  } catch (error) {
    next(error);
  }
});

router.get('/reservations/:id', async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const getReservationById = await Reservation.findByPk(reservationId); 
    res.status(200).send(getReservationById);
  } catch (error) {
    next(error);
  }
});

router.post('/reservations', async (req, res, next) => {
  try {
    const doesReservationExist = await Reservation.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!doesReservationExist) {
      const newReservation = await Reservation.create(req.body);
      res.status(201).send(newReservation);
    } else {
      res.status(404).send('Reservation already exists in our database');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/reservations/:id', async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findByPk(reservationId);
    if (reservation) {
      res.status(201).send(await reservation.update(req.body));
    } else {
      res.status(404).send('Reservation does not exist');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/reservations/:id', async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const reservationToBeDeleted = await Reservation.findByPk(reservationId);

    if (!reservationToBeDeleted) {
      res.sendStatus(400);
    } else {
      await reservationToBeDeleted.destroy();
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
