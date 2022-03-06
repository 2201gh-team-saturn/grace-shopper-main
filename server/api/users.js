const router = require('express').Router()
const { models: { User }} = require('../db')


// const isAdmin = (req, res, next) => {
//   if (req.user.type === 'employee') {
//       return res.status(403).send('Permission denied');
//   } else {
//       next();
//   }
// };

router.get('/users', async (req, res, next) => {
  try {

  //   const auth = await axios.get("/api/auth", {
  //     headers: {
  //         authorization: token,
  //     },
  // });

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
