const router = require('express').Router()
const { models: { User }} = require('../db')
const { requireToken, isEmployee} = require('./security');

router.get('/users', requireToken, isEmployee, async (req, res, next) => {
  try {
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
