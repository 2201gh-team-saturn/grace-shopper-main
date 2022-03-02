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
    User.create({ username: 'Leah', password: '13579', type: 'employee'}),
    User.create({ username: 'Tedi', password: '2468', type: 'guest'}),
    User.create({ username: 'Zuma', password: 'BallIsLife', type: 'guest'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  // Creating Rooms
  const rooms = await Promise.all([
    Room.create({ 
      name: 'Moon Room', 
    description: 'Enjoy a night sleeping on the softest clouds enjoying a 360 degree view of the moon in all her glory. Add a whole new meaning to the phrase "Goodnight Moon" in our one of a kind suite.', 
    price: 130.00, imageUrl: 'https://images.unsplash.com/photo-1518352724948-729151797553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1vb24lMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 
    available: true, 
    category: 'Astral' }),
        
    Room.create({ 
      name: 'Das Bergzimmer', 
                 description: `Enjoy a night like no other in our mountain top open air room that will make you feel like you're in the Swiss Alps. This room features our state of the art "Frisches Luft" technology that will bring the crisp Alpen air to make your stay refreshing and inspiring, with views you won't believe.`, 
                 price: 200.00, 
                 imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 
                 available: true, 
                 category: 'Outdoors' }),
      
    Room.create({ 
      name: `The Queens Cabin`, 
                 description: `Come and experience the perfect marriage of luxury and rustic charm. This room features the very couch Princess Diana once spilled tea on and a chandelier from King Louis XIV's guest bath that he never noticed went missing, all featured in a craftsman style cabin that will have you feeling like you're in an issue of vogue living.`, 
                 price: 150.00, 
                 imageUrl: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60', 
                 available: true, 
                 category: 'Rustic' }),
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
}),
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

  console.log(`seeded ${rooms.length} rooms`)
  console.log(`seeded successfully`)

  // Creating Experiences
  const experiences = await Promise.all([
    Experience.create({ name: 'Moon Walk', price: 500.00, description: `Are you the type of person who has "enjoys long walks on the beach" on their dating profile? Then why not step it up with a long walk on the Moon? We promise you're dating profile will suddenly be much more interesting.`, imageUrl: 'https://images.unsplash.com/photo-1446941303752-a64bb1048d54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9vbiUyMHdhbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'}),
    Experience.create({ name: 'Alpen Wandern', price: 20.00, description: `Find yourself atop Alpen ridges with cascading views of the multitude of lakes and green fields for kilometers. If you are lucky or bring snacks with you there is a good chance you can pet a Swiss cow on your outing as well!`, imageUrl: 'https://images.unsplash.com/photo-1534764945014-02d68e5680d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFscCUyMGhpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'  }),
    Experience.create({ name: 'Tea With The Queen', price: 100.00, description: `Find yourself atop Alpen ridges with cascading views of the multitude of lakes and green fields for kilometers. If you are lucky or bring snacks with you there is a good chance you can pet a Swiss cow on your outing as well!`, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26pQkNLsjb0PMGG5eUFNIacGdKb50Ck0ZLEzeOFhVRRy7ZoabDoZ1waP94gsNzJDTJXE&usqp=CAU'  })
  ])
  console.log(`seeded ${experiences.length} experiences`)
  console.log(`seeded successfully`)

  // Creating Reviews
  const reviews = await Promise.all([
     Review.create({review_text: `I cannot recomend the The Reverie Resort enough. For our birthday my twin and I came here and while they rode a dragon I was having tea with the queen and her corgies, no one had to compromisee! The range of experience the resort has to offer can truly make everyones dream come true.`}),
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
