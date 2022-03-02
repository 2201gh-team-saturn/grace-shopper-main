
const {db, models: {User, Room}} = require('../server/db')

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


  const rooms = await Promise.all([
  Room.create({
    name: 'Zen Room',
    description: "The Zen room provides guests with the most relaxing experience. Guests will have a chance to separate themselves from disruption and be completely at peace.",
    price: 300,
    imageUrl: "https://media.istockphoto.com/photos/luxurious-bedroom-interior-with-messy-bed-and-armchair-in-holiday-or-picture-id1326393613?b=1&k=20&m=1326393613&s=170667a&w=0&h=gEvTszklSpD_l0LmkGHoehehXLcOJs1q-Sar5lwJhE0=",
    available: true,
    category: 'nature'
  }),
  Room.create({
    name: 'Fantasy Room',
    description: "Ready to be feel like you're in wonderland? Fantasy room will let all your dreams come true.",
    price: 250,
    imageUrl: "https://media.istockphoto.com/photos/the-clock-tower-viewpoint-picture-id1135502050?b=1&k=20&m=1135502050&s=170667a&w=0&h=7RHt0TMvSPIHErTncxstO1dhL9IypWRvmWK0i7xy5E0=",
    available: true,
    category: 'fantasy'
  }),
  Room.create({
    name: 'Space Room',
    description: 'Ever wondered what it feels like to be an astronaut? Space room can provide you that experience!',
    price: 300,
    imageUrl: "https://flh.ca/media/73137/flh_20180612-luxuryspace-1.jpg?anchor=center&mode=crop&width=1200&height=600&rnd=132830010110000000",
    available: true,
    category: 'space'
  }),
  Room.create({
    name: 'Dragon Room',
    description: 'Welcome to our most popular room, the Dragon Room. Guests will have access to ride our friendly dragon after purchasing the experience on our site.',
    price: 550,
    imageUrl: "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2019%2F05%2F804-Drogon-and-Rhaegal-fly-at-Dragonstone.jpg",
    available: true,
    category: 'medieval'
  })
])
  await users[0].setRoom(rooms[0])
  await users[1].setRoom(rooms[1])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    },
    rooms: {
      room1: rooms[0],
      room2: rooms[1],
      room3: rooms[2],
      room4: rooms[3],
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
