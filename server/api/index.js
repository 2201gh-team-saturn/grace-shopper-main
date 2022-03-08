const router = require('express').Router()

router.use('/', require('./users'))
router.use('/', require('./rooms'))
router.use('/', require('./experiences'))
router.use('/', require('./cart'))
router.use('/', require('./cartItem'))
router.use('/', require('./reviews'))
router.use('/', require('./reservations'))
router.use('/', require('./themes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
