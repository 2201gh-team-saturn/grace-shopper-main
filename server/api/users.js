const router = require('express').Router()
const { models: { User }} = require('../db')

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

router.get('/users', async (req, res, next) => {
  try{
  if (!req.user) {
    throw new Error('Unauthorized');
  }
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'type']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
