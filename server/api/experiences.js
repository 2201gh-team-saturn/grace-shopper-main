const router = require('express').Router()
const { Experience } = require('../db')
const { Room } = require('../db')

// api/experiences
router.get('/', async (req, res, next) => {
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

router.get('/:id', async (req, res, next) => {
	try {
		const experience = await Experience.findByPk(req.params.id, {
			include: [{ model: Room }],
		});
		res.json(experience);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
