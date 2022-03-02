const router = require('express').Router()

router.use('/', require('./users'))
router.use('/', require('./rooms'))
router.use('/', require('./experiences'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
