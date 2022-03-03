const express = require('express');
const router = express.Router();
const Room = require('../db/models/Room');

/* mounted on /api */
router.get('/rooms', async (req, res, next) => {
  try {
    const getAllRooms = await Room.findAll();
    res.status(200).send(getAllRooms);
  } catch (error) {
    next(error);
  }
});

router.get('/rooms/:id', async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const getRoomById = await Room.findByPk(roomId); 
    res.status(200).send(getRoomById);
  } catch (error) {
    next(error);
  }
});

router.post('/rooms', async (req, res, next) => {
  try {
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

router.put('/rooms/:id', async (req, res, next) => {
  try {
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

router.delete('/rooms/:id', async (req, res, next) => {
  try {
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
