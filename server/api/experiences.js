const router = require('express').Router()
const { Experience } = require('../db')
const { Room } = require('../db')

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