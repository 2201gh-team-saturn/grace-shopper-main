const express = require('express');
const router = express.Router();
const Theme = require('../db/models/Theme');

/* mounted on /api */
router.get('/themes', async (req, res, next) => {
  try {
    const getAllThemes = await Theme.findAll();
    res.status(200).send(getAllThemes);
  } catch (error) {
    next(error);
  }
});

router.get('/themes/:id', async (req, res, next) => {
  try {
    const ThemeId = req.params.id;
    const getThemeById = await Theme.findByPk(ThemeId); 
    res.status(200).send(getThemeById);
  } catch (error) {
    next(error);
  }
});

router.post('/themes', async (req, res, next) => {
  try {
    const doesThemeExist = await Theme.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!doesThemeExist) {
      const newTheme = await Theme.create(req.body);
      res.status(201).send(newTheme);
    } else {
      res.status(404).send('Theme already exists in our database');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
