'use strict'

const { db, models: { User, Room, Experience, Review, Reservation } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  // Creating Rooms
  const rooms = await Promise.all([
    Room.create({
      name: 'Cave Suite',
      description: 
      'Ever wanted to spend a night in a cave? Come explore what mysteries exist in this naturally air conditioned suite! The cave suite offers a large stone fireplace and geothermal jacuzzi.',
      price: 98.50,
      imageUrl: 'https://www.masseriatorrecoccaro.com/immagini/sistema/news/foto/foto_267_7.jpg',
      available: true,
      category: 'natural'
  })
  ])
  console.log(`seeded ${rooms.length} rooms`)
  console.log(`seeded successfully`)

  // Creating Experiences
  const experiences = await Promise.all([

  ])
  console.log(`seeded ${experiences.length} experiences`)
  console.log(`seeded successfully`)

  // Creating Reviews
  const reviews = await Promise.all([

  ])
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    rooms: {

    },
    experiences: {

    },
    reviews: {

    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
