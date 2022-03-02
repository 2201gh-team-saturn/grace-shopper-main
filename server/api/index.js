const router = require('express').Router()
module.exports = router

router.use('/experiences', require('./experiences'))
router.use('/users', require('./users'))
router.use('/', require('./rooms'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
