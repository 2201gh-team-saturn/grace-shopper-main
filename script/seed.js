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
  }),
  Room.create({
    name: 'Stanley Suite',
    description: 
    "This is just your average not-haunted hotel room. Nothing themed about this room. A great place to stay for the whole family.",
    price: 23.70,
    imageUrl: 'https://images.weserv.nl/?url=https://the-take.com/images/uploads/screenprism/_constrain-1080w/Green-Bathroom.jpg&output=jpg',
    available: true,
    category: 'haunted'
    //alternatively, category: spooky
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
    Review.create({
      review_text: "I had a wonderful time in the Cave Suite. Our spelunking experience was phenomenal as well! It was fun to play hide an seek with my husband in the cave system. He's been the hide and seek champion for 3 straight days now!"
    }),
    Review.create({
      review_text: "I loved staying in the Stanley Suite while I was writing my novel. It's a great place for the whole family too. After all, all work and no play makes Jack a dull boy."
    })
  ])
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    rooms: {
      caveSuite: rooms[0],
      stanleySuite: rooms[1]
    },
    experiences: {
      
    },
    reviews: {
      caveReview: reviews[0],
      stanleyReview:reviews[1]
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
