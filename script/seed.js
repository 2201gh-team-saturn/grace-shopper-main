'use strict'

const {db, models: {User} } = require('../server/db')

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
    User.create({ username: 'Leah', password: '13579', type: 'employee'}),
    User.create({ username: 'Tedi', password: '2468', type: 'guest'}),
    User.create({ username: 'Zuma', password: 'BallIsLife', type: 'guest'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

 // Creating Rooms
  const rooms = await Promise.all([
    Room.create({ name: 'Moon Room', description: 'Enjoy a night sleeping on the softest clouds enjoying a 360 degree view of the moon in all her glory. Add a whole new meaning to the phrase "Goodnight Moon" in our one of a kind suite.', price: 130.00, imageUrl: 'https://images.unsplash.com/photo-1518352724948-729151797553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1vb24lMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60', available: true, category: 'Astral' }),
    Room.create({ name: 'Das Bergzimmer', description: `Enjoy a night like no other in our mountain top open air room that will make you feel like you're in the Swiss Alps. This room features our state of the art "Frisches Luft" technology that will bring the crisp Alpen air to make your stay refreshing and inspiring, with views you won't believe.`, price: 200.00, imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60', available: true, category: 'Outdoors' }),
    Room.create({ name: `The Queens Cabin`, description: `Come and experience the perfect marriage of luxury and rustic charm. This room features the very couch Princess Diana once spilled tea on and a chandelier from King Louis XIV's guest bath that he never noticed went missing, all featured in a craftsman style cabin that will have you feeling like you're in an issue of vogue living.`, price: 150.00, imageUrl: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60', available: true, category: 'Rustic' })
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
