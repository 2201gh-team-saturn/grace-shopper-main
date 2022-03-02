 User.create({
    username: 'ladybug@love.com',
    password: 'happyday',
    type: 'guest'
  })
 User.create({
    username: 'successfulBW@gh.com',
    password: 'keepinithonest',
    type: 'employee'
  })

Room.create ({
    name: 'Pool Room',
    description: 'If the water is calling you, this is the room for you, have access to it at any point in the day',
    price: 350.00,
    imageUrl: 'https://www.digsdigs.com/photos/10-the-most-cool-bedrooms-ever-554x346.jpg',
    available: true,
    category: 'water'
})
Room.create ({
    name: 'The Shedroom',
    description: ' Wake up surrounded by Nature',
    price: 350.00,
    imageUrl: 'https://www.digsdigs.com/photos/10-the-most-cool-bedrooms-ever1-554x373.jpg',
    available: true,
    category: 'Nature'
})
Room.create ({
    name: 'An Artist Lense',
    description: 'Come experience a live in art moment',
    price: 350.00,
    imageUrl: 'https://www.digsdigs.com/photos/10-the-most-cool-and-wacky-bedrooms-ever1-554x369.jpg',
    available: true,
    category: 'Nature'
})

Experience.create({
    name: 'Boat Ride through the sky',
    price: 170.00,
    description:'Take a ride at night through the sky on a clear night and see the world through a beautiful view. Come relax, have a romantic night or a self care night that clears your mind.  ',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fGZhbnRhc3klMjByb29tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
})
Experience.create({
    name: 'Narnia Day Trip',
    price: 230.00,
    description:'Take a day trip to Narnia',
    imageUrl: 'https://t4.ftcdn.net/jpg/02/02/82/19/240_F_202821927_aB8PyDK4RnTx3bfYyoy9wYP40nx5vvMM.jpg'
})
Experience.create({
    name: 'Magic Mirror',
    price: 40.00,
    description:"If you know Harry Potter then you know this mirror from Sorcerer's Stone. Come experience the very mirror harry sat in front of.",
    imageUrl: 'https://t4.ftcdn.net/jpg/02/98/61/45/240_F_298614534_BfuDxvYZ81v9X3p94cClHuD71jxMKZpM.jpg'
})
