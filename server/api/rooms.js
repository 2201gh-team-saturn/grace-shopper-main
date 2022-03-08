const express = require('express');
const router = express.Router();
const Room = require('../db/models/Room');
const Theme = require('../db/models/Theme');
const { requireToken, isEmployee} = require('./security');

/* mounted on /api */
router.get('/rooms',requireToken, async (req, res, next) => {
  try {
    const getAllRooms = await Room.findAll({
      include: [Theme]
    });
    res.status(200).send(getAllRooms);
  } catch (error) {
    next(error);
  }
});

router.get('/rooms/:id',requireToken, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const getRoomById = await Room.findByPk(roomId, {
      include: [Theme]
    });
    res.status(200).send(getRoomById);
  } catch (error) {
    next(error);
  }
});

router.post('/rooms', requireToken, isEmployee, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const doesRoomExist = await Room.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!doesRoomExist) {
      const newRoom = await Room.create(req.body);
      res.status(201).send(newRoom);
    } else {
      res.status(404).send('Room already exists in our database');
    }
  } catch (error) {
    next(error);
  }
});

router.put('/rooms/:id',requireToken, isEmployee, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const roomId = req.params.id;
    const room = await Room.findByPk(roomId);
    if (room) {
      res.status(201).send(await room.update(req.body));
    } else {
      res.status(404).send('Room does not exist');
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/rooms/:id',requireToken, isEmployee, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const roomId = req.params.id;
    const roomToBeDeleted = await Room.findByPk(roomId);

    if (!roomToBeDeleted) {
      res.sendStatus(400);
    } else {
      await roomToBeDeleted.destroy();
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
