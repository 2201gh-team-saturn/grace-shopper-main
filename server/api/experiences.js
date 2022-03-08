const router = require('express').Router()
const Experience = require('../db/models/Experience')
const Room = require('../db/models/Room');
const { requireToken, isEmployee} = require('./security');
const User = require('../db/models/User');

// api/

router.get('/experiences' ,async (req, res, next) => {
  try {
    const experiences = await Experience.findAll();
    res.json(experiences);
  } catch (error) {
    console.error(
      `so.... I couldn't find any experiences and I think it's your fault check your api route`
    );
    next(error);
  }
})

router.get('/experiences/:id', async (req, res, next) => {
  try {
		const experience = await Experience.findByPk(req.params.id, {
			include: [{ model: Room }],
		});
		res.json(experience);
	} catch (error) {
    console.error('cant find that room id!')
		next(error);
	}
});

router.post('/experiences', requireToken, isEmployee, async (req, res, next) => {
  try {
    const [newExperience, created] = await Experience.findOrCreate({
      where: {
        name: req.body.name,
      },
    });
    if (created) {
      res.status(201).send(newExperience);
    }
    res.status(409).send('youre experienced enough');
  } catch (error) {
    console.error('your post experience route is broken', error);
    next(error);
  }
});

router.delete('/experiences/:id', requireToken, isEmployee, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const experience = await Experience.findByPk(req.params.id);
    experience.destroy();
    res.send(experience);
  } catch (error) {
    console.error('cant unlive this experience');
    next(error);
  }
});

router.put('/experiences/:id', requireToken, isEmployee, async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Unauthorized');
    }
    const experienceToUpdate = await Experience.findByPk(req.params.id);
    if (experienceToUpdate) {
      res.status(201).send(await experienceToUpdate.update(req.body));
    } else {
      res.status(404).send('experience does not exist');
    }
  } catch (error) {
    console.error(
      'hey! you made a mistake with your experience put route'
    );
    next(error);
  }
});

module.exports = router;
