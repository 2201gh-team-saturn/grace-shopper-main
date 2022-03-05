'use strict'
const { db, models: { User, Room, Experience, Review, Reservation, Theme, Cart, CartItem } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')
  try {

    // Creating Users
    const cody = await User.create({ username: 'cody', password: '123' });
    const murphy = await User.create({ username: 'murphy', password: '123' });
    const leah = await User.create({ username: 'Leah', password: '13579', type: 'employee' });
    const tedi = await User.create({ username: 'Tedi', password: '2468', type: 'guest' });
    const zuma = await User.create({ username: 'Zuma', password: 'BallIsLife', type: 'guest' });
    const ladybug = await User.create({ username: 'ladybug@love.com', password: 'happyday', type: 'guest' });
    const successfulBW = await User.create({ username: 'successfulBW@gh.com', password: 'keepinithonest', type: 'employee' });

    // Creating Rooms
    const moonRoom = await Room.create({
      name: 'Moon Room',
      description: 'Enjoy a night sleeping on the softest clouds enjoying a 360 degree view of the moon in all her glory. Add a whole new meaning to the phrase "Goodnight Moon" in our one of a kind suite.',
      price: 130.00,
      imageUrl: 'https://images.unsplash.com/photo-1518352724948-729151797553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fG1vb24lMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
      available: true,
      category: 'space'
    });
    const dasBergzimmer = await Room.create({
      name: 'Das Bergzimmer',
      description: `Enjoy a night like no other in our mountain top open air room that will make you feel like you're in the Swiss Alps. This room features our state of the art "Frisches Luft" technology that will bring the crisp Alpen air to make your stay refreshing and inspiring, with views you won't believe.`,
      price: 200.00,
      imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
      available: true,
      category: 'nature'
    });
    const queensCabin = await Room.create({
      name: `The Queens Cabin`,
      description: `Come and experience the perfect marriage of luxury and rustic charm. This room features the very couch Princess Diana once spilled tea on and a chandelier from King Louis XIV's guest bath that he never noticed went missing, all featured in a craftsman style cabin that will have you feeling like you're in an issue of vogue living.`,
      price: 150.00,
      imageUrl: 'https://images.unsplash.com/photo-1607712617949-8c993d290809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
      available: true,
      category: 'rustic'
    });
    const caveSuite = await Room.create({
      name: 'Cave Suite',
      description:
        'Ever wanted to spend a night in a cave? Come explore what mysteries exist in this naturally air conditioned suite! The cave suite offers a large stone fireplace and geothermal jacuzzi.',
      price: 98.50,
      imageUrl: 'https://www.masseriatorrecoccaro.com/immagini/sistema/news/foto/foto_267_7.jpg',
      available: true,
      category: 'nature'
    });
    const stanleySuite = await Room.create({
      name: 'Stanley Suite',
      description:
        "This is just your average not-haunted hotel room. Nothing themed about this room. A great place to isolate with the whole family.",
      price: 23.70,
      imageUrl: 'https://images.weserv.nl/?url=https://the-take.com/images/uploads/screenprism/_constrain-1080w/Green-Bathroom.jpg&output=jpg',
      available: true,
      category: 'haunted'
      // alternatively, category: spooky
    });
    const zenRoom = await Room.create({
      name: 'Zen Room',
      description: "The Zen room provides guests with the most relaxing experience. Guests will have a chance to separate themselves from disruption and be completely at peace.",
      price: 300,
      imageUrl: "https://media.istockphoto.com/photos/luxurious-bedroom-interior-with-messy-bed-and-armchair-in-holiday-or-picture-id1326393613?b=1&k=20&m=1326393613&s=170667a&w=0&h=gEvTszklSpD_l0LmkGHoehehXLcOJs1q-Sar5lwJhE0=",
      available: true,
      category: 'nature'
    });
    const fantasyRoom = await Room.create({
      name: 'Fantasy Room',
      description: "Ready to be feel like you're in wonderland? Fantasy room will let all your dreams come true.",
      price: 250,
      imageUrl: "https://media.istockphoto.com/photos/the-clock-tower-viewpoint-picture-id1135502050?b=1&k=20&m=1135502050&s=170667a&w=0&h=7RHt0TMvSPIHErTncxstO1dhL9IypWRvmWK0i7xy5E0=",
      available: true,
      category: 'fantasy'
    });
    const spaceRoom = await Room.create({
      name: 'Space Room',
      description: 'Ever wondered what it feels like to be an astronaut? Space room can provide you that experience!',
      price: 300,
      imageUrl: "https://flh.ca/media/73137/flh_20180612-luxuryspace-1.jpg?anchor=center&mode=crop&width=1200&height=600&rnd=132830010110000000",
      available: true,
      category: 'space'
    });
    const dragonRoom = await Room.create({
      name: 'Dragon Room',
      description: 'Welcome to our most popular room, the Dragon Room. Guests will have access to ride our friendly dragon after purchasing the experience on our site.',
      price: 550,
      imageUrl: "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2019%2F05%2F804-Drogon-and-Rhaegal-fly-at-Dragonstone.jpg",
      available: true,
      category: 'fantasy'
    });
    const poolRoom = await Room.create({
      name: 'Pool Room',
      description: 'If the water is calling you, this is the room for you, have access to it at any point in the day',
      price: 350.00,
      imageUrl: 'https://www.digsdigs.com/photos/10-the-most-cool-bedrooms-ever-554x346.jpg',
      available: false,
      category: 'water'
    });
    const shedroom = await Room.create({
      name: 'The Shedroom',
      description: ' Wake up surrounded by Nature',
      price: 350.00,
      imageUrl: 'https://www.digsdigs.com/photos/10-the-most-cool-bedrooms-ever1-554x373.jpg',
      available: true,
      category: 'nature'
    });
    const artistLense = await Room.create({
      name: 'An Artist Lense',
      description: 'Come experience a live in art moment',
      price: 350.00,
      imageUrl: 'https://www.digsdigs.com/photos/10-the-most-cool-and-wacky-bedrooms-ever1-554x369.jpg',
      available: false,
      category: 'art'
    });

    // Creating Experiences
    const moonWalk = await Experience.create({
      name: 'Moon Walk',
      description: `Are you the type of person who has "enjoys long walks on the beach" on their dating profile? Then why not step it up with a long walk on the Moon? We promise you're dating profile will suddenly be much more interesting.`,
      imageUrl: 'https://images.unsplash.com/photo-1446941303752-a64bb1048d54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9vbiUyMHdhbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
    });
    const alpenWandern = await Experience.create({
      name: 'Alpen Wandern',
      description: `Find yourself atop Alpen ridges with cascading views of the multitude of lakes and green fields for kilometers. If you are lucky or bring snacks with you there is a good chance you can pet a Swiss cow on your outing as well!`,
      imageUrl: 'https://images.unsplash.com/photo-1534764945014-02d68e5680d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFscCUyMGhpa2V8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60'
    });
    const teaWQueen = await Experience.create({
      name: 'Tea With The Queen',
      description: `Find yourself atop Alpen ridges with cascading views of the multitude of lakes and green fields for kilometers. If you are lucky or bring snacks with you there is a good chance you can pet a Swiss cow on your outing as well!`,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26pQkNLsjb0PMGG5eUFNIacGdKb50Ck0ZLEzeOFhVRRy7ZoabDoZ1waP94gsNzJDTJXE&usqp=CAU'
    });
    const spelunking = await Experience.create({
      name: 'Spelunking',
      description: `What wonders could exist within the cave system inside your hotel room? An experienced guide will lead you through the passages while you sharing important geological and historical facts about our private caves!`,
      imageUrl: 'https://images.unsplash.com/photo-1600201319330-e99245e614c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    });
    const ouijaBoard = await Experience.create({
      name: 'Ouija Board',
      description: "Do you wish to commune with the spirits that haunt this room? Now's your chance to talk to the evil forces behind the many mysterious caretaker deaths that have occured here.",
      imageUrl: 'https://images.unsplash.com/photo-1571235398671-05a08a7a7e20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
    });
    const skyBoatRide = await Experience.create({
      name: 'Boat Ride through the sky',
      description: 'Take a ride at night through the sky on a clear night and see the world through a beautiful view. Come relax, have a romantic night or a self care night that clears your mind.  ',
      imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fGZhbnRhc3klMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    });
    const narnia = await Experience.create({
      name: 'Narnia Day Trip',
      description: 'Take a day trip to Narnia',
      imageUrl: 'https://t4.ftcdn.net/jpg/02/02/82/19/240_F_202821927_aB8PyDK4RnTx3bfYyoy9wYP40nx5vvMM.jpg'
    });
    const margicMirror = await Experience.create({
      name: 'Magic Mirror',
      description: "If you know Harry Potter then you know this mirror from Sorcerer's Stone. Come experience the very mirror harry sat in front of.",
      imageUrl: 'https://t4.ftcdn.net/jpg/02/98/61/45/240_F_298614534_BfuDxvYZ81v9X3p94cClHuD71jxMKZpM.jpg'
    });

    const reservation1 = await Reservation.create({
      startDate: new Date('2022-04-09 00:00:00'),
      endDate: new Date('2022-04-12 00:00:00'),
    });
    const reservation2 = await Reservation.create({
      startDate: new Date('2022-04-12 00:00:00'),
      endDate: new Date('2022-04-16 00:00:00'),
    });
    const reservation3 = await Reservation.create({
      startDate: new Date('2021-12-30 00:00:00'),
      endDate: new Date('2022-01-02 00:00:00'),
    });

    const codyCart = await Cart.create({
      totalQuantity: 4,
    })
    const murphyCart = await Cart.create({
      totalQuantity: 4,
    })
    const leahCart = await Cart.create({
      totalQuantity: 4,
    })
    const tediCart = await Cart.create({
      totalQuantity: 4,
    })
    const zumaCart = await Cart.create({
      totalQuantity: 4,
    })
    const ladybugCart = await Cart.create({
      totalQuantity: 4,
    })
    const successfulBWCart = await Cart.create({
      totalQuantity: 4,
    })
    const murphyCartItem1 = await CartItem.create({
      numberOfNights: 2,
    })
    const murphyCartItem2 = await CartItem.create({
      numberOfNights: 2,
    })

    // Creating Reviews
    const review1 = await Review.create({ review_text: `I cannot recomend the The Reverie Resort enough. For our birthday my twin and I came here and while they rode a dragon I was having tea with the queen and her corgies, no one had to compromisee! The range of experience the resort has to offer can truly make everyones dream come true.` });
    const review2 = await Review.create({ review_text: "I had a wonderful time in the Cave Suite. Our spelunking experience was phenomenal as well! It was fun to play hide an seek with my husband in the cave system. He's been the hide and seek champion for 3 straight days now!" });
    const review3 = await Review.create({ review_text: "I loved staying in the Stanley Suite while I was writing my novel. It's a great place for the whole family too. After all, all work and no play makes Jack a dull boy." });

    // Creating Themes 
    const space = await Theme.create({ name: 'Space'})
    const fantasy = await Theme.create({ name: 'Fantasy'})
    const haunted = await Theme.create({ name: 'Haunted'})
    const nature = await Theme.create({ name: 'Nature'})
    const water = await Theme.create({ name: 'Water'})
    const rustic = await Theme.create({ name: 'Rustic'})
    const art = await Theme.create({ name: 'Art'})

    // TEST 
    const tediCartItem1 = await CartItem.create({
      numberOfNights: 6,
    })

    await tediCartItem1.setCart(tediCart);
    await tediCart.setUser(tedi);
    await tediCartItem1.setRoom(zenRoom);
   
    //Set associations
    await moonWalk.setRoom(moonRoom);
    await alpenWandern.setRoom(dasBergzimmer);
    await teaWQueen.setRoom(queensCabin);
    await spelunking.setRoom(caveSuite);
    await ouijaBoard.setRoom(stanleySuite);
    await skyBoatRide.setRoom(fantasyRoom);
    await narnia.setRoom(shedroom);
    await margicMirror.setRoom(fantasyRoom);

    await review1.setUser(cody);
    await review2.setUser(leah);
    await review3.setUser(tedi)

    await tedi.addReservation(reservation1);
    await tedi.addReservation(reservation2);
    await zuma.addReservation(reservation3);

    await dasBergzimmer.setReservations(reservation1);
    await spaceRoom.setReservations(reservation2);
    await poolRoom.setReservations(reservation3);

    await moonRoom.setThemes(space);
    await dasBergzimmer.setThemes(nature);
    await queensCabin.setThemes(rustic);
    await caveSuite.setThemes(nature);
    await zenRoom.setThemes(nature);
    await stanleySuite.setThemes(haunted);
    await fantasyRoom.setThemes(fantasy);
    await spaceRoom.setThemes(space);
    await dragonRoom.setThemes(fantasy);
    await poolRoom.setThemes(water);
    await shedroom.setThemes(nature);
    await artistLense.setThemes(art);

    // await cart1.setCartItems(cartItem1);
    // await cart1.setCartItems(cartItem2);
    await murphyCartItem1.setCarts(murphyCart)
    await murphyCartItem2.setCarts(murphyCart)

    await murphyCart.setUser(murphy);

    await murphyCartItem1.setRoom(shedroom);
    await murphyCartItem2.setRoom(artistLense);
    
    /* MAY EDIT */
    await murphyCartItem1.setCart(murphyCart);
    await murphyCartItem2.setCart(murphyCart);

  } catch (err) {
    console.log(err)
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
